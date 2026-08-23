<%*
const url = await tp.system.prompt("Masukkan URL Artikel:");
if (!url) return;

// --- KONFIGURASI API KEY ---
// Ganti teks di bawah ini dengan API Key Gemini Anda yang sesungguhnya.
// Anda bisa mendapatkannya secara gratis di: https://aistudio.google.com/app/apikey
const API_KEY = "GANTI_DENGAN_API_KEY_ANDA"; 

let summary = "Menganalisis artikel...";
new Notice("Mengambil artikel dan membuat ringkasan dengan AI...", 4000);

try {
    // Mengambil isi web menggunakan requestUrl bawaan Obsidian (untuk bypass CORS)
    const response = await requestUrl({ url: url });
    const html = response.text;
    
    // Mengekstrak teks dari HTML secara sederhana
    const doc = new DOMParser().parseFromString(html, "text/html");
    // Menghapus elemen script dan style agar tidak ikut terangkum
    const scripts = doc.querySelectorAll('script, style, nav, footer');
    scripts.forEach(s => s.remove());
    
    // Mengambil maksimal 5000 karakter agar tidak melebihi batas token yang wajar
    const articleText = doc.body.innerText.trim().replace(/\s+/g, ' ').substring(0, 5000); 
    
    if(API_KEY === "GANTI_DENGAN_API_KEY_ANDA") {
        summary = "⚠️ **Peringatan:** Anda belum memasukkan API Key Gemini. Silakan edit template ini dan masukkan API Key Anda.";
    } else {
        // Memanggil Gemini API untuk merangkum teks
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        const aiResponse = await requestUrl({
            url: geminiUrl,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Tolong buatkan ringkasan poin-poin yang singkat dan informatif dalam bahasa Indonesia dari isi artikel berikut:\n\n${articleText}` }]
                }]
            })
        });
        
        const aiData = aiResponse.json;
        if (aiData.candidates && aiData.candidates.length > 0) {
            summary = aiData.candidates[0].content.parts[0].text;
        } else {
            summary = "Gagal memuat ringkasan. AI tidak mengembalikan respons.";
        }
    }
} catch (e) {
    console.error(e);
    summary = "Gagal memuat ringkasan. Pastikan URL bisa diakses (beberapa web memblokir pengambilan data otomatis).";
}

const output = `> [!info] Artikel: ${url}
> 
> **Ringkasan AI:**
> ${summary.split('\\n').join('\\n> ')}

## Tampilan Artikel
<iframe src="${url}" width="100%" height="800px" frameborder="0" style="border-radius: 8px; border: 1px solid #ccc;"></iframe>
`;

tR += output;
%>
