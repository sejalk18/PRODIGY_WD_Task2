let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 1000);
    toggleButtons(true, false, true, true);
}

function pause() {
    clearInterval(timerInterval);
    toggleButtons(false, true, false, true);
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    toggleButtons(false, true, false, true);
    laps = [];
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    const lapTime = elapsedTime;
    laps.push(formatTime(lapTime));
    updateLaps();
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("stopwatch").innerHTML = formattedTime;
}

function formatTime(time) {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds
    );
}

function toggleButtons(start, pause, reset, lap) {
    document.getElementById("startBtn").disabled = start;
    document.getElementById("pauseBtn").disabled = pause;
    document.getElementById("resetBtn").disabled = reset;
    document.getElementById("lapBtn").disabled = lap;
}

function updateLaps() {
    const lapsContainer = document.getElementById("laps");
    lapsContainer.innerHTML = "";
    laps.forEach((lap, index) => {
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapItem);
    });
}
