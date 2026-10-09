### Daftar Lengkap 21 Games Asyiknya Bermain di Zona 4 dengan

Level 1: Misteri Kuil Nalanda Materi yang dikuasai : konsep konkret pengurangan

Level 2:

Surat Rahasia Maharashtra : mencongak 9 kurang seperti 9-1, 9-2, 9-3 dst

Sandi Tulang Gua Maharashtra: mencongak  8 kurang seperti 8-1, 8-2, 8-3 dst

Bola Meriam Kuil Nalanda: mencongak 7 kurang dan 6 kurang seperti 7-1, 6-3 dst

Telur Emas Kuil Nalanda : mencongak pengurangan bilangan 1 digit seperti 9-5, 8-4, 7-2, 6-5 dst

Selendang Sutra Pasar Nalanda : materi  10 kurang menggunakan pasangan 10.

Perangkap Telur Mutant: mencongak 10 kurang seperti 10-3, 10-5,  

Cermin Sinar Matahari : materi campuran pengurangan yang hasilnya 1 digit termasuk 10-2, 9-4, 8-3 dst.

Tantangan Desa Maharashtra : mencongak cepat Pengurangan di bawah 10

Level 3:

Bowling Kuno India | 2 Digit $-$ 1 Digit (Puluhan $<5$, Satuan bisa dikurangi)

Pasar Malam India Kuno | 2 Digit $-$ 1 Digit (Puluhan $>5$, Satuan bisa dikurangi) |

Memanah Guci Kerajaan | Puluhan Bulat $-$ 1 Digit (misal $20-7, 80-9$) |

| Rahasia Gua Gelap | 2 Digit $-$ 1 Digit (Satuan tidak bisa dikurangi / Meminjam) |

Level 4:

Bowling Menara Qutub | 2 Digit $-$ 2 Digit (Puluhan $<5$, Satuan bisa dikurangi)

| Tantangan Menara Qutub | 2 Digit $-$ 2 Digit (Puluhan besar, Satuan bisa dikurangi) |

Memanah Labu Qutub Minar | Puluhan Bulat $-$ Sebarang 2 Digit (misal $50-34, 80-28$) |

| Puncak Menara Qutub | 2 Digit $-$ 2 Digit (Satuan tidak bisa dikurangi / Meminjam) |

Level 5:

Tantangan Savana Liar : Pengurangan 3 Digit dengan 1 digit, 2 digit dan 3 digit (ditaruh diurutan 1 sebelum perburuan kadal savana)

Perburuan Kadal Savana : Pengurangan Bilangan 3 Digit acak.

Level 6:  
  

 Rahasia Perpustakaan Taj Mahal : Pengurangan 4 Digit & 5 Digit  (diletakan diurutan 1)

Teka-Teki Silang Papirus Kuno :  materi campuran Pengurangan & Penjumlahan 4 Digit

Dengan pemetaan ini kita bisa buat laporan lengkap siswa untuk pengurangan dalam bentuk

1.        Grafik yang menjelaskan kenaikan kemampuan anak

2.        Penjelasan kekuatan dan kelemahan dia dalam tiap subyek

3.        Daerah dimana ia harus memperbaiki diri (bisa pakai grafik juga).

Yang perlu diedit

Level 6

Rahasia Perpustakaan Taj Mahal : Pengurangan 4 Digit (diletakan diurutan 1) jumlah soal dibuat 15 soal (masing-masing 5 soal pengurangan 1 digit, 2 digit dan 3 digit)

Teka-Teki Silang Papirus Kuno :  materi campuran Pengurangan & Penjumlahan 4 Digit

Level 5

Tantangan Savana Liar : Pengurangan 3 Digit (ditaruh diurutan 1 sebelum perburuan kadal savana). Dibuat 15 soal, masing-masing 5 soal untuk pengurangan 1 digit, 2 digit dan 3 digit. Tombol berpindah otomatis setelah yang satu selesai. Bagaimana baiknya.

