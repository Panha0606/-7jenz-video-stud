const videoInput = document.getElementById("videoInput");
const preview = document.getElementById("preview");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");
const status = document.getElementById("status");
const progressBar = document.getElementById("progressBar");
const compressBtn = document.getElementById("compressBtn");
const downloadBtn = document.getElementById("downloadBtn");

let selectedFile = null;

videoInput.addEventListener("change", () => {

    selectedFile = videoInput.files[0];

    if (!selectedFile) return;

    preview.src = URL.createObjectURL(selectedFile);
    preview.style.display = "block";

    fileName.textContent = "File: " + selectedFile.name;

    fileSize.textContent =
        "Size: " +
        (selectedFile.size / 1024 / 1024).toFixed(2) +
        " MB";

    status.textContent = "Ready";

    progressBar.style.width = "0%";

    downloadBtn.disabled = true;

});

compressBtn.addEventListener("click", () => {

    if (!selectedFile) {

        alert("Please choose a video.");

        return;

    }

    status.textContent = "Preparing...";

    let percent = 0;

    const timer = setInterval(() => {

        percent += 5;

        progressBar.style.width = percent + "%";

        status.textContent =
            "Compressing... " + percent + "%";

        if (percent >= 100) {

            clearInterval(timer);

            status.textContent =
                "Compression Complete (Demo)";

            downloadBtn.disabled = false;

        }

    }, 150);

});

downloadBtn.addEventListener("click", () => {

    if (!selectedFile) return;

    const link = document.createElement("a");

    link.href = URL.createObjectURL(selectedFile);

    link.download = selectedFile.name;

    link.click();

});
