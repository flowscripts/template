let startTime, updatedTime, difference, tInterval;
let running = false;
let precision = 0;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const radioButtons = document.querySelectorAll('input[name="precision"]');
const buttons = [startButton, stopButton, resetButton];

startButton.addEventListener("click", () => handleClick(startButton));
stopButton.addEventListener("click", () => handleClick(stopButton));
resetButton.addEventListener("click", () => handleClick(resetButton));
radioButtons.forEach(radio => radio.addEventListener("change", setPrecision));

function handleClick(button) {
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    if (button.id === "start") start();
    else if (button.id === "stop") stop();
    else if (button.id === "reset") reset();
}

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 100);
        running = true;
    }
}

function stop() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.innerHTML = "00:00:00";
    document.title = "Stopwatch";
}

function setPrecision() {
    precision = Number(document.querySelector('input[name="precision"]:checked').value);
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = (updatedTime % (1000 * 60)) / 1000;
    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${formatTime(seconds)}`;
    document.title = formatTitle(hours, minutes, seconds);
}

function formatTime(time) {
    return precision === 0 ? pad(Math.floor(time))
        : time.toFixed(precision).padStart(2 + precision + 1, "0");
}

function pad(number) {
    return number < 10 ? "0" + number : number;
}

function formatTitle(hours, minutes, seconds) {
    const secondsInt = Math.floor(seconds);
    const secondsFraction = seconds - secondsInt;
    const formattedSeconds = secondsInt + (precision > 0 ? secondsFraction.toFixed(precision).slice(1) : "");
    let title = "Stopwatch";

    if (hours > 0) {
        title = `${hours}:${pad(minutes)}:${pad(formattedSeconds)} - Stopwatch`;
    } else if (minutes > 0) {
        title = `${minutes}:${pad(formattedSeconds)} - Stopwatch`;
    } else if (secondsInt > 0) {
        title = `${secondsInt} - Stopwatch`;
    } else {
        title = `0${secondsFraction ? secondsFraction.toFixed(precision).slice(1) : ""} - Stopwatch`;
    }

    return title;
}
