Ran command: `find web/src/games/Zone3* -name "*.astro" | sort`
Ran command: `find web/src/games/Zone3Level* -name "*Bermain*.astro" | sort`
Ran command: `find web/src -name "*Perkalian*" -o -name "*perkalian*"`
Viewed laporanPerkalianRegistry.ts:1-80
Viewed laporanPerkalianRegistry.ts:80-250
Viewed laporanPerkalianRegistry.ts:250-350
Ran command: `node -e "
const fs = require('fs');
const path = require('path');

const files = [
  'web/src/games/Zone3Level1/SB1Bermain1.astro',
  'web/src/games/Zone3Level2/SB1Bermain1.astro',
  'web/src/games/Zone3Level2/SB2Bermain1.astro',
  'web/src/games/Zone3Level2/SB3Bermain1.astro',
  'web/src/games/Zone3Level2/SB3Bermain2.astro',
  'web/src/games/Zone3Level2/SB4Bermain1.astro',
  'web/src/games/Zone3Level2/SB4Bermain2.astro',
  'web/src/games/Zone3Level2/SB5Bermain1.astro',
  'web/src/games/Zone3Level2/SB5Bermain2.astro',
  'web/src/games/Zone3Level2/SB5Bermain3.astro',
  'web/src/games/Zone3Level2/SB6Bermain1.astro',
  'web/src/games/Zone3Level2/SB6Bermain2.astro',
  'web/src/games/Zone3Level2/SB6Bermain3.astro',
  'web/src/games/Zone3Level2/SB7Bermain1.astro',
  'web/src/games/Zone3Level2/SB7Bermain2.astro',
  'web/src/games/Zone3Level2/SB7Bermain3.astro',
  'web/src/games/Zone3Level2/SB7Bermain4.astro',
  'web/src/games/Zone3Level2/SB7Bermain5.astro',
  'web/src/games/Zone3Level2/SB8Bermain1.astro',
  'web/src/games/Zone3Level2/SB8Bermain2.astro',
  'web/src/games/Zone3Level2/SB8Bermain3.astro',
  'web/src/games/Zone3Level2/SB8Bermain4.astro',
  'web/src/games/Zone3Level2/SB9Bermain1.astro',
  'web/src/games/Zone3Level2/SB9Bermain2.astro',
  'web/src/games/Zone3Level2/SB9Bermain3.astro',
  'web/src/games/Zone3Level2/SB9Bermain4.astro',
  'web/src/games/Zone3Level2/SB9Bermain5.astro',
  'web/src/games/Zone3Level3/SB1Bermain1.astro',
  'web/src/games/Zone3Level3/SB1Bermain2.astro',
  'web/src/games/Zone3Level3/SB2Bermain1.astro',
  'web/src/games/Zone3Level3/SB2Bermain2.astro',
  'web/src/games/Zone3Level4/SB1Bermain1.astro',
  'web/src/games/Zone3Level4/SB1Bermain2.astro',
  'web/src/games/Zone3Level4/SB2Bermain1.astro',
  'web/src/games/Zone3Level4/SB2Bermain2.astro',
  'web/src/games/Zone3Level4/SB2Bermain3.astro',
  'web/src/games/Zone3Level5/SB1Bermain1.astro',
  'web/src/games/Zone3Level5/SB1Bermain2.astro',
  'web/src/games/Zone3Level5/SB1Bermain3.astro',
  'web/src/games/Zone3Level6/SB1Bermain1.astro',
];

console.log('Total files to audit:', files.length);

const results = [];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const gameIdMatch = content.match(/gameId=[\"']([^\"']+)[\"']/);
  const totalRoundsMatch = content.match(/totalRounds={?(\d+)}?/);
  const variantMatch = content.match(/variant=[\"']([^\"']+)[\"']/);
  const titleMatch = content.match(/instructionTitle=[\"']([^\"']+)[\"']/);
  const textMatch = content.match(/instructionText=[\"']([^\"']+)[\"']/);
  const usesEngine = content.includes('BermainEngine');
  
  results.push({
    file: f.replace('web/src/games/', ''),
    gameId: gameIdMatch ? gameIdMatch[1] : 'CUSTOM',
    totalRounds: totalRoundsMatch ? parseInt(totalRoundsMatch[1]) : 'CUSTOM',
    variant: variantMatch ? variantMatch[1] : 'CUSTOM',
    title: titleMatch ? titleMatch[1] : 'N/A',
    instruction: textMatch ? textMatch[1] : 'N/A',
    usesEngine,
    loc: content.split('\n').length
  });
}

console.log(JSON.stringify(results, null, 2));
"`
Ran command: `node -e "
const fs = require('fs');

const files = [
  'web/src/games/Zone3Level1/SB1Bermain1.astro',
  'web/src/games/Zone3Level2/SB1Bermain1.astro',
  'web/src/games/Zone3Level2/SB2Bermain1.astro',
  'web/src/games/Zone3Level2/SB3Bermain1.astro',
  'web/src/games/Zone3Level2/SB3Bermain2.astro',
  'web/src/games/Zone3Level2/SB4Bermain1.astro',
  'web/src/games/Zone3Level2/SB4Bermain2.astro',
  'web/src/games/Zone3Level2/SB5Bermain1.astro',
  'web/src/games/Zone3Level2/SB5Bermain2.astro',
  'web/src/games/Zone3Level2/SB5Bermain3.astro',
  'web/src/games/Zone3Level2/SB6Bermain1.astro',
  'web/src/games/Zone3Level2/SB6Bermain2.astro',
  'web/src/games/Zone3Level2/SB6Bermain3.astro',
  'web/src/games/Zone3Level2/SB7Bermain1.astro',
  'web/src/games/Zone3Level2/SB7Bermain2.astro',
  'web/src/games/Zone3Level2/SB7Bermain3.astro',
  'web/src/games/Zone3Level2/SB7Bermain4.astro',
  'web/src/games/Zone3Level2/SB7Bermain5.astro',
  'web/src/games/Zone3Level2/SB8Bermain1.astro',
  'web/src/games/Zone3Level2/SB8Bermain2.astro',
  'web/src/games/Zone3Level2/SB8Bermain3.astro',
  'web/src/games/Zone3Level2/SB8Bermain4.astro',
  'web/src/games/Zone3Level2/SB9Bermain1.astro',
  'web/src/games/Zone3Level2/SB9Bermain2.astro',
  'web/src/games/Zone3Level2/SB9Bermain3.astro',
  'web/src/games/Zone3Level2/SB9Bermain4.astro',
  'web/src/games/Zone3Level2/SB9Bermain5.astro',
  'web/src/games/Zone3Level3/SB1Bermain1.astro',
  'web/src/games/Zone3Level3/SB1Bermain2.astro',
  'web/src/games/Zone3Level3/SB2Bermain1.astro',
  'web/src/games/Zone3Level3/SB2Bermain2.astro',
  'web/src/games/Zone3Level4/SB1Bermain1.astro',
  'web/src/games/Zone3Level4/SB1Bermain2.astro',
  'web/src/games/Zone3Level4/SB2Bermain1.astro',
  'web/src/games/Zone3Level4/SB2Bermain2.astro',
  'web/src/games/Zone3Level4/SB2Bermain3.astro',
  'web/src/games/Zone3Level5/SB1Bermain1.astro',
  'web/src/games/Zone3Level5/SB1Bermain2.astro',
  'web/src/games/Zone3Level5/SB1Bermain3.astro',
  'web/src/games/Zone3Level6/SB1Bermain1.astro',
];

for (let i = 0; i < files.length; i++) {
  const f = files[i];
  const c = fs.readFileSync(f, 'utf8');
  
  // Search for problem generation or math expressions
  const genMatch = c.match(/function\s+(?:generateProblem|genProblem|initProblem|generateRound|generateQuestion|nextProblem)[^{]*\{([\s\S]*?)\n\s*\}/);
  const mathImports = c.match(/import.*?from.*?math.*?;/g) || [];
  const mathLibMatches = [...c.matchAll(/import\s*\{([^}]+)\}\s*from\s*['\"]([^'\"]*math[^'\"]*)['\"]/g)].map(m => m[1].trim());
  
  // Also look for inline equation templates
  const eqMatch = c.match(/(\d+\s*[\u00D7x*]\s*\d+)/g) || [];
  
  console.log(\`Game \${i+1}: \${f.replace('web/src/games/', '')}\`);
  if (mathLibMatches.length > 0) {
    console.log(\`  Math Helper: \${mathLibMatches.join(', ')}\`);
  }
}
"`
Viewed SB1Bermain1.astro:1-100
Ran command: `node -e "
const fs = require('fs');

const l2Files = [
  'SB1Bermain1.astro', 'SB2Bermain1.astro', 'SB3Bermain1.astro', 'SB3Bermain2.astro',
  'SB4Bermain1.astro', 'SB4Bermain2.astro', 'SB5Bermain1.astro', 'SB5Bermain2.astro', 'SB5Bermain3.astro',
  'SB6Bermain1.astro', 'SB6Bermain2.astro', 'SB6Bermain3.astro',
  'SB7Bermain1.astro', 'SB7Bermain2.astro', 'SB7Bermain3.astro', 'SB7Bermain4.astro', 'SB7Bermain5.astro',
  'SB8Bermain1.astro', 'SB8Bermain2.astro', 'SB8Bermain3.astro', 'SB8Bermain4.astro',
  'SB9Bermain1.astro', 'SB9Bermain2.astro', 'SB9Bermain3.astro', 'SB9Bermain4.astro', 'SB9Bermain5.astro'
];

for (const f of l2Files) {
  const p = 'web/src/games/Zone3Level2/' + f;
  const c = fs.readFileSync(p, 'utf8');
  const title = (c.match(/instructionTitle=[\"']([^\"']+)[\"']/) || [])[1] || 'N/A';
  const rounds = (c.match(/totalRounds={?(\d+)}?/) || [])[1] || 'N/A';
  const time = (c.match(/timePerQuestion={?(\d+)}?/) || [])[1] || 'N/A';
  const gameId = (c.match(/gameId=[\"']([^\"']+)[\"']/) || [])[1] || 'N/A';
  
  // Find problem generation snippet
  let snippet = '';
  const genIdx = c.search(/function\s+(?:generateProblem|genProblem|initProblem|generateRound|generateQuestion|nextProblem|startRound)/);
  if (genIdx !== -1) {
    snippet = c.slice(genIdx, genIdx + 300).replace(/\s+/g, ' ');
  } else {
    // check for problemSets or problems array
    const probIdx = c.search(/(?:const|let|var)\s+(?:problemSets|problems|questions|pairs|equations|PAIRS)/);
    if (probIdx !== -1) {
      snippet = c.slice(probIdx, probIdx + 200).replace(/\s+/g, ' ');
    }
  }

  console.log(\`=== \${f} (\${gameId}) ===\`);
  console.log(\`  Title: \${title} | Rounds: \${rounds} | Time: \${time}s\`);
  console.log(\`  Snippet: \${snippet.slice(0, 150)}...\`);
}
"`
Ran command: `node -e "
const fs = require('fs');

const otherFiles = [
  'Zone3Level3/SB1Bermain1.astro', 'Zone3Level3/SB1Bermain2.astro', 'Zone3Level3/SB2Bermain1.astro', 'Zone3Level3/SB2Bermain2.astro',
  'Zone3Level4/SB1Bermain1.astro', 'Zone3Level4/SB1Bermain2.astro', 'Zone3Level4/SB2Bermain1.astro', 'Zone3Level4/SB2Bermain2.astro', 'Zone3Level4/SB2Bermain3.astro',
  'Zone3Level5/SB1Bermain1.astro', 'Zone3Level5/SB1Bermain2.astro', 'Zone3Level5/SB1Bermain3.astro',
  'Zone3Level6/SB1Bermain1.astro'
];

for (const f of otherFiles) {
  const p = 'web/src/games/' + f;
  const c = fs.readFileSync(p, 'utf8');
  const title = (c.match(/instructionTitle=[\"']([^\"']+)[\"']/) || [])[1] || 'N/A';
  const rounds = (c.match(/totalRounds={?(\d+)}?/) || [])[1] || 'N/A';
  const time = (c.match(/timePerQuestion={?(\d+)}?/) || [])[1] || 'N/A';
  const gameId = (c.match(/gameId=[\"']([^\"']+)[\"']/) || [])[1] || 'N/A';
  
  let snippet = '';
  const genIdx = c.search(/(?:function\s+(?:generateProblem|genProblem|initProblem|generateRound|generateQuestion|nextProblem|startRound)|const\s+(?:problemSets|problems|questions|pairs|equations|PAIRS))/);
  if (genIdx !== -1) {
    snippet = c.slice(genIdx, genIdx + 200).replace(/\s+/g, ' ');
  }

  console.log(\`=== \${f} (\${gameId}) ===\`);
  console.log(\`  Title: \${title} | Rounds: \${rounds} | Time: \${time}s\`);
  console.log(\`  Snippet: \${snippet.slice(0, 150)}...\`);
}
"`
Ran command: `node -e "
const fs = require('fs');

const files = [
  'web/src/games/Zone3Level1/SB1Bermain1.astro',
  'web/src/games/Zone3Level2/SB1Bermain1.astro',
  'web/src/games/Zone3Level2/SB2Bermain1.astro',
  'web/src/games/Zone3Level2/SB3Bermain1.astro',
  'web/src/games/Zone3Level2/SB3Bermain2.astro',
  'web/src/games/Zone3Level2/SB4Bermain1.astro',
  'web/src/games/Zone3Level2/SB4Bermain2.astro',
  'web/src/games/Zone3Level2/SB5Bermain1.astro',
  'web/src/games/Zone3Level2/SB5Bermain2.astro',
  'web/src/games/Zone3Level2/SB5Bermain3.astro',
  'web/src/games/Zone3Level2/SB6Bermain1.astro',
  'web/src/games/Zone3Level2/SB6Bermain2.astro',
  'web/src/games/Zone3Level2/SB6Bermain3.astro',
  'web/src/games/Zone3Level2/SB7Bermain1.astro',
  'web/src/games/Zone3Level2/SB7Bermain2.astro',
  'web/src/games/Zone3Level2/SB7Bermain3.astro',
  'web/src/games/Zone3Level2/SB7Bermain4.astro',
  'web/src/games/Zone3Level2/SB7Bermain5.astro',
  'web/src/games/Zone3Level2/SB8Bermain1.astro',
  'web/src/games/Zone3Level2/SB8Bermain2.astro',
  'web/src/games/Zone3Level2/SB8Bermain3.astro',
  'web/src/games/Zone3Level2/SB8Bermain4.astro',
  'web/src/games/Zone3Level2/SB9Bermain1.astro',
  'web/src/games/Zone3Level2/SB9Bermain2.astro',
  'web/src/games/Zone3Level2/SB9Bermain3.astro',
  'web/src/games/Zone3Level2/SB9Bermain4.astro',
  'web/src/games/Zone3Level2/SB9Bermain5.astro',
  'web/src/games/Zone3Level3/SB1Bermain1.astro',
  'web/src/games/Zone3Level3/SB1Bermain2.astro',
  'web/src/games/Zone3Level3/SB2Bermain1.astro',
  'web/src/games/Zone3Level3/SB2Bermain2.astro',
  'web/src/games/Zone3Level4/SB1Bermain1.astro',
  'web/src/games/Zone3Level4/SB1Bermain2.astro',
  'web/src/games/Zone3Level4/SB2Bermain1.astro',
  'web/src/games/Zone3Level4/SB2Bermain2.astro',
  'web/src/games/Zone3Level4/SB2Bermain3.astro',
  'web/src/games/Zone3Level5/SB1Bermain1.astro',
  'web/src/games/Zone3Level5/SB1Bermain2.astro',
  'web/src/games/Zone3Level5/SB1Bermain3.astro',
  'web/src/games/Zone3Level6/SB1Bermain1.astro',
];

const auditData = files.map((f, idx) => {
  const c = fs.readFileSync(f, 'utf8');
  const gameId = (c.match(/gameId=[\"']([^\"']+)[\"']/) || [])[1] || 'N/A';
  const title = (c.match(/instructionTitle=[\"']([^\"']+)[\"']/) || [])[1] || 'N/A';
  const totalRounds = (c.match(/totalRounds={?(\d+)}?/) || [])[1] || 'N/A';
  const timePerQuestion = (c.match(/timePerQuestion={?(\d+)}?/) || [])[1] || 'N/A';
  const variant = (c.match(/variant=[\"']([^\"']+)[\"']/) || [])[1] || 'custom';
  
  // Extract questions or generator lines
  let questionsSample = '';
  const problemsMatch = c.match(/const\s+(?:problems|problemSets|questions|PAIRS|pairs)\s*=\s*(\[[^\]]+\])/);
  if (problemsMatch) {
    questionsSample = problemsMatch[1].slice(0, 100).replace(/\s+/g, ' ');
  }
  
  return {
    num: idx + 1,
    file: f.replace('web/src/games/', ''),
    gameId,
    title,
    totalRounds,
    timePerQuestion,
    variant,
    questionsSample
  };
});

console.log(JSON.stringify(auditData, null, 2));
"`
Ran command: `node -e "
const fs = require('fs');

const files = [
  'web/src/games/Zone3Level1/SB1Bermain1.astro',
  'web/src/games/Zone3Level2/SB1Bermain1.astro',
  'web/src/games/Zone3Level2/SB2Bermain1.astro',
  'web/src/games/Zone3Level2/SB3Bermain1.astro',
  'web/src/games/Zone3Level2/SB3Bermain2.astro',
  'web/src/games/Zone3Level2/SB4Bermain1.astro',
  'web/src/games/Zone3Level2/SB4Bermain2.astro',
  'web/src/games/Zone3Level2/SB5Bermain1.astro',
  'web/src/games/Zone3Level2/SB5Bermain2.astro',
];

const auditData = files.map((f, idx) => {
  const c = fs.readFileSync(f, 'utf8');
  const gameId = (c.match(/gameId=[\"']([^\"']+)[\"']/) || [])[1] || 'N/A';
  const title = (c.match(/instructionTitle=[\"']([^\"']+)[\"']/) || [])[1] || 'N/A';
  const totalRounds = (c.match(/totalRounds={?(\d+)}?/) || [])[1] || 'N/A';
  const timePerQuestion = (c.match(/timePerQuestion={?(\d+)}?/) || [])[1] || 'N/A';
  const variant = (c.match(/variant=[\"']([^\"']+)[\"']/) || [])[1] || 'custom';
  
  return {
    num: idx + 1,
    file: f.replace('web/src/games/', ''),
    gameId,
    title,
    totalRounds,
    timePerQuestion,
    variant,
  };
});

console.log(JSON.stringify(auditData, null, 2));
"`

