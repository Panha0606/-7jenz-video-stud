const videoInput = document.getElementById("videoInput");
const preview = document.getElementById("preview");

videoInput.addEventListener("change", function () {

    const file = this.files[0];

    if(file){

        preview.src = URL.createObjectURL(file);

        preview.style.display = "block";

    }

});

const buttons = document.querySelectorAll("button");

buttons[0].onclick = async () => {
     await loadFFmpeg();

    if(videoInput.files.length===0){

        alert("Please select a video first.");

        return;

    }

    alert("Compression will be added in the next step.");

}

buttons[1].onclick = () => {

    alert("Download will be added later.");

}