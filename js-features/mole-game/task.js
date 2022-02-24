let gameStatus = document.querySelector('.status');
let hitCount = +gameStatus.querySelector('#dead').textContent;
let missCount = +gameStatus.querySelector('#lost').textContent;
let startTime = +gameStatus.querySelector('#timer').textContent;
let timer = startTime;
let holes = document.querySelectorAll(".hole");


function clickHandler(event) {
    if(event.target.classList.contains("hole_has-mole")) {
        ++hitCount;
        gameStatus.querySelector('#dead').textContent = hitCount;
    } else {
        ++missCount;
        gameStatus.querySelector('#lost').textContent = missCount;
    }

    checkGameStatus();
}

function zeroStatus() {
    missCount = 0;
    hitCount = 0;
    timer = startTime;
    gameStatus.querySelector('#lost').textContent = 0;
    gameStatus.querySelector('#dead').textContent = 0;
    gameStatus.querySelector('#timer').textContent = startTime;
}

function checkGameStatus() {   
    if(hitCount >= 10) {
        alert("You win!!");
        zeroStatus();
        return;
    }

    if(missCount >= 5) {
        alert("You died!!");
        zeroStatus();
        return;
    }
    
}

function tickTimer() {
    if(timer <= 0) {
        alert("You died!!");
        zeroStatus();
        return;
    }

    --timer; 
    gameStatus.querySelector('#timer').textContent = timer;
}


function main() {
    for(let hole of holes) {
        hole.onclick = clickHandler;
    }

    setInterval(() => {tickTimer()}, 1000);
}


main();