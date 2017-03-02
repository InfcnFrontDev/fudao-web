import styles from "./index.scss";
import React from "react";

export default class App extends React.Component {
    componentDidMount(){
        fun_time();
        fun_getUpAndNextJieQi();
        window.setInterval("fun_time()", 1000);
        function getItem(date) {
            var h = date.getHours(), m = date.getMinutes();
            var num = parseInt(((h + 1) * 60 + m) / 120);
            if (num == 12) num = 0;
            return sheets.shiershichen[num];
        }
        var item = getItem(new Date());
        console.log(item);
        new RentiMap("#mapDiv", {
            data: item
        });
    }
    render() {
        return (
            <div>
                <div className="topBox">
                    <div>
                        <span id="ymd" className="mg-left"></span>
                        <span id="div_hour" className="mg-left"></span>
                        <span id="week" className="fl-right mg-right"></span>
                    </div>
                    <div>
                        <span id="ymd_yinli" className="mg-left"></span>
                        <span id="lunar" className="mg-left"></span>
                        <span id="lunarHour" className="mg-left"></span>
                    </div>
                </div>
                <div className="centerBox">
                    <div id="mapDiv" style={{width: '100%', height: '100%'}}>
                    </div>
                </div>
                <div className="bottomBox">
                    <div className="mg-left">
                        <span id="festival"></span>
                        <span id="days"></span>
                        <span className="fl-right mg-right">建<br/>军<br/>节</span>
                    </div>
                    <div className="mg-left">上一节气：<span id="upJieQi"></span></div>
                    <div className="mg-left">下一节气：<span id="nextJieQi"></span></div>
                </div>

            </div>
        );
    }
}
