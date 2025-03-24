let gameContainer = document.querySelector('.game-container');
let loseScreen = document.querySelector('.lose-screen');
let startScreen = document.querySelector('.start-screen');
let backgroundMusic = document.getElementById("background-music");
let level = 1;
let maxLevel = 25;

function startGame() {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    spawnNewImages(level);
}

function spawnNewImages(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createImage();
        }, i * 1000);
    }
}

function createImage() {
    let img = document.createElement('img');
    img.src = "https://a.top4top.io/p_3370bx0gi2.png";
    img.classList.add('moving-img');
    img.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    img.style.top = '0px';
    img.onclick = function () { explodeImage(img); };

    gameContainer.appendChild(img);
    moveImage(img);
}

function moveImage(img) {
    let interval = setInterval(() => {
        let currentTop = parseInt(img.style.top) || 0;
        img.style.top = currentTop + 5 + 'px';

        let trashCan = document.querySelector('.trash-can');
        let trashRect = trashCan.getBoundingClientRect();
        let imgRect = img.getBoundingClientRect();

        if (imgRect.bottom >= trashRect.top) {
            clearInterval(interval);
            gameOver();
        }

    }, 50);
}

function explodeImage(img) {
    img.src = "https://abs.twimg.com/emoji/v2/72x72/1f4a5.png";
    img.classList.add('explosion');

    setTimeout(() => {
        img.remove();
        nextRound();
    }, 5000);
}

function gameOver() {
    gameContainer.style.display = 'none';
    loseScreen.style.display = 'flex';
}

function restartGame() {
    level = 1;
    loseScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    spawnNewImages(level);
}

function nextRound() {
    level++;
    if (level > maxLevel) {
        alert("🎉 برافوو مروانن! لقد أكملت اللعبة!");
        restartGame();
    } else {
        spawnNewImages(level);
    }
}