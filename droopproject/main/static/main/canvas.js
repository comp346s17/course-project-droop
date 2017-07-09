var context = $("#canvas").get(0).getContext("2d");
var context2 = $("#canvas2").get(0).getContext("2d");
var context3 = $("#canvas3").get(0).getContext("2d");
context.canvas.width = window.innerWidth * 0.75;
context.canvas.height = window.innerHeight * 0.6;
context2.canvas.width = window.innerWidth * 0.75;
context2.canvas.height = window.innerHeight * 0.6;
context3.canvas.width = window.innerWidth * 0.75;
context3.canvas.height = window.innerHeight * 0.6;


var img = $("#img");

img.on('load', function() {
    $(this).css("width", context.canvas.width);
    $(this).css("height", context.canvas.height);
    $("#canvas").css("background-image", "url(" + $(this).data("root") + ")");
    $("#canvas").css("background-repeat", "no-repeat"); //Background window-size messed up
    $("#canvas3").css("background-image", "url(" + $(this).data("root") + ")");
    $("#canvas3").css("background-repeat", "no-repeat");
});

var painting;

// Keeping track of latest used colors,  sizes, tools, locations
//Colors
var curColor = "black";
var clickColor = [];

//Line sizes
var lineSizes = {"small": 2, "regular": 5, "large": 10, "extraLarge": 15, "bigBertha": 40};
var curLineSize = lineSizes.regular;
var clickSize = [];

//Tools
var curTool = "marker";
var clickTool = [];

//Click locations
var clickX = [];
var clickY = [];
var clickDrag = [];

//Currently Pressed Buttons
var currColorButton = "black";
var currToolButton = "marker";
var currLineSizeButton = "regular";

$('#clear').click(function() {
    //Clears the canvas & reset arrays

    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    clickX = [];
    clickY = [];
    clickDrag = [];
    clickColor = [];
    clickSize = [];
    curTool = "marker";
});

//Changing all the colors
$(".color").click(function() {
    curColor = this.id; // Using built in Javascript colors
    $("#"+currColorButton).toggleClass("currently-used");
    $(this).toggleClass("currently-used");

    if (curTool == "eraser") {
        curTool = "marker";
        $("#"+currToolButton).toggleClass("currently-used");
        currToolButton = "marker";
        $("#"+currToolButton).toggleClass("currently-used");
    }

    currColorButton = this.id;
});
//

//Changing the tools
$(".tool").click(function() {
    $("#"+currToolButton).toggleClass("currently-used");
    $(this).toggleClass("currently-used");
    currToolButton = this.id;
});

$('#marker').click(function(){
    curTool = "marker";
});

$('#eraser').click(function(){
    curTool = "eraser";
});

//Changing all the line Sizes, Refactor into one function where each button shares a class 'draw-size'
$(".draw-size").click(function() {
    curLineSize = lineSizes[this.id];
    $("#"+currLineSizeButton).toggleClass("currently-used");
    $(this).toggleClass("currently-used");
    currLineSizeButton = this.id;
});

$('#undo').click(function() {
    if (clickX.length > 0) {
        clickX.pop();
        clickY.pop();
    }
});

function addClick(x, y, dragging){
    //Called whenever the user clicks on the canvas adds x,y,drag and pushed color or white if erased

    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    if(curTool == "eraser"){
        //clickColor.push("red")
        clickColor.push("white");
    } else {
        clickColor.push(curColor);
    }
    clickSize.push(curLineSize);
}

/*
    offSet{Direction} returns the {Direction} position in pixels relative to the {Direction} side of the parent element.
    page{Coordinate axis} returns the position of the mouse pointer
*/
$('#canvas').mousedown(function(e){
    //Adds initial painting if the user is drawing on the canvas

    painting = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
});

$('#canvas').mousemove(function(e){
  if (painting) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  painting = false;
});

$('#canvas').mouseleave(function(e){
  painting = false;
});

function redraw(){
//Currently very inefficent, redraws canvas over and over
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    context.lineJoin = "round";

    for(var i=0; i < clickX.length; i++) {
        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.strokeStyle = clickColor[i];
        context.lineWidth = clickSize[i];
        context.stroke();
    }
    //context.globalCompositeOperation = "source-over";
    context.globalAlpha = 1;
}
