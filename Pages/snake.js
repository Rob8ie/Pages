let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let trailOne = [];                 //new Array();
let trailTwo = [];                 //new Array();

let oneSet = false;
let speed = myCanvas.width/20;

//Starting position and direction for player one
let oneX = 5*myCanvas.width/20+myCanvas.width/40;
let oneY = 5*myCanvas.height/20+myCanvas.height/40;
let oneDirection = "up";

trailOne.push({x:oneX, y:oneY}); //Add Boundaries

oneY = trailOne[0].y-myCanvas.height/40;

function set(e){
    if (e.keyCode == 87){ //W
        oneDirection = "up";
        oneY = trailOne[0].y-myCanvas.height/40;
        oneX = trailOne[0].x;
        oneSet = true;
    } else if (e.keyCode == 65){ //A
        oneDirection = "left";
        oneX = trailOne[0].x-myCanvas.width/40;
        oneY = trailOne[0].y;
        oneSet = true;
    } else if (e.keyCode == 83){ //S
        oneDirection = "down";
        oneY = trailOne[0].y+myCanvas.height/40;
        oneX = trailOne[0].x;
        oneSet = true;
    } else if (e.keyCode == 68){ //D
        oneDirection = "right";
        oneX = trailOne[0].x+myCanvas.width/40;
        oneY = trailOne[0].y;
        oneSet = true;
    }
}

document.onkeydown = set;

if (oneSet == true){
    snakeOne();
    console.log("f");
}

function snakeOne(){
    //check for inputs - sub-routine?
    console.log("Snake is Active");
    move(oneDirection, oneX, oneY);
    setTimeout(100);
}

function move(direction, x, y){
    if (direction == "up"){
        y = y - speed;
    } else if (direction == "left"){
        x = x - speed;
    } else if (direction == "down"){
        y = y + speed;
    } else if (direction == "right"){
        x = x + speed;
    } else console.log("no");
    console.log("move");
}


if (oneSet == true){
    console.log("it worked!!");
}



//Refreshing whole screen
function screen(){

    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

    //Drawing Player One
    ctx.fillStyle = "red";
    for (let i=0; i<trailOne.length; i++){
        ctx.fillRect(trailOne[i].x-myCanvas.width/40, trailOne[i].y-myCanvas.width/40, myCanvas.width/20, myCanvas.height/20);
    }
    ctx.beginPath();
    ctx.arc(oneX,oneY,myCanvas.width/40,0,2*Math.PI);
    ctx.fill();

    //Drawing Player Two
    //

    //Drawing Grid
    for (let i=1; i<20; i++){
        ctx.beginPath();
        ctx.moveTo(i*myCanvas.width/20,0);
        ctx.lineTo(i*myCanvas.width/20, myCanvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,i*myCanvas.height/20);
        ctx.lineTo(myCanvas.width, i*myCanvas.height/20);
        ctx.stroke();

    }

    setTimeout(screen,100);
}
screen();