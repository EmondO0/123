let gameContainer = document.querySelector('.game-container');
let loseScreen = document.querySelector('.lose-screen');
let startScreen = document.querySelector('.start-screen');
let gameSound = document.getElementById("game-sound");
let currentLevel = 1;
let maxLevel = 25;

function startGame() {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    gameSound.play();
    spawnNewImage(currentLevel);
}

function spawnNewImage(count) {
    for (let i = 0; i < count; i++) {
        let img = document.createElement('img');
        img.src = "https://a.top4top.io/p_3370bx0gi2.png"; // صورتك
        img.classList.add('moving-img');
        img.onclick = function () { explodeImage(img); };

        gameContainer.appendChild(img);
        animateImage(img);
    }
}

function animateImage(img) {
    let startX = Math.random() * (window.innerWidth - 100);
    let startY = 0;
    img.style.left = startX + 'px';
    img.style.top = startY + 'px';

    let interval = setInterval(() => {
        startY += 5;
        img.style.top = startY + 'px';

        let trashCan = document.querySelector('.trash-can');
        let trashRect = trashCan.getBoundingClientRect();
        let imgRect = img.getBoundingClientRect();

        if (imgRect.bottom >= trashRect.top && imgRect.left > trashRect.left - 30 && imgRect.right < trashRect.right + 30) {
            clearInterval(interval);
            gameOver();
        }

    }, 50);
}

function explodeImage(img) {
    img.src = "https://abs.twimg.com/emoji/v2/72x72/1f4a5.png"; // إيموجي انفجار
    img.classList.add('explosion');

    setTimeout(() => {
        img.remove();
        nextRound();
    }, 5000);
}

function nextRound() {
    if (currentLevel < maxLevel) {
        currentLevel++;
        spawnNewImage(currentLevel);
    } else {
        victory();
    }
}

function gameOver() {
    gameContainer.style.display = 'none';
    loseScreen.style.display = 'flex';
}

function restartGame() {
    loseScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    currentLevel = 1;
    spawnNewImage(currentLevel);
}

function victory() {
    alert("🎉 برافوو مروانن! لقد فزت بكل الجولات! 🎉");
    restartGame();
}