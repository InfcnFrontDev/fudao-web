import styles from "./index.scss";
import React from "react";

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            date: {}
        }
    }
    componentDidMount() {
        var cycle, userSex, user, userInformation, _endMonth,sex,birthdate;
        cycle={
            "renalPeriod":4,
            "years":1
        }
        sex=0;
        birthdate='1978-01-11';
        fun_showCycle(cycle, sex, birthdate);

        // 显示周期
        function fun_showCycle(cycle, sex, birthdate) {
            var date = new Date(birthdate.split("-")[0], birthdate.split("-")[1], birthdate.split("-")[2]);
            var birth_year = date.getFullYear();
            var move_how = 3;
            var start_move = -10;
            //一层多少个格
            var subsection;
            if(sex == 0) {
                subsection = 7;
            } else {
                subsection = 8;
            }
            var count_height = 0;
            var img_width = document.getElementById("div_woniu").clientWidth;
            for(var i = 0; i < cycle.renalPeriod; i++) {
                for(var j = 0; j < subsection; j++) {
                    var _div = document.createElement("div");
                    _div.setAttribute("name", "xiaoge");
                    _div.style.position = "absolute";
                    _div.style.zIndex = 10;
                    _div.style.bottom = (start_move++) * move_how + "px";
                    count_height = (start_move) * move_how;
                    if(i != 0 && j == 0) {
                        start_move++
                        _div.style.bottom = (start_move++) * move_how + "px";
                        count_height = (start_move) * move_how;
                    }
                    var _div_year = document.createElement("div");
                    if(i % 2 == 0) {
                        _div.style.left = j * (100 / subsection) + "%";
                        _div_year.style.left = "20px";
                    } else {
                        _div.style.right = j * (100 / subsection) + "%";
                        _div_year.style.left = "-20px";
                    }
                    var _img = document.createElement("img");
                    _img.src = "images/nian_quang.png";
                    _img.style.width = (img_width / subsection) + "px";
                    _img.style.height = "8px";
                    _div_year.style.zIndex = 10;
                    _div_year.style.position = "relative";
                    _div_year.style.top = "-35px";
                    if(j == 0 || j == 3) {
                        _div_year.innerHTML = birth_year++;
                    } else {
                        birth_year++;
                        _div_year.innerHTML = "&nbsp;";
                    }
                    if(i + 1 == cycle.renalPeriod && j + 1 == subsection && cycle.years == 0) {
                        var _img_tongyong = document.createElement("img");
                        _img_tongyong.src = "images/xingxiang/tongyong.png";
                        _img_tongyong.style.width = (img_width / subsection) + "px";
                        _img_tongyong.style.position = "relative";
                        _img_tongyong.style.top = "-40px";

                        _img_tongyong.style.zIndex = 101;
                        _img_tongyong.setAttribute("onclick", "fun_click");
                        var _div_tongyong = document.createElement("div");
                        _div_tongyong.style.position = "relative";
                        _div_tongyong.style.zIndex = 30;
                        _div_tongyong.style.top = "-40px";
                        _div_tongyong.innerHTML = birth_year;
                        if(i % 2 == 0) {
                            _div_tongyong.style.left = "-20px";
                            _img_tongyong.style.left = "-20px";
                        } else {
                            _div_tongyong.style.left = "25px";
                            _img_tongyong.style.left = "20px";
                        }
                        _div_year.innerHTML = _div_tongyong.outerHTML + _img_tongyong.outerHTML;
                        _div.style.marginBottom = "-50px";
                        _div.innerHTML = _img.outerHTML + _div_year.outerHTML;
                    } else {
                        _div.innerHTML = _img.outerHTML + _div_year.outerHTML;
                    }
                    document.getElementById("div_woniu").appendChild(_div);
                }
            }
            if(cycle.years != 0) {
                for(var i = 0; i < subsection; i++) {
                    var _div = document.createElement("div");
                    _div.setAttribute("name", "xiaoge");
                    _div.style.position = "absolute";
                    _div.style.zIndex = 10;
                    _div.style.bottom = (start_move++) * move_how + "px";
                    var _div_year = document.createElement("div");
                    if(i == 0) {
                        start_move++;
                    }
                    _div.style.bottom = (start_move++) * move_how + "px";
                    if(cycle.renalPeriod % 2 == 0) {
                        _div.style.left = i * (100 / subsection) + "%";
                    } else {
                        _div.style.right = i * (100 / subsection) + "%";
                    }
                    var _img = document.createElement("img");
                    if(i < cycle.years) {
                        birth_year++;
                        _img.src = "images/nian_quang.png";
                        count_height = (start_move) * move_how;
                    } else if(i == cycle.years && cycle.season > 0) { //季度大于0
                        if(cycle.season == 4) {
                            _img.src = "images/nian_quang.png";
                        } else {
                            _img.src = "images/nian-" + cycle.season + ".png";
                        }
                        count_height = (start_move) * move_how;
                    } else {
                        _img.src = "images/nian_back.png";
                    }
                    _img.style.width = (img_width / subsection) + "px";
                    _img.style.height = "8px";
                    _div_year.style.zIndex = 10;
                    _div_year.style.position = "relative";
                    _div_year.style.top = "-35px";
                    if(i + 1 == cycle.years) {
                        var _img_tongyong = document.createElement("img");
                        _img_tongyong.style.width = "30px";
                        _img_tongyong.style.height = "30px";
                        _img_tongyong.src = "images/xingxiang/tongyong.png";
                        _img_tongyong.style.position = "relative";
                        _img_tongyong.style.top = "-30px";
                        _img_tongyong.setAttribute("onclick", "fun_click");
                        var _div_tongyong = document.createElement("div");
                        _div_tongyong.style.position = "relative";
                        _div_tongyong.style.zIndex = 10;
                        _div_tongyong.style.top = "-20px";
                        if(cycle.season == 4) {
                            birth_year++;
                        }
                        _div_tongyong.innerHTML = birth_year;
                        _div_year.innerHTML = _div_tongyong.outerHTML + _img_tongyong.outerHTML;
                        _div.style.marginBottom = "-36px";
                    } else {
                        _div_year.innerHTML = "&nbsp;";
                    }
                    _div.innerHTML = _img.outerHTML + _div_year.outerHTML;
                    document.getElementById("div_woniu").appendChild(_div);
                }
            }
            var div_background = document.createElement("div");
            div_background.style.position = "absolute";
            div_background.style.zIndex = 1;
            div_background.style.background = "rgb(250,237,205)";
            div_background.style.bottom = "0px";
            div_background.style.width = "100%";
            div_background.style.height = (count_height + 32) + "px";
            document.getElementById("div_woniu").appendChild(div_background);
            //随机出多少个草
            var arr_cao = ["images/cao_1.png", "images/cao_2.png", "images/cao_3.png", "images/cao_1.png"];
            var xiaoge = document.getElementsByName("xiaoge");
            var random_cao_count = 0;
            for(var i = 0; i < random_cao_count; i++) {
                var _idx = Math.floor(Math.random() * xiaoge.length);
                var _img = document.createElement("img");
                _img.style.width = "30px";
                _img.style.height = "30px";
                _img.style.position = "absolute";
                _img.style.bottom = (parseInt(xiaoge[_idx].style.bottom) + 35) + "px";
                _img.style.marginBottom = xiaoge[_idx].style.marginBottom;
                if(xiaoge[_idx].style.right == "") {
                    _img.style.left = (parseFloat(xiaoge[_idx].style.left)) + "%";
                } else {
                    _img.style.right = (parseFloat(xiaoge[_idx].style.right)) + "%";
                }
                _img.src = arr_cao[Math.floor(Math.random() * 4)];
                document.getElementById("div_woniu").appendChild(_img);
            }
        }


    }
    render() {


        return (
            <div>
                <div id="beijing" className="beijing"></div>
                <div id="remindMes">
                    <center>
                        <div id="pop_up_window" className="pop_up_window">
                            <div style={{float:'left'}}>
                                <div style={{position: 'relative',width: 50,height:40}}>
                                    <div style={{position: 'absolute',top:-20,left:-20}}>
                                        <img src="images/hulu.png" width="80" height="80" />
                                    </div>
                                </div>
                            </div>
                            <div id="yourCycle" style={{float:'left',width:250, paddingTop:20,paddingBottom:20,textAlign:'left'}}>

                            </div>
                            <div style={{borderTop:' 1px solid #E0E0E0',width:250, paddingTop:20,paddingBottom:20,clear:'both'}}>
                                福道算法是福福学贯古今中西创造出的计时方法，能准确判断您所处的生命周期哦~
                            </div>
                        </div>
                    </center>
                </div>
                <div className="jieduanlouti" id='div_woniu'>
                </div>
            </div>
        )
    }

}
