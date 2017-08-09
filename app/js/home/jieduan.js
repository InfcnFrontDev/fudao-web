var youCanvas = document.getElementById('youcanvas')
var ctx = youCanvas.getContext("2d");
ctx.translate(160,160);
function huiseTimezhishi(num,startTime,endTime,name){

    var now = new Date();
    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr  = now.getHours();
    for(var i=0; i<arr.length; i++){
         // 遍历所有黄色时间段
         var startText=blueDuan_timeToAngle(startTime);
         var overText=blueDuan_timeToAngle(endTime);
         //(parseInt(hr)+2)
         var newdate=hr+":"+min;
         var newdian=blueDuan_timeToAngle(newdate);

         if(startText>overText){
             if(newdian<startText&&newdian>overText){
                 huiseZi()
             }
         }
         if(startText<overText){

             if(newdian>overText||newdian<startText){

                huiseZi()
             }
         }
     }
    function huiseZi(){
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


}