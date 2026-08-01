const videoInput = document.getElementById("videoInput");
const preview = document.getElementById("preview");
const compressBtn = document.getElementById("compressBtn");
const downloadBtn = document.getElementById("downloadBtn");
const status = document.getElementById("status");

let outputFile = null;

// Preview Video
videoInput.addEventListener("change", () => {
    const file = videoInput.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";

    downloadBtn.disabled = true;
    outputFile = null;
});

// Compress
compressBtn.addEventListener("click", async () => {

    if (videoInput.files.length === 0) {
        alert("Please choose a video first.");
        return;
    }

    status.innerHTML = "⏳ Loading FFmpeg...";

    try {

        await loadFFmpeg();

        status.innerHTML = "📦 Compressing...";

        const file = videoInput.files[0];

        await ffmpeg.writeFile(
            "input.mp4",
            await fetchFile(file)
        );

        await ffmpeg.exec([
            "-i",
            "input.mp4",
            "-vcodec",
            "libx264",
            "-crf",
            "30",
            "-preset",
            "fast",
            "output.mp4"
        ]);

        const data = await ffmpeg.readFile("output.mp4");

        outputFile = new Blob([data.buffer], {
            type: "video/mp4"
        });

        status.innerHTML = "✅ Compression Complete";

        downloadBtn.disabled = false;

    } catch (err) {

        console.error(err);

        status.innerHTML = "❌ Compression Failed";

        alert("Compression Error");

    }

});

// Download
downloadBtn.addEventListener("click", () => {

    if (!outputFile) return;

    const a = document.createElement("a");

    a.href = URL.createObjectURL(outputFile);

    a.download = "7JENZ_Compressed.mp4";

    a.click();

});
