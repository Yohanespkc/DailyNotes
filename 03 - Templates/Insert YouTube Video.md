<%*
const url = await tp.system.prompt("Masukkan URL YouTube (contoh: https://www.youtube.com/watch?v=n4Ix9rQi778):");
if (!url) return;

const timeInput = await tp.system.prompt("Masukkan Menit/Waktu (contoh: 1:21 atau 81):", "1:21");

// Extract YouTube Video ID
let videoId = "";
const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
if (match && match[1]) {
  videoId = match[1];
} else {
  videoId = url.trim();
}

// Convert MM:SS format to total seconds
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

const embedResult = `<iframe width="100%" height="380" src="https://www.youtube.com/embed/${videoId}?start=${totalSeconds}" title="YouTube video player" frameborder="0" allowfullscreen></iframe>\n\n> 🔗 **Link Direct:** [Buka di YouTube (Menit ${timeInput || "0:00"})](https://youtu.be/${videoId}?t=${totalSeconds}s)  \n> 🕒 **Dimasukkan Pada:** ${formattedDate}`;
_%>
<% embedResult %>