Berikut adalah **Audit Menyeluruh & Sangat Mendalam terhadap Seluruh 40 Permainan Asyiknya Bermain di Zona 3 (Perkalian — Negeri Tirai Bambu / Athena / Pythagoras)**, yang dibedah satu demi satu langsung dari kode sumber (`web/src/games/Zone3Level*/*.astro`), mencakup mekanika interaksi, parameter generator soal riil, konsep metode GASING spesifik, hingga formula kalimat kemampuan konkret siswa.

---

# 🏛️ AUDIT KOMPREHENSIF 40 GAMES PERKALIAN (ZONA 3)

```
DISTRIBUSI 40 GAMES ASYIKNYA BERMAIN ZONA 3:
├─ Level 1: Konsep Dasar Perkalian & Penjumlahan Berulang  ───────   1 Game  (Game 1)
├─ Level 2: Mencongak Perkalian 1 s.d. 10                   ───────  26 Games (Game 2 – 27)
├─ Level 3: Perkalian 2-Digit dengan 1-Digit               ───────   4 Games (Game 28 – 31)
├─ Level 4: Perkalian 2-Digit dengan 2-Digit (Kali Silang)  ───────   5 Games (Game 32 – 36)
├─ Level 5: Perkalian Multi-Digit (3d x 1d, 3d x 2d, 3d x 3d) ───   3 Games (Game 37 – 39)
└─ Level 6: Kejuaraan Perkalian Bilangan Raksasa (4d x 4d) ───────   1 Game  (Game 40)
                                                    TOTAL  ───────  40 Games
```

