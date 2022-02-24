let cookie = document.querySelector("#cookie");
let coockieBaseWidth = +cookie.getAttribute('width');
let clicker = document.querySelector('.clicker')
let counter = +clicker.querySelector("#clicker__counter").textContent;
let speed = +clicker.querySelector("#clicker__speed").textContent;
let lastClickTime = null;


function changeSizeCookie(cookie, coockieBaseWidth) {
    cookie.setAttribute('width', coockieBaseWidth * 1.1);
    setTimeout(() => {
        cookie.setAttribute('width', coockieBaseWidth);
    }, 100);
}

function setClickSpeed(clicker) {
    let clickTime = new Date();

    if(lastClickTime === null) {
        lastClickTime = clickTime;
        return;
    }

    clicker.querySelector("#clicker__speed").textContent = (1000 / (clickTime - lastClickTime)).toFixed(2);
    lastClickTime = clickTime;
}


function clickHandler(event) {
    let counter = +clicker.querySelector("#clicker__counter").textContent;
    counter++;

    changeSizeCookie(cookie, coockieBaseWidth);
    clicker.querySelector("#clicker__counter").textContent = counter;
    setClickSpeed(clicker);
}

function main() {
    cookie.onclick = clickHandler;
}

main();