// Graphics
const usernameLabel = document.getElementById("username");
const levelLabel = document.getElementById("level");
const scoreLabel = document.getElementById("score");
const gameCanvas = document.getElementById("gameCanvas");
const nextCanvas = document.getElementById("nextCanvas");
const scoresTable = document.getElementById("scores");
const scoresBody = document.getElementById("scoresBody")

// Configuration
const sizeX = Math.round(gameCanvas.width / 50);
const sizeY = Math.round(gameCanvas.height / 50);
const scorePerLine = 100;
const scorePerLevel = 100; //300;
const delayPerLevel = 50;

// Logic
let isStopped = false;
let frames = 0;
let score = 0;
let scoreToNextLevel = scorePerLevel;
let level = 1;
let delay = 500; // 1000/FPS
let currentColor = "#000000";
let nextColor = "#ffffff"
let currentTetramino = null;
let nextTetramino = null;
let currentX = 0;
let currentY = 0;
let field = Array(sizeX)
    .fill()
    .map(() => Array(sizeY).fill("#000000"));

// Init
usernameLabel.innerHTML = localStorage["username"];
renderRecords();

const loop = function () {
    frames++;
    levelLabel.innerHTML = level;
    scoreLabel.innerHTML = `${score}`// [to next level ${scoreToNextLevel}] [currentColor ${currentColor}] [x ${currentX}] [y ${currentY}] [frames ${frames}]`;
    moveDown();
    render();

    if (!isStopped) timeoutHandle = setTimeout(loop, delay);
};

let timeoutHandle = setTimeout(loop, delay);

document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
            if (isStopped) break;
            moveSide(-1);
            break;
        case "KeyD":
        case "ArrowRight":
            if (isStopped) break;
            moveSide(1);
            break;
        case "KeyW":
        case "ArrowUp":
            if (isStopped) break;
            rotate(1);
            break;
        case "KeyS":
        case "ArrowDown":
            if (isStopped) break;
            moveDown();
            break;
        case "Escape":
            stop();
            break;
        case "Space":
            restart();
            break;
    }
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
});

function getNextTetramino() {
    currentColor = nextColor;
    nextColor = getRandColor(3);
    currentTetramino = nextTetramino;
    nextTetramino = clone(tetraminos[Math.floor(Math.random() * tetraminos.length)]);
}

function moveSide(dir) {
    if (currentTetramino) {
        currentX += dir;
        if (checkCollision()) {
            currentX -= dir;
        }
    }
    render();
}

function moveDown() {
    if (currentTetramino) {
        currentY--;
        if (checkCollision()) {
            currentY++;
            for (const tile of currentTetramino) {
                const y = tile[1] + currentY;
                const x = tile[0] + currentX;
                if (x >= 0 && x < sizeX && y >= 0 && y < sizeY) {
                    field[x][y] = currentColor;
                } else {
                    stop();
                    break;
                }
            }
            if (!isStopped) {
                checkLines();
                currentTetramino = null;
            }
        }
    } else {
        getNextTetramino();
        currentX = Math.round(sizeX / 2);
        currentY = sizeY;
        // console.log("new figure");
    }
    render();
}

function checkLines() {
    for (let y = sizeY - 1; y >= 0; y--) {
        let isFull = true;
        for (let x = 0; x < sizeX; x++) {
            if (field[x][y] == "#000000") {
                isFull = false;
                break;
            }
        }
        if (isFull) {
            score += scorePerLine;
            scoreToNextLevel -= scorePerLine;
            if (scoreToNextLevel <= 0) {
                scoreToNextLevel = scorePerLevel;
                level++;
                delay *= 0.9;
            }
            for (let sy = y; sy < sizeY - 1; sy++) {
                for (let sx = 0; sx < sizeX; sx++) {
                    field[sx][sy] = field[sx][sy + 1];
                }
            }
        }
    }
}

function checkCollision() {
    for (const tile of currentTetramino) {
        const y = tile[1] + currentY;
        if (y < 0) return true;
        const x = tile[0] + currentX;
        if (x < 0 || x >= sizeX) return true;
        if (y < sizeY && field[x][y] != "#000000") return true;
    }
    return false;
}

function rotate(dir) {
    if (currentTetramino) {
        for (let tile of currentTetramino) {
            let temp = tile[1];
            tile[1] = -tile[0] * dir;
            tile[0] = temp * dir;
        }
        if (checkCollision()) {
            for (let tile of currentTetramino) {
                let temp = tile[1];
                tile[1] = -tile[0] * -dir;
                tile[0] = temp * -dir;
            }
        }
    }
    render();
}

function stop() {
    console.log("Losed");
    isStopped = true;
    clearTimeout(timeoutHandle);
    newRecord(score);
}

function restart() {
    // TODO
    document.location.reload();
}
