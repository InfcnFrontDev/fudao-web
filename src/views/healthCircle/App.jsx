import styles from "./index.scss";
import React from "react";

export default class App extends React.Component {
    constructor(){
        super();
        this.state={
            date:{}
        }
    }

    componentWillMount() {
        let func = function() {
            this.setState({
                date: new Date()
            })
        }.bind(this)
        func()
        setInterval(func, 1000);
    }

    componentDidMount(){



        let oCanvas=document.getElementById('myCanvas');
        let context = oCanvas.getContext("2d");

        context.translate(oCanvas.width/2,oCanvas.height/2);
        context.rotate(-Math.PI/360);
        setInterval(drawTime,60000);
        drawTime();
        function drawTime(){
            context.clearRect(-200,-200,375,375)/*因为绘制的原点变了，所以要清除起始坐标也发生了变化*/
            let now = new Date();
            let sec = now.getSeconds();
            let min = now.getMinutes();
            let hr  = now.getHours();
            hr = hr>=12 ? hr-12 : hr;
            //白色圈底
            context.save();
            context.arc(0,0,110,0*Math.PI,2*Math.PI)
            context.lineWidth= 20;
            context.strokeStyle="#fff";
            context.stroke();
            context.closePath();
            /*时针的刻度*/
            for(let i = 0 ;i<24;i++){
                context.beginPath();
                context.lineWidth= 1;
                context.strokeStyle="blue";
                context.rotate(Math.PI/12)
                context.moveTo(100,0)
                context.lineTo(120,0)
                context.stroke()
            }
            /*时针*/
            context.save()
            context.beginPath();
            context.lineWidth = 4;
            context.strokeStyle="#fff";
            context.rotate((hr+min/60+sec/3600)*(Math.PI/6))
            context.rotate(-Math.PI/2)
            context.moveTo(5,0)
            context.lineTo(100,0)
            context.stroke()
            context.restore()
            //内圆环
            context.beginPath();
            context.strokeStyle="blue";
            context.arc(0,0,100,0, Math.PI*2) ;
            context.stroke();
            //外圆环
            context.beginPath();
            context.strokeStyle="blue";
            context.arc(0,0,120,0, Math.PI*2) ;
            context.stroke();
            //圆心小圆圈
            context.beginPath();
            context.strokeStyle="blue";
            context.arc(0,0,5,0, Math.PI*2) ;
            context.stroke();
            context.fillStyle="#fff";
            context.fill();
            //灰色时间段
            context.save()
            context.beginPath();
            context.lineWidth = 20;
            context.strokeStyle="#ccc";
            context.rotate((hr)*(Math.PI/6))
            context.rotate(-Math.PI/2)
            context.arc(0,0,110,0*Math.PI,2*Math.PI/24)
            context.stroke();
            context.restore();
            //内圈数字
            context.save();
            context.beginPath();
            for(let i=1;i<13;i++){
                let x1=Math.sin(i*2*Math.PI/12);
                let y1=-Math.cos(i*2*Math.PI/12);
                context.fillStyle="#a1cc00";
                context.font="bold 20px Arial";
                context.textAlign='center';
                context.textBaseline='middle';
                context.fillText(i,x1*80,y1*80);

            }
            context.closePath();
            context.restore();


            //外圈数字
            context.save();
            context.beginPath();
            for(let i=13;i<25;i++){
                let x1=Math.sin(i*2*Math.PI/12);
                let y1=-Math.cos(i*2*Math.PI/12);
                context.fillStyle="#a1cc00";
                context.font="bold 20px Arial";
                context.textAlign='center';
                context.textBaseline='middle';
                context.fillText(i,x1*144,y1*144);
            }
            context.closePath();
            context.restore();
        }

    }

    render() {
        let date=this.state.date;
        let minutes=date.getMinutes()
        if(minutes<10){
            minutes='0'+minutes;
        }

        return (
            <div>
                <div className={styles.boxTop}>
                    <canvas id="myCanvas" width="320" height="320"></canvas>
                </div>

                <div className={styles.boxBottom}>
                    <div className={styles.textBox}>
                        <h3 className={styles.h3Box}>{date.getHours()}:{minutes}&nbsp;&nbsp;&nbsp; -&nbsp;&nbsp; 工作阶段</h3>
                        <p>茶歇：鸭梨，杏仁，核桃仁</p>
                        <p>动：颈部活动操，踮脚跳，虎扑</p>
                    </div>
                </div>
            </div>
        )
    }
}

