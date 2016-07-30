var fruitObj = function()
{
	this.alive=[];//bool池子放果实
	this.x=[];
	this.y=[];
	this.l=[];
	this.spd=[];
	this.aneNO = [];
}
fruitObj.prototype.num=30;
fruitObj.prototype.init = function()
{
	for(var i=0;i<this.num;i++)
	{
       this.alive[i] = false;
       this.x[i]=0;
       this.y[i]=0;
       this.spd[i]=Math.random()*0.017+0.003;//[0.003,0.02)
       //this.born(i);//让所有的果实都出生
	}
}
fruitObj.prototype.draw = function()
{
         for (var i = 0; i < this.num; i++) {
         	//draw
         	//find an ane ,grow,fly up
         	if(this.alive[i])
	         {
	         	if(this.l[i]<=14)
	         	{
	         		var No = this.aneNO[i];
	         		this.x[i] = ane.headx[No];
	         		this.y[i] = ane.heady[No];
	         		this.l[i]+=this.spd[i]*deltaTime;//长大
	         		dotborn();
	         	}else
	         	{
	         		this.y[i]-=this.spd[i]*7*deltaTime//浮动上去
	         	}
	            if(this.y[i]<10)//y坐标小于10的时候就不是活的
	            {
	            	this.alive[i]=false;
	            }
         	}
         }
}
function dotborn(i){
			var f = Fruit[i];
			ctx.beginPath();
			var r = f.l;
			ctx.arc(f.x,f.y,r,0,Math.PI*2);
			ctx.fillStyle = f.color;
			ctx.fill();	
}
fruitObj.prototype.dead = function(i)
{
	this.alive[i] = false;
}
fruitObj.prototype.born = function(i)
{
	this.aneNO[i] = Math.floor(Math.random()*ane.num);
    this.l[i]=0;
    this.alive[i]=true;
    var ran = Math.random();
    if(ran < 0.2)
    {
    	this.fruitType[i]="blue";//orange,blue
    }else
    {
    	this.fruitType[i]="orange";
    }
}
function fruitMonitor()//监视函数
{
	var num=0;
    for(var i=0;i<fruit.num;i++)
    {
    	if(fruit.alive[i]) num++;
    }
    if(num<15)
    {
    	sendFruit();//数量小于15个出生果实
    	return;
    }
}
function sendFruit()//生出果实的函数
{
   for(var i=0;i<fruit.num;i++)
   {
	   	if(!fruit.alive[i])
	   	{
	   		fruit.born(i);
	   		return;
	   	}
   }
}