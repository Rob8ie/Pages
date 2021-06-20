var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// //Autofocusing on canvas not working
// canvas.setAttribute('tabIndex','0');
// canvas.focus();

//To Add -  Remove input delay
//          Countdown on first open + play button
//          AI difficulty levels
//          Power-ups
//          Pause when focus lost


// Creating controllable rectangle - Remove input delay
var xPos = 30;
var yPos = 200;

ctx.fillRect(xPos,yPos,30,100);
ctx.stroke();

function move(e) {
    if (e.keyCode==38){
        yPos-=8;
    }
    if (e.keyCode==40){
        yPos+=8;
    }
}
document.onkeydown = move;

// Creating ball
var initialD = (Math.floor(Math.random()*90)-45) - (Math.round(Math.random())*180-180);
console.log(initialD);
if (initialD<0){
    initialD = initialD + 360;
}
var speed = 3;
var angle = initialD;
xPosBall = myCanvas.width/2;
yPosBall = myCanvas.height/2;
p1Score = 0;
p2Score = 0;

ctx.beginPath();
ctx.arc(xPosBall,yPosBall,50,0,2*Math.PI);
ctx.fill();


function baller(){
    xPosBall = xPosBall + Math.cos(angle*Math.PI/180)*speed;
    yPosBall = yPosBall + Math.sin(angle*Math.PI/180)*speed;

    if (xPosBall >= myCanvas.width - 110){
        if (yPosBall > yPosAI || yPosBall < yPosAI + 100){
            angle = (((yPosAI+50) - yPosBall)/100)*120+180;
        }
        if (angle < 0) {
            angle = angle + 360;
        }
        speed = speed*1.05;
    }

    if (xPosBall >= myCanvas.width-50){
        if (angle >= 180){
            angle = 270 - (angle-270);
        } else {
            angle = 90 + (90-angle);
        }
        p1Score = p1Score +1;
        reset();
        setTimeout(500);
    }
    
    if (xPosBall <= 110){
        if (yPosBall > yPos || yPosBall < yPos + 100){
            angle = ((yPosBall - (yPos+50))/100)*120;
        }
        if (angle < 0) {
            angle = angle + 360;
        }
        speed = speed*1.05;
    }

    if (xPosBall <= 50){
        if (angle >= 180){
            angle = 270 + (270-angle);
        } else {
            angle = 90 - (angle-90);
        }
         p2Score = p2Score + 1;
         reset();
         setTimeout(500);
    }

    if (yPosBall >= myCanvas.height-50){
        if (angle >= 90){
            angle = 180 + (180-angle);
        } else {
            angle = 360 - angle;
        }
    }
    
    if (yPosBall <= 50){
        if (angle >= 270){
            angle = 360 - angle;
        } else {
            angle = 180 - (angle-180);
        }
    }

    setTimeout(baller,10);
}
baller();

function reset(){
    var initialDReset = (Math.floor(Math.random()*90)-45) - (Math.round(Math.random())*180-180);
if (initialDReset<0){
    initialDReset = initialDReset + 360;
}
speed = 3;
angle = initialDReset;
xPosBall = myCanvas.width/2;
yPosBall = myCanvas.height/2;
yPos = 200;
yPosAI = 200;
}

// Creating opponent (difficulty levels?)

var xPosAI = myCanvas.width-60;
var yPosAI = 200;

ctx.fillRect(xPosAI,yPosAI,30,100);
ctx.stroke();

function AI(e) {
    if (yPosBall > yPosAI+50) {
        yPosAI = yPosAI + 3;
    } else {
        yPosAI = yPosAI - 3;
    }

    setTimeout(AI,40);
}
AI();

//Refreshing whole screen - Pause when focus lost?
function screen(){

    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

    ctx.beginPath();
    ctx.fillRect(xPos,yPos,30,100);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillRect(xPosAI,yPosAI,30,100);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(xPosBall,yPosBall,50,0,2*Math.PI);
    ctx.fill();

    ctx.font = "200px Arial"
    ctx.fillText(p1Score + " - " + p2Score, myCanvas.width/2-200, myCanvas.height/2+70);

    setTimeout(screen,50);
}
screen();