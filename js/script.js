const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

const openPopup = document.getElementById("config");
const closePopup = document.getElementById("closePopup");
const popupOverlay = document.getElementById("popupOverlay");


openPopup.addEventListener("click", () => {
    popupOverlay.style.display = "block";
});

closePopup.addEventListener("click", () => {
    popupOverlay.style.display = "none";
});

popupOverlay.addEventListener("click", (event) => {
    if (event.target === popupOverlay) {
        popupOverlay.style.display = "none";
    }
});


const jumpSound = new Audio("./assets/jump.mp3");
const gameMusic = new Audio('./assets/music-theme.mp3');
gameMusic.play();
const gameOverMusic = new Audio('./assets/die.mp3');

const toggleMusic = document.getElementById("musicToggle");
function checkSwitches() {
    if (toggleMusic.checked) {
        gameMusic.currentTime = 0;
        gameMusic.volume = 100;
    } else {
        gameMusic.volume = 0;
    }
}
const toggleSoundEffects = document.getElementById("soundEffectsToggle");


musicToggle.addEventListener("change", checkSwitches);
checkSwitches();

const jump = () => {
    mario.classList.add('jump');
    if (soundEffectsToggle.checked) {
        jumpSound.play();
    } else {
        jumpSound.pause();
    }
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

let points = 0;
const pointsInterval = setInterval(() => {
    points++;
    document.getElementById('points').textContent = `Pontos: ${points}`;
}, 333);

const highScore = localStorage.getItem("record") || 0;
const savedHighScore = localStorage.getItem("record") || 0;
document.getElementById('record').textContent = `Recorde: ${savedHighScore}`;

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 80) {
        const cloudPosition = getComputedStyle(clouds).right.replace('px', '');
        gameMusic.volume = 0;
        if (toggleMusic.checked) {
            gameOverMusic.play();
        } else {
            gameOverMusic.pause();
        }

        clouds.style.animation = 'none';
        clouds.style.right = `${cloudPosition}px`;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './assets/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '30px';

        const gameOverButton = document.createElement('button');
        gameOverButton.classList.add('game-over-button');
        gameOverButton.textContent = 'Recomeçar';
        document.body.appendChild(gameOverButton);
        gameOverButton.addEventListener('click', () => {
            location.reload();
        });

        if (points > highScore) {
            localStorage.setItem("record", points);
        }

        clearInterval(pointsInterval);
        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', jump);

function saveSwitchState() {
    localStorage.setItem("musicEnabled", toggleMusic.checked);
    localStorage.setItem("soundEffectsEnabled", toggleSoundEffects.checked);
}

function loadSwitchState() {
    const musicState = localStorage.getItem("musicEnabled") === "true";
    const soundEffectsState = localStorage.getItem("soundEffectsEnabled") === "true";

    toggleMusic.checked = musicState;
    toggleSoundEffects.checked = soundEffectsState;
}

musicToggle.addEventListener("change", saveSwitchState);
soundEffectsToggle.addEventListener("change", saveSwitchState);

loadSwitchState();