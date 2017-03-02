import styles from "./index.scss";
import React from "react";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className="mui-ios mui-ios-9 mui-ios-9-1">
                    <div id="title" className={styles.tit}></div>
                    <div className={styles.a1}>
                        <div id="demo5" className="mui-demo-container" style={{height: 45}}>
                            <span className={styles.jindu}>测评进度</span>
                            <div className="mui-btn mui-btn-link mui-pull-right" id="sum" style={{color: '#8a6de9', float: 'right'}}></div>
                            <p id="answerProgress" className="mui-progressbar mui-progressbar-royal"><span></span></p>
                        </div>
                        <div className={styles.jieshu}></div>
                        <div id="question" className="question" style={{paddingTop:20}}>对对对</div>
                        <div className="mui-input-group">
                            <div className="mui-input-row mui-radio mui-right answer" id="answer1">
                            </div>
                            <div className="mui-input-row mui-radio mui-right answer" id="answer2">
                            </div>
                            <div className="mui-input-row mui-radio mui-right answer" id="answer3">
                            </div>
                            <div className="mui-input-row mui-radio mui-right answer" id="answer4">
                            </div>
                            <div className="mui-input-row mui-radio mui-right answer" id="answer5">
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="mui-bar mui-bar-footer" style={{padding:'0px 20px 50px 20px'}}>
                    <button type="button" className="mui-btn mui-pull-left shangBtn"  id="up">上一题</button>
                    <button type="button" className="mui-btn mui-pull-right xiaBtn"  id="next">下一题</button>
                    <button type="button" className="mui-btn mui-pull-right tijiaoBtn"  id="submit">提交</button>
                </footer>
            </div>
        )
    }
}
