var youCanvas = document.getElementById('youcanvas')
var ctx = youCanvas.getContext("2d");
ctx.translate(160,160);
function nextTimezhishi(num,startTime,endTime,name){
    ctx.clearRect(-200,-200,375,375);
    var startText=blueTime_timeToAngle(startTime);
    var overText=blueTime_timeToAngle(endTime);
    var centerText=overText+2;
    if(startText-overText>10&&startText-overText<100){
        centerText=overText+5;
    }
    if(startText-overText>20&&startText-overText<100){
        centerText=overText+10;
    }
    //白色斜线
    ctx.beginPath();
    ctx.strokeStyle="#9db9e1";
    ctx.lineWidth="1";
    //ctx.rotate(min*Math.PI/30);
    ctx.moveTo(Math.sin(2*Math.PI / 360*centerText) * (num+20),Math.cos(2*Math.PI / 360*centerText) * (num+20));
    ctx.lineTo(Math.sin(2*Math.PI / 360*centerText) * (num+40),Math.cos(2*Math.PI / 360*centerText) * (num+40));
    ctx.stroke();
    //白色横线
    ctx.beginPath();
    ctx.strokeStyle="#9db9e1";
    ctx.lineWidth="1";
    //ctx.rotate(min*Math.PI/30);
    ctx.moveTo(Math.sin(2*Math.PI / 360*centerText) * (num+40),Math.cos(2*Math.PI / 360*centerText) * (num+40));
    if(overText<=180){
        ctx.lineTo(Math.sin(2*Math.PI / 360*centerText) * (num+40)+10,Math.cos(2*Math.PI / 360*centerText) * (num+40));
    }else{
        ctx.lineTo(Math.sin(2*Math.PI / 360*centerText) * (num+40)-10,Math.cos(2*Math.PI / 360*centerText) * (num+40));
    }
    ctx.stroke();
    //白色字体
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle="#9db9e1";
    ctx.font="10px Arial";
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    if(overText<=180){
        ctx.fillText(name,Math.sin(2*Math.PI / 360*centerText) * (num+40)+10,Math.cos(2*Math.PI / 360*centerText) * (num+40)-10);
    }else{
        ctx.fillText(name,Math.sin(2*Math.PI / 360*centerText) * (num+40)-20,Math.cos(2*Math.PI / 360*centerText) * (num+40)-10)
    }
    ctx.closePath();
}