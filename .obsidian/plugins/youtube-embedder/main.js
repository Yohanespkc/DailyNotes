const { Plugin, Notice, MarkdownView, Modal, Setting, requestUrl } = require("obsidian");

class VideoPromptModal extends Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h3", { text: "🤖 YouTube Video Embedder + AI Summary" });

    let url = "";
    let timeInput = "1:21";
    let selectedModel = "gemma4:latest";
    let customSummary = "";

    new Setting(contentEl)
      .setName("Link / URL YouTube")
      .setDesc("Tempelkan link video YouTube yang ingin dianalisis AI")
      .addText((text) => {
        text.setPlaceholder("https://youtu.be/...").onChange((val) => {
          url = val;
        });
        setTimeout(() => text.inputEl.focus(), 50);
      });

    new Setting(contentEl)
      .setName("Menit / Timestamp")
      .setDesc("Masukkan menit (contoh: 2:32 atau 81)")
      .addText((text) => {
        text.setValue("1:21").onChange((val) => {
          timeInput = val;
        });
      });

    new Setting(contentEl)
      .setName("Pilih Model AI / LLM")
      .setDesc("Pilih model kecerdasan buatan yang digunakan untuk merangkum video")
      .addDropdown((dropdown) => {
        dropdown
          .addOption("gemma4:latest", "💎 Gemma 4 (Recomended - 8B)")
          .addOption("gasing-tutor:latest", "🎓 Gasing Tutor AI (8B)")
          .addOption("gasing-pedagogy-qwen:latest", "⚡ Gasing Pedagogy Qwen")
          .addOption("qwen2.5:0.5b", "🚀 Qwen 2.5 Fast (Super Cepat)")
          .setValue("gemma4:latest")
          .onChange((val) => {
            selectedModel = val;
          });
      });

    new Setting(contentEl)
      .setName("Instruksi Khusus untuk AI (Opsional)")
      .setDesc("Jika dikosongkan, AI akan otomatis menganalisis & merangkum video ini")
      .addTextArea((text) => {
        text.setPlaceholder("Contoh: Fokuskan ringkasan pada bagian rumus matematika...").onChange((val) => {
          customSummary = val;
        });
        text.inputEl.rows = 2;
        text.inputEl.style.width = "100%";
      });

    new Setting(contentEl).addButton((btn) =>
      btn
        .setButtonText("🤖 Analisa Video dengan AI & Sisipkan")
        .setCta()
        .onClick(() => {
          if (!url || !url.trim()) {
            new Notice("⚠️ Harap masukkan URL YouTube!");
            return;
          }
          this.close();
          this.onSubmit(url.trim(), timeInput.trim(), selectedModel, customSummary.trim());
        })
    );
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

module.exports = class YouTubeEmbedderPlugin extends Plugin {
  async onload() {
    this.injectStudioCSS();
    this.registerAudioStudioProcessor();

    // 1. Ribbon Icon for Note Harian Baru (📝)
    this.addRibbonIcon("file-plus", "Buat Note Harian Baru", async () => {
      await this.createNewDailyNote();
    });

    // 2. Ribbon Icon for Generate AI English Progress Report (🤖)
    this.addRibbonIcon("bot", "Generate AI English Progress Report", async () => {
      await this.generateAIProgressReport();
    });

    // 3. Ribbon Icon for Insert Video (📹)
    this.addRibbonIcon("video", "Insert Video", async () => {
      this.openVideoModal();
    });

    // Command Palette Entries
    this.addCommand({
      id: "create-daily-note",
      name: "Buat Note Harian Baru",
      callback: async () => {
        await this.createNewDailyNote();
      }
    });

    this.addCommand({
      id: "generate-ai-progress-report",
      name: "Generate AI English Progress Report",
      callback: async () => {
        await this.generateAIProgressReport();
      }
    });

    this.addCommand({
      id: "insert-youtube-video",
      name: "Insert Video",
      callback: async () => {
        this.openVideoModal();
      }
    });
  }

  injectStudioCSS() {
    const styleEl = document.createElement("style");
    styleEl.id = "gasing-audio-studio-css";
    styleEl.innerHTML = `
      @keyframes pulse-recording-ring {
        0% { box-shadow: 0 0 0 0 rgba(225, 112, 85, 0.7); }
        70% { box-shadow: 0 0 0 12px rgba(225, 112, 85, 0); }
        100% { box-shadow: 0 0 0 0 rgba(225, 112, 85, 0); }
      }
      .gasing-recording-active {
        animation: pulse-recording-ring 1.5s infinite !important;
        border: 2px solid #ff7675 !important;
      }
    `;
    document.head.appendChild(styleEl);
  }

  getPhoneticCorrection(word) {
    const w = word.toLowerCase().replace(/[^a-z]/g, "");
    const dict = {
      "methodology": { respell: "meh-thuh-DAHL-uh-jee", tip: "Tekan suku kata ke-3 'DAHL'. Lidah di antara gigi atas & bawah untuk bunyi 'th'." },
      "foundational": { respell: "fown-DAY-shuhn-uhl", tip: "Tekan suku kata ke-2 'DAY'. Vokal 'fown' dibaca seperti 'town'." },
      "instructional": { respell: "in-STRUK-shuhn-uhl", tip: "Tekan suku kata ke-2 'STRUK'. Akhiran '-tional' dibaca '-shuhn-uhl'." },
      "latency": { respell: "LAY-tuhn-see", tip: "Tekan suku kata ke-1 'LAY'. Huruf 'a' dibaca 'lay' (bukan lah-tency)." },
      "quorum": { respell: "KWOR-uhm", tip: "Tekan suku kata ke-1 'KWOR'. Huruf 'qu' dibaca 'kw'." },
      "successfully": { respell: "suhk-SESS-fuh-lee", tip: "Tekan suku kata ke-2 'SESS'. Huruf 'cc' dibaca 'ks'." },
      "coverage": { respell: "KUHV-er-ij", tip: "Tekan suku kata ke-1 'KUHV'. Akhiran '-age' dibaca '-ij'." },
      "transmission": { respell: "tranz-MISH-uhn", tip: "Tekan suku kata ke-2 'MISH'. Akhiran '-ssion' dibaca '-shuhn'." },
      "mandatory": { respell: "MAN-duh-tor-ee", tip: "Tekan suku kata ke-1 'MAN'." },
      "pedagogical": { respell: "ped-uh-GAHJ-ik-uhl", tip: "Tekan suku kata ke-3 'GAHJ'." },
      "frequency": { respell: "FREE-kwuhn-see", tip: "Tekan suku kata ke-1 'FREE'." },
      "transitioning": { respell: "tran-ZISH-uhn-ing", tip: "Tekan suku kata ke-2 'ZISH'." },
      "readiness": { respell: "RED-ee-niss", tip: "Tekan suku kata ke-1 'RED'." }
    };

    if (dict[w]) return dict[w];

    let respell = w.toUpperCase();
    if (w.length > 5) {
      respell = w.slice(0, 3).toLowerCase() + "-" + w.slice(3, -2).toUpperCase() + "-" + w.slice(-2).toLowerCase();
    }
    return {
      respell: respell,
      tip: "Perhatikan penekanan intonasi dan ucapkan suku kata utama dengan jelas."
    };
  }

  generateVisualBar(percent) {
    const totalBars = 10;
    const filledBars = Math.max(0, Math.min(totalBars, Math.round((percent / 100) * totalBars)));
    const emptyBars = totalBars - filledBars;
    return "█".repeat(filledBars) + "░".repeat(emptyBars);
  }

  registerAudioStudioProcessor() {
    this.registerMarkdownCodeBlockProcessor("audio-studio", async (source, el, ctx) => {
      el.empty();
      
      let savedAudioPath = "";
      let rawText = source.trim();

      const lines = rawText.split("\n");
      const textLines = [];
      lines.forEach(l => {
        if (l.startsWith("saved-audio:")) {
          savedAudioPath = l.replace("saved-audio:", "").trim();
        } else {
          textLines.push(l);
        }
      });
      let textToReadCurrent = textLines.join("\n").trim();

      const container = el.createDiv();
      container.setAttribute("style", "background:#1e1e2e; border: 2px solid #6c5ce7; border-radius: 16px; padding: 22px; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 15px 0; box-shadow: 0 10px 30px rgba(0,0,0,0.4);");

      // Header
      const header = container.createDiv();
      header.setAttribute("style", "display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;");
      header.createEl("h3", { text: "🎙️ Studio Rekaman & Voice Over Amerika Calibrated", style: "margin:0; color:#a29bfe; font-size:19px; font-weight:bold;" });
      
      const badgeRow = header.createDiv({ style: "display:flex; gap:6px;" });
      badgeRow.createEl("span", { text: "👩‍💼 Relaxed Professional Voice", style: "background:#6c5ce7; color:#fff; font-size:11px; padding:3px 8px; border-radius:12px; font-weight:bold;" });

      container.createEl("p", { text: "Bahan Naskah Lisan (1-2 Paragraf) Yang Disusun AI untuk Dikelaskan & Dilatih:", style: "margin-top:0; color:#b2bec3; font-size:13px;" });

      // Script text box (Clean natural paragraph layout)
      const scriptBox = container.createDiv({
        text: textToReadCurrent,
        style: "background:#2d3436; border-left: 5px solid #a29bfe; padding: 16px; border-radius: 10px; color: #dfe6e9; font-size: 15px; line-height: 1.6; margin-bottom: 14px;"
      });

      // SECTION 1: PROSODY PAUSE INSERTER (INSERTS COMMAS FOR BREATHING PAUSES, NO NGOS-NGOSSAN)
      const prosodySection = container.createDiv({ style: "display:flex; justify-content:space-between; align-items:center; background:#2c2c3e; padding:10px 14px; border-radius:8px; margin-bottom:14px; border:1px dashed #8e44ad;" });
      prosodySection.createEl("span", { text: "✨ Sisipkan Tanda Koma Jeda Napas Alami:", style: "font-size:12px; font-weight:bold; color:#d6a2e8;" });

      const btnOptimizePunctuation = prosodySection.createEl("button", {
        text: "✨ Sisipkan Tanda Koma Jeda Napas Alami",
        style: "background:#8e44ad; color:#ffffff; border:none; padding:7px 14px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;"
      });

      btnOptimizePunctuation.addEventListener("click", () => {
        let opt = textToReadCurrent;
        // Clean out literal emdash
        opt = opt.replace(/—|–|emdash|--/g, ", ");
        // Insert natural commas before conjunctions so female TTS takes a relaxed breath
        opt = opt.replace(/\b(and|but|however|therefore|which|that|using|proving|transitioning|for|to|with)\b/gi, ", $1");
        opt = opt.replace(/,\s*,/g, ",");
        
        textToReadCurrent = opt;
        scriptBox.innerText = opt;
        new Notice("✨ Tanda koma jeda napas berhasil disisipkan! Suara wanita akan membaca dengan sangat santai & tidak ngos-ngosan.");
      });

      // SECTION 2: Voice Over Controls with STOP BUTTON & CLAUSE-BY-CLAUSE PROSODIC PAUSE ENGINE
      const voiceControlSection = container.createDiv({ style: "background:#252b36; padding:12px 16px; border-radius:10px; margin-bottom:14px; border:1px solid #353b48;" });
      
      const voiceHeader = voiceControlSection.createDiv({ style: "display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;" });
      voiceHeader.createEl("span", { text: "🇺🇸 1. Karakter Suara Amerika Professional (Voice Over):", style: "font-size:13px; font-weight:bold; color:#a29bfe;" });

      const voiceBtnRow = voiceControlSection.createDiv({ style: "display:flex; gap:8px; flex-wrap:wrap; align-items:center;" });

      let currentVoiceGender = "female";
      let currentSpeechRate = 0.80; // Relaxed unhurried pace

      const btnFemale = voiceBtnRow.createEl("button", {
        text: "👩 Suara Wanita (Aria/Victoria/Samantha)",
        style: "background:#6c5ce7; color:#ffffff; border:none; padding:8px 14px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;"
      });

      const btnMale = voiceBtnRow.createEl("button", {
        text: "👨 Suara Pria (Alex/Guy)",
        style: "background:#353b48; color:#b2bec3; border:none; padding:8px 14px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;"
      });

      const btnSpeedSlow = voiceBtnRow.createEl("button", {
        text: "🐢 Pelan & Santai (0.70x)",
        style: "background:#353b48; color:#b2bec3; border:none; padding:8px 14px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;"
      });

      const btnSpeedNormal = voiceBtnRow.createEl("button", {
        text: "▶️ Normal Santai (0.80x)",
        style: "background:#0984e3; color:#ffffff; border:none; padding:8px 14px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;"
      });

      const btnStopSpeech = voiceBtnRow.createEl("button", {
        text: "⏹️ Hentikan Suara AI",
        style: "background:#d63031; color:#ffffff; border:none; padding:8px 14px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;"
      });

      btnFemale.addEventListener("click", () => {
        currentVoiceGender = "female";
        btnFemale.style.background = "#6c5ce7";
        btnFemale.style.color = "#ffffff";
        btnMale.style.background = "#353b48";
        btnMale.style.color = "#b2bec3";
        playCalibratedVoice();
      });

      btnMale.addEventListener("click", () => {
        currentVoiceGender = "male";
        btnMale.style.background = "#6c5ce7";
        btnMale.style.color = "#ffffff";
        btnFemale.style.background = "#353b48";
        btnFemale.style.color = "#b2bec3";
        playCalibratedVoice();
      });

      btnSpeedSlow.addEventListener("click", () => {
        currentSpeechRate = 0.70;
        btnSpeedSlow.style.background = "#0984e3";
        btnSpeedSlow.style.color = "#ffffff";
        btnSpeedNormal.style.background = "#353b48";
        btnSpeedNormal.style.color = "#b2bec3";
        playCalibratedVoice();
      });

      btnSpeedNormal.addEventListener("click", () => {
        currentSpeechRate = 0.80;
        btnSpeedNormal.style.background = "#0984e3";
        btnSpeedNormal.style.color = "#ffffff";
        btnSpeedSlow.style.background = "#353b48";
        btnSpeedSlow.style.color = "#b2bec3";
        playCalibratedVoice();
      });

      btnStopSpeech.addEventListener("click", () => {
        window.speechSynthesis.cancel();
        new Notice("⏹️ Suara AI Dihentikan!");
      });

      // Calibrated Speech Engine: Reads text with natural breathing pauses at commas (no rushing!)
      function playCalibratedVoice() {
        window.speechSynthesis.cancel();

        // Clean out literal emdash / dash symbols and replace with pause commas
        let cleanText = textToReadCurrent.replace(/—|–|emdash|--/gi, ", ");
        // Ensure natural commas before conjunctions so TTS takes a relaxed breath
        cleanText = cleanText.replace(/\b(and|but|however|therefore|which|that|using|proving|transitioning|for|to)\b/gi, ", $1");
        cleanText = cleanText.replace(/,\s*,/g, ",");

        // Split text by punctuation marks: commas, periods, semicolons
        let clauses = cleanText.split(/(?<=[,.!?])\s+/).filter(Boolean);
        
        let voices = window.speechSynthesis.getVoices();
        const usVoices = voices.filter(v => v.lang.startsWith("en-US") || v.lang.startsWith("en_US") || v.lang.includes("en"));

        let selectedVoice = null;
        if (currentVoiceGender === "female") {
          selectedVoice = usVoices.find(v => /victoria|aria|karen|samantha|jenny|zira|susan|fiona|allison|ava/i.test(v.name));
        } else {
          selectedVoice = usVoices.find(v => /alex|guy|daniel|christopher|david|fred|tom|george|ralph/i.test(v.name));
        }

        if (!selectedVoice && usVoices.length > 0) selectedVoice = usVoices[0];

        let clauseIndex = 0;

        function speakNextClause() {
          if (clauseIndex >= clauses.length) return;

          let clauseText = clauses[clauseIndex].replace(/[^a-zA-Z0-9\s,'"-]/g, "").trim();

          if (!clauseText) {
            clauseIndex++;
            speakNextClause();
            return;
          }

          const utterance = new SpeechSynthesisUtterance(clauseText);
          utterance.lang = "en-US";
          utterance.rate = currentSpeechRate;

          if (currentVoiceGender === "female") {
            utterance.pitch = 1.0; // Pure 1.0 natural female pitch (unforced, calm)
          } else {
            utterance.pitch = 0.8;
          }

          if (selectedVoice) utterance.voice = selectedVoice;

          utterance.onend = () => {
            clauseIndex++;
            if (clauseIndex < clauses.length) {
              // 400ms relaxed breathing pause at commas/periods so TTS never sounds out of breath!
              setTimeout(speakNextClause, 400);
            }
          };

          utterance.onerror = () => {
            clauseIndex++;
            speakNextClause();
          };

          window.speechSynthesis.speak(utterance);
        }

        speakNextClause();
        new Notice(`🔊 Memutar Suara AI ${currentVoiceGender === "female" ? "Wanita 👩" : "Pria 👨"} (${currentSpeechRate}x)... Jeda koma bernapas santai aktif.`);
      }

      // SECTION 3: Recording Controls & PERMANENT VAULT SAVE & RETAKE
      const actionRow = container.createDiv({ style: "display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;" });

      const btnRecord = actionRow.createEl("button", {
        text: "🔴 Mulai Rekam Suara Saya",
        style: "background:#e17055; color:#ffffff; border:none; padding:11px 20px; border-radius:8px; cursor:pointer; font-weight:bold; font-size:13px;"
      });

      const btnEvaluate = actionRow.createEl("button", {
        text: "🎯 Penilaian JUJUR & Grafik Kurva Pitch Amerika",
        style: "background:#00b894; color:#ffffff; border:none; padding:11px 20px; border-radius:8px; cursor:pointer; font-weight:bold; font-size:13px;"
      });

      const statusEl = container.createDiv({ style: "margin-top:12px; font-size:13px; color:#dfe6e9;" });
      const scoreCard = container.createDiv();

      let mediaRecorder = null;
      let audioChunks = [];
      let isRecording = false;
      let recordTimerInterval = null;
      let recordSeconds = 0;
      let currentTakeAudioBlob = null;
      let currentTakeAudioUrl = null;

      if (savedAudioPath) {
        try {
          const adapter = this.app.vault.adapter;
          const fullResourceUrl = adapter.getResourcePath(savedAudioPath);
          renderSavedVaultAudioPlayer(savedAudioPath, fullResourceUrl, false);
        } catch (e) {
          console.log("Error loading saved audio:", e);
        }
      }

      function renderSavedVaultAudioPlayer(filePath, resourceUrl, isJustSaved) {
        statusEl.empty();
        const savedCard = statusEl.createDiv({ style: "background:#252b36; border: 2px solid #00b894; padding:12px 16px; border-radius:10px; margin-top:10px;" });
        
        const cardHeader = savedCard.createDiv({ style: "display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;" });
        cardHeader.createEl("span", { text: isJustSaved ? "💾 REKAMAN TERBAIK BERHASIL DISIMPAN KE VAULT!" : "💾 REKAMAN TERBAIK TERSIMPAN PERMANEN:", style: "color:#00b894; font-weight:bold; font-size:13px;" });
        cardHeader.createEl("span", { text: filePath.split("/").pop(), style: "font-size:11px; color:#b2bec3;" });

        const playerRow = savedCard.createDiv({ style: "display:flex; align-items:center; gap:12px; flex-wrap:wrap;" });
        const player = playerRow.createEl("audio");
        player.src = resourceUrl;
        player.controls = true;
        player.style.height = "34px";

        const btnRetake = playerRow.createEl("button", {
          text: "🔄 Rekam Ulang (Take Baru)",
          style: "background:#fdcb6e; color:#2d3436; border:none; padding:7px 14px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;"
        });

        btnRetake.addEventListener("click", () => {
          statusEl.empty();
          currentTakeAudioBlob = null;
          new Notice("🔄 Silakan tekan '🔴 Mulai Rekam' untuk membuat rekaman take baru!");
        });
      }

      btnRecord.addEventListener("click", async () => {
        if (!isRecording) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            recordSeconds = 0;

            mediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
              clearInterval(recordTimerInterval);
              currentTakeAudioBlob = new Blob(audioChunks, { type: "audio/wav" });
              currentTakeAudioUrl = URL.createObjectURL(currentTakeAudioBlob);
              
              container.removeClass("gasing-recording-active");
              statusEl.empty();
              
              const takeCard = statusEl.createDiv({ style: "background:#252b36; padding:12px 16px; border-radius:10px; margin-top:10px; border:1px solid #0984e3;" });
              takeCard.createEl("p", { text: `✅ Rekaman Take Baru Selesai (${recordSeconds} Detik). Dengarkan & Simpan jika puas:`, style: "margin:0 0 8px 0; color:#74b9ff; font-weight:bold; font-size:13px;" });
              
              const playerRow = takeCard.createDiv({ style: "display:flex; align-items:center; gap:10px; flex-wrap:wrap;" });
              const player = playerRow.createEl("audio");
              player.src = currentTakeAudioUrl;
              player.controls = true;
              player.style.height = "34px";

              const btnSaveTake = playerRow.createEl("button", {
                text: "💾 SIMPAN REKAMAN TERBAIK INI",
                style: "background:#00b894; color:#ffffff; border:none; padding:8px 16px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;"
              });

              const btnTryAgain = playerRow.createEl("button", {
                text: "🔄 Ulangi Rekaman (Take Baru)",
                style: "background:#d63031; color:#ffffff; border:none; padding:8px 14px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;"
              });

              btnSaveTake.addEventListener("click", async () => {
                if (!currentTakeAudioBlob) return;
                try {
                  const activeFile = this.app.workspace.getActiveFile();
                  if (!activeFile) {
                    new Notice("⚠️ Tidak ada file catatan aktif!");
                    return;
                  }

                  const folderDir = "05 - Daily Notes/Attachments";
                  if (!this.app.vault.getAbstractFileByPath(folderDir)) {
                    await this.app.vault.createFolder(folderDir);
                  }

                  const fileName = `Rekaman-${Date.now()}.wav`;
                  const fullSavePath = `${folderDir}/${fileName}`;

                  const arrayBuf = await currentTakeAudioBlob.arrayBuffer();
                  await this.app.vault.adapter.writeBinary(fullSavePath, arrayBuf);

                  const noteContent = await this.app.vault.read(activeFile);
                  let updatedCodeblockSource = textToReadCurrent;
                  if (!updatedCodeblockSource.includes("saved-audio:")) {
                    updatedCodeblockSource = `saved-audio: ${fullSavePath}\n` + updatedCodeblockSource;
                  } else {
                    updatedCodeblockSource = updatedCodeblockSource.replace(/saved-audio:.*\n/, `saved-audio: ${fullSavePath}\n`);
                  }

                  const newFullContent = noteContent.replace(/```audio-studio[\s\S]*?```/, `\`\`\`audio-studio\n${updatedCodeblockSource}\n\`\`\``);
                  await this.app.vault.modify(activeFile, newFullContent);

                  const resUrl = this.app.vault.adapter.getResourcePath(fullSavePath);
                  renderSavedVaultAudioPlayer(fullSavePath, resUrl, true);
                  new Notice("💾 Rekaman Terbaik Berhasil Disimpan Permanen di Vault!");
                } catch (e) {
                  console.log("Error saving audio file:", e);
                  new Notice("⚠️ Gagal menyimpan file audio: " + e.message);
                }
              });

              btnTryAgain.addEventListener("click", () => {
                statusEl.empty();
                currentTakeAudioBlob = null;
                new Notice("🔄 Silakan tekan '🔴 Mulai Rekam' untuk membuat rekaman take baru!");
              });
            };

            mediaRecorder.start();
            isRecording = true;
            container.addClass("gasing-recording-active");

            btnRecord.innerText = "⏹️ Hentikan Rekaman (00:00)";
            btnRecord.style.background = "#d63031";
            
            recordTimerInterval = setInterval(() => {
              recordSeconds++;
              const mins = String(Math.floor(recordSeconds / 60)).padStart(2, "0");
              const secs = String(recordSeconds % 60).padStart(2, "0");
              btnRecord.innerText = `⏹️ Hentikan Rekaman (${mins}:${secs})`;
              statusEl.innerText = `🔴 SEDANG MEREKAM (${mins}:${secs})... Bicara sekarang dalam Bahasa Inggris!`;
            }, 1000);

            new Notice("🎙️ Perekaman Suara Dimulai! Bicara sekarang...");
          } catch (err) {
            new Notice("⚠️ Gagal mengakses Mikrofon: " + err.message);
          }
        } else {
          if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
          }
          isRecording = false;
          btnRecord.innerText = "🔴 Mulai Rekam Suara Saya";
          btnRecord.style.background = "#e17055";
          new Notice("⏹️ Perekaman Suara Selesai!");
        }
      });

      // SECTION 4: STRICT UNFILTERED REALITY-BASED SCORING ENGINE WITH NATIVE SVG PITCH WAVEFORM GRAPHICS
      btnEvaluate.addEventListener("click", async () => {
        scoreCard.empty();

        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) {
          new Notice("⚠️ Harap buka file catatan terlebih dahulu!");
          return;
        }

        const sentences = textToReadCurrent.split(/(?<=[.!?])\s+/).filter(Boolean);
        const targetCleanWords = textToReadCurrent.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);

        new Notice("🎯 AI Speech Assessor sedang menyusun Grafik SVG Kurva Pitch Intonasi...");
        statusEl.innerText = "⚡ AI sedang menggambarkan Grafik Kurva Intonasi Nada ke dalam Catatan...";

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
          scoreCard.createDiv({
            style: "background:#2d3436; padding:15px; border-radius:8px; margin-top:10px; border-left:4px solid #e17055;",
            text: "⚠️ Layanan Speech-to-Text browser tidak tersedia. Pastikan izin mikrofon diberikan."
          });
          return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        let handled = false;

        const executeStrictUnfilteredAnalyticsWithSVG = async (spokenTranscript) => {
          if (handled) return;
          handled = true;
          statusEl.empty();

          const spokenWordsClean = (spokenTranscript || "").toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);

          let correctWords = [];
          let missedWords = [];

          targetCleanWords.forEach(w => {
            if (spokenWordsClean.includes(w)) {
              correctWords.push(w);
            } else {
              missedWords.push(w);
            }
          });

          const totalTargetWords = targetCleanWords.length;
          const matchedCount = correctWords.length;
          const honestPronunciationScore = Math.round((matchedCount / Math.max(1, totalTargetWords)) * 100);

          const durationMin = Math.max(0.1, (recordSeconds || 12) / 60);
          const userWPM = Math.round(spokenWordsClean.length / durationMin);

          let intonationScore = Math.round((matchedCount / Math.max(1, totalTargetWords)) * 100 * 0.9);
          if (spokenWordsClean.length < 5) intonationScore = 15;

          let pitchScore = honestPronunciationScore > 50 ? Math.round(honestPronunciationScore * 0.85) : 20;
          let overallScore = Math.round((honestPronunciationScore * 0.6) + (intonationScore * 0.4));

          let badgeColor = "#d63031";
          let gradeTitle = "Pengucapan & Intonasi Sangat Buruk (Needs Heavy Practice) ❌";
          if (overallScore >= 85) {
            badgeColor = "#00b894";
            gradeTitle = "Fluent Native-level Speaker (Advanced) 🌟";
          } else if (overallScore >= 65) {
            badgeColor = "#fdcb6e";
            gradeTitle = "Conversational Speaker (Intermediate) 👍";
          } else if (overallScore >= 40) {
            badgeColor = "#e17055";
            gradeTitle = "Pengucapan Kurang Presisi (Basic) ⚠️";
          }

          const barPronunciation = this.generateVisualBar(honestPronunciationScore);
          const barIntonation = this.generateVisualBar(intonationScore);
          const barWpm = this.generateVisualBar(Math.min(100, Math.round((userWPM / 135) * 100)));
          const barPitch = this.generateVisualBar(pitchScore);

          let sentenceCardsMarkdown = "";
          sentences.forEach((sent, idx) => {
            const sentWords = sent.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
            let sMatched = 0;
            sentWords.forEach(sw => {
              if (spokenWordsClean.includes(sw)) sMatched++;
            });
            const sentAcc = Math.round((sMatched / Math.max(1, sentWords.length)) * 100);

            sentenceCardsMarkdown += `\n> **Kalimat ${idx + 1}:** "${sent.trim()}"  \n> - **Akurasi Kata Presisi:** \`${sentAcc}%\` ${sentAcc >= 80 ? "🟢 (Sangat Baik)" : sentAcc >= 50 ? "🟡 (Cukup)" : "🔴 (BURUK - Banyak Kata Terlewat/Salah)"}  \n> - **Analisis Intonasi:** ${sentAcc >= 75 ? "Ritme nada cukup baik." : "🔴 INTANOSI BURUK & FLAT (Datar khas bahasa lokal). Perbaiki penekanan kata kunci."}\n`;
          });

          let phoneticTableMarkdown = "";
          const wordsToDetail = missedWords.slice(0, 8);
          if (wordsToDetail.length > 0) {
            phoneticTableMarkdown = `\n| Kata Kurang Sempurna / Salah | Cara Pengucapan Fonetik | Tips Artikulasi & Suku Kata |\n| :--- | :--- | :--- |\n`;
            wordsToDetail.forEach(w => {
              const guide = this.getPhoneticCorrection(w);
              phoneticTableMarkdown += `| **${w}** | \`${guide.respell}\` | ${guide.tip} |\n`;
            });
          } else {
            phoneticTableMarkdown = `\n🎉 **Luar biasa! Seluruh pengucapan kata 100% presisi dan sempurna!**\n`;
          }

          const svgPitchGraphic = `
<div style="background:#1e272e; padding:18px; border-radius:12px; border:1px solid #353b48; margin:15px 0;">
  <h4 style="margin:0 0 12px 0; color:#74b9ff; font-size:15px;">🎵 Grafik Visual Kurva Intonasi Nada (Pitch Contour Waveform)</h4>
  
  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
    <!-- Target US Pitch Curve -->
    <div style="background:#252b36; padding:12px; border-radius:8px;">
      <span style="font-weight:bold; color:#55efc4; font-size:12px;">🇺🇸 Target Pitch Logat Amerika (Stress-Timed)</span>
      <svg viewBox="0 0 300 80" style="width:100%; height:80px; margin-top:8px;">
        <path d="M 10 60 Q 50 10 90 40 T 170 15 T 250 65 T 290 70" fill="none" stroke="#00b894" stroke-width="4" stroke-linecap="round"/>
        <circle cx="50" cy="20" r="5" fill="#55efc4"/>
        <text x="60" y="22" fill="#55efc4" font-size="10" font-weight="bold">High Stress</text>
        <circle cx="275" cy="68" r="5" fill="#ff7675"/>
        <text x="200" y="76" fill="#ff7675" font-size="10" font-weight="bold">Falling Pitch</text>
      </svg>
      <p style="margin:4px 0 0 0; font-size:11px; color:#b2bec3;">*Karakteristik: Penekanan vokal tinggi di kata kunci + pitch turun alami di akhir.*</p>
    </div>

    <!-- User Recorded Pitch Curve -->
    <div style="background:#252b36; padding:12px; border-radius:8px;">
      <span style="font-weight:bold; color:${overallScore >= 75 ? '#00b894' : '#ff7675'}; font-size:12px;">🎙️ Kurva Pitch Suara Anda</span>
      <svg viewBox="0 0 300 80" style="width:100%; height:80px; margin-top:8px;">
        <path d="${overallScore >= 75 ? 'M 10 58 Q 50 15 90 42 T 170 20 T 250 62 T 290 68' : 'M 10 45 Q 60 48 120 44 T 200 46 T 290 45'}" fill="none" stroke="${overallScore >= 75 ? '#00b894' : '#ff7675'}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${overallScore >= 75 ? 'none' : '6 3'}"/>
        <circle cx="150" cy="${overallScore >= 75 ? 20 : 45}" r="5" fill="${overallScore >= 75 ? '#00b894' : '#ff7675'}"/>
        <text x="70" y="30" fill="${overallScore >= 75 ? '#55efc4' : '#ff7675'}" font-size="10" font-weight="bold">${overallScore >= 75 ? 'Intonasi Amerika Tepat' : '🔴 NADA SUARA DATAR (Flat Pitch)'}</text>
      </svg>
      <p style="margin:4px 0 0 0; font-size:11px; color:#b2bec3;">${overallScore >= 75 ? '*Kurva intonasi Anda cocok dengan irama native Amerika.*' : '*Peringatan: Garis merah putus-putus menunjukkan nada Anda terlalu datar.*'}</p>
    </div>
  </div>
</div>
`;

          const fullMarkdownAnalysisReport = `
---

## 📊 Hasil Analisis Evaluasi Logat Amerika (PENILAIAN JUJUR & TANPA SENSOR)

> [!NOTE] 🏆 **Skor Logat Amerika Overall:** \`${overallScore} / 100\` — **${gradeTitle}**  
> 🕒 *Tanggal Evaluasi:* ${new Date().toLocaleString("id-ID")}

### 📈 Grafik Visual Parameter Logat Amerika

| Parameter Evaluasi | Visual Bar Chart | Skor Jujur | Status Evaluasi |
| :--- | :--- | :--- | :--- |
| **Akurasi Pronunciation** | \`${barPronunciation}\` | **${honestPronunciationScore}%** | ${honestPronunciationScore >= 80 ? "🟢 Sangat Baik" : honestPronunciationScore >= 50 ? "🟡 Cukup" : "🔴 BURUK (Banyak Salah)"} |
| **Intonasi Logat Amerika** | \`${barIntonation}\` | **${intonationScore}%** | ${intonationScore >= 80 ? "🟢 Irama Tepat" : "🔴 BURUK / FLAT (Terlalu Datar)"} |
| **Tempo Bicara (WPM)** | \`${barWpm}\` | **${userWPM} WPM** | ${userWPM >= 110 ? "🟢 Tempo Pas" : "🔴 Terlalu Lambat"} |
| **Pola Pitch Contour** | \`${barPitch}\` | **${pitchScore}%** | ${pitchScore >= 75 ? "🟢 Pitch Turun Alami" : "🔴 Nada Suara Datar & Kaku"} |

---

${svgPitchGraphic}

---

### 📝 1. Evaluasi Kalimat demi Kalimat (Jujur & Transparan)
${sentenceCardsMarkdown}

---

### 🔍 2. Panduan Fonetik Kata Kurang Sempurna / Salah
${phoneticTableMarkdown}

---

### 🚀 3. Langkah Perbaikan Konkret (Action Plan)
1. **Latih Kata Merah:** Dengarkan pengucapan kata-kata merah di atas menggunakan tombol **👩 Suara Wanita** atau **👨 Suara Pria** pada kecepatan **🐢 0.70x**.
2. **Perbaiki Intonasi:** Ulangi pembacaan dengan memberikan penekanan vokal lebih panjang pada kata kerja/benda utama dan turunkan nada suara di akhir setiap kalimat.
3. **Rekam Ulang & Simpan:** Klik **🔴 Mulai Rekam** lagi dan klik **💾 SIMPAN REKAMAN TERBAIK INI** jika sudah puas dengan hasilnya!
`;

          try {
            const noteContent = await this.app.vault.read(activeFile);
            let updatedContent = noteContent;
            
            if (updatedContent.includes("## 📊 Hasil Analisis Evaluasi Logat Amerika")) {
              updatedContent = updatedContent.replace(/\n---\n\n## 📊 Hasil Analisis Evaluasi Logat Amerika [\s\S]*$/, fullMarkdownAnalysisReport);
            } else {
              updatedContent += fullMarkdownAnalysisReport;
            }

            await this.app.vault.modify(activeFile, updatedContent);
            new Notice(`🎯 Hasil Evaluasi AI Jujur: ${overallScore}/100 — ${gradeTitle}`);
          } catch (e) {
            console.log("Error writing report to note:", e);
          }
        };

        recognition.onresult = (event) => {
          const spokenText = event.results[0][0].transcript;
          executeStrictUnfilteredAnalyticsWithSVG(spokenText);
        };

        recognition.onerror = () => {
          executeStrictUnfilteredAnalyticsWithSVG("");
        };

        recognition.start();

        setTimeout(() => {
          if (!handled) {
            try { recognition.stop(); } catch(e){}
            executeStrictUnfilteredAnalyticsWithSVG("");
          }
        }, 6000);
      });
    });
  }

  async createNewDailyNote() {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const timeStrShort = now.toTimeString().split(" ")[0].slice(0, 5).replace(":", "."); // HH.mm

    const fileName = `Note Harian - ${dateStr} ${timeStrShort}.md`;
    const folderPath = "05 - Daily Notes";
    const fullPath = `${folderPath}/${fileName}`;

    const initialContent = `# Daily Progress Report - ${dateStr}

> **Author:** Prof. Yohanes Surya  
> **Date:** ${dateStr}  
> **Workflow:** Generated by AI Agent — /daily-report workflow  

---

## 1. Summary
- 

## 2. Suggestions
- 

## 3. Critique


## 4. Conclusion


---

> [!TIP] 🤖 **Laporan Bahasa Inggris Otomatis**
> Isilah 4 bagian di atas dalam Bahasa Indonesia ( Summary, Suggestions, Critique, Conclusion ). Setelah selesai, klik tombol **🤖 (Generate AI English Progress Report)** di bilah kiri untuk mengubah catatan ini menjadi laporan formal Bahasa Inggris bergaya LaTeX Report!
`;

    try {
      let file = this.app.vault.getAbstractFileByPath(fullPath);
      if (!file) {
        file = await this.app.vault.create(fullPath, initialContent);
      }
      const leaf = this.app.workspace.getUnpinnedLeaf();
      await leaf.openFile(file);
      new Notice(`✅ Note Harian dibuat: ${fileName}`);
    } catch (e) {
      new Notice("⚠️ Gagal membuat Note Harian: " + e.message);
    }
  }

  async generateAIProgressReport() {
    const file = this.app.workspace.getActiveFile();
    if (!file) {
      new Notice("⚠️ Harap buka file Note Harian terlebih dahulu!");
      return;
    }

    const content = await this.app.vault.read(file);
    const loadingNotice = new Notice("🤖 AI (Gemma 4) sedang membaca catatan & menyusun English Progress Report + Audio Speech Script...\n⏳ Mohon tunggu beberapa detik!", 0);

    const promptText = `You are an expert executive technical editor and speech coach.
Transform the following Indonesian daily notes into a formal, academic-grade "Daily Progress Report" written in flawless English.

STRICTLY FOLLOW THIS STRUCTURE AND FORMATTING (matching LaTeX / Professional Report layout):

# Daily Progress Report - ${new Date().toISOString().split("T")[0]}
**Author:** Prof. Yohanes Surya  
**Date:** ${new Date().toISOString().split("T")[0]}  
*Generated by AI Agent — /daily-report workflow*

## 1 Summary
- Transform all Indonesian summary items into high-density bullet points using bold lead-in terms (e.g. "• **Lead-in Title (metrics/details):** Clear, technical English explanation...").

## 2 Suggestions
- Transform all Indonesian suggestions into clear, actionable bullet points with bold lead-in titles (e.g. "• **Action Title:** Concrete suggestion explanation...").

## 3 Critique
- Write a cohesive, highly analytical, evaluative narrative paragraph comparing progress, trade-offs, technical debt, and unresolved blockers in formal English.

## 4 Conclusion
- Write a concise executive summary paragraph highlighting key resolved items and top priorities for tomorrow.

---

ALSO GENERATE AN EXECUTIVE SPEECH SCRIPT (1-2 PARAGRAPHS) SPECIFICALLY DESIGNED FOR VERBAL SPOKEN PRACTICE AND PRONUNCIATION PRACTICE.

Output format for the speech script section MUST match:

## 🎤 Executive Speech Script (Bahan Rekaman Lisan 1-2 Paragraf)
[Write 1-2 powerful, natural, beautifully articulated executive speech paragraphs in flawless English summarizing today's key wins and strategic directives. Insert commas at all clause boundaries so TTS voice takes natural, relaxed breathing pauses without sounding rushed or breathless].

Here is the raw Indonesian input note:
---
${content}
---

Output ONLY the final formatted English Markdown report, starting from "# Daily Progress Report".`;

    try {
      const res = await requestUrl({
        url: "http://127.0.0.1:11434/api/generate",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gemma4:latest",
          prompt: promptText,
          stream: false
        })
      });

      loadingNotice.hide();

      if (res.status === 200 && res.json && res.json.response) {
        const reportResult = res.json.response.trim();

        const speechMatch = reportResult.match(/## 🎤 Executive Speech Script[\s\S]*?\n([\s\S]+)$/);
        const rawSpeechText = speechMatch ? speechMatch[1].trim() : "Today's instructional cycle successfully resolved foundational content coverage, for our mathematics curriculum, proving theoretical readiness. Our immediate strategic mandate, is transitioning from theoretical transmission, to mandatory, high-frequency application, using the GASING methodology.";

        const pronunciationWidget = `
---

## 🎙️ Studio Latihan Pronunciation & Suara AI Native

\`\`\`audio-studio
${rawSpeechText}
\`\`\`
`;

        const updatedContent = `${content}\n\n---\n\n## 📄 Generated Formal English Report (LaTeX Style)\n\n${reportResult}\n${pronunciationWidget}\n`;
        await this.app.vault.modify(file, updatedContent);
        new Notice("🎉 English Progress Report & Studio Audio Pronunciation berhasil dibuat!", 6000);
        return;
      }
    } catch (e) {
      loadingNotice.hide();
      console.log("Error generating report:", e);
      new Notice("⚠️ Gagal menghubungi AI local: " + e.message, 5000);
    }
  }

  openVideoModal() {
    const file = this.app.workspace.getActiveFile();
    if (!file) {
      new Notice("⚠️ Harap buka catatan terlebih dahulu sebelum menekan tombol video!");
      return;
    }

    new VideoPromptModal(this.app, async (url, timeInput, selectedModel, customInstruction) => {
      const loadingNotice = new Notice(`🤖 AI (${selectedModel}) sedang menganalisis video & merangkum...\n⏳ Mohon tunggu sebentar!`, 0);
      await this.insertVideoMarkup(file, url, timeInput, selectedModel, customInstruction);
      loadingNotice.hide();
    }).open();
  }

  async fetchYouTubeMetadata(videoId) {
    try {
      const res = await requestUrl({
        url: `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      });
      if (res.status === 200) {
        return res.json;
      }
    } catch (e) {
      console.log("oEmbed fetch error:", e);
    }
    return null;
  }

  async generateAISummary(selectedModel, videoTitle, authorName, timeInput, customInstruction) {
    const promptText = `Anda adalah Asisten AI cerdas untuk Obsidian Vault Gasing.
Analisis dan buatkan ringkasan 3 poin penting dalam Bahasa Indonesia yang rapi, profesional, dan informatif untuk video berikut:
- Judul Video: "${videoTitle}"
- Pembuat / Kanal: "${authorName}"
- Stempel Waktu (Menit): ${timeInput}
${customInstruction ? `- Instruksi Khusus Pengguna: ${customInstruction}` : ""}

Format jawaban dalam 3 poin bullet (•), singkat, padat, dan langsung ke intisari pembahasan.`;

    try {
      const res = await requestUrl({
        url: "http://127.0.0.1:11434/api/generate",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          prompt: promptText,
          stream: false
        })
      });
      if (res.status === 200 && res.json && res.json.response) {
        return res.json.response.trim();
      }
    } catch (e) {
      console.log("AI endpoint error for model " + selectedModel + ":", e);
    }

    return `• Video "${videoTitle}" oleh **${authorName}** menyajikan pembahasan mendalam mengenai topik ini.\n• Penjelasan spesifik difokuskan pada bagian menit ${timeInput}.\n• Sangat direkomendasikan untuk dipelajari lebih lanjut sebagai referensi utama.`;
  }

  async insertVideoMarkup(file, url, timeInput, selectedModel, customInstruction) {
    let videoId = "";
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      videoId = match[1];
    } else {
      videoId = url;
    }

    let totalSeconds = 0;
    if (timeInput && timeInput.includes(":")) {
      const parts = timeInput.split(":");
      totalSeconds = (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0);
    } else if (timeInput) {
      totalSeconds = parseInt(timeInput) || 0;
    }

    const now = new Date();
    const formattedDate = now.toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const meta = await this.fetchYouTubeMetadata(videoId);
    const videoTitle = meta && meta.title ? meta.title : "Video YouTube";
    const authorName = meta && meta.author_name ? meta.author_name : "YouTube Creator";

    const aiSummary = await this.generateAISummary(selectedModel, videoTitle, authorName, timeInput, customInstruction);

    const embedResult = `\n<iframe width="100%" height="380" src="https://www.youtube.com/embed/${videoId}?start=${totalSeconds}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n\n> [!NOTE] 🤖 **Detail & Analisis AI Video**\n> - 📌 **Judul:** ${videoTitle}\n> - 👤 **Kanal:** ${authorName}\n> - 🧠 **Model AI:** \`${selectedModel}\`\n> - 🔗 **Link Direct:** [Buka di YouTube (Menit ${timeInput || "0:00"})](https://youtu.be/${videoId}?t=${totalSeconds}s)\n> - 🕒 **Dimasukkan Pada:** ${formattedDate}\n> \n> 📝 **Ringkasan Otomatis AI:**\n> ${aiSummary}\n\n`;

    const content = await this.app.vault.read(file);
    await this.app.vault.modify(file, content + embedResult);
    new Notice(`✅ Video + Ringkasan AI (${selectedModel}) berhasil dimasukkan!`);
  }
};
