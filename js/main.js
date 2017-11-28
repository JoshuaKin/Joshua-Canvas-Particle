var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
/*画布自定义属性*/
var CANVAS = {
    bgColor: 'rgba(255,255,255,1)',
    width: null,
    height: null,
}
var width = canvas.width = CANVAS.width || window.innerWidth;
var height = canvas.height = CANVAS.height || window.innerHeight;
canvas.style.backgroundColor = CANVAS.bgColor || 'rgba(0,0,0,.9)';
/*防止死循环自动停止*/
// var ifRun = true;
// setTimeout(function() {
//     ifRun = false;
// }, 10000)
/*球容器*/


var balls = [];
/*******************************************
/*球自定义参数*/
var BALL = {
    /*总数*/
    count: 80,
    color: 'rgb(205,205,205)',
    size: null
}
/*连线自定义参数*/
var LINE = {
    dis: 100,
    color: 'rgba(205, 205, 205, .3)'
}
/******************************************


/*球的参数*/
var ball = function() {
    this.color = BALL.color || 'rgb(205,205,205)' || joshuaJs.randomColor();
    this.size = BALL.size || joshuaJs.randomNumber(2, 4);
    this.x = joshuaJs.randomNumber(0 + this.size, width - this.size);
    this.y = joshuaJs.randomNumber(0 + this.size, height - this.size);
    this.randX = joshuaJs.randomNumber(-10, 10) / 30 || joshuaJs.randomNumber(-10, 10) / 30;
    this.randY = joshuaJs.randomNumber(-10, 10) / 30 || joshuaJs.randomNumber(-10, 10) / 30;
}
/*初始造球*/
var init = function() {
    for (var i = 0; i < BALL.count; i++) {
        balls.push(new ball());
    }
}
/*画球*/
var draw = function() {
    for (var i = 0; i < balls.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = balls[i].color;
        ctx.arc(balls[i].x, balls[i].y, balls[i].size, 0, 2 * Math.PI);
        ctx.fill();
    }
}
/*球的运动*/
var update = function(argument) {
    for (var i = 0; i < balls.length; i++) {
        if (!obstacle(balls[i], 'x')) balls[i].randX = -balls[i].randX;
        if (!obstacle(balls[i], 'y')) balls[i].randY = -balls[i].randY;
        balls[i].x += balls[i].randX;
        balls[i].y += balls[i].randY;
    }

}
/*碰壁判断*/
var obstacle = function(data, type) {
    if (type == 'x') {
        if (data.x + data.randX >= width - data.size || data.x + data.randX <= 0 + data.size) {
            return false;
        } else return true;
    }
    if (type == 'y') {
        if (data.y + data.randY >= height - data.size || data.y + data.randY <= 0 + data.size) {
            return false;
        } else return true;
    }
}
/*连线*/
var drawLine = function() {
    for (var i = 0; i < balls.length; i++) {
        for (var j = 0; j < balls.length; j++) {
            if (i == j) continue;
            if (!ifTooFar(balls[i], balls[j])) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.strokeStyle = LINE.color || 'rgba(205, 205, 205, .3)';
                ctx.lineWidth = '1px';
                ctx.stroke();
            }
        }
    }
}
/*连线距离判断*/
var ifTooFar = function(main, sub) {
    var distance = Math.sqrt(Math.abs(Math.pow(main.x - sub.x, 2) + Math.pow(main.y - sub.y, 2)));
    if (distance > LINE.dis) return true;
    else return false;
}
/*循环主体*/
var loop = function() {
    ctx.clearRect(0, 0, width, height);
    draw();
    update();
    drawLine();
    /*防死循环*/
    // if (ifRun)  
    requestAnimationFrame(loop);
}
init();
loop();