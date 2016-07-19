
window.onload = function(){
	document.onselectstart = new Function('event.returnValue=false;');//禁止图片被选中
	$("#main").draggable({containment:'parent',drag:setChoice});
	var rightDiv = document.getElementById("right");
	var upDiv = document.getElementById("up");
	var downDiv = document.getElementById("down");
	var leftDiv = document.getElementById("left");
    var mainDiv = document.getElementById("main");
    var rightUpDiv = document.getElementById("right-up");
    var leftUpDiv = document.getElementById("left-up");
    var rightDownDiv = document.getElementById("right-down");
    var leftDownDiv = document.getElementById("left-down");
    var ifKeyDown = false;//鼠标按下状态
    var contact = "";//表示被按下的触点
    //鼠标按下事件
    rightDiv.onmousedown = function(){
    	 e.stopPropagation();//阻止事件冒泡（父元素和子元素一起执行）
         ifKeyDown = true;
         contact = "right";
    }
    upDiv.onmousedown = function(){
    	e.stopPropagation();ifKeyDown = true;
    	contact = "up";
    }
    leftDiv.onmousedown = function(e){
        e.stopPropagation(); 
        ifKeyDown = true;
         contact = "left";
    }
    downDiv.onmousedown = function(e){
    	e.stopPropagation();
    	ifKeyDown = true;
    	contact = "down";
    }
    rightUpDiv.onmousedown = function(e){
    	e.stopPropagation();
    	ifKeyDown = true;
    	contact = "right-up";
    }
    leftUpDiv.onmousedown = function(e){
    	e.stopPropagation();
    	ifKeyDown = true;
    	contact = "left-up";
    }
    rightDownDiv.onmousedown = function(e){
    	e.stopPropagation();
    	ifKeyDown = true;
    	contact = "right-down";
    }
    leftDownDiv.onmousedown = function(e){
    	e.stopPropagation();
    	ifKeyDown = true;
    	contact = "left-down";
    }
    //鼠标松开事件
    window.onmouseup = function(){
    	ifKeyDown = false;
    }
//鼠标移动事件
window.onmousemove = function(e){
	if(ifKeyDown == true){
		switch(contact){
			case "right":rightMove(e);break;
			case "up":upMove(e);;break;
			case "left":leftMove(e);break;
			case "down":downMove(e);break;
			case "left-up":leftMove(e);upMove(e);break;
			case "right-up":rightMove(e);upMove(e);break;
			case "left-down":downMove(e);leftMove(e);break;
			case "right-down":downMove(e);rightMove(e);break;
		}

		// if(contact == "right"){
		// 	rightMove(e);
		// }else if(contact == "up"){
  //            upMove(e);
		// }else if(contact == "left"){
  //          leftMove(e);
		// }else if(contact == "down"){
  //          downMove(e);
		// }else if(contact == "left-up"){
  //           leftMove(e);upMove(e);
		// }else if(contact == "right-up"){
  //          rightMove(e);upMove(e);
		// }else if(contact == "left-down"){
  //          downMove(e);leftMove(e);
		// }else if(contact == "right-down"){
  //          downMove(e);rightMove(e);
		// }
	
    }setChoice();setPreview();//调用下面的函数
  }
  //边移动
function rightMove(e){
	var x = e.clientX;//鼠标x坐标
	var addWidth = "";//鼠标移动后选取框增加的宽度
	var widthBefore = mainDiv.offsetWidth - 2;//选取框变化前的宽度
	addWidth = x - getPosition(mainDiv).left - widthBefore;//鼠标移动后的增加的宽度
	mainDiv.style.width = addWidth + widthBefore + "px";//选取框变化后的
}
function upMove(e){
    var y = e.clientY;//鼠标纵坐标
    var mainY = getPosition(mainDiv).top;//选取框相对于屏幕上边的距离 
    var addHeight =mainY - y;//增加的高度
    var heightBefore = mainDiv.offsetHeight - 2;//原来的高度
    mainDiv.style.height = heightBefore + addHeight +"px";
    mainDiv.style.top = mainDiv.offsetTop -addHeight +"px"; 
}
function leftMove(e){
    var x = e.clientX;//鼠标纵坐标
    var mainX = getPosition(mainDiv).left;//选取框相对于屏幕上边的距离 
    var addWidth =mainX - x;//增加的高度
    var widthBefore = mainDiv.offsetWidth - 2;//原来的高度
    mainDiv.style.width = widthBefore + addWidth +"px";//现在的宽度
    mainDiv.style.left = mainDiv.offsetLeft -addWidth +"px";//现在的横坐标
}
function downMove(e){
    var y = e.clientY;//鼠标纵坐标
    var mainY = getPosition(mainDiv).top;//选取框相对于屏幕上边的距离 
    var heightBefore = mainDiv.offsetHeight - 2;//原来的高度
    var addHeight = y - heightBefore - mainY;//增加的高度
    mainDiv.style.height = heightBefore + addHeight +"px";
}


//获取元素相对于屏幕左边的距离，利用offsetLeft
function getPosition(node){
    var left = node.offsetLeft;
    var top = node.offsetTop;
    var parent = node.offsetParent;
    while(parent !=null){
    	left +=parent.offsetLeft;
    	top +=parent.offsetTop;
    	parent=parent.offsetParent;
    }
    return {"left":left,"top":top};
}
//设置选取区域高亮可见
function setChoice(){
	var top = mainDiv.offsetTop;
	var right = mainDiv.offsetLeft+mainDiv.offsetWidth;
	var bottom = mainDiv.offsetTop+mainDiv.offsetHeight;
	var left = mainDiv.offsetLeft;
	var img2 = document.getElementById("img2");
	img2.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
}
//预览函数
function setPreview(){
	var top = mainDiv.offsetTop;
	var right = mainDiv.offsetLeft+mainDiv.offsetWidth;
	var bottom = mainDiv.offsetTop+mainDiv.offsetHeight;
	var left = mainDiv.offsetLeft;
	var img2 = document.getElementById("img2");
	var img3 = document.getElementById("img3");
	img3.style.top = -top +"px";//减去增加的高度，让他保持在固定的高度
	img3.style.left = -left+"px";
	img3.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
}
}