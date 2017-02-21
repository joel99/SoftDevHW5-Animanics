
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var clrBtn = document.getElementById("clearbtn");
var circBtn = document.getElementById("circbtn");
var dvdBtn = document.getElementById("dvdbtn");
var stopBtn = document.getElementById("stopbtn");
var mousex, mousey;
var rid;
var img = new Image();
img.src = "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Dvd-video-logo.svg/1280px-Dvd-video-logo.svg.png";

canvas.addEventListener("mousemove", function(e) {
    mousex = e.offsetX;
    mousey = e.offsetY;
});

var clrScreen = function(){
    ctx.clearRect(0, 0, width, height);
}

var drawCirc = function(x,y,r){
    ctx.beginPath();
    ctx.arc(x,y,r,0, 2*Math.PI);
    ctx.strokeStyle = "#444444";
    ctx.stroke();
    ctx.fillStyle = "#AAAAAA";
    ctx.fill();
    ctx.beginPath();
}

var drawDVD = function(x,y, imgW, imgH){
    ctx.drawImage(img, x, y, imgW, imgH);
}

var circleAnim = function(){
    window.cancelAnimationFrame(rid);
    var r = 0;
    var x = width / 4 + Math.random() * width / 2;
    var y = height / 4 + Math.random() * height / 2;
    var dir = 2;
    
    var anim = function(){
	
	clrScreen();
	
	r += dir;
	
	if (dir >= 0 &&
	    (x - r <= 0 ||
	     x + r >= width ||
	     y - r <= 0 ||
	     y + r >= height
	    )
	   ){
	    dir = -2;
	}
	else if (dir <= 0 && r <= 0){
	    dir = 2;
	    r = 2;
	}
	drawCirc(x,y,r);
	rid = window.requestAnimationFrame(anim);
	
    }
    anim();
    
}

var dvdAnim = function(){
    window.cancelAnimationFrame(rid);
    var xVel = 2;
    var yVel = 2;
    var x = width / 4 + Math.random() * width / 2;
    var y = height / 4 + Math.random() * height / 2;
    var imgW = width/6;
    var imgH = height/6;
    
    var anim = function(){
	
	clrScreen();
	x += xVel;
	y += yVel;
	
	if (xVel >= 0 && x + imgW >= width){
	    xVel = -2;
	}
	if (xVel <= 0 && x <= 0){
	    xVel = 2;
	}
	if (yVel >= 0 && y + imgH >= height){
	    yVel = -2;
	}
	if (yVel <= 0 && y <= 0){
	    yVel = 2;
	}
	
	drawDVD(x,y,imgW, imgH);
	
	rid = window.requestAnimationFrame(anim);
	
    }
    
    anim();
    
    
}

var stopAll = function(){
    window.cancelAnimationFrame(rid);
}

clrBtn.addEventListener("click", clrScreen);
circBtn.addEventListener("click", circleAnim);
stopBtn.addEventListener("click", stopAll);
dvdBtn.addEventListener("click", dvdAnim);