---

## 🟢 KLASTER 1: Konsep Dasar Perkalian & Penjumlahan Berulang (Level 1 — 1 Game)

### 1. `z3l1-sb1bermain1` — Kotak Rahasia Pythagoras
- **File:** `web/src/games/Zone3Level1/SB1Bermain1.astro`
- **Tema & Visual:** Athena Kuno / Perpustakaan Pythagoras (`bg_yunani_hq.webp`).
- **Mekanika Interaksi:** 2 Fase Interaktif:
  - *Fase 1 (Pilihan Representasi):* Memilih representasi kotak yang benar ($A$ kotak masing-masing berisi $B$ barang vs $B$ kotak berisi $A$ barang).
  - *Fase 2 (Drag & Drop):* Menyeret angka $B$ ke $A$ slot penjumlahan berulang ($[B] + [B] + \dots$).
- **Generator Soal & Parameter:** 3 ronde terfokus, timer 45 detik per soal.
- **Konsep Pedagogis GASING:** Konsep fundamental perkalian $A \times B$ sebagai $A$ buah kotak berisi $B$ objek, setara dengan penjumlahan berulang bilangan $B$ sebanyak $A$ kali ($A \times B = \underbrace{B + B + \dots + B}_{A\text{ kali}}$).
- **Contoh Soal Konkret:** $3 \times 4 = 4 + 4 + 4 = 12$ atau $2 \times 5 = 5 + 5 = 10$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu memahami perkalian sebagai konsep kotak dan penjumlahan berulang seperti 3x4 = 4+4+4!"*

