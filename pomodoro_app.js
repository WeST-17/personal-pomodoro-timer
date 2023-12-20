const bells = new Audio('./sounds/mixkit-happy-bell.wav'); 
const startBtn = document.querySelector('.start');

const workTime = 210*10000;
const restTime = 60*10000;
let time = workTime;
let rest = restTime;

let workIntervals = 3;
let currentMode = "Work";


const appTimerBox = document.querySelector('.app-counter-box');
const timer = document.getElementById('timer');
const modeElement = document.getElementById('mode');

let state = 'paused';

let countdownInterval;
updateCountdown(time);
appTimer(time);

startBtn.addEventListener('click', () => {
    if (state === 'paused') {
        play();
    }
})

function appTimer(pTime) {
    countdownInterval = setInterval(() => {
        if (state === 'running') {
            pTime -= 1000;
            if (pTime <= 0) {
                clearInterval(countdownInterval);
                workIntervals = currentMode == "Work" ? workIntervals - 1 : workIntervals;
                if (workIntervals > 0) {
                    switchMode();
                }
            } 
            // Update timer
            updateCountdown(pTime)
        }
    }, 1000)
}

function updateCountdown(pTime) {
    if (pTime <= 0 && workIntervals <= 0) {
        // reset angle and turn red
        appTimerBox.style.setProperty('--angle', '360deg');
        
        bells.play();
        timer.innerText = `00:00`;
        modeElement.innerText = `FINISHED!`;
    } else {
        //calculate angle
        let angle = pTime / time * 360 + 'deg';
        if (pTime == 0) {
            angle = '360deg';
        }
        let color = currentMode == "Work" ? '#d8e9ef' : 'darkgrey';
        
        appTimerBox.style.setProperty('--angle', angle);
        appTimerBox.style.setProperty('--color', color);

        //minutes and seconds
        let minutes = Math.floor(pTime / 60 / 1000).toString().padStart(2, "0");
        let seconds = Math.floor((pTime / 1000) % 60).toString().padStart(2, "0");

        timer.innerText = `${minutes}:${seconds}`;
        modeElement.innerText = `${currentMode}: ${workIntervals}`;
    }   
}

function switchMode() {
    currentMode = currentMode == "Work" ? "Rest" : "Work";
    time = currentMode == "Work" ? workTime : restTime;
    updateCountdown(time);
    appTimer(time);
}

function play() {
    state = 'running';
    clearInterval(countdownInterval);
    appTimer(time);
    // Add d-none class with a slight delay
    setTimeout(() => {
        document.querySelector('.for-user').classList.add('d-none');
        document.querySelector('.app-message').classList.add('d-none');
        bells.play();
    }, 250);
    
    document.querySelector('.start').classList.add('d-none');
    document.querySelector('.pause').classList.remove('d-none');
}

function pause() {
    state = 'paused';
    clearInterval(countdownInterval);
    //console.log(workIntervals);
    
    let [minutes, seconds] = timer.innerText.split(":");
    time = ((minutes * 60) + seconds * 1) * 1000;
    document.querySelector('.start').classList.remove('d-none');
    document.querySelector('.pause').classList.add('d-none');
}

function reset() {
    state = 'paused';
    clearInterval(countdownInterval);
    currentMode = "Work";
    time = workTime;
    rest = restTime;
    workIntervals = 3;

    document.querySelector('.start').classList.remove('d-none');
    document.querySelector('.pause').classList.add('d-none');
    document.querySelector('.for-user').classList.remove('d-none');
    document.querySelector('.app-message').classList.remove('d-none');
    updateCountdown(time);
    appTimer(time);
}

function applyChanges() {
    time = document.getElementById("set-work-time").value * 60 * 1000;
    rest = document.getElementById("set-rest-time").value * 60 * 1000;
    workIntervals = document.getElementById("work-interval").value;

    currentMode = "Work";
    clearInterval(countdownInterval);
    updateCountdown(time);
    appTimer(time);
}