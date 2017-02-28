import styles from "./index.scss";
import React from "react";

export default class App extends React.Component {
    componentDidMount(){
        fun_time();
        fun_getUpAndNextJieQi();
        window.setInterval("fun_time()", 1000);
    }
    render() {
        return (
            <div>
                <div style={{fontSize: 20, color: "#00796b", width:'70%', margin:'30px auto 10px'}}>
                    <div style={{float:'left', textAlign: 'left'}}>
                        <div id="ymd"></div>
                        <div>
                            <span id="ymd_yinli"></span>
                            <span id="lunar"></span>
                        </div>
                    </div>
                    <div style={{float: 'right'}} id="week"></div>
                </div>
                <div style={{clear: 'both'}}></div>
                <div style={{fontSize: 40, color: '#00796b', margin: '50px auto 0px', textAlign: 'center', verticalAlign: 'middle'}}>
                    <div id="div_hour"></div>
                    <div id="lunarHour"></div>
                </div>

                <div style={{marginTop:80,textAlign: 'left'}}>
                    <img src="images/woniu.png" id="woniu" style={{display:'none',width:35,height:35,position:' relative',marginBottom:-3,marginLeft:-11}}/>
                    <center>
                        <div id="x1" style={{position: 'relative',zIndex: 2}}></div>
                    </center>
                </div>
                <div style={{position: 'fixed', bottom: 0,fontSize: 16,  color: 'rgb(52, 83, 145)', textAlign: 'left'}}>
                    <div style={{float:'left',margin :'0px 20px 50px 20px' }}>
                        <div style={{marginBottom:15}}>
                            <span id="festival"></span>
                            <span id="days"></span>
                        </div>
                        <div style={{marginBottom:15}}>上一节气：<span id="upJieQi"></span></div>
                        <div>下一节气：<span id="nextJieQi"></span></div>
                    </div>
                    <div style={{margin :'0px 30px 20px 0px' ,float:'right',width: 15,height:100,
				position: 'fixed', right: 0,color:' red',fontSize: 22,fontWeight: 'bolder'}} id='jieri'></div>
                </div>
            </div>
        )
    }
}
