var context = $("#canvas").get(0).getContext("2d");
var paint;

var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";

var curColor = colorPurple;
var clickColor = new Array();

var clickTool = new Array();
var curTool = "marker";

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

$('#clear').click(function() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    clickX = [];
    clickY = [];
    clickDrag = [];
    clickColor = [];
});

//Changing all the colors
$('#purple').click(function(){
    curColor = colorPurple;
});
$('#green').click(function(){
    curColor = colorGreen;
});
$('#yellow').click(function(){
    curColor = colorYellow;
});
$('#brown').click(function(){
    curColor = colorBrown;
});

$(".color").click(function(){
    if (curTool == "eraser"){
        curTool = "marker"
    }
});

//Changing the tools
$('#marker').click(function(){
    curTool = "marker";
});
$('#eraser').click(function(){
    curTool = "eraser";
});

function addClick(x, y, dragging){
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  if(curTool == "eraser"){
    clickColor.push("white");
  } else {
    clickColor.push(curColor);
  }
}

$('#canvas').mousedown(function(e){
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});

function redraw(){
    //Currently very inefficent, redraws canvas over and over
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

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
     context.stroke();
    }
    context.globalAlpha = 1;
}
