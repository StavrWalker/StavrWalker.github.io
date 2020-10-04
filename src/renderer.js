function render() {
    let gameCtx = gameCanvas.getContext("2d");
    let tileSizeX = gameCanvas.width / sizeX;
    let tileSizeY = gameCanvas.height / sizeY;
    gameCtx.fillStyle = "#000000";
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    // draw field
    for (let iy = 0; iy < sizeY; iy++) {
        const y = iy * tileSizeY;
        const canvasY = gameCanvas.height - y - tileSizeY;
        for (let ix = 0; ix < sizeX; ix++) {
            let x = ix * tileSizeX;
            const canvasX = x;
            gameCtx.fillStyle = field[ix][iy];
            gameCtx.fillRect(canvasX, canvasY, tileSizeX, tileSizeY);
        }
    }
    // draw tetramino
    if (currentTetramino) {
        gameCtx.fillStyle = currentColor;
        currentTetramino.forEach(tile => {
            let x = tile[0] + currentX;
            let y = tile[1] + currentY;
            let canvasX = x * tileSizeX;
            let canvasY = gameCanvas.height - y * tileSizeY - tileSizeY;
            gameCtx.fillRect(canvasX, canvasY, tileSizeX, tileSizeY);
        });
    }
    // draw next
    let nextCtx = nextCanvas.getContext("2d");
    let nextTileSizeX = nextCanvas.width / 5;
    let nextTileSizeY = nextCanvas.height / 5;
    nextCtx.fillStyle = "#000000";
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    if (nextTetramino) {
        nextCtx.fillStyle = nextColor;
        nextTetramino.forEach(tile => {
            let x = tile[0] + 2;
            let y = tile[1] + 2;
            let canvasX = x * nextTileSizeX;
            let canvasY = nextCanvas.height - y * nextTileSizeY - nextTileSizeY;
            nextCtx.fillRect(canvasX, canvasY, nextTileSizeX, nextTileSizeY);
        });
    }
}
