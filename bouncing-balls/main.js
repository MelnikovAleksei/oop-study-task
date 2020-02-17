let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let header = document.querySelector('h1');
let count = 0;

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}
class Shape {
    constructor(x, y, velX, velY, exists) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }
}

class Ball extends Shape {
    constructor(x, y, velX, velY, exists, color, size){
        super(x, y, velX, velY, exists);
        this.color = color;
        this.size = size;
    }
}

class EvilCircle extends Shape {
    constructor(x, y, velX, velY, exists){
        super(x, y, 20, 20, exists);
        this.color = 'white';
        this.size = 10;
    }
}

EvilCircle.prototype.draw = function () {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}

EvilCircle.prototype.checkBounds = function () {
    if((this.x + this.size) >= width) {
        this.x -= this.size;
      }
    
      if((this.x - this.size) <= 0) {
        this.x += this.size;
      }
    
      if((this.y + this.size) >= height) {
        this.y -= this.size;
      }
    
      if((this.y - this.size) <= 0) {
        this.y += this.size;
      }
    };

EvilCircle.prototype.setControls = function () {
    let _this = this;
    window.onkeydown = function (e) {
        if(e.key === 'a'){
            _this.x -= _this.velX;
        } else if(e.key === 'd'){
            _this.x += _this.velX;
        } else if(e.key === 'w'){
            _this.y -= _this.velY;
        } else if(e.key === 's'){
            _this.y += _this.velY;
        }
    }
}

EvilCircle.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (balls[j].exists) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + balls[j].size) {
                evil.size += balls[j].size / 3;
               
                balls[j].exists = false;
                count--;
                header.textContent = 'Ball count: ' + count;
            }
        }  
    }    
}
/* 

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

*/

Ball.prototype.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
}

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    };
    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    };
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    };
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    };
    
    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
              }
        }
    }
}

let balls = [];

while (balls.length < 15) {
    let size = random(10, 20);
    let ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-5, 5),
        random(-5, 5),
        true,
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size 
    );
    balls.push(ball);
    count++;
    header.textContent = 'Ball count: ' + count;
}

let evil = new EvilCircle(random(0,width), random(0,height), true);
    evil.setControls();

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, width, height);

    for (let index = 0; index < balls.length; index++) {
        if(balls[index].exists) {
            balls[index].draw();
            balls[index].update();
            balls[index].collisionDetect();
        }
    }

    evil.draw();
    evil.checkBounds();
    evil.collisionDetect();

    requestAnimationFrame(loop);
}

loop()
