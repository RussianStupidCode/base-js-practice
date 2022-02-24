let startTime = +document.querySelector('#timer').textContent;
let isClose = false;
let intervalId = null;


function integerDivision(val, by){
    return (val - val % by) / by;
}


function timeToStr(value) {
    if (value > 9) {
        return `${value}`;
    }

    return `0${value}`; 
}

function convertTime(time) {
    let hours = timeToStr(integerDivision(time, 3600));
    let minuts = timeToStr(integerDivision(time, 60) % 60);
    let seconds = timeToStr(time % 60);

    return `${hours}:${minuts}:${seconds}`;
}

function tickTime() {
    if(isClose && intervalId !== null) {
        clearInterval(intervalId);
        window.location.assign("https://github.com/RussianStupidCode/async-mailing-example/blob/master/contacts.db?raw=true");
        return;
    }

    if(startTime <= 0) {
        alert("Вы победили в конкурсе!");
        isClose = true;
        return;
    }

    --startTime;
    document.querySelector('#timer').textContent = convertTime(startTime);
}


function main() {
    intervalId = setInterval(() => {tickTime()}, 1000);

   
}

main();