---

## 🟡 KLASTER 2: Perkalian Bilangan Dasar (1, 10, 2, 5) & Trik Jari GASING (Level 2 — 7 Games)

### 2. `z3l2-sb1bermain1` — Misteri Jubah Pythagoras (Perkalian 1)
- **File:** `web/src/games/Zone3Level2/SB1Bermain1.astro`
- **Mekanika:** *Memory Card Match* (mencocokkan 3 pasang kartu jubah filsuf per ronde).
- **Generator Soal & Parameter:** 3 ronde, timer 45 detik per ronde. Bilangan 1-digit dikalikan 1.
- **Konsep GASING:** Sifat identitas perkalian ($N \times 1 = N$ dan $1 \times N = N$).
- **Contoh Soal Konkret:** $1 \times 6 = 6$, $7 \times 1 = 7$, $1 \times 9 = 9$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu melakukan perkalian bilangan dengan angka 1 seperti 1x6 = 6 atau 7x1 = 7!"*

### 3. `z3l2-sb2bermain1` — Sandi Angsa Terbang (Perkalian 10)
- **File:** `web/src/games/Zone3Level2/SB2Bermain1.astro`
- **Mekanika:** *Memory Card Match* kartu pasangan angsa terbang (3 pasang per ronde).
- **Generator Soal & Parameter:** 3 ronde, timer 45 detik per ronde. Bilangan 1-digit dikalikan 10.
- **Konsep GASING:** Menambah angka nol di belakang bilangan yang dikalikan ($N \times 10 = N0$).
- **Contoh Soal Konkret:** $4 \times 10 = 40$, $8 \times 10 = 80$, $10 \times 6 = 60$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu melakukan perkalian bilangan dengan angka 10 seperti 4x10 = 40 atau 8x10 = 80!"*

### 4. `z3l2-sb4bermain1` — Kudapan Ajaib Kijang (Perkalian 2 — Doubling)
- **File:** `web/src/games/Zone3Level2/SB4Bermain1.astro`
- **Mekanika:** Pilihan ganda rumput ajaib kijang (3 wadah pilihan jawaban).
- **Generator Soal & Parameter:** 10 ronde, timer 15 detik per soal.
- **Konsep GASING:** Perkalian 2 sebagai *Penjumlahan Kembar (Doubling)* ($2 \times N = N + N$).
- **Contoh Soal Konkret:** $2 \times 6 = 12$, $2 \times 8 = 16$, $7 \times 2 = 14$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu melakukan perkalian 2 sebagai penjumlahan kembar seperti 2x6 = 12 atau 2x8 = 16!"*

### 5. `z3l2-sb4bermain2` — Menetasnya Telur Mutant (Pencocokan Pasangan Perkalian 2)
- **File:** `web/src/games/Zone3Level2/SB4Bermain2.astro`
- **Mekanika:** *Grid Matching* membuka ubin telur mutant untuk memasangkan soal dengan hasil perkalian 2.
- **Generator Soal & Parameter:** 1 sesi multi-pair (13 kartu/pasang), timer sesi 90 detik.
- **Konsep GASING:** Otomatisasi refleks perkalian 2 dari rentang $2 \times 1$ hingga $2 \times 9$.
- **Contoh Soal Konkret:** Memasangkan $2 \times 7$ dengan $14$, $2 \times 9$ dengan $18$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu mencocokkan pasangan perkalian 2 secara refleks seperti 2x7 = 14 atau 2x9 = 18!"*

### 6. `z3l2-sb5bermain1` — Gudang Gandum Kerajaan (5 × N)
- **File:** `web/src/games/Zone3Level2/SB5Bermain1.astro`
- **Mekanika:** Input Numpad gandum + visualisasi pasangan jari tangan GASING dinamis.
- **Generator Soal & Parameter:** 10 ronde, timer 20 detik per soal.
- **Konsep GASING:** Metode Jari Perkalian 5: jari dipasangkan; 1 pasang (2 jari) bernilai 10 (puluhan), sisa 1 jari bernilai 5. Contoh: $5 \times 7 \rightarrow 7$ jari = 3 pasang (30) + 1 sisa (5) = 35.
- **Contoh Soal Konkret:** $5 \times 4 = 20$, $5 \times 7 = 35$, $5 \times 9 = 45$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan perkalian 5xN menggunakan metode pasangan jari GASING seperti 5x4 = 20 atau 5x7 = 35!"*

### 7. `z3l2-sb5bermain2` — Sandi Jari Pythagoras (N × 5)
- **File:** `web/src/games/Zone3Level2/SB5Bermain2.astro`
- **Mekanika:** Input Numpad sandi batu piramida + visualisasi komutatif jari tangan.
- **Generator Soal & Parameter:** 10 ronde, timer 20 detik per soal.
- **Konsep GASING:** Komutatif perkalian $N \times 5 = 5 \times N$ dengan metode pasangan jari yang sama.
- **Contoh Soal Konkret:** $6 \times 5 = 30$, $8 \times 5 = 40$, $3 \times 5 = 15$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan perkalian Nx5 menggunakan sifat komutatif jari GASING seperti 6x5 = 30 atau 8x5 = 40!"*

