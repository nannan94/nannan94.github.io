var size = 128;//定义一个确切值
var width,height;

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
box.appendChild(canvas);

var Dots = [];
var Ane = [];
var Fruit = [];
var alive = false;
var line;
var alpha=0;
var lastTime;
var deltaTime;

document.body.onload=game;//game是主入口
function game()
{
	loop();
	init();
	lastTime=Date.now();
    deltaTime=0;
}
function loop(){
	requestAnimationFrame(loop);//setInterval,setTimeout
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now

	if(deltaTime>40) deltaTime=40;	
	return deltaTime;	
}
function init(){
	function $(s){
	return document.querySelectorAll(s);
}

var lis = $("#list li");
var box = $("#box")[0];

var mv = new MusicVisualizer({
	size:size,
	visualizer:draw
})
for(var i=0;i<lis.length;i++){
	lis[i].onclick=function(){
		for(var j = 0;j < lis.length;j++){
			lis[j].className = "";
		}
		this.className = "selected";
		// load("/media/"+this.title);
		mv.play("/media/"+this.title);
	}
}
function random(m,n){
	return Math.round(Math.random()*(n-m)+m);
}
function getDots(){
	Dots = [];
	for(var i= 0;i<size;i++){
		var x = random(0,width);
		var y = random(0,height);
		var color = "rgba("+random(0,255)+","+random(0,255)+","+random(0,255)+",0.3)";
		Dots.push({
			x:x,
			y:y,
			dx:random(1,4),
			color:color,
			cap:0
		})
	}
}
function getDota(){
	Dot = [];
	for(var i= 0;i<size;i++){
		var x = random(0,width);
		var y = random(0,height*0.58);
		var color = "rgb("+random(0,255)+","+random(0,255)+","+random(0,255)+")";
		Dot.push({
			x:x,
			y:y,
			color:color
		})
	}
}
function getAnes(){
	Ane = [];
	for(var i = 0;i<size;i++){
		var rootx = i*16 + Math.random() * 20; //[0,1)
     	var headx = rootx;
     	var heady = height-250 + Math.random() * 50;
     	var amp = Math.random()*50 + 50;//振幅
     	Ane.push({
            rootx:rootx,
            headx:headx,
			heady:heady,
			amp:amp
     	});
	}
}


function resize(){
	height = box.clientHeight;
	width = box.clientWidth;
	canvas.height = height;
	canvas.width = width;
	line = ctx.createLinearGradient(0,0,0,height);//设置渐变
	line.addColorStop(0,"red");
	line.addColorStop(0.5,"yellow");
	line.addColorStop(1,"green");
	getDots();
	getDota();
	getAnes();
}
resize();

window.onresize = resize;

function draw(arr){
	ctx.clearRect(0,0,width,height);
	var w = width/size;	
	var cw = w*0.6;
	var capH = cw > 10 ? 10 : cw;//帽的宽度
	ctx.fillStyle = line;
	for(var i = 0;i < size;i++){
		var o = Dots[i];
		if(draw.type == "column"){
			var h = arr[i]/256 * height;
			ctx.fillRect(w*i,height-h,cw,h);
			ctx.fillRect(w*i,height-(o.cap+capH),cw,capH);//小帽的绘制
			o.cap--;//纵坐标递减
			if(o.cap<0){
				o.cap = 0;
			}
			if(h > 0 && o.cap < h + 40){
				o.cap = h + 40 >height - capH ? height - capH : h + 40;
			}
		}else if(draw.type=="dot"){
			 ctx.beginPath();
			var r = 10+arr[i]/256*(height > width ?height:width)/15;
			ctx.arc(o.x,o.y,r,0,Math.PI*2);
			var g = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,r);//设置渐变
			g.addColorStop(0,"#fff");
			g.addColorStop(1,o.color);
			ctx.fillStyle = g;
			ctx.fill();
			o.x += o.dx;//向右移动
			o.x = o.x >width ? 0:o.x//移动到看不见会循环回来
	}else if(draw.type=="sea"){
		 anedraw(i);
	        ctx.beginPath();
	       	ctx.shadowBlur = 15;
			var o = Dot[i];
			var r = arr[i]/256*10;
			ctx.arc(o.x,o.y,r,0,Math.PI*2);
			var g = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,r);//设置渐变
			g.addColorStop(0,"#eee");
			g.addColorStop(1,o.color);
			ctx.fillStyle = g;
			ctx.fill();
}
	}
	}


draw.type = "sea";

var types = $("#type li");
for(var i = 0;i<types.length;i++){
	types[i].onclick = function(){
		for(var j=0;j<types.length;j++){
			types[j].className = "";
		}
		this.className = "selected";
		draw.type = this.getAttribute("data-type");
	}
}

$("#volume")[0].onchange = function(){
	mv.changeVolume(this.value/this.max);
}
$("#volume")[0].onchange();

function anedraw(i){
	 	alpha += deltaTime/1000 * 0.008;//随时间变化的角度
	    var l = Math.sin(alpha);
		var a = Ane[i];
	    ctx.save();
	    ctx.globalAlpha = 0.6;
	    ctx.lineWidth = 20;
	    ctx.strokeStyle = "#062c23";
	    ctx.lineCap = "round";
	        ctx.beginPath();
	        ctx.moveTo(a.rootx,height*0.9);
	        a.headx = a.rootx + l*a.amp;
	        ctx.quadraticCurveTo(a.rootx , height-105 ,a.headx ,a.heady);
	        ctx.stroke();
	    ctx.restore();//代码只在for这里有用 
}
canvas.onclick = function(){
    mv.stop();
	}
// canvas.ondbclick = function(){
// 	mv.load("/media/"+this.title,function(arraybuffer){
// 		var bs = MusicVisualizer.ac.createBufferSource();
// 		bs.connect(mv.analyser);
// 		bs.buffer=buffer;
// 		bs[ba.start ? "start":"noteOn"](0);
// 		mv.source = bs;
// 	})
// }
}


