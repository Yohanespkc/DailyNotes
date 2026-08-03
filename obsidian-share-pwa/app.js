/* ==========================================================================
   TeleShare Obsidian P2P - Core Application Logic
   ========================================================================== */

let peer = null;
let activeConnections = new Map(); // peerId -> { conn, name }
let myPeerId = localStorage.getItem('tele_my_peer_id') || null;
let myUserName = localStorage.getItem('tele_username') || '';
let deferredInstallPrompt = null;
let currentArticleContent = '';

// DOM Elements
const statusBadge = document.getElementById('statusBadge');
const statusText = document.getElementById('statusText');
const headerUserTitle = document.getElementById('headerUserTitle');
const btnEditName = document.getElementById('btnEditName');
const sidebarMyName = document.getElementById('sidebarMyName');
const myAvatarInitial = document.getElementById('myAvatarInitial');
const myPeerIdSub = document.getElementById('myPeerIdSub');

const targetPeerIdInput = document.getElementById('targetPeerIdInput');
const btnConnectPeer = document.getElementById('btnConnectPeer');
const peerConnIndicator = document.getElementById('peerConnIndicator');

const btnOpenPeersModal = document.getElementById('btnOpenPeersModal');
const connectedCountBadge = document.getElementById('connectedCountBadge');
const peersModal = document.getElementById('peersModal');
const btnClosePeersModal = document.getElementById('btnClosePeersModal');
const connectedPeersList = document.getElementById('connectedPeersList');

const nameModal = document.getElementById('nameModal');
const userNameInput = document.getElementById('userNameInput');
const nameErrorMsg = document.getElementById('nameErrorMsg');
const btnSaveName = document.getElementById('btnSaveName');

const btnShareInvite = document.getElementById('btnShareInvite');
const inviteModal = document.getElementById('inviteModal');
const btnCloseInviteModal = document.getElementById('btnCloseInviteModal');
const shareUrlInput = document.getElementById('shareUrlInput');
const btnCopyShareUrl = document.getElementById('btnCopyShareUrl');
const qrCodeBox = document.getElementById('qrCodeBox');

const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const btnSendMessage = document.getElementById('btnSendMessage');
const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');

const articleModal = document.getElementById('articleModal');
const articleModalTitle = document.getElementById('articleModalTitle');
const articleModalBody = document.getElementById('articleModalBody');
const btnCloseArticleModal = document.getElementById('btnCloseArticleModal');
const btnCopyObsidianContent = document.getElementById('btnCopyObsidianContent');
const btnInstallPwa = document.getElementById('btnInstallPwa');

// --- 1. Service Worker & PWA Installation ---
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('SW Registered'))
    .catch(err => console.log('SW Registration failed:', err));
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  if (btnInstallPwa) {
    btnInstallPwa.classList.remove('hidden');
  }
});

if (btnInstallPwa) {
  btnInstallPwa.addEventListener('click', async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const { outcome } = await deferredInstallPrompt.userChoice;
      if (outcome === 'accepted') {
        btnInstallPwa.classList.add('hidden');
      }
      deferredInstallPrompt = null;
    }
  });
}

// --- 2. User Name Logic ---
function setupUserName() {
  if (!myUserName) {
    nameModal.classList.remove('hidden');
  } else {
    updateUserDisplay();
  }
}

function updateUserDisplay() {
  sidebarMyName.textContent = myUserName;
  headerUserTitle.textContent = `TeleShare (${myUserName})`;
  myAvatarInitial.textContent = myUserName.charAt(0).toUpperCase();
}

btnSaveName.addEventListener('click', () => {
  const val = userNameInput.value.trim();
  if (!val) {
    alert('Harap masukkan nama Anda!');
    return;
  }

  let isTaken = false;
  activeConnections.forEach(peerData => {
    if (peerData.name && peerData.name.toLowerCase() === val.toLowerCase()) {
      isTaken = true;
    }
  });

  if (isTaken) {
    nameErrorMsg.classList.remove('hidden');
    nameErrorMsg.textContent = '⚠️ Nama ini sudah digunakan, silakan ubah nama Anda!';
    return;
  }

  nameErrorMsg.classList.add('hidden');
  myUserName = val;
  localStorage.setItem('tele_username', myUserName);
  updateUserDisplay();
  nameModal.classList.add('hidden');

  broadcastMessage({
    type: 'handshake',
    name: myUserName
  });
});

btnEditName.addEventListener('click', () => {
  userNameInput.value = myUserName;
  nameErrorMsg.classList.add('hidden');
  nameModal.classList.remove('hidden');
});

// --- 3. Persistent PeerJS Real-Time Connection ---
function initPeer() {
  if (!myPeerId) {
    const cleanName = (myUserName || 'yohanes').toLowerCase().replace(/[^a-z0-9]/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    myPeerId = `tele-obs-${cleanName}-${randomSuffix}`;
    localStorage.setItem('tele_my_peer_id', myPeerId);
  }

  updateStatus('connecting', 'Membuat Sesi P2P...');

  peer = new Peer(myPeerId, {
    debug: 1,
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    }
  });

  peer.on('open', (id) => {
    myPeerId = id;
    myPeerIdSub.textContent = `ID P2P: ${id}`;
    updateStatus('online', 'P2P Ready - Menunggu Koneksi');
    console.log('Peer initialized with Fixed ID:', id);

    // Auto-Connect from URL parameter (?connect=ID or ?room=ID)
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get('connect') || urlParams.get('room');
    if (targetId && targetId !== myPeerId) {
      console.log('Auto-connecting to target from URL:', targetId);
      targetPeerIdInput.value = targetId;
      connectToPeer(targetId);
    }
  });

  peer.on('connection', (incomingConn) => {
    console.log('Incoming connection from:', incomingConn.peer);
    setupDataConnection(incomingConn);
  });

  peer.on('error', (err) => {
    console.error('PeerJS error:', err);
    updateStatus('offline', 'Koneksi Gagal/Timeout');
  });
}

function connectToPeer(targetId) {
  if (!targetId || targetId === myPeerId) return;
  updateStatus('connecting', `Menghubungkan ke ${targetId}...`);
  const outgoingConn = peer.connect(targetId, { reliable: true });
  setupDataConnection(outgoingConn);
}

function setupDataConnection(conn) {
  conn.on('open', () => {
    console.log('Connected to peer:', conn.peer);
    
    activeConnections.set(conn.peer, { conn: conn, name: 'Teman' });
    updatePeersUI();

    conn.send({
      type: 'handshake',
      name: myUserName
    });

    updateStatus('online', `Terhubung (${activeConnections.size} teman)`);
    inviteModal.classList.add('hidden');
  });

  conn.on('data', (data) => {
    console.log('Data received from', conn.peer, ':', data);
    handleIncomingData(conn.peer, data);
  });

  conn.on('close', () => {
    console.log('Connection closed:', conn.peer);
    const peerData = activeConnections.get(conn.peer);
    const peerName = peerData ? peerData.name : conn.peer;
    
    activeConnections.delete(conn.peer);
    updatePeersUI();

    addSystemNotice(`⚠️ ${peerName} terputus dari koneksi.`);
  });

  conn.on('error', (err) => {
    console.error('Connection error:', err);
  });
}

function handleIncomingData(peerId, data) {
  if (data.type === 'handshake') {
    if (data.name && data.name.toLowerCase() === myUserName.toLowerCase()) {
      activeConnections.get(peerId).conn.send({
        type: 'name_error',
        msg: 'Nama ini sudah digunakan, silakan ubah nama Anda'
      });
      return;
    }

    const peerData = activeConnections.get(peerId);
    if (peerData) {
      peerData.name = data.name || peerId;
      updatePeersUI();
      addSystemNotice(`🎉 ${peerData.name} terhubung secara instan!`);
    }
  } else if (data.type === 'name_error') {
    nameErrorMsg.classList.remove('hidden');
    nameErrorMsg.textContent = `⚠️ ${data.msg}`;
    nameModal.classList.remove('hidden');
  } else if (data.type === 'text') {
    const peerData = activeConnections.get(peerId);
    const senderName = peerData ? peerData.name : 'Teman';
    addMessageBubble(data.text, 'peer', senderName, data.timestamp);
  } else if (data.type === 'article') {
    const peerData = activeConnections.get(peerId);
    const senderName = peerData ? peerData.name : 'Teman';
    addArticleBubble(data.title, data.content, 'peer', senderName, data.timestamp);
  }
}

function broadcastMessage(data) {
  activeConnections.forEach(peerData => {
    if (peerData.conn && peerData.conn.open) {
      peerData.conn.send(data);
    }
  });
}

function updatePeersUI() {
  const count = activeConnections.size;
  connectedCountBadge.textContent = count;

  if (count > 0) {
    peerConnIndicator.textContent = `${count} Terhubung ✅`;
    peerConnIndicator.style.color = 'var(--color-success)';
  } else {
    peerConnIndicator.textContent = 'Belum Terhubung';
    peerConnIndicator.style.color = 'var(--color-warning)';
  }

  connectedPeersList.innerHTML = '';
  if (count === 0) {
    connectedPeersList.innerHTML = '<div class="modal-desc">Belum ada orang yang terhubung. Klik "Undang Teman" untuk membagikan link auto-connect!</div>';
    return;
  }

  activeConnections.forEach((peerData, peerId) => {
    const div = document.createElement('div');
    div.className = 'peer-list-item';
    const initial = peerData.name.charAt(0).toUpperCase();

    div.innerHTML = `
      <div class="peer-item-left">
        <div class="peer-avatar">${initial}</div>
        <div>
          <div class="peer-info-name">${escapeHtml(peerData.name)}</div>
          <div class="peer-info-status">🟢 Online (Terhubung di Obsidian)</div>
        </div>
      </div>
      <button class="btn btn-secondary btn-sm send-md-btn">Kirim File .md</button>
    `;

    div.querySelector('.send-md-btn').addEventListener('click', () => {
      peersModal.classList.add('hidden');
      fileInput.click();
    });

    connectedPeersList.appendChild(div);
  });
}

// --- 4. Chat Bubbles & Messages ---
function updateStatus(state, text) {
  statusText.textContent = text;
  const dot = statusBadge.querySelector('.status-dot');
  dot.className = `status-dot ${state}`;
}

function addSystemNotice(text) {
  const div = document.createElement('div');
  div.className = 'chat-notice system-notice';
  div.innerHTML = `<div class="notice-icon">ℹ️</div><div class="notice-text">${escapeHtml(text)}</div>`;
  chatMessages.appendChild(div);
  scrollToBottom();
}

function addMessageBubble(text, sender, senderName, timestamp = null) {
  const div = document.createElement('div');
  div.className = `chat-bubble ${sender}`;
  const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  let headerHtml = sender === 'peer' ? `<div class="sender-name-tag">${escapeHtml(senderName)}</div>` : '';

  if (text.includes('# ') || text.includes('```') || text.includes('**') || text.length > 200) {
    const rendered = marked.parse(text);
    div.innerHTML = `${headerHtml}<div class="markdown-content">${rendered}</div><div class="bubble-meta">${timeStr}</div>`;
  } else {
    div.innerHTML = `${headerHtml}<div>${escapeHtml(text)}</div><div class="bubble-meta">${timeStr}</div>`;
  }

  chatMessages.appendChild(div);
  scrollToBottom();
}

function addArticleBubble(title, content, sender, senderName, timestamp = null) {
  const div = document.createElement('div');
  div.className = `chat-bubble ${sender}`;
  const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  let headerHtml = sender === 'peer' ? `<div class="sender-name-tag">${escapeHtml(senderName)}</div>` : '';

  const snippet = content.substring(0, 150) + (content.length > 150 ? '...' : '');

  div.innerHTML = `
    ${headerHtml}
    <div class="article-card-msg">
      <div class="article-card-header">
        <span>📄 Artikel Obsidian: ${escapeHtml(title)}</span>
      </div>
      <div class="article-card-snippet">${escapeHtml(snippet)}</div>
      <div class="article-card-actions">
        <button class="btn btn-primary btn-sm view-article-btn">Baca Artikel</button>
        <button class="btn btn-secondary btn-sm copy-article-btn">Salin Ke Obsidian</button>
      </div>
    </div>
    <div class="bubble-meta">${timeStr}</div>
  `;

  div.querySelector('.view-article-btn').addEventListener('click', () => {
    openArticleModal(title, content);
  });

  div.querySelector('.copy-article-btn').addEventListener('click', () => {
    copyToClipboard(content, 'Artikel berhasil disalin! Buka Obsidian lalu tekan Cmd+V.');
  });

  chatMessages.appendChild(div);
  scrollToBottom();
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function copyToClipboard(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    alert(successMsg || 'Berhasil disalin ke clipboard!');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// --- 5. Send Message / Article Handler ---
function handleSendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  if (activeConnections.size === 0) {
    alert('Belum ada teman terhubung! Klik "Undang Teman" untuk membagikan link auto-connect ke teman Anda.');
    return;
  }

  const now = Date.now();

  if (text.startsWith('#') || text.includes('\n\n') || text.length > 250) {
    const firstLine = text.split('\n')[0].replace(/^#+\s*/, '');
    const title = firstLine.length > 0 ? firstLine : 'Artikel Obsidian';
    
    broadcastMessage({
      type: 'article',
      title: title,
      content: text,
      timestamp: now
    });

    addArticleBubble(title, text, 'me', myUserName, now);
  } else {
    broadcastMessage({
      type: 'text',
      text: text,
      timestamp: now
    });

    addMessageBubble(text, 'me', myUserName, now);
  }

  messageInput.value = '';
  messageInput.style.height = 'auto';
}

// --- 6. Drag & Drop File Processing ---
function processFile(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    const title = file.name.replace(/\.(md|txt|markdown)$/i, '');

    if (activeConnections.size === 0) {
      openArticleModal(title, content);
      alert('Belum ada teman terhubung. Artikel ditampilkan sebagai pratinjau.');
      return;
    }

    const now = Date.now();
    broadcastMessage({
      type: 'article',
      title: title,
      content: content,
      timestamp: now
    });

    addArticleBubble(title, content, 'me', myUserName, now);
    alert(`File "${file.name}" berhasil terkirim ke semua teman terhubung!`);
  };
  reader.readAsText(file);
}

// Drag & Drop Listeners
window.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.remove('hidden');
});

dropZone.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dropZone.classList.add('hidden');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.add('hidden');
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    processFile(files[0]);
  }
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    processFile(e.target.files[0]);
  }
});

// --- 7. Modals Event Listeners ---
btnOpenPeersModal.addEventListener('click', () => {
  updatePeersUI();
  peersModal.classList.remove('hidden');
});

btnClosePeersModal.addEventListener('click', () => {
  peersModal.classList.add('hidden');
});

function openArticleModal(title, content) {
  currentArticleContent = content;
  articleModalTitle.textContent = `📄 ${title}`;
  articleModalBody.innerHTML = marked.parse(content);
  articleModal.classList.remove('hidden');
}

btnCopyObsidianContent.addEventListener('click', () => {
  copyToClipboard(currentArticleContent, 'Artikel berhasil disalin! Buka Obsidian lalu tekan Cmd+V.');
});

btnCloseArticleModal.addEventListener('click', () => {
  articleModal.classList.add('hidden');
});

btnShareInvite.addEventListener('click', () => {
  if (!myPeerId) {
    alert('Sesi P2P sedang diinisialisasi, harap tunggu sebentar...');
    return;
  }

  const baseUrl = window.location.origin + window.location.pathname;
  const shareUrl = `${baseUrl}?connect=${myPeerId}`;
  shareUrlInput.value = shareUrl;

  qrCodeBox.innerHTML = '';
  const canvas = document.createElement('canvas');
  QRCode.toCanvas(canvas, shareUrl, { width: 200, margin: 2 }, (err) => {
    if (!err) qrCodeBox.appendChild(canvas);
  });

  inviteModal.classList.remove('hidden');
});

btnCloseInviteModal.addEventListener('click', () => {
  inviteModal.classList.add('hidden');
});

btnCopyShareUrl.addEventListener('click', () => {
  copyToClipboard(shareUrlInput.value, 'Link Auto-Connect berhasil disalin! Kirimkan link ini ke teman Anda.');
});

btnConnectPeer.addEventListener('click', () => {
  const targetId = targetPeerIdInput.value.trim();
  if (targetId) {
    connectToPeer(targetId);
  }
});

btnSendMessage.addEventListener('click', handleSendMessage);

messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
});

messageInput.addEventListener('input', () => {
  messageInput.style.height = 'auto';
  messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
});

// App Initialization
window.addEventListener('DOMContentLoaded', () => {
  setupUserName();
  initPeer();
});
