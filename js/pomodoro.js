var workTime = 25;
var breakTime = 5;
var currentTime = workTime * 60;
var isBreak = false;
var timer;
var audio = null;
var isRunning = false;

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
function displayTime() {
    document.getElementById('timer').textContent = formatTime(currentTime);
}

function updateTimer() {
    document.getElementById('timer').textContent = formatTime(currentTime);

    if (currentTime <= 0) {
        isBreak = !isBreak;
        currentTime = isBreak ? breakTime * 60 : workTime * 60;

        // Reproducir sonido
        if (audio === null) {
            audio = new Audio('sound/alarma-morning-mix.mp3');
            audio.play();
        }
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
        isRunning = false;
    }
    currentTime -= 1;
}

document.getElementById('start').addEventListener('click', function() {
    if (audio !== null) {
        audio.pause();
        audio.currentTime = 0;
        audio = null;
    }

    if (!isRunning) {
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
    }
    if (timer === null) {
        timer = setInterval(updateTimer, 1000);
    }
    isRunning = true;
});

document.getElementById('pause').addEventListener('click', function() {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}); 

document.getElementById('reset').addEventListener('click', function() {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
    isBreak = false;
    currentTime = workTime * 60;
    displayTime();
});

document.getElementById('update').addEventListener('click', function() {
    workTime = parseInt(document.getElementById('workTime').value);
    breakTime = parseInt(document.getElementById('breakTime').value);
    if (!isNaN(workTime) && !isNaN(breakTime)) {
        clearInterval(timer);
        isBreak = false;
        currentTime = workTime * 60;
        displayTime();
        isRunning = false;
        if (!isRunning) {
            timer = setInterval(updateTimer, 1000);
            isRunning = true;
        }
    } else {
        alert("Please enter valid numbers for work and break times.");
    }
});
displayTime();

