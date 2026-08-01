const { FFmpeg } = FFmpegWASM;

const ffmpeg = new FFmpeg();

let ffmpegLoaded = false;

async function loadFFmpeg() {

    if (ffmpegLoaded) return;

    await ffmpeg.load({
        coreURL:
        "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js"
    });

    ffmpegLoaded = true;
}