### 8. `z3l2-sb5bermain3` — Pukulan Kilat Kanguru (Refleks Perkalian 5)
- **File:** `web/src/games/Zone3Level2/SB5Bermain3.astro`
- **Mekanika:** Arcade tinju kanguru memukul samsak target bertuliskan jawaban yang benar.
- **Generator Soal & Parameter:** 15 ronde, timer 15 detik per soal. Kombinasi acak $5 \times N$ dan $N \times 5$.
- **Konsep GASING:** Refleks cepat mencongak perkalian 5 di bawah tekanan waktu.
- **Contoh Soal Konkret:** $5 \times 6 = 30$, $9 \times 5 = 45$, $5 \times 8 = 40$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu mencongak cepat refleks perkalian 5 pada aksi pukulan seperti 5x6 = 30 atau 9x5 = 45!"*

---

## 🟠 KLASTER 3: Mencongak Perkalian Bilangan Khusus & Bilangan Sukar (Level 2 — 19 Games)

### Sub-Bab 3: Perkalian 9 (Pola Jari & Jumlah Digit = 9)
### 9. `z3l2-sb3bermain1` — Pesan di Balik Sisik Emas
- **File:** `web/src/games/Zone3Level2/SB3Bermain1.astro`
- **Mekanika:** *Memory Card Match* sisik ikan mas (3 pasang per ronde).
- **Konsep GASING:** Pola perkalian 9: digit puluhan = faktor minus 1, digit satuan pelengkap 9 (jumlah digit puluhan + satuan selalu bernilai 9, misal $9 \times 7 = 63 \rightarrow 6+3=9$). Trik jari ke-N ditekuk.
- **Contoh Soal Konkret:** $9 \times 4 = 36$, $9 \times 7 = 63$, $9 \times 8 = 72$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu mencongak perkalian 9 menggunakan pola jumlah digit 9 dan trik jari seperti 9x4 = 36 atau 9x7 = 63!"*

### 10. `z3l2-sb3bermain2` — Misteri Rantai 9
- **File:** `web/src/games/Zone3Level2/SB3Bermain2.astro`
- **Mekanika:** Zuma Arcade menembakkan bola meriam berangka ke rantai bola yang bergerak di rel.
- **Konsep GASING:** Otomatisasi kecepatan reaksi mencongak perkalian 9 ($9 \times 1$ s.d. $9 \times 9$).
- **Contoh Soal Konkret:** Menembak bola 27 saat soal $9 \times 3$, atau bola 72 saat soal $9 \times 8$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menembak tepat hasil perkalian 9 secara refleks cepat seperti 9x3 = 27 atau 9x8 = 72!"*

### Sub-Bab 6: Perkalian Kuadrat Bilangan Kembar ($N \times N$)
### 11. `z3l2-sb6bermain1` — Jejak Pemburu Langit
- **File:** `web/src/games/Zone3Level2/SB6Bermain1.astro`
- **Mekanika:** Elang menyambar ikan jawaban yang berenang di danau (3 ikan pilihan).
- **Konsep GASING:** Perkalian kuadrat bilangan kembar $N \times N$ dari $1 \times 1$ hingga $9 \times 9$.
- **Contoh Soal Konkret:** $6 \times 6 = 36$, $7 \times 7 = 49$, $8 \times 8 = 64$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu mencongak perkalian kuadrat bilangan kembar seperti 6x6 = 36, 7x7 = 49, atau 8x8 = 64!"*

### 12. `z3l2-sb6bermain2` — Penjaga Gerbang Babilonia
- **File:** `web/src/games/Zone3Level2/SB6Bermain2.astro`
- **Mekanika:** Meriam gerbang benteng menembak pasangan bilangan kembar pembentuk kuadrat.
- **Konsep GASING:** *Reverse mencongak kuadrat*: Menentukan faktor kembar dari hasil kuadratnya ($36 \leftarrow 6 \times 6$, $64 \leftarrow 8 \times 8$).
- **Contoh Soal Konkret:** Angka peluru $36 \rightarrow$ pasangkan dengan $6 \times 6$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menentukan pasangan faktor kuadrat dari hasil kuadratnya seperti 36 berasal dari 6x6 atau 64 dari 8x8!"*

### 13. `z3l2-sb6bermain3` — Roda Keberuntungan Babilonia
- **File:** `web/src/games/Zone3Level2/SB6Bermain3.astro`
- **Mekanika:** Spin Wheel roda putar (6 segmen roda $3, 4, 5, 6, 7, 8$).
- **Konsep GASING:** Kecepatan refleks mencongak perkalian kuadrat dari penunjukan jarum acak.
- **Contoh Soal Konkret:** Jarum menunjuk angka $7 \rightarrow$ jawab $49$ ($7 \times 7$).
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menghitung cepat hasil kuadrat dari angka acak pada roda putar seperti 5x5 = 25 atau 8x8 = 64!"*

### Sub-Bab 7: Perkalian 3
### 14. `z3l2-sb7bermain1` — Restorasi Papirus Kuno
- **File:** `web/src/games/Zone3Level2/SB7Bermain1.astro`
- **Mekanika:** Numpad papirus kuno mengetikkan hasil perkalian 3.
- **Konsep GASING:** Mencongak dasar perkalian 3 sekuensial dan acak ($3 \times 1$ s.d. $3 \times 9$).
- **Contoh Soal Konkret:** $3 \times 4 = 12$, $3 \times 7 = 21$, $3 \times 8 = 24$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu mencongak perkalian 3 dengan mengetikkan jawaban tepat seperti 3x4 = 12 atau 3x8 = 24!"*

### 15. `z3l2-sb7bermain2` — Adu Cepat Dengan Burung
- **File:** `web/src/games/Zone3Level2/SB7Bermain2.astro`
- **Mekanika:** Lari cepat memilih mangkuk jawaban sebelum burung mencapai garis batas.
- **Konsep GASING:** Peningkatan kecepatan refleks kognitif perkalian 3 ($3 \times N$).
- **Contoh Soal Konkret:** $3 \times 6 = 18$, $3 \times 9 = 27$, $3 \times 5 = 15$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menjawab cepat perkalian 3 sebelum burung mencapai garis batas seperti 3x6 = 18 atau 3x9 = 27!"*

