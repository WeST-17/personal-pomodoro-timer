const bells = new Audio('./sounds/mixkit-happy-bell.wav'); 
const startBtn = document.getElementById('start-btn'); 
const session = document.querySelector('.minutes'); 
let myInterval; 
let state = true;

const appTimer = () => {
    const sessionTime = Number.parseInt(session.textContent);

    if(state) {
        state = false;
        let totalSeconds = sessionTime * 60;

        const updateSeconds = () => {
            const minuteClass = document.querySelector('.minutes');
            const secondClass = document.querySelector('.seconds')

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds/60);
            let secondsLeft = totalSeconds % 60;

            if(secondsLeft < 10) {
                secondClass.textContent = '0' + secondsLeft;
            } else {
                secondClass.textContent = secondsLeft;
            }
            minuteClass.textContent = '${minutesLeft}';

            if(minutesLeft === 0 && secondsLeft === 0) {
                bells.play();
                clearInterval(myInterval);
            }
        }

        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session has already started.')
    }

}
