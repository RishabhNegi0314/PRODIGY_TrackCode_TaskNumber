const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const display = document.getElementById('display');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');


let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lastLapTime = 0;
let lapTimes = [];
let lapCounter = 0;

function formatTime(timeInMs) {
    const ms = timeInMs % 1000;
    const seconds = Math.floor((timeInMs / 1000) % 60);
    const minutes = Math.floor((timeInMs / (1000 * 60)) % 60);
    const hours = Math.floor((timeInMs / (1000 * 60 * 60)) % 24);
    
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMs = ms.toString().padStart(3, '0');
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMs}`;
}

function updateDisplay() {
    const currentTime = running ? Date.now() - startTime + elapsedTime : elapsedTime;
    display.textContent = formatTime(currentTime);
}

function startTimer() {
    if (!running) {
        running = true;
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
        
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    }
}
function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        
        pauseBtn.style.display = 'none';
        startBtn.style.display = 'block';
    }
}

function resetTimer() {
    running = false;
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    lastLapTime = 0;
    lapTimes = [];
    lapCounter = 0;
    
    updateDisplay();
    const lapItems = document.querySelectorAll('.lap-item');
    lapItems.forEach(item => item.remove());
    
    pauseBtn.style.display = 'none';
    startBtn.style.display = 'block';
}

function resetTimer() {
    running = false;
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    lastLapTime = 0;
    lapTimes = [];
    lapCounter = 0;
    
    updateDisplay();
    const lapItems = document.querySelectorAll('.lap-item');
    lapItems.forEach(item => item.remove());
    
    pauseBtn.style.display = 'none';
    startBtn.style.display = 'block';
}

function recordLap() {
    if (running || elapsedTime > 0) {
        const currentTime = running ? Date.now() - startTime + elapsedTime : elapsedTime;
        const lapTime = currentTime - lastLapTime;
        lastLapTime = currentTime;
        
        lapCounter++;
        lapTimes.push(lapTime);
        
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-item';
        lapElement.innerHTML = `
            <span class="lap-number">Lap ${lapCounter}</span>
            <span class="lap-time">${formatTime(lapTime)}</span>
            <span class="lap-time">${formatTime(currentTime)}</span>
        `;
        
        const lapsDiv = document.getElementById('laps');
        
        if (lapsDiv.firstChild) {
            lapsDiv.insertBefore(lapElement, lapsDiv.firstChild);
        } else {
            lapsDiv.appendChild(lapElement);
        }
        
        if (lapTimes.length >= 2) {
            updateLapHighlights();
        }
    }
}

function updateLapHighlights() {
    const allLapItems = document.querySelectorAll('.lap-item');
    allLapItems.forEach(item => {
        item.classList.remove('best-lap', 'worst-lap');
    });
    
    if (lapTimes.length >= 2) {
        const bestLap = Math.min(...lapTimes);
        const worstLap = Math.max(...lapTimes);

        const bestLapIndex = lapTimes.indexOf(bestLap);
        const worstLapIndex = lapTimes.indexOf(worstLap);

        const lapElements = {};
        allLapItems.forEach(item => {
            const lapNumberElement = item.querySelector('.lap-number');
            if (lapNumberElement) {
                const lapNumber = parseInt(lapNumberElement.textContent.replace('Lap ', ''), 10);
                lapElements[lapNumber] = item;
            }
        });
        
        if (lapElements[bestLapIndex + 1]) {
            lapElements[bestLapIndex + 1].classList.add('best-lap');
        }
        
        if (lapElements[worstLapIndex + 1]) {
            lapElements[worstLapIndex + 1].classList.add('worst-lap');
        }
    }
}
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
updateDisplay();