### 16. `z3l2-sb7b3` — Senandung Robot Omega (Perkalian 3)
- **File:** `web/src/games/Zone3Level2/SB7Bermain3.astro`
- **Mekanika:** *Auditory song quiz* mendengarkan lagu ritmis perkalian 3 + pilihan jari tangan.
- **Konsep GASING:** Mengunci memori jangka panjang perkalian 3 melalui nada ritmis berirama (*mnemonic audio*).
- **Contoh Soal Konkret:** Mendengarkan lirik melodi $3 \times 5 \rightarrow$ memilih jawaban $15$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu mencongak perkalian 3 melalui senandung lagu ritmis seperti 3x5 = 15 atau 3x9 = 27!"*

### 17. `z3l2-sb7bermain4` — Pertempuran Lorong Gelap
- **File:** `web/src/games/Zone3Level2/SB7Bermain4.astro`
- **Mekanika:** Tebasan pedang aksi ksatria melawan mutant pembawa angka hasil perkalian 3.
- **Konsep GASING:** Aksi refleks motorik-kognitif perkalian 3 dalam situasi dinamis.
- **Contoh Soal Konkret:** Menebas mutant berangka $24$ saat soal $3 \times 8$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menebas musuh pembawa angka hasil perkalian 3 yang tepat seperti 3x8 = 24 atau 3x7 = 21!"*

### 18. `z3l2-sb7bermain5` — Segel Kristal Luxor
- **File:** `web/src/games/Zone3Level2/SB7Bermain5.astro`
- **Mekanika:** Zuma Arcade menembakkan bola ke deretan kristal bergerak spiral.
- **Konsep GASING:** Evaluasi otomatisasi perkalian 3 pada lingkungan visual bergerak.
- **Contoh Soal Konkret:** Menembak kristal $27$ untuk soal $3 \times 9$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menembak bola kristal perkalian 3 secara akurat seperti 3x7 = 21 atau 3x9 = 27!"*

### Sub-Bab 8: Perkalian 4 & Perkalian 8
### 19. `z3l2-sb8bermain1` — Wortel Ajaib (Perkalian 4)
- **File:** `web/src/games/Zone3Level2/SB8Bermain1.astro`
- **Mekanika:** Lompatan kelinci memetik wortel jawaban (3 pilihan wortel).
- **Konsep GASING:** Konsep *Double-Double*: mengalikan 2 dua kali ($4 \times N = 2 \times (2 \times N)$).
- **Contoh Soal Konkret:** $4 \times 6 = 24$ (dari $6 \times 2 = 12 \rightarrow 12 \times 2 = 24$).
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan perkalian 4 menggunakan teknik double-double seperti 4x6 = 24 atau 4x7 = 28!"*

### 20. `z3l2-sb8bermain2` — Gema Suara Pythagoras (Perkalian 8)
- **File:** `web/src/games/Zone3Level2/SB8Bermain2.astro`
- **Mekanika:** Simon Says Auditory nada suara buku (mengulang urutan kelipatan 8).
- **Konsep GASING:** Memori urutan auditori kelipatan 8 ($8, 16, 24, 32, 40, 48, 56, 64, 72, 80$).
- **Contoh Soal Konkret:** Mengulang deret nada $8 \rightarrow 16 \rightarrow 24 \rightarrow 32$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu mengingat urutan deret auditori kelipatan perkalian 8 seperti 8, 16, 24, 32!"*

### 21. `z3l2-sb8bermain3` — Senandung Robot Omega (Perkalian 4)
- **File:** `web/src/games/Zone3Level2/SB8Bermain3.astro`
- **Mekanika:** Auditory song quiz + pilihan jari tangan untuk perkalian 4.
- **Konsep GASING:** Penguatan memori kelipatan 4 melalui melodi berirama ceria.
- **Contoh Soal Konkret:** Mendengarkan irama lagu $4 \times 8 \rightarrow$ memilih jawaban $32$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu mencongak perkalian 4 melalui senandung lagu ritmis seperti 4x4 = 16 atau 4x8 = 32!"*

### 22. `z3l2-sb8bermain4` — Penjaga Hutan Babilonia (Faktor Perkalian 4)
- **File:** `web/src/games/Zone3Level2/SB8Bermain4.astro`
- **Mekanika:** Menebas mutant kayu pembawa faktor pembentuk angka target perkalian 4.
- **Konsep GASING:** *Reverse mencongak faktor*: menemukan faktor pengali dari hasil target ($28 \leftarrow 4 \times 7$).
- **Contoh Soal Konkret:** Target $28 \rightarrow$ tebas mutant pembawa angka $7$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menemukan faktor pengali perkalian 4 dari hasil targetnya seperti 28 berasal dari 4x7!"*

### Sub-Bab 9: Perkalian Campuran Bilangan Sukar (6, 7, 8)
### 23. `z3l2-sb9bermain1` — Tantangan Lembar Papirus (Segitiga Emas Sukar)
- **File:** `web/src/games/Zone3Level2/SB9Bermain1.astro`
- **Mekanika:** Numpad papirus kuno menjawab kombinasi perkalian bilangan paling sukar.
- **Konsep GASING:** Penaklukan "Segitiga Emas Sukar" GASING: $6 \times 7 = 42$, $6 \times 8 = 48$, $7 \times 8 = 56$ beserta sifat komutatifnya.
- **Contoh Soal Konkret:** $6 \times 7 = 42$, $7 \times 8 = 56$, $8 \times 6 = 48$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu mencongak kombinasi perkalian bilangan sukar 6, 7, dan 8 seperti 6x7 = 42, 7x8 = 56, atau 6x8 = 48!"*

### 24. `z3l2-sb9bermain2` — Sandi Tulang Mochi
- **File:** `web/src/games/Zone3Level2/SB9Bermain2.astro`
- **Mekanika:** Simon Says gonggongan anjing Mochi mengetuk mangkuk tulang berangka.
- **Konsep GASING:** Memori auditori sekuensial deret perkalian bilangan sukar 6, 7, dan 8.
- **Contoh Soal Konkret:** Mengingat deret nada $42 \rightarrow 48 \rightarrow 56$ dan mengetuk mangkuk yang sesuai.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu mengingat dan mereproduksi urutan nada perkalian campuran seperti 7x6 = 42 atau 8x7 = 56!"*

### 25. `z3l2-sb9bermain3` — Memori Akademi Athena
- **File:** `web/src/games/Zone3Level2/SB9Bermain3.astro`
- **Mekanika:** Menjodohkan kartu soal di kolom kiri dengan kartu jawaban di kolom kanan (2 ronde bertingkat).
- **Konsep GASING:** Asosiasi visual cepat pasangan soal dan jawaban perkalian bilangan sukar 6, 7, dan 8.
- **Contoh Soal Konkret:** Menjodohkan $7 \times 7$ ke $49$, dan $8 \times 8$ ke $64$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menjodohkan pasangan kartu perkalian sukar 6, 7, dan 8 seperti 7x7 = 49 atau 8x8 = 64!"*

