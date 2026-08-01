const { FFmpeg } = FFmpegWASM;

const ffmpeg = new FFmpeg();

let ffmpegLoaded = false;

async function loadFFmpeg() {
    if (ffmpegLoaded) return;

    try {
        alert("Loading FFmpeg...\nPlease wait a moment.");

        await ffmpeg.load();

        ffmpegLoaded = true;

        alert("✅ FFmpeg Loaded Successfully");

    } catch (err) {
        console.error(err);
        alert("❌ Failed to load FFmpeg");
    }
}