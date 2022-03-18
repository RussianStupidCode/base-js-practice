const progress = document.getElementById('progress');
const form = document.querySelector('#form');
progress.value = 0.0;


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const request = new XMLHttpRequest();

    request.upload.addEventListener("progress", (loadEvent) => {
        if(loadEvent.total > 0) {
            progress.value = loadEvent.loaded / loadEvent.total ;
        }
    });
    
    request.open("POST", form.getAttribute("action"));
    const formData = new FormData(form);
    request.send(formData);
});