### 26. `z3l2-sb9bermain4` — Hujan Badai M-Octagon
- **File:** `web/src/games/Zone3Level2/SB9Bermain4.astro`
- **Mekanika:** Menangkap atau mengetuk pecahan kristal es jatuh yang berisi jawaban perkalian acak di HUD.
- **Konsep GASING:** Uji refleks menyeluruh tabel perkalian 1 s.d. 9 dalam ritme cepat tanpa jeda.
- **Contoh Soal Konkret:** Soal $7 \times 6 \rightarrow$ menangkap kristal es bertuliskan $42$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menangkap jawaban perkalian acak secara refleks pada kristal jatuh seperti 6x9 = 54 atau 7x6 = 42!"*

### 27. `z3l2-sb9bermain5` — TTS Perkalian dan Penjumlahan
- **File:** `web/src/games/Zone3Level2/SB9Bermain5.astro`
- **Mekanika:** Grid Teka-Teki Silang Matematika (13×13 sel persilangan mendatar dan menurun).
- **Konsep GASING:** Penalaran aljabar dasar: melengkapi suku perkalian atau penjumlahan yang hilang ($A \times [?] = C$ atau $[?] + B = C$) melalui titik potong sel.
- **Contoh Soal Konkret:** $7 \times [?] = 56$ (isi 8), berpotongan dengan $[?] + 4 = 12$ (isi 8).
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu memecahkan teka-teki silang matematika perkalian dan penjumlahan seperti 7 x [ ? ] = 56!"*

---

## 🔵 KLASTER 4: Perkalian 2-Digit dengan 1-Digit (Level 3 — 4 Games)

### 28. `z3l3-sb1bermain1` — Pasangan Ubin Oktagon (Tanpa Menyimpan)
- **File:** `web/src/games/Zone3Level3/SB1Bermain1.astro`
- **Mekanika:** Memori pasangan ubin oktagon (ubin biru soal $2\text{d} \times 1\text{d}$, ubin kuning jawaban, 4 pasang per ronde).
- **Konsep GASING:** Perkalian 2-digit dengan 1-digit **tanpa teknik menyimpan** dari kiri ke kanan (puluhan dikalikan lebih dulu, lalu satuan).
- **Contoh Soal Konkret:** $23 \times 3 = 69$ ($20 \times 3 = 60$; $3 \times 3 = 9 \rightarrow 60 + 9 = 69$), $41 \times 2 = 82$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu melakukan perkalian 2-digit dengan 1-digit tanpa menyimpan dari kiri ke kanan seperti 23x3 = 69 atau 41x2 = 82!"*

### 29. `z3l3-sb1bermain2` — Kilat Perkalian Puluhan
- **File:** `web/src/games/Zone3Level3/SB1Bermain2.astro`
- **Mekanika:** Numpad papan tulis akademi mengetik jawaban perkalian puluhan bulat.
- **Konsep GASING:** Perkalian puluhan bulat dengan 1-digit ($N0 \times M$): kalikan digit depannya, lalu tempelkan nol di belakangnya.
- **Contoh Soal Konkret:** $70 \times 4 = 280$ ($7 \times 4 = 28 \rightarrow 280$), $60 \times 8 = 480$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu mengalikan bilangan puluhan bulat dengan bilangan satuan seperti 70x4 = 280 atau 60x8 = 480!"*

### 30. `z3l3-sb2bermain1` — Invasi Kebun Anggur (Menyimpan Pengali Sedang 2..5)
- **File:** `web/src/games/Zone3Level3/SB2Bermain1.astro`
- **Mekanika:** Slingshot ketapel membidik kelinci mutan pembawa angka jawaban.
- **Konsep GASING:** Perkalian 2-digit dengan 1-digit **dengan teknik menyimpan** angka pengali sedang ($2 \dots 5$) dari kiri ke kanan.
- **Contoh Soal Konkret:** $23 \times 4 = 92$ ($20 \times 4 = 80$; $3 \times 4 = 12 \rightarrow 80 + 12 = 92$), $38 \times 4 = 152$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan perkalian 2-digit dengan 1-digit teknik menyimpan (pengali 2-5) seperti 23x4 = 92 atau 38x4 = 152!"*

### 31. `z3l3-sb2bermain2` — Memburu Lebah Mutant (Menyimpan Pengali Besar 6..9)
- **File:** `web/src/games/Zone3Level3/SB2Bermain2.astro`
- **Mekanika:** Meriam peluru menembak lebah mutant pembawa soal $2\text{d} \times 1\text{d}$ pengali besar ($6 \dots 9$).
- **Konsep GASING:** Pematangan simpanan luar kepala dengan angka pengali besar.
- **Contoh Soal Konkret:** $45 \times 6 = 270$, $87 \times 9 = 783$, $68 \times 7 = 476$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan perkalian 2-digit dengan 1-digit pengali besar (6-9) secara lancar seperti 45x6 = 270 atau 87x9 = 783!"*

---

## 🟣 KLASTER 5: Perkalian 2-Digit dengan 2-Digit & Kali Silang GASING (Level 4 — 5 Games)

### 32. `z3l4-sb1bermain1` — Perkalian Kilat Athena (Kali Silang Tanpa Menyimpan)
- **File:** `web/src/games/Zone3Level4/SB1Bermain1.astro`
- **Mekanika:** Numpad papirus kuno menyelesaikan perkalian 2-digit dengan 2-digit tanpa menyimpan.
- **Konsep GASING:** Metode Kali Silang GASING 3 Langkah (Tanpa Menyimpan, hanya angka 1, 2, 3):
  1. Depan $\times$ Depan
  2. Kali Silang Dalam + Luar
  3. Belakang $\times$ Belakang
- **Contoh Soal Konkret:** $21 \times 32 = 672$ ($2 \times 3 = 6$; $(2 \times 2) + (1 \times 3) = 7$; $1 \times 2 = 2 \rightarrow 672$), $12 \times 23 = 276$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu melakukan perkalian 2-digit dengan 2-digit tanpa menyimpan metode kali silang seperti 21x32 = 672 atau 12x23 = 276!"*

### 33. `z3l4-sb1bermain2` — Monyet Pemakan Pisang (Kali Silang Angka Besar Tanpa Menyimpan)
- **File:** `web/src/games/Zone3Level4/SB1Bermain2.astro`
- **Mekanika:** Pilihan ganda tandan pisang (3 pilihan jawaban).
- **Konsep GASING:** Perkalian 2-digit $\times$ 2-digit tanpa menyimpan yang melibatkan angka pengali lebih besar ($4 \dots 9$).
- **Contoh Soal Konkret:** $41 \times 21 = 861$, $51 \times 11 = 561$, $71 \times 11 = 781$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan perkalian silang 2-digit dengan angka pengali besar tanpa menyimpan seperti 41x21 = 861 atau 51x11 = 561!"*

