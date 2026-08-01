const { FFmpeg } = FFmpegWASM;
const { fetchFile } = FFmpegUtil;

const ffmpeg = new FFmpeg();

let ffmpegLoaded = false;

async function loadFFmpeg() {

    if (ffmpegLoaded) return;

    await ffmpeg.load({
        coreURL: "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js",
        wasmURL: "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm"
    });

    ffmpegLoaded = true;
}
ffmpeg.on("progress", ({ progress }) => {
    const percent = Math.round(progress * 100);
    document.getElementById("status").innerHTML =
        "📦 Compressing... " + percent + "%";
});
