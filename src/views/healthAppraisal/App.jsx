import styles from "./index.scss";
import React from "react";

export default class App extends React.Component {
    componentDidMount(){
        appraisal_init();
    }
    render() {
        return (
            <div>
                <div className="appraisalBox">
                    <div  style={{margin:'10px auto',width:220,height:220,display:'flex',justifyContent:'center',position:'relative'}}>
                        
                        <div style={{margin:'0 auto'}}>
                            <p className="fdzs">福道指数</p>
                            <img src="images/tou.png" style={{height:80}}/>
                        </div>

                        
                        <svg width="220" height="220" className="pt-ab">
                            <circle  cx="110" cy="110" r="70" strokeWidth="5" stroke="#C9CACA" fill="none"></circle>
                            <circle  cx="110" cy="110" r="70" strokeWidth="5" stroke="#00cccc" fill="none" id="svg_zhengzhuang" transform="matrix(0,-1,1,0,0,220)" ></circle>
                        </svg>
                        <svg width="220" height="220" className="pt-ab">
                            <circle  cx="110" cy="110" r="80" strokeWidth="5" stroke="#C9CACA" fill="none"></circle>
                            <circle  cx="110" cy="110" r="80" strokeWidth="5" stroke="#66cc00" fill="none" id="svg_xinli" transform="matrix(0,-1,1,0,0,220)" ></circle>
                        </svg>
                        <svg width="220" height="220" className="pt-ab">
                            <circle  cx="110" cy="110" r="90" strokeWidth="5" stroke="#C9CACA" fill="none"></circle>
                            <circle  cx="110" cy="110" r="90" strokeWidth="5" stroke="#cc9900" fill="none" id="svg_shehui" transform="matrix(0,-1,1,0,0,220)" ></circle>
                        </svg>
                        <svg width="220" height="220" className="pt-ab">
                            <circle  cx="110" cy="110" r="100" strokeWidth="5" stroke="#C9CACA" fill="none"></circle>
                            <circle  cx="110" cy="110" r="100" strokeWidth="5" stroke="#ff9900" fill="none" id="svg_zice" transform="matrix(0,-1,1,0,0,220)" ></circle>
                        </svg>
                    </div>

                </div>
                <a href="assessmentTest.html" className="appraisalBtn">
                    一键测评
                </a>
            </div>
        )
    }
}