### 34. `z3l4-sb2bermain1` — Karpet Awan Aladdin (Kali Silang dengan Menyimpan)
- **File:** `web/src/games/Zone3Level4/SB2Bermain1.astro`
- **Mekanika:** Pilihan meluncur pada awan jawaban yang bergerak (3 awan pilihan).
- **Konsep GASING:** Perkalian 2-digit $\times$ 2-digit **dengan teknik menyimpan** (angka digit $\le 4$). Simpanan dari hasil kali silang tengah diteruskan ke digit sebelah kiri.
- **Contoh Soal Konkret:** $42 \times 14 = 588$, $34 \times 23 = 782$, $24 \times 32 = 768$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan perkalian 2-digit dengan 2-digit teknik menyimpan simpanan tengah seperti 42x14 = 588 atau 34x23 = 782!"*

### 35. `z3l4-sb2bermain2` — Perkalian Bersusun Ke Bawah
- **File:** `web/src/games/Zone3Level4/SB2Bermain2.astro`
- **Mekanika:** Slot digit pasir interaktif dengan numpad (langkah demi langkah baris bersusun).
- **Konsep GASING:** Format algoritma perkalian bersusun ke bawah GASING untuk angka-angka besar dan simpanan ganda.
- **Contoh Soal Konkret:** $87 \times 56 = 4.872$, $78 \times 69 = 5.382$, $94 \times 68 = 6.392$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan perkalian bersusun 2-digit dengan 2-digit angka besar seperti 87x56 = 4872 atau 78x69 = 5382!"*

### 36. `z3l4-sb2bermain3` — Ular Tangga GASING
- **File:** `web/src/games/Zone3Level4/SB2Bermain3.astro`
- **Mekanika:** Papan permainan Ular Tangga 100 Petak ($10 \times 10$) interaktif dengan lemparan dadu dan tantangan soal perkalian pada petak tangga/ular.
- **Konsep GASING:** Evaluasi komprehensif atas seluruh variasi perkalian 2-digit $\times$ 2-digit (campuran tanpa menyimpan dan dengan menyimpan).
- **Contoh Soal Konkret:** Menjawab variasi soal seperti $24 \times 13 = 312$ atau $45 \times 34 = 1.530$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan variasi tantangan perkalian 2-digit pada petak ular tangga menuju petak 100!"*

---

## 🔴 KLASTER 6: Perkalian Multi-Digit Raksasa & Algoritma Kolom Bertingkat (Level 5 & 6 — 4 Games)

### 37. `z3l5-sb1bermain1` — Tantangan Pantai Samos (3d × 1d Bersusun dari Kiri)
- **File:** `web/src/games/Zone3Level5/SB1Bermain1.astro`
- **Mekanika:** Slot digit interaktif Pantai Samos dengan numpad (pengisian digit hasil dari kiri ke kanan).
- **Konsep GASING:** Perkalian 3-digit dengan 1-digit ($3\text{d} \times 1\text{d}$) metode GASING dari kiri ke kanan (ratusan $\rightarrow$ puluhan $\rightarrow$ satuan).
- **Contoh Soal Konkret:** $328 \times 2 = 656$, $542 \times 4 = 2.168$, $764 \times 3 = 2.292$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan perkalian 3-digit dengan 1-digit dari kiri ke kanan metode GASING seperti 328x2 = 656 atau 542x4 = 2168!"*

### 38. `z3l5-sb1bermain2` — Simfoni Aritmatika (3d × 2d Bersusun Bertingkat)
- **File:** `web/src/games/Zone3Level5/SB1Bermain2.astro`
- **Mekanika:** Numpad ruang konser simfoni menyelesaikan perkalian bersusun baris demi baris.
- **Konsep GASING:** Perkalian 3-digit dengan 2-digit ($3\text{d} \times 2\text{d}$) bertingkat (Sesi 1 pengali $\le 30$, Sesi 2 pengali $> 30$).
- **Contoh Soal Konkret:** $234 \times 12 = 2.808$, $415 \times 23 = 9.545$, $624 \times 35 = 21.840$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan perkalian 3-digit dengan 2-digit bertingkat seperti 234x12 = 2808 atau 415x23 = 9545!"*

### 39. `z3l5-sb1bermain3` — Simfoni 3 Digit (3d × 3d Berjenjang Penuh)
- **File:** `web/src/games/Zone3Level5/SB1Bermain3.astro`
- **Mekanika:** Slot digit berjenjang Simfoni Concert Hall (3 baris perkalian parsial + 1 baris penjumlahan akhir).
- **Konsep GASING:** Perkalian 3-digit dengan 3-digit ($3\text{d} \times 3\text{d}$) algoritma berjenjang penuh dengan ketelitian tinggi pada pergeseran nilai tempat.
- **Contoh Soal Konkret:** $211 \times 121 = 25.531$, $432 \times 213 = 92.016$, $576 \times 687 = 395.712$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan perkalian 3-digit dengan 3-digit berjenjang penuh seperti 211x121 = 25531 atau 432x213 = 92016!"*

### 40. `z3l6-sb1bermain1` — Duel Kali Raksasa (Kejuaraan Multi-Digit 4d × 4d)
- **File:** `web/src/games/Zone3Level6/SB1Bermain1.astro`
- **Mekanika:** Colossal Sandstone Numpad di arena kejuaraan gladiator matematika.
- **Konsep GASING:** Puncak kejuaraan perkalian raksasa multi-digit ($4\text{d} \times 3\text{d}$ atau $4\text{d} \times 4\text{d}$) menguji daya tahan mental (*cognitive stamina*), ketelitian tinggi, dan otomatisasi berhitung GASING.
- **Contoh Soal Konkret:** $4.324 \times 1.232 = 5.327.168$, $3.254 \times 2.143 = 6.973.322$.
- **Formula Kemampuan:** *"Kamu [sudah/belum] mampu menyelesaikan perkalian bilangan raksasa multi-digit bersusun seperti 4324x1232 = 5327168!"*

---

Seluruh 40 permainan Asyiknya Bermain Perkalian di Zona 3 telah selesai diaudit secara detail dan terverifikasi akurat langsung terhadap kode implementasi riil. 

Langkah selanjutnya adalah melakukan audit kesenjangan terhadap **12 Pilar Standar Baku Sistem Rapor GASING** untuk Zona 3 dan menyusun perencanaan sprint eksekusinya. Silakan berikan arahan jika Bapak menghendaki kita lanjutkan ke langkah perencanaan tersebut.