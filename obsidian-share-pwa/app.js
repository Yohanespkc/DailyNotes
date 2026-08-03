/* ==========================================================================
   TeleShare Obsidian P2P - Core Application Logic
   ========================================================================== */

let peer = null;
let conn = null;
let myPeerId = null;
let deferredInstallPrompt = null;
let currentArticleContent = '';

// DOM Elements
const statusBadge = document.getElementById('statusBadge');
const statusText = document.getElementById('statusText');
const myPeerIdInput = document.getElementById('myPeerIdInput');
const myIdBadge = document.getElementById('myIdBadge');
const targetPeerIdInput = document.getElementById('targetPeerIdInput');
const btnConnectPeer = document.getElementById('btnConnectPeer');
const peerConnIndicator = document.getElementById('peerConnIndicator');
const btnCopyMyId = document.getElementById('btnCopyMyId');

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

// --- 2. Initialize PeerJS P2P Connection ---
function initPeer() {
  // Random clean ID format: tele-obs-xxxx
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const customId = `tele-obs-${randomSuffix}`;

  updateStatus('connecting', 'Membuat Sesi P2P...');

  peer = new Peer(customId, {
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
    myPeerIdInput.value = id;
    myIdBadge.textContent = 'Aktif';
    updateStatus('online', 'P2P Ready - Menunggu Koneksi');
    console.log('Peer initialized with ID:', id);

    // Check URL parameters for Auto-Connect Link (?connect=ID or ?room=ID)
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get('connect') || urlParams.get('room');
    if (targetId && targetId !== myPeerId) {
      console.log('Auto-connecting to target from URL:', targetId);
      targetPeerIdInput.value = targetId;
      connectToPeer(targetId);
    }
  });

  // Handle incoming connection from friend
  peer.on('connection', (incomingConn) => {
    console.log('Incoming connection from:', incomingConn.peer);
    setupDataConnection(incomingConn);
  });

  peer.on('error', (err) => {
    console.error('PeerJS error:', err);
    updateStatus('offline', 'Koneksi Gagal/Timeout');
  });
}

// Connect to Target Peer
function connectToPeer(targetId) {
  if (!targetId || targetId === myPeerId) return;
  updateStatus('connecting', `Menghubungkan ke ${targetId}...`);
  const outgoingConn = peer.connect(targetId, { reliable: true });
  setupDataConnection(outgoingConn);
}

// Setup Data Connection Listeners
function setupDataConnection(dataConn) {
  conn = dataConn;

  conn.on('open', () => {
    console.log('Connected to peer:', conn.peer);
    peerConnIndicator.textContent = 'Terhubung ✅';
    peerConnIndicator.style.color = 'var(--color-success)';
    updateStatus('online', `Terhubung dengan: ${conn.peer}`);
    
    // Add system notification in chat
    addSystemNotice(`🎉 Terhubung dengan teman! (ID: ${conn.peer}). Anda sekarang dapat berkirim artikel Obsidian.`);

    // Close invite modal if open
    inviteModal.classList.add('hidden');
  });

  conn.on('data', (data) => {
    console.log('Data received:', data);
    handleIncomingData(data);
  });

  conn.on('close', () => {
    console.log('Connection closed');
    peerConnIndicator.textContent = 'Terputus';
    peerConnIndicator.style.color = 'var(--color-danger)';
    updateStatus('offline', 'Koneksi Terputus');
    addSystemNotice('⚠️ Koneksi dengan teman terputus.');
    conn = null;
  });

  conn.on('error', (err) => {
    console.error('Connection error:', err);
    updateStatus('offline', 'Error Koneksi P2P');
  });
}

// Handle Incoming P2P Data
function handleIncomingData(data) {
  if (data.type === 'text') {
    addMessageBubble(data.text, 'peer', data.timestamp);
  } else if (data.type === 'article') {
    addArticleBubble(data.title, data.content, 'peer', data.timestamp);
  }
}

// --- 3. UI Helpers & Chat Functions ---
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

function addMessageBubble(text, sender, timestamp = null) {
  const div = document.createElement('div');
  div.className = `chat-bubble ${sender}`;
  
  const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  // If text contains Markdown features, parse it
  if (text.includes('# ') || text.includes('```') || text.includes('**') || text.length > 200) {
    const rendered = marked.parse(text);
    div.innerHTML = `<div class="markdown-content">${rendered}</div><div class="bubble-meta">${timeStr}</div>`;
  } else {
    div.innerHTML = `<div>${escapeHtml(text)}</div><div class="bubble-meta">${timeStr}</div>`;
  }

  chatMessages.appendChild(div);
  scrollToBottom();
}

function addArticleBubble(title, content, sender, timestamp = null) {
  const div = document.createElement('div');
  div.className = `chat-bubble ${sender}`;
  const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  const snippet = content.substring(0, 150) + (content.length > 150 ? '...' : '');

  div.innerHTML = `
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

  // Attach event listeners for buttons inside bubble
  div.querySelector('.view-article-btn').addEventListener('click', () => {
    openArticleModal(title, content);
  });

  div.querySelector('.copy-article-btn').addEventListener('click', () => {
    copyToClipboard(content, 'Artikel berhasil disalin! Tinggal Paste (Cmd+V) di Obsidian.');
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

// --- 4. Send Article / Message Action ---
function handleSendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  if (!conn || conn.open === false) {
    alert('Belum terhubung dengan teman! Klik tombol "Link Auto-Connect" di atas untuk menghubungkan teman Anda terlebih dahulu.');
    return;
  }

  const now = Date.now();

  // If text looks like a markdown article (has headings, long text, etc.)
  if (text.startsWith('#') || text.includes('\n\n') || text.length > 250) {
    const firstLine = text.split('\n')[0].replace(/^#+\s*/, '');
    const title = firstLine.length > 0 ? firstLine : 'Artikel Obsidian';
    
    // Send P2P Data
    conn.send({
      type: 'article',
      title: title,
      content: text,
      timestamp: now
    });

    addArticleBubble(title, text, 'me', now);
  } else {
    // Regular instant message
    conn.send({
      type: 'text',
      text: text,
      timestamp: now
    });

    addMessageBubble(text, 'me', now);
  }

  messageInput.value = '';
  messageInput.style.height = 'auto';
}

// --- 5. File Upload / Drag-and-Drop Handler ---
function processFile(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    const title = file.name.replace(/\.(md|txt|markdown)$/i, '');

    if (!conn || conn.open === false) {
      // Just preview locally if not connected yet
      openArticleModal(title, content);
      return;
    }

    const now = Date.now();
    conn.send({
      type: 'article',
      title: title,
      content: content,
      timestamp: now
    });

    addArticleBubble(title, content, 'me', now);
  };
  reader.readAsText(file);
}

// Drag & Drop
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

// --- 6. Modal Functions ---
function openArticleModal(title, content) {
  currentArticleContent = content;
  articleModalTitle.textContent = `📄 ${title}`;
  articleModalBody.innerHTML = marked.parse(content);
  articleModal.classList.remove('hidden');
}

btnCopyObsidianContent.addEventListener('click', () => {
  copyToClipboard(currentArticleContent, 'Artikel berhasil disalin! Buka Obsidian lalu tekan Cmd+V / Ctrl+V.');
});

btnCloseArticleModal.addEventListener('click', () => {
  articleModal.classList.add('hidden');
});

// Auto-Connect Share Link & QR Code Modal
btnShareInvite.addEventListener('click', () => {
  if (!myPeerId) {
    alert('Sesi P2P sedang diinisialisasi, harap tunggu sebentar...');
    return;
  }

  // Build Auto-Connect URL
  const baseUrl = window.location.origin + window.location.pathname;
  const shareUrl = `${baseUrl}?connect=${myPeerId}`;
  shareUrlInput.value = shareUrl;

  // Render QR Code
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

btnCopyMyId.addEventListener('click', () => {
  copyToClipboard(myPeerIdInput.value, 'ID P2P Anda telah disalin.');
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

// Auto-expand textarea
messageInput.addEventListener('input', () => {
  messageInput.style.height = 'auto';
  messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
});

// Initialize on Load
window.addEventListener('DOMContentLoaded', () => {
  initPeer();
});
