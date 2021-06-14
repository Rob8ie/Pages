var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

document.getElementById("button").addEventListener("click", function(){
    function getInputValue(){
        var inputVal = document.getElementById("myInput").value;
   }
    
   //resets all arrays and strings
    array = [];
    track = [];
    inputArray = [];
    formula = "";

    inputArray = Array.from(document.getElementById("myInput").value);

    //translates inputs into a string JS can read (totally unnecessary?)
   for (let i=0; i<=inputArray.length-1; i++)
        if (isNaN(inputArray[i])===false) {
            formula += (inputArray[i])
        } else if (inputArray[i]==="x") {
            formula += ("i")
        } else if (inputArray[i]==="+") {
            formula += ("+")
        } else if (inputArray[i]==="-") {
            formula += ("-")
        } else if (inputArray[i]==="^") {
            formula += ("**")
        } else if (inputArray[i]==="*") {
            formula += ("*")
        } else if (inputArray[i]==="/") {
            formula += ("/")
        } else if (inputArray[i]==="(") {
            formula += ("(")
        } else if (inputArray[i]===")") {
            formula += (")")
        } else {
            alert("The only supported characters are: x (the letter), +, -, ^, *, /, (, ) and numbers")
        }

    console.log(formula);

    //creates an array based on inputted formula (is inputted a word?)
   for (let i=-10; i<=10; i++) {
       track.push(i);
       //eval BAD, look for alternative
       array.push(eval(formula));
   }
   
   //setting up canvas
   ctx.clearRect(0,0,myCanvas.width,myCanvas.height)
   ctx.font = "20px Arial";

   ctx.beginPath();
   ctx.moveTo(myCanvas.width/2,0);
   ctx.lineTo(myCanvas.width/2,myCanvas.height);
   ctx.stroke();
   
   ctx.moveTo(0,myCanvas.height/2);
   ctx.lineTo(myCanvas.width,myCanvas.height/2);
   ctx.stroke();
   
   //scaling graph to canvas
   max = Math.max(...array);
   min = Math.min(...array);
   if (max>=(min*-1)) {
    scale = myCanvas.height/(max*2);
   } else {
    scale = myCanvas.height/(min*-2);
   }


   //drawing lines
   for (let x=0; x<20; x++) {
       ctx.moveTo(x*50, scale*-array[x]+myCanvas.height/2); //update
       ctx.lineTo((x+1)*50, scale*-array[x+1]+myCanvas.height/2); //update
       ctx.stroke();
       ctx.fillText(track[x], x*50, myCanvas.height/2)
       ctx.fillText(array[x], myCanvas.width/2, 50*x)
   }
console.log(array)
})