Perburuan Kadal Savana : Pengurangan Bilangan 3 Digit acak.

Urutan:

Surat Rahasia Maharashtra : mencongak 9 kurang seperti 9-1, 9-2, 9-3 dst

Sandi Tulang Gua Maharashtra: mencongak  8 kurang seperti 8-1, 8-2, 8-3 dst

Bola Meriam Kuil Nalanda: mencongak 7 kurang dan 6 kurang seperti 7-1, 6-3 dst

Telur Emas Kuil Nalanda : mencongak pengurangan bilangan 1 digit seperti 9-5, 8-4, 7-2, 6-5 dst

Selendang Sutra Pasar Nalanda : materi  10 kurang menggunakan pasangan 10.

Perangkap Telur Mutant: mencongak 10 kurang seperti 10-3, 10-5,  

Cermin Sinar Matahari : materi campuran pengurangan yang hasilnya 1 digit termasuk 10-2, 9-4, 8-3 dst.

Tantangan Desa Maharashtra : mencongak cepat Pengurangan di bawah 10

Listed directory AnalisaHasil

Viewed PERENCANAAN_SISTEM_LAPORAN_PENGURANGAN.md:1-100

Searched for "perkalian"

Searched for "zone: 3,"

Viewed unifiedGameRegistry.ts:1-60

Searched for ""3": {"

Listed directory games

Ran command: `find web/src/games/Zone3Level* -type f | sort`

Ran command: `find web/src/games/Zone3Level* -name "*Bermain*.astro" | sort`

Listed directory zone3

Ran command: `find web/src/pages/zone3 -type f | sort`

Viewed index.astro:1-51

Viewed SB1Bermain1.astro:1-80

Viewed games-config.json:3365-3430

Ran command: `node -e '

const fs = require("fs");

const cfg = JSON.parse(fs.readFileSync("web/src/data/games-config.json", "utf8"));

for (let l = 1; l <= 6; l++) {

  const key = "z3l" + l;

  const levelData = cfg[key];

  if (!levelData) {

    console.log("No data for", key);

    continue;

  }

  console.log(`=== LEVEL ${l}: ${levelData.zoneTitle || ""} (Topic: ${levelData.zoneTopic || ""}) ===`);

  if (levelData.activities) {

    levelData.activities.forEach(act => {

      console.log(`  [${act.engineType}] ${act.sectionKey || ""} | ${act.gameKey || ""} | ${act.displayName || ""}`);

    });

  }

}

'`

Ran command: `node -e '

const fs = require("fs");

const content = fs.readFileSync("web/src/data/unifiedGameRegistry.ts", "utf8");

// Extract zone 3

const z3Match = content.match(/"3":\s*\{[\s\S]*?\n  \},?\n  "4":/);

if (z3Match) {

  console.log("Matched zone 3 length:", z3Match[0].length);

  // parse JSON

  const z3JsonStr = z3Match[0].replace(/,?\n  "4":$/, "");

  const z3 = JSON.parse("{" + z3JsonStr.trim() + "}")["3"];

  console.log("Zone Title:", z3.zoneTitle);

  console.log("Chapters count:", z3.chapters?.length);

  z3.chapters?.forEach(ch => {

    console.log(`\nChapter ${ch.chapterNumber}: ${ch.name} (id: ${ch.chapterId})`);

    ch.innerLevels?.forEach(lvl => {

      console.log(`  InnerLevel ${lvl.levelNumber}: ${lvl.name}`);

      lvl.games?.forEach(g => {

        if (g.engineType === "bermain") {

          console.log(`    [BERMAIN] id: ${g.gameId || g.gameKey} | name: ${g.displayName}`);

        }

      });

    });

  });

} else {

  console.log("Could not slice zone 3 cleanly, testing alternative regex");

}

'`

Ran command: `node -e '

const fs = require("fs");

const path = require("path");

const levels = [1, 2, 3, 4, 5, 6];

levels.forEach(lvl => {

  const dir = `web/src/games/Zone3Level${lvl}`;

  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter(f => f.includes("Bermain") && f.endsWith(".astro")).sort();

  console.log(`\n========================================`);

  console.log(`LEVEL ${lvl} (${files.length} Games)`);

  console.log(`========================================`);

  files.forEach(f => {

    const fullPath = path.join(dir, f);

    const content = fs.readFileSync(fullPath, "utf8");

    // Extract JSDoc / header comment

    const commentMatch = content.match(/\/\*\*([\s\S]*?)\*\//);

    const comment = commentMatch ? commentMatch[1].replace(/\n\s*\*\s*/g, "\n").trim() : "";

    // Extract BermainEngine attributes

    const gameIdMatch = content.match(/gameId="([^"]+)"/);

    const titleMatch = content.match(/instructionTitle="([^"]+)"/);

    const textMatch = content.match(/instructionText="([^"]+)"/);

    const roundsMatch = content.match(/totalRounds=\{?([0-9]+)\}?/);

    const variantMatch = content.match(/variant="([^"]+)"/);

    console.log(`\n--- [${f}] ---`);

    console.log(`  gameId: ${gameIdMatch ? gameIdMatch[1] : "N/A"}`);

    console.log(`  Title: ${titleMatch ? titleMatch[1] : "N/A"}`);

    console.log(`  Instruction: ${textMatch ? textMatch[1] : "N/A"}`);

    console.log(`  Rounds: ${roundsMatch ? roundsMatch[1] : "N/A"} | Variant: ${variantMatch ? variantMatch[1] : "N/A"}`);

    if (comment) {

      const firstLines = comment.split("\n").slice(0, 8).join(" | ");

      console.log(`  Header Doc: ${firstLines}`);

    }

  });

});

'`

Ran command: `node -e '

const fs = require("fs");

const path = require("path");

const dir = "web/src/games/Zone3Level2";

const files = fs.readdirSync(dir).filter(f => f.includes("Bermain") && f.endsWith(".astro")).sort();

files.forEach(f => {

  const fullPath = path.join(dir, f);

  const content = fs.readFileSync(fullPath, "utf8");

  const gameIdMatch = content.match(/gameId="([^"]+)"/);

  const titleMatch = content.match(/instructionTitle="([^"]+)"/);

  const textMatch = content.match(/instructionText="([^"]+)"/);

  const roundsMatch = content.match(/totalRounds=\{?([0-9]+)\}?/);

  const commentMatch = content.match(/\/\*\*([\s\S]*?)\*\//);

  let summary = "";

  if (commentMatch) {

    const lines = commentMatch[1].split("\n").map(l => l.replace(/^\s*\*\s?/, "").trim()).filter(Boolean);

    summary = lines.slice(0, 4).join(" | ");

  }

  console.log(`[${f}] id: ${gameIdMatch ? gameIdMatch[1] : "N/A"} | title: "${titleMatch ? titleMatch[1] : "N/A"}" | rounds: ${roundsMatch ? roundsMatch[1] : "N/A"}`);

  console.log(`   Desc: ${summary}`);

  console.log(`   Instruction: ${textMatch ? textMatch[1] : "N/A"}\n`);

});

'`

Ran command: `node -e '

const fs = require("fs");

const path = require("path");

const dir = "web/src/games/Zone3Level2";

const files = ["SB1Bermain1.astro", "SB2Bermain1.astro", "SB3Bermain1.astro", "SB3Bermain2.astro", "SB4Bermain1.astro", "SB4Bermain2.astro", "SB5Bermain1.astro", "SB5Bermain2.astro", "SB5Bermain3.astro", "SB6Bermain1.astro", "SB6Bermain2.astro"];

files.forEach(f => {

  const fullPath = path.join(dir, f);

  if (!fs.existsSync(fullPath)) return;

  const content = fs.readFileSync(fullPath, "utf8");

  const gameIdMatch = content.match(/gameId="([^"]+)"/);

  const titleMatch = content.match(/instructionTitle="([^"]+)"/);

  const textMatch = content.match(/instructionText="([^"]+)"/);

  const roundsMatch = content.match(/totalRounds=\{?([0-9]+)\}?/);

  const commentMatch = content.match(/\/\*\*([\s\S]*?)\*\//);

  let summary = "";

  if (commentMatch) {

    const lines = commentMatch[1].split("\n").map(l => l.replace(/^\s*\*\s?/, "").trim()).filter(Boolean);

    summary = lines.slice(0, 4).join(" | ");

  }

  console.log(`[${f}] id: ${gameIdMatch ? gameIdMatch[1] : "N/A"} | title: "${titleMatch ? titleMatch[1] : "N/A"}" | rounds: ${roundsMatch ? roundsMatch[1] : "N/A"}`);

  console.log(`   Desc: ${summary}`);

  console.log(`   Instruction: ${textMatch ? textMatch[1] : "N/A"}\n`);

});

'`

Ran command: `node -e '

const fs = require("fs");

const path = require("path");

const dir = "web/src/games/Zone3Level3";

const files = fs.readdirSync(dir).filter(f => f.includes("Bermain") && f.endsWith(".astro")).sort();

files.forEach(f => {

  const fullPath = path.join(dir, f);

  const content = fs.readFileSync(fullPath, "utf8");

  const gameIdMatch = content.match(/gameId="([^"]+)"/);

  const titleMatch = content.match(/instructionTitle="([^"]+)"/);

  const textMatch = content.match(/instructionText="([^"]+)"/);

  const roundsMatch = content.match(/totalRounds=\{?([0-9]+)\}?/);

  const commentMatch = content.match(/\/\*\*([\s\S]*?)\*\//);

  let summary = "";

  if (commentMatch) {

    const lines = commentMatch[1].split("\n").map(l => l.replace(/^\s*\*\s?/, "").trim()).filter(Boolean);

    summary = lines.slice(0, 4).join(" | ");

  }

  console.log(`[${f}] id: ${gameIdMatch ? gameIdMatch[1] : "N/A"} | title: "${titleMatch ? titleMatch[1] : "N/A"}" | rounds: ${roundsMatch ? roundsMatch[1] : "N/A"}`);

  console.log(`   Desc: ${summary}`);

  console.log(`   Instruction: ${textMatch ? textMatch[1] : "N/A"}\n`);

});

'`

Ran command: `find . -name "*syllabus*" -o -name "*bakalkubagi*"`

Searched for "z3"

Viewed laporanPenguranganRegistry.ts:1-60

Berikut adalah **daftar lengkap dan analisis mendalam seluruh 40 permainan *Asyiknya Bermain* Perkalian (Zona 3: *The Secret of Pythagoras*)** beserta konsep matematika metode GASING dan mekanika permainannya, sebagai bahan analisis Prof. Yohanes Surya untuk menyusun pemetaan hasil belajar siswa (seperti pada [AnalisaHasil/Pengurangan](file:///Users/yohanessurya/Documents/Development/so/worktrees/main-bf/AnalisaHasil/Pengurangan/PERENCANAAN_SISTEM_LAPORAN_PENGURANGAN.md)).

---

## 🧭 Ikhtisar Arsitektur Kurikulum Perkalian (Zona 3)

Berbeda dengan Pengurangan (Zona 4) yang memiliki 21 games, **Perkalian (Zona 3) memiliki total 40 games Asyiknya Bermain**. Hal ini disebabkan oleh kedalaman materi pada **Level 2 (26 games)**, di mana metode GASING melatih penguasaan mencongak luar kepala untuk setiap angka perkalian 1 s.d. 10 secara terpisah dengan jembatan kognitif khas GASING (lagu ritmis robot Omega, trik pasangan jari bernilai 10 dan 5, visualisasi kuadrat kembar, hingga *speed-drill*).

| Level | Topik Utama Kurikulum GASING | Jumlah Games | Fokus Kompetensi |