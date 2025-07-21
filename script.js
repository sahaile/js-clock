'use strict';

class Ticker {
    static instance = null;

    constructor() {
        if (Ticker.instance) {
            throw new Error("Ticker instance already exists.");
        }
        this.observers = [];
        this.tick();
        Ticker.instance = this;
        this.isTicking = false;
    }

    //https://medium.com/@stheodorejohn/exploring-javascript-design-patterns-c257aa261550
    static getInstance() {
        if (!Ticker.instance) {
            Ticker.instance = new Ticker();
        }
        return Ticker.instance;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notify() {
        for (const observer of this.observers) {
            observer.update();
        }
    }

    tick() {
        if (this.isTicking === true){
            return;
        }
        this.isTicking = true;
        this.notify();  
        setTimeout(() => {
            this.isTicking = false;  
            this.tick();             
        }, 1000);
    }
}

class Clock {
    constructor(){
        this.clock = document.getElementById('clockDisplay');
    }

    update() {
        const date = new Date();
        const time = date.toLocaleTimeString();
        this.clock.textContent = time;
    }
}

class Timer {
    constructor(){
        this.timerDisplay = document.getElementById('timerDisplay');
        this.timerStatus = document.getElementById('timerStatus');
        this.checkbox = document.getElementById('timerRunCheckbox');
        this.checkboxLabel = document.getElementById('checkboxLabel');
        this.restartButton = document.getElementById('timerRestartButton');
        this.minutesInput = document.getElementById('minutesInput');
        this.secondsInput = document.getElementById('secondsInput');
        this.progressBar = document.getElementById('timerBar');
        
        this.running = false;
        this.timeLeft = 0;
        this.initialTime = 0;

        this.checkbox.addEventListener('change', () => this.runTimer());
        this.restartButton.addEventListener('click', () => this.restart());
    }

    runTimer() {
        if (this.checkbox.checked) {
            if (this.timeLeft === 0) {
                const mins = parseInt(this.minutesInput.value) || 0;
                const secs = parseInt(this.secondsInput.value) || 0;

                if (secs > 59) {
                    alert("Seconds must be between 0 - 59");
                    this.checkbox.checked = false;
                    return;
                }

                this.timeLeft = mins * 60 + secs;
                this.initialTime = this.timeLeft;
            }

            if (this.timeLeft > 0) {
                this.running = true;
                this.timerStatus.hidden = true;
                this.checkboxLabel.textContent = 'Stop:'
                this.minutesInput.disabled = true;
                this.secondsInput.disabled = true;
            } else {
                alert("Please enter a time greater than zero");
                this.checkbox.checked = false;
                this.running = false;
                this.timeLeft = 0;
                this.initialTime = 0;

            }
        } else {
            this.running = false;
            this.checkboxLabel.textContent = 'Start:'
            this.timerStatus.hidden = false;
            this.timerStatus.textContent = 'Timer Stopped!'
        }
    }

    restart() {
        this.running = false;
        this.checkbox.checked = false;
        this.checkboxLabel.textContent = 'Start:'
        this.timeLeft = 0;
        this.initialTime = 0;
        this.minutesInput.value = 0;
        this.secondsInput.value = 0;
        this.minutesInput.disabled = false;
        this.secondsInput.disabled = false;
        this.updateDisplay(0);
        this.timerStatus.hidden = false;
        this.timerStatus.textContent = 'Timer Restarted!'
        this.progressBar.style.width = 0 + '%';
    }


    updateDisplay(totalSeconds) {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        this.timerDisplay.textContent = String(mins).padStart(2, '0') + ":" + String(secs).padStart(2, '0');
        const percent = 100 - ((this.timeLeft / this.initialTime) * 100);
        this.progressBar.style.width = percent + '%';

        if (this.timeLeft === 0 && this.running){
            this.timerStatus.hidden = false;
            this.timerStatus.textContent =  "Time's Up!";
            this.running = false;
            this.timeLeft = 0;
            this.initialTime = 0;
            this.checkboxLabel.textContent = 'Start:'
        }


    }

    update() {
        if (this.running) {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.updateDisplay(this.timeLeft);

                if (this.timeLeft === 0) {
                    this.running = false;
                    this.checkbox.checked = false;
                    this.minutesInput.disabled = false;
                    this.secondsInput.disabled = false;
                }
            }
        }
    }
}

class Countdown {
    constructor(){
        this.countdownDisplay = document.getElementById('countdownDisplay');
        this.countdownInput = document.getElementById('countdownInput');
        this.countdownComplete = document.getElementById('countdownComplete');

        this.countdownInput.addEventListener('change', () => this.startCountdown());

        this.dateFilled = false;
        this.countdownDate = null;
        this.complete = null;
    }

    startCountdown() {
        this.countdownDate = new Date(this.countdownInput.value);
        this.dateFilled = true;
        this.countdownComplete.hidden = true;
        this.complete = false;
    }

    update(){
        if (this.dateFilled && this.countdownDate && this.complete !== true) {
            const currentDate = new Date();
            const countdownDiff = this.countdownDate - currentDate;

            //https://www.w3schools.com/howto/howto_js_countdown.asp
            //used for time conversions
            if(Math.floor(countdownDiff / 1000) === 0){
                console.log("complete")
                const totalSeconds = Math.floor(Math.abs(countdownDiff) / 1000);
                const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
                const months = Math.floor((totalSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
                const days = Math.floor((totalSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
                const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
                const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
                const seconds = totalSeconds % 60;
                this.countdownDisplay.textContent =
                    `${years} years ${months} months ${days} days ${hours} hours ${minutes} mintues ${seconds} seconds ago`;
                this.countdownComplete.hidden = false;
                this.complete = true;

            }
            else if (countdownDiff > 0){
                const totalSeconds = Math.floor(countdownDiff / 1000);
                const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
                const months = Math.floor((totalSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
                const days = Math.floor((totalSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
                const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
                const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
                const seconds = totalSeconds % 60;

                this.countdownDisplay.textContent =
                    `${years} years ${months} months ${days} days ${hours} hours ${minutes} mintues ${seconds} seconds remaining`;

                this.countdownComplete.hidden = true;

            }
            else if (countdownDiff < 0 ){
                const totalSeconds = Math.floor(Math.abs(countdownDiff) / 1000);
                const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
                const months = Math.floor((totalSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
                const days = Math.floor((totalSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
                const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
                const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
                const seconds = totalSeconds % 60;

                this.countdownDisplay.textContent =
                    `${years} years ${months} months ${days} days ${hours} hours ${minutes} mintues ${seconds} seconds ago`;
                
                this.countdownComplete.hidden = true;

            }
        }
    }
    
}

class Stopwatch {
    constructor(){
        this.stopwatchDisplay = document.getElementById('stopwatchDisplay');
        this.startButton = document.getElementById('stopwatchStartButton');
        this.stopButton = document.getElementById('stopwatchStopButton');
        this.resetButton = document.getElementById('stopwatchResetButton');
        
        this.running = false;
        this.startTime = null;
        this.elapsed = 0;

        this.startButton.addEventListener('click', () => this.start());
        this.stopButton.addEventListener('click', () => this.stop());
        this.resetButton.addEventListener('click', () => this.reset());
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.startTime = new Date().getTime() - this.elapsed;
            this.stopButton.disabled = false;
            this.startButton.disabled = true;
        }
    }

    stop() {
        if (this.running) {
            this.running = false;
            this.elapsed = new Date().getTime() - this.startTime;
            this.stopButton.disabled = true;
            this.startButton.disabled = false;
        }
    }

    reset() {
        this.running = false;
        this.elapsed = 0;
        this.startTime = null;
        this.updateDisplay(0);
        this.stopButton.disabled = true;
        this.startButton.disabled = false;
    }

    updateDisplay(elapsedMilliseconds) {
        const totalElapsedMilliseconds = Math.floor(elapsedMilliseconds);
        const totalSeconds = Math.floor(totalElapsedMilliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = totalElapsedMilliseconds % 1000;

        this.stopwatchDisplay.textContent =
            `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
    }
    update() {
        if (this.running) {
            this.elapsed = new Date().getTime() - this.startTime;
            this.updateDisplay(this.elapsed);
        }
    }
}

function main() {
    const ticker = Ticker.getInstance();         
    const clock = new Clock();
    const timer = new Timer();
    const stopwatch = new Stopwatch();
    const countdown = new Countdown();
    ticker.addObserver(clock);  
    ticker.addObserver(timer);  
    ticker.addObserver(stopwatch);                            
    ticker.addObserver(countdown);                           
}

window.addEventListener('load', main);
