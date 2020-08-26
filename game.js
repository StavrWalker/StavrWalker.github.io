let canvas, context, balls = []

function Ball(x, y, rad, color) {
    this.center_x = x
    this.center_y = y
    this.radius = rad
    this.color = color
    this.speed = 10
    this.dx = -this.speed + Math.floor(Math.random() * Math.floor(this.speed));
    this.dy = -this.speed + Math.floor(Math.random() * Math.floor(this.speed));
    this.draw = function () {
        context.beginPath();
        context.arc(this.center_x, this.center_y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
    this.updateSelf = function () {
        if(this.center_x + this.dx > canvas.width - this.radius || this.center_x + this.dx < this.radius) {
            this.dx = -this.dx;
            this.color=getRandomColor()
        }
        if(this.center_y + this.dy > canvas.height - this.radius || this.center_y + this.dy < this.radius) {
            this.dy = -this.dy;
            this.color=getRandomColor()
        }
        this.center_x += this.dx
        this.center_y += this.dy
    }
}

function  createRandomBall() {
    let radius = 15 + Math.floor(Math.random() * Math.floor(10));
    let x = radius + Math.random() * (canvas.width - (2 * radius));
    let y = radius + Math.random() * (canvas.height - (2 * radius));
    let color = getRandomColor()
    balls.push(new Ball(x, y, radius, color))
}

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("gameField");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    context = canvas.getContext("2d");
    createRandomBall()
    update()
}, false)

document.addEventListener("keydown", (e) => {
    switch(e.code) {
        case "Space":
            createRandomBall()
            break;
        case "Escape":
            balls.pop()
            break;
    }
})

function update() {
    canvas = document.getElementById("gameField");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    context = canvas.getContext("2d");
    draw()
    balls.forEach(ball => {ball.updateSelf()})
    requestAnimationFrame(update)
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {ball.draw()})
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
