
const display = document.querySelector('.display');
const millisecondsDisplay = document.querySelector('.milliseconds');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsContainer = document.querySelector('.laps');

let startTime;
let elapsedTime = 0;
let timeInterval;
let isRunning = false;
let lastLapTime = 0;

function formatTime(ms) {
    const date = new Date(ms);
    const mainTime = date.toISOString().slice(11, 19);
    const milliseconds = String(ms % 1000).padStart(3, '0');
    return [mainTime, milliseconds];
}

function updateDisplay() {
    const [time, ms] = formatTime(elapsedTime);
    display.innerHTML = `${time}<span class="milliseconds">.${ms}</span>`;
}

function start() {
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = 'Pause';
        startBtn.classList.replace('start', 'pause');
        startTime = Date.now() - elapsedTime;
        timeInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    } else {
        isRunning = false;
        startBtn.textContent = 'Start';
        startBtn.classList.replace('pause', 'start');
        clearInterval(timeInterval);
    }
}

function reset() {
    clearInterval(timeInterval);
    isRunning = false;
    elapsedTime = 0;
    lastLapTime = 0;
    startBtn.textContent = 'Start';
    startBtn.classList.replace('pause', 'start');
    updateDisplay();
    lapsContainer.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = elapsedTime - lastLapTime;
        lastLapTime = elapsedTime;
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap-time');
        const [time, ms] = formatTime(lapTime);
        lapElement.textContent = `Lap ${lapsContainer.children.length + 1}: ${time}.${ms}`;
        lapsContainer.insertBefore(lapElement, lapsContainer.firstChild);
    }
}

startBtn.addEventListener('click', start);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

updateDisplay();
