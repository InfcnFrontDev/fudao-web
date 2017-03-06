var userInformation;
/**
 * 初始化数据
 */
function appraisal_init(){
    var userInformation = {
        'countSocre':'1',
        'zhengzhuangSocre':'81',
        'xinliSocre':'55',
        'shehuiSocre':'64',
        'ziceSocre':'78'
    }
    //document.getElementById('countSocre').innerHTML=userInformation.countSocre;
    var svg1 = document.getElementById("svg_zhengzhuang");
    var svg2 = document.getElementById("svg_xinli");
    var svg3 = document.getElementById("svg_shehui");
    var svg4 = document.getElementById("svg_zice");
    var percent1 = Math.round(parseFloat(userInformation.zhengzhuangSocre)) / 100,
        perimeter1 = Math.PI * 2 * 60;
    var percent2 = Math.round(parseFloat(userInformation.xinliSocre)) / 100,
        perimeter2 = Math.PI * 2 * 70;
    var percent3 = Math.round(parseFloat(userInformation.shehuiSocre)) / 100,
        perimeter3 = Math.PI * 2 * 80;
    var percent4 = Math.round(parseFloat(userInformation.ziceSocre)) / 100,
        perimeter4 = Math.PI * 2 * 90;
    svg1.setAttribute('stroke-dasharray', perimeter1 * percent1 + " " + perimeter1 * (1 - percent1));
    svg2.setAttribute('stroke-dasharray', perimeter2 * percent2 + " " + perimeter2 * (1 - percent2));
    svg3.setAttribute('stroke-dasharray', perimeter3 * percent3 + " " + perimeter3 * (1 - percent3));
    svg4.setAttribute('stroke-dasharray', perimeter4 * percent4 + " " + perimeter4 * (1 - percent4));

}




function main_init() {
	// 设置上次体检的得分 开始
	userInformation = getUserInformation(getUser().appid);
	if(userInformation.countSocre != null) {
		//document.getElementById("div_countSocre").innerHTML = '您上次测评得了<span style="font-size:30px ;">&nbsp;' + Math.round(parseFloat(userInformation.countSocre)) + '&nbsp;</span>分哟~继续努力'
	}
	//fun_question();
	// 设置上次体检的得分 结束

	var svg1 = document.getElementById("svg_zhengzhuang");
	var svg2 = document.getElementById("svg_xinli");
	var svg3 = document.getElementById("svg_shehui");
	var svg4 = document.getElementById("svg_zice");
	//福道指数
	if(userInformation.countSocre != undefined) {
		var countSocre = Math.round(parseFloat(userInformation.countSocre));
		document.getElementById("countSocre").innerText = countSocre
		if(countSocre < 60) {
			document.getElementById("score_prompt").innerText = "太糟糕啦！福福帮您调理一下吧！";
		} else if(countSocre >= 60 && countSocre <= 80) {
			document.getElementById("score_prompt").innerText = "有点小糟糕哦！快听福福的话吧！";
		} else if(countSocre > 80 && countSocre <= 90) {
			document.getElementById("score_prompt").innerText = "水平良好~再接再厉哦！";
		} else if(countSocre > 90 && countSocre <= 100) {
			document.getElementById("score_prompt").innerText = "恭喜您！身体棒棒哒~继续保持哦！";
		}
		document.getElementById("zhengzhuangSocre").innerText = Math.round(parseFloat(userInformation.zhengzhuangSocre));
		document.getElementById("xinliSocre").innerText = Math.round(parseFloat(userInformation.xinliSocre));
		document.getElementById("shehuiSocre").innerText = Math.round(parseFloat(userInformation.shehuiSocre));
		document.getElementById("ziceSocre").innerText = Math.round(parseFloat(userInformation.ziceSocre));

		var percent1 = Math.round(parseFloat(userInformation.zhengzhuangSocre)) / 100,
			perimeter1 = Math.PI * 2 * 60;
		var percent2 = Math.round(parseFloat(userInformation.xinliSocre)) / 100,
			perimeter2 = Math.PI * 2 * 70;
		var percent3 = Math.round(parseFloat(userInformation.shehuiSocre)) / 100,
			perimeter3 = Math.PI * 2 * 80;
		var percent4 = Math.round(parseFloat(userInformation.ziceSocre)) / 100,
			perimeter4 = Math.PI * 2 * 90;
		svg1.setAttribute('stroke-dasharray', perimeter1 * percent1 + " " + perimeter1 * (1 - percent1));
		svg2.setAttribute('stroke-dasharray', perimeter2 * percent2 + " " + perimeter2 * (1 - percent2));
		svg3.setAttribute('stroke-dasharray', perimeter3 * percent3 + " " + perimeter3 * (1 - percent3));
		svg4.setAttribute('stroke-dasharray', perimeter4 * percent4 + " " + perimeter4 * (1 - percent4));
	} else {
		document.getElementById("countSocre").innerText = "0";
		document.getElementById("zhengzhuangSocre").innerText = "0";
		document.getElementById("xinliSocre").innerText = "0";
		document.getElementById("shehuiSocre").innerText = "0";
		document.getElementById("ziceSocre").innerText = "0";
		svg1.setAttribute('stroke-dasharray', "0 1");
		svg2.setAttribute('stroke-dasharray', "0 1");
		svg3.setAttribute('stroke-dasharray', "0 1");
		svg4.setAttribute('stroke-dasharray', "0 1");
	}
}

/**
 * 设置上次一键查一查的时间
 */
function fun_question() {
	var checkTime = userInformation.checkDate;
	if(checkTime != undefined) {
		checkTime = checkTime.replace(/-/g, "/");
		checkTime = new Date(checkTime);
		var nowTime = new Date();
		var temp = nowTime.getTime() - checkTime.getTime();
		var iTemp = parseInt(temp / (24 * 60 * 60 * 1000));
		if(iTemp == 0) {
			document.getElementById("checkalert").innerHTML = "距您上次查查不到 <span style ='color:red'>1</span> 天~"
		} else if(iTemp > 0 && iTemp < 7) {
			document.getElementById("checkalert").innerHTML = "距您上次查查已经 <span style ='color:red'>" + (iTemp + 1) + "</span> 天~";
		} else {
			document.getElementById("checkalert").innerHTML = "距您上次查查已经 <span style ='color:red'>" + (iTemp + 1) + "</span> 天~快来查查吧~";
		}
	}
	if(userInformation.countSocre != null) {
		document.getElementById("div_countSocre").innerHTML = '您上次测评得了<span style="font-size:30px ;">&nbsp;' + Math.round(parseFloat(userInformation.countSocre)) + '&nbsp;</span>分哟~继续努力'
	}
}

/**
 * 一键查查
 */
function fun_one_check() {
	//等于空时去服务器查询是否有数据
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return null;
	}
	var questions = JSON.parse(localStorage.getItem('questions'));
	if(questions != null && questions != {}) {
		fun_questionSection();
	} else {
		getAllQuestion();
	}
}

// 获取调查问卷
function getAllQuestion() {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	var w = plus.ui.createWaiting("正在获取调查问卷，请稍候...");
	//等于空时去服务器查询是否有数据
	mui.ajax('venders/js/assessmentData.js', {
		data: {
			type: 0
		},
		dataType: 'json',
		type: 'post',
		//async: false,
		timeout: 5000,
		success: function(data) {
			w.close();
			var questions = data.obj;
			localStorage.setItem('questions', JSON.stringify(questions));
			fun_questionSection();
		},
		error: function(xhr, type, errorThrown) {
			w.close();
			plus.nativeUI.toast('服务器出现异常，请重试！');
		}
	});
}

function fun_questionSection() {
	if(!floatw_questionSection) {
		floatw_questionSection = plus.webview.create("questionnaire/questionDetail.html", "questionDetail", {
			top: '40px',
			left: '20px',
			width: '85%',
			height: '80%',
			scrollIndicator: 'none',
			scalable: false,
			popGesture: 'none',
			scrollIndicator: 'vertical'
		}, {
			'_index': 1
		});
		floatw_questionSection.show('fade-in', 300);
		/*floatw_questionSection = plus.webview.create("questionnaire/questionSection.html", "questionSection", {
			top: '40px',
			left: '20px',
			width: '85%',
			height: '80%',
			scrollIndicator: 'none',
			scalable: false,
			popGesture: 'none',
			scrollIndicator: 'vertical'
		}, {
			"interface_height": document.getElementById("healthy_interface_content").offsetHeight,
			"interface_width": document.getElementById("healthy_interface_content").offsetWidth
		});
		floatw_questionSection.show('fade-in', 300);*/
	}
}
/**
 * 即时情绪
 */
function timejishi(sign) {
	var _date = new Date();
	var ymd = _date.getFullYear() + "" + _date.getMonth() + "" + _date.getDate();
	//情绪时间
	var emotion = getTimingEmotion();
	if((emotion == null || emotion == "" || emotion != ymd) || sign == 'click') {
		document.getElementById("emotion_interface").style.display = "block";
		var temp_width = document.getElementById("emotion_interface_content").offsetWidth + 20;
		document.getElementById("float_emotion_interface").style.left = temp_width + "px";
		saveTimingEmotion(ymd)
		if(floatw) { // 避免快速多次点击创建多个窗口
			return;
		}
		floatw = plus.webview.create("emotion/timing_emotion_list.html", "timing_emotion_list", {
			top: '40px',
			left: '20px',
			width: '85%',
			height: '87%',
			scrollIndicator: 'none',
			scalable: false,
			popGesture: 'none',
			scrollIndicator: 'vertical'
		}, {});
		floatw.show('none', 300);
	}
}
/**
 * 饮食、睡觉、运动详细数据
 * @param {Object} obj
 */
var yangyiyangObjEvent;

function fun_message(obj) {
	yangyiyangObjEvent = obj;
	var keys = [];
	keys['yinshi'] = '饮食';
	keys['shuijiao'] = '睡觉';
	keys['yundong'] = '运动';
	keys['yangxin'] = '休闲';
	var _key = keys[_title];
	var _time = obj.id.replace('message_', '');
	if(_title == "shuijiao") {
		//睡觉
		shuijiao(_time);
	} else if(_title == "yundong") {
		var segmentTime = getSegmentTime();
		var _motion = _yangyiyang[_curDisName].healthRing_motion;
		var _arr = [];
		for(var _i in _motion) {
			if(segmentTime[_time] != undefined && _motion[_i].operationTime.indexOf(segmentTime[_time]) != -1) {
				_arr = _motion;
			}
		}
		fun_getData(_arr[Math.floor(Math.random() * _arr.length)]);
	} else if(_title == "yangxin") {
		var segmentTime = getSegmentTime();
		var _leisure = _yangyiyang[_curDisName].healthRing_leisure;
		var _arr = [];
		for(var _i in _leisure) {
			if(segmentTime[_time] != undefined && _leisure[_i].operationTime.indexOf(segmentTime[_time]) != -1) {
				_arr = _leisure;
			}
		}
		fun_getData(_arr[Math.floor(Math.random() * _arr.length)]);
	} else {
		var userInformation = getUserInformation(user.appid);
		var params = {};
		params['_title'] = _title;
		params['_time'] = _time;
		var _haveDisease = "";
		if(userInformation.haveDisease != null) {
			_haveDisease = JSON.stringify(userInformation.haveDisease);
			_haveDisease = _haveDisease.replace(/[\[\]\"]/gi, "");
		}
		params['_haveDisease'] = _haveDisease;
		var _haveDiseaseBaihua = "";
		if(userInformation.haveDiseaseBaihua != null) {
			_haveDiseaseBaihua = JSON.stringify(userInformation.haveDiseaseBaihua);
			_haveDiseaseBaihua = _haveDiseaseBaihua.replace(/[\[\]\"]/gi, "");
		}
		params['_haveDiseaseBaihua'] = _haveDiseaseBaihua;
		params['_key'] = _key;
		yinshi_loadding(_time, 0, params);
	}
}

/**
 * 养心 和 运动
 */
function fun_yangxin_yundong_loadding(_time, name, params, type) {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	var w = plus.ui.createWaiting("正在获取数据，请稍候...");
	if(params._data != null && type == 0) {
		var message_data = params._data;
		//养心 和 运动	组装数据
		yangxin_yundong_zuzhuang(_time, message_data);
		w.close();
	}
}
/**
 * 饮食
 */
function yinshi_loadding(time, type, params, zhushi) {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	//var w = plus.ui.createWaiting("正在获取数据，请稍候...");
	document.getElementById("yinshiDIV").innerHTML = '加载中...';
	if(type == 0) {
		//饮食	组装数据
		yinshi_zuzhuang(time);
		//w.close();
	} else {
		var task = plus.uploader.createUpload(ADDR + SELFHEALTH, {
			method: "post",
			timeout: 120 //上传任务超时时间
		}, function(t, status) {
			w.close();
			var respText = t.responseText;
			if(respText != "") {
				var message_data = JSON.parse(respText).obj;
				var yangyiyang_yinshi = getHealthRing(user.appid);
				var _yinshi_curDisName = yangyiyang_yinshi[_curDisName];
				for(var i in _yinshi_curDisName) {
					var key = params._time;
					if("午休" == params._time && zhushi == null) {
						key = "午休_菜品";
					} else if("午休" == params._time && zhushi != null) {
						key = "午休_主食";
					} else if("晚餐" == params._time && zhushi == null) {
						key = "晚餐_菜品";
					} else if("晚餐" == params._time && zhushi != null) {
						key = "晚餐_主食";
					}
					if(_yinshi_curDisName[i].shicai_shipu[key] != undefined) {
						_yinshi_curDisName[i].shicai_shipu[key] = message_data[0].shicai_shipu[key];
						//健康环---饮食
						saveHealthRing(user.appid, yangyiyang_yinshi);
						//饮食	组装数据
						yinshi_zuzhuang(time);
					}
				}
			} else {
				document.getElementById("loadding").innerText = "数据读取失败！";
			}
		});
		task.addData("selfHealthName", params._title);
		task.addData("time", params._time);
		task.addData("shicai", params._shicai);
		task.addData("random", random().replace("?random=", ""));
		task.addData("haveDisease", _curDisName);
		task.addData("renqun", diseasespeople);
		task.addData("appid", user.appid);
		task.addData("next", "next");
		task.addData("zhushi", zhushi);
		task.setRequestHeader('contentType', 'application/x-www-form-urlencoded; charset=utf-8');
		task.start();
	}
}
/**
 * 饮食	组装数据
 * @param {Object} message_data
 */
function yinshi_zuzhuang(time) {
	document.getElementById("quanpingyinshi").innerHTML = "";
	var _html = document.createElement("div");
	_html.style.position = "fixed";
	_html.style.overflowY = 'auto';
	_html.style.top = "0px";
	_html.style.left = "0px";
	_html.style.width = "100%";
	_html.style.height = "100%";
	_html.style.background = "#ffffff";
	_html.style.zIndex = 999999;

	var _div = document.createElement("div");
	_div.innerHTML = "养一养";
	_div.className = "mui-bar mui-bar-nav";
	_div.style.textAlign = "center";
	_div.style.paddingTop = "12px";
	_div.style.width = "100%";
	_div.style.fontSize = "17px";
	_div.style.borderBottom = "1px solid #93cde3";
	_html.appendChild(_div);

	var _divTitle = document.createElement("div");
	_divTitle.style.textAlign = "left";
	_divTitle.style.paddingTop = "55px";
	_divTitle.style.paddingLeft = "5px";
	_divTitle.style.paddingBottom = "10px";
	_divTitle.style.width = "100%";
	_divTitle.style.fontSize = "17px";

	var _divContent = document.createElement("div");
	_divContent.className = "mui-content-padded";
	_divContent.style.textAlign = "left";
	var json_disease = {};
	var shicai = {};
	var shicai_len = 0;
	var _text = "<span style ='color:red'>" + (_curDisShowName == undefined ? "" : _curDisShowName);
	//、、、、、、、、、、、、、、、、
	var _click_text = '<div><img src="img/hulu.png" width="40" height="40"/>点击选择您喜欢的食材~</div>';
	if(_curDisName != null && _curDisShowName == null) {
		_divTitle.innerHTML = document.getElementById("showText").innerHTML + _click_text;
	} else {
		_divTitle.innerHTML = "&nbsp; 针对您[" + _text + "</span>" + "]的症状，福福为您推荐以下食材：" + _click_text;
	}

	_html.appendChild(_divTitle);
	//、、、、、、、、、、、、、、、、

	var _divHuan = document.createElement("div");
	_divHuan.style.textAlign = "right";
	_divHuan.style.color = "#ff0000";
	_divHuan.style.borderBottom = "1px solid #e0e0e0";
	_divHuan.innerHTML = '换一批';
	_divHuan.onclick = function() {
		fun_ajax_yinshi('no', 0, jieduan);
		event.stopPropagation(1);
	};
	_divContent.appendChild(_divHuan);
	_html.appendChild(_divContent);
	var jieduan = "";
	var segmentTime = getSegmentTime();
	if(segmentTime[time] != undefined) {
		jieduan = segmentTime[time];
	}
	var shicai = [];
	var caipintu_miaosu = [];
	var _yinshi = _yangyiyang[_curDisName].healthRing_yinshi;
	for(var i in _yinshi) {
		for(var shipu in _yinshi[i].shicai) {
			if(shipu == jieduan) {
				var _json = {};
				_json[_yinshi[i].shicai[shipu]] = _yinshi[i].jinyongshicai;
				shicai.push(_json);
			} else if(shipu == jieduan + "_菜品") {
				var _json = {};
				_json[_yinshi[i].shicai[shipu]] = _yinshi[i].jinyongshicai;
				shicai[0] = _json;
			} else if(shipu == jieduan + "_主食") {
				var _json = {};
				_json[_yinshi[i].shicai[shipu]] = _yinshi[i].jinyongshicai;
				shicai[1] = _json;
			}
		}
	}
	for(var cs in shicai) {
		var _div_cs = document.createElement("div");
		for(var _j_cs in shicai[cs]) {
			var _divshicai = document.createElement("div");
			_divshicai.style.float = "left";
			var arr_shicai = _j_cs.split(",");
			var _table_shicai = document.createElement("table");
			_table_shicai.setAttribute("name", "table_shicai");
			_table_shicai.setAttribute("_index", cs);
			_table_shicai.setAttribute("jinyongshicai", shicai[cs][_j_cs]);
			_table_shicai.cellSpacing = 2;
			_table_shicai.cellPadding = 2;
			_table_shicai.style.width = "100%";
			var shicai_border = ["#33793a", "#d99694", "#c3d69b", "#b0a1c7"];
			var shicai_background = ["#8db37e", "#e5b9b7", "#d7e3bc", "#ccc1d9"];
			for(var i in arr_shicai) {
				var tr = document.createElement("tr");
				tr.setAttribute("rowIndex", i);
				var td_1 = document.createElement("td");
				td_1.setAttribute("shicai", arr_shicai[i]);
				td_1.onclick = function() {
					var _table = this.parentNode.parentNode;
					var _rowIndex = this.parentNode.getAttribute("rowIndex");
					if(this.childNodes[0].style.backgroundColor == "") { //没选过
						var _table = this.parentNode.parentNode;
						for(var i_tr = 0; i_tr < _table.rows.length; i_tr++) {
							var _tr = _table.rows[i_tr];
							_tr.cells[0].childNodes[0].style.background = "";
							_tr.cells[1].innerHTML = "";
						}
						this.childNodes[0].style.background = shicai_background[_rowIndex];
						var _span = "<span style ='color:" + shicai_background[_rowIndex] + ";font-size:25px' class ='fa fa-arrow-right'>&nbsp;</span>";
						_table.rows[_rowIndex].cells[1].innerHTML = _span;
					} else { //选过
						//this.childNodes[0].style.background = "";
						//_table.rows[_rowIndex].cells[1].innerHTML = "";
					}
					fun_ajax_yinshi(this.parentNode.parentNode.getAttribute("_index"), this.getAttribute('jieduan'));
					event.stopPropagation();
				}
				var _background = "";
				var _arrow_right = "";
				if(i == 0) {
					_background = "background:" + shicai_background[i] + ";";
					//	if(jieduan.indexOf("休息") != -1) {
					//	_arrow_right = "";
					//} else {
					_arrow_right = "<span style ='color:" + shicai_background[i] + ";font-size:25px' class ='fa fa-arrow-right'>&nbsp;</span>";
					//}
				}
				td_1.innerHTML = "<div style ='border:1px solid " + shicai_border[i] + "; " +
					_background + " margin:5px 0px 5px 15px;width:100px;height:40px'>" + arr_shicai[i] + "</div>";
				td_1.align = "center";
				td_1.style.lineHeight = "40px"
				tr.appendChild(td_1)
				var td_2 = document.createElement("td");
				td_2.style.width = "40px"
				td_2.innerHTML = _arrow_right;
				tr.appendChild(td_2)
				_table_shicai.appendChild(tr);
			}
			_divshicai.appendChild(_table_shicai);
			_div_cs.appendChild(_divshicai);
			var _divcaipin = document.createElement("div");
			_divcaipin.style.float = "left"
			_divcaipin.style.padding = "5px";
			_divcaipin.setAttribute("id", "caipu_" + cs);
			//、、、、、、、、、、、、、、、、、、、、、、、、、
			_divcaipin.innerHTML = "加载中...";
			_div_cs.appendChild(_divcaipin);
		}
		if(shicai.length > 1) {
			var _clear = document.createElement("div");
			_clear.style.clear = "both";
			_clear.style.borderTop = "1px solid #e0e0e0";
			_clear.style.width = "99%";
			_clear.style.height = "20px";
			_div_cs.appendChild(_clear);
			if(cs == 1) {
				var _divHuanZhishi = document.createElement("div");
				_divHuanZhishi.style.textAlign = "right";
				_divHuanZhishi.style.color = "#ff0000";
				_divHuanZhishi.style.marginTop = "-20px";
				_divHuanZhishi.style.paddingRight = "10px";
				_divHuanZhishi.innerHTML = '换一批';
				_divHuanZhishi.onclick = function() {
					fun_ajax_yinshi('no', 1, jieduan);
					event.stopPropagation();
				};
				_div_cs.appendChild(_divHuanZhishi);
			}
		}
		_html.appendChild(_div_cs);
	}
	document.getElementById("quanpingyinshi").appendChild(_html);
	fun_ajax_yinshi('yes', null, jieduan);
}

function yinshi_zuofa(url, zf) {
	zf = JSON.parse(zf);
	document.getElementById("quanpingyinshi_zuofa").innerHTML = "";
	var _html = document.createElement("div");
	_html.style.position = "fixed";
	_html.style.overflowY = 'auto';
	_html.style.top = "0px";
	_html.style.left = "0px";
	_html.style.width = "100%";
	_html.style.height = "100%";
	_html.style.background = "#ffffff";
	_html.style.zIndex = 999999;

	var _div = document.createElement("div");
	_div.innerHTML = "养一养";
	_div.className = "mui-bar mui-bar-nav";
	_div.style.textAlign = "center";
	_div.style.paddingTop = "12px";
	_div.style.width = "100%";
	_div.style.fontSize = "17px";
	_div.style.borderBottom = "1px solid #93cde3";
	_html.appendChild(_div);

	var _divTitle = document.createElement("div");
	_divTitle.style.textAlign = "left";
	_divTitle.style.marginTop = "60px";
	_divTitle.style.paddingLeft = "5px";
	_divTitle.style.paddingBottom = "10px";
	_divTitle.style.width = "100%";
	_divTitle.style.fontSize = "17px";
	_html.appendChild(_divTitle);
	var _center = document.createElement("center");
	var _img = document.createElement("img");
	_img.src = url;
	_img.style.width = "75%";
	_img.style.height = "180px";
	_center.appendChild(_img);
	_html.appendChild(_center);
	var _divwai = document.createElement("div");
	_divwai.style.width = "100%";
	_divwai.style.height = "300px";
	//_divwai.style.height = "200px";
	_divwai.style.overflowY = "auto";
	_divwai.style.overflowX = "hidden";
	_divwai.style.margin = "25px 0px";
	_divwai.style.fontSize = "16px";
	var _divnei = document.createElement("div");
	_divnei.style.width = "75%";
	//_divnei.style.height = "200px";
	_divnei.style.textAlign = "left";
	var _z_f_zuofa = "";
	for(var _j in zf) {
		_z_f_zuofa += "<b>" + _j + "：</b>";
		_z_f_zuofa += "<div>" + zf[_j] + "</div>";
	}
	_divnei.innerHTML = _z_f_zuofa;
	_divwai.appendChild(_divnei);
	_center.appendChild(_divwai);
	_html.appendChild(_center);
	document.getElementById("quanpingyinshi_zuofa").appendChild(_html);
	event.stopPropagation();
}
/**
 * 睡觉
 */
function shuijiao(_time) {
	var _sleep = _yangyiyang[_curDisName].healthRing_sleep;
	for(var i in _sleep) {
		if(_sleep[i].operationTime == _time) {
			var operationTime = _sleep[i]["operationTime"];
			var img = _sleep[i]["img"];
			var healthMethod = _sleep[i]["healthMethod"];
			var operationMethod = _sleep[i]["operationMethod"];
			var _html = zuzhuang(operationTime, healthMethod, operationMethod == undefined ? "" : operationMethod, img);
			document.getElementById("quanping").appendChild(_html);
		}
	}
}
/**
 * 点击饮食、睡觉、运动	样式
 * @param {Object} obj
 */
function fun_data(val, obj, color) {
	if(oldObj != undefined && obj.getAttribute("id") == oldObj.getAttribute("id")) {
		return false;
	}
	var same_time = {};
	fun_hidden();
	_title = val;
	obj.style.backgroundColor = color;
	if(oldObj != undefined) {
		oldObj.style.backgroundColor = "";
	}
	oldObj = obj;
	var sgmentTime = getSegmentTime();
	if(val == "yinshi") {
		if(diseasespeople == null) {
			//用户信息判断版本
			diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
		}
		var _yinshi = _yangyiyang[_curDisName].healthRing_yinshi;
		for(var i in _yinshi) {
			for(var shipu in _yinshi[i].shicai) {
				if(sgmentTime[shipu] != undefined) {
					var _time = sgmentTime[shipu];
					if(same_time[_time] == undefined) {
						same_time[_time] = _time;
						fun_show_time(ring_show_time, _time, undefined, color);
					}
					continue;
				} else if(sgmentTime[shipu.replace("_菜品", "")] != undefined) {
					var _time = sgmentTime[shipu.replace("_菜品", "")];
					if(same_time[_time] == undefined) {
						same_time[_time] = _time;
						fun_show_time(ring_show_time, _time, undefined, color);
					}
					continue;
				}
			}
		}
	} else if(val == "shuijiao") {
		same_time = {};
		var _sleep = _yangyiyang[_curDisName].healthRing_sleep;
		for(var i in _sleep) {
			if(same_time[_sleep[i].operationTime] == undefined) {
				same_time[_sleep[i].operationTime] = _sleep[i].operationTime;
				fun_show_time(ring_show_time, _sleep[i].operationTime, undefined, color);
			}
		}
	} else if(val == "yundong") {
		same_time = {};
		var _motion = _yangyiyang[_curDisName].healthRing_motion;
		for(var key in _motion) {
			var _data = _motion[key];
			if(sgmentTime["晨练"] != undefined && _data.operationTime.indexOf("晨练") != -1) {
				if(same_time[sgmentTime["晨练"]] == undefined) {
					same_time[sgmentTime["晨练"]] = sgmentTime["晨练"];
					fun_show_time(ring_show_time, sgmentTime["晨练"], undefined, color);
				}
			}
			if(sgmentTime["运动"] != undefined && _data.operationTime.indexOf("运动") != -1) {
				if(same_time[sgmentTime["运动"]] == undefined) {
					same_time[sgmentTime["运动"]] = sgmentTime["运动"];
					fun_show_time(ring_show_time, sgmentTime["运动"], undefined, color);
				}
			}
		}
	} else if(val == "yangxin") {
		same_time = {};
		var _leisure = _yangyiyang[_curDisName].healthRing_leisure;
		for(var key in _leisure) {
			var _data = _leisure[key];
			if(sgmentTime["休闲1"] != undefined && _data.operationTime.indexOf("休闲1") != -1) {
				if(same_time[sgmentTime["休闲1"]] == undefined) {
					same_time[sgmentTime["休闲1"]] = sgmentTime["休闲1"];
					fun_show_time(ring_show_time, sgmentTime["休闲1"], undefined, color);
				}
			}
			if(sgmentTime["休闲2"] != undefined && _data.operationTime.indexOf("休闲2") != -1) {
				if(same_time[sgmentTime["休闲2"]] == undefined) {
					same_time[sgmentTime["休闲2"]] = sgmentTime["休闲2"];
					fun_show_time(ring_show_time, sgmentTime["休闲2"], undefined, color);
				}
			}
		}
	}
}

/**
 * 点击人体途中的部位，人体移动效果
 * @param {Object} rentidata
 */
function timeOut(rentidata) {
	var _rentiSvg = document.getElementById("renti_xiuyixiu");
	var marginLeft = parseInt(_rentiSvg.style.marginLeft);
	if(marginLeft > -140) {
		_rentiSvg.style.marginLeft = (marginLeft - 5) + 'px';
		setTimeout("timeOut()", 1);
	} else {
		document.getElementById("pieChart").style.display = "block";
		document.getElementById("ul_term").innerHTML = "";
	}
}

/**
 * 点击人体中的部位，获取可修理项
 * @param {Object} str
 */
var youhua_buwei = "";
var pieChart;

function fun_renti(str) {
	youhua_buwei = str;
	var rentidata = [];
	if(str == "toujing") {
		rentidata = [{
				value: 20,
				name: '眼',
				code: 'yan',
				buwei: '头部'
			}, {
				value: 20,
				name: '口腔',
				code: 'kouqiang',
				buwei: '头部'
			}, {
				value: 20,
				name: '牙齿',
				code: 'yachi',
				buwei: '头部'
			}
			/*, {
						value: 20,
						name: '鼻',
						code: 'bi',
						buwei: '头部'
					}*/
			, {
				value: 20,
				name: '头发',
				code: 'toufa',
				buwei: '头部'
			}, {
				value: 20,
				name: '皮肤',
				code: 'pifu',
				buwei: '头部'
			}, {
				value: 20,
				name: '体型',
				code: 'tixing',
				buwei: '头部'
			}
		]
	} else if(str == "xiong") {
		rentidata = [{
			value: 33,
			name: '皮肤',
			code: 'pifu',
			buwei: '胸部'
		}, {
			value: 33,
			name: '体型',
			code: 'tixing',
			buwei: '胸部'
		}];
		if(diseasespeople == "woman") {
			rentidata.push({
				value: 33,
				name: '乳房',
				code: 'roufang',
				buwei: '胸部'
			});
		}
	} else if(str == "fu") {
		rentidata = [{
			value: 50,
			name: '皮肤',
			code: 'pifu',
			buwei: '腹部'
		}, {
			value: 50,
			name: '体型',
			code: 'tixing',
			buwei: '腹部'
		}]
	} else if(str == "dun") {
		rentidata = [{
			value: 50,
			name: '皮肤',
			code: 'pifu',
			buwei: '臀部'
		}, {
			value: 50,
			name: '体型',
			code: 'tixing',
			buwei: '臀部'
		}]
	} else if(str == "sizhi") {
		rentidata = [{
			value: 50,
			name: '皮肤',
			code: 'pifu',
			buwei: '四肢'
		}, {
			value: 50,
			name: '体型',
			code: 'tixing',
			buwei: '四肢'
		}]
	}
	////////////////////////////////////////////////////////////////////////
	pieChart = echarts.init(document.getElementById('pieChart'));
	document.getElementById("div_position").style.display = "block";
	var option = {
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: ['40%', '80%'],
			selectedMode: 'single', //可以弹出来的
			itemStyle: {
				normal: {
					label: {
						position: 'inner',
						textStyle: {
							color: "#000000"
						}
					},
					labelLine: {
						show: false
					}
				},
				emphasis: {
					label: {
						show: true
					}
				}
			},
			data: [{
				value: 335,
				name: '直达'
			}, {
				value: 310,
				name: '邮件营销'
			}, {
				value: 234,
				name: '联盟广告'
			}, {
				value: 135,
				name: '视频广告'
			}, {
				value: 1048,
				name: '百度'
			}, {
				value: 251,
				name: '谷歌'
			}, {
				value: 147,
				name: '必应'
			}, {
				value: 102,
				name: '其他'
			}]
		}]
	}
	var _arr_color = [];
	for(var _i in rentidata) {
		_arr_color.push(common_arr_color[_i])
	}
	option['color'] = _arr_color;
	option['animation'] = false;
	pieChart.setOption(option);
	pieChart.on('click', function(params) {
		document.getElementById("ul_term").innerHTML = "";
		var fragment = document.createDocumentFragment();
		var zixiudata = zixiurenqun[diseasespeople];
		var _data = zixiudata[params.data.code];
		for(var i = 0; i < _data.length; i++) {
			var li = document.createElement("li");
			li.className = "mui-table-view-cell";
			li.setAttribute('buwei', params.data.buwei);
			li.innerHTML = '<a class="clickClass" style="background:#FFFFFF;">' + _data[i] + '</a>';
			fragment.appendChild(li);
		}
		document.getElementById("ul_term").appendChild(fragment);
		document.getElementById("ul_term").scrollTop = 0;
	});
	timeOut(rentidata);
}

/**
 * 点击具体的修理项，获取数据
 * @param {Object} obj
 */
function fun_selfCultivation(obj) {
	var self_cultivation_result = plus.webview.getWebviewById("self_cultivation_result");
	if(self_cultivation_result == null) {
		jumpPage("self_cultivation_result.html", "slide-in-right", {
			"status": "select",
			"_text": obj.innerText,
			"_show_text": obj.innerText,
			"buwei": obj.parentNode.getAttribute('buwei'),
			'_action': SELFCULTIVATION
		}, true);
		self_cultivation_result = plus.webview.getWebviewById("self_cultivation_result");
	}
	self_cultivation_result.show("zoom-fade-out", 500);
}

/**
 *	各向指数
 */
function gexiangzhishu(type) {
	document.getElementById("fudao_interface_content").style.display = "none";
	document.getElementById("fudao_gexiangzhishu").style.display = "block";
	if(1 == type) {
		document.getElementById("center_title").innerText = "生理健康指数";
	} else if(2 == type) {
		document.getElementById("center_title").innerText = "心理健康指数";
	} else if(3 == type) {
		document.getElementById("center_title").innerText = "社会健康指数";
	} else if(4 == type) {
		document.getElementById("center_title").innerText = "自测健康指数";
	}

	var _gexiangzhishu = JSON.parse(localStorage.getItem('gexiangzhishu_' + type));
	if(_gexiangzhishu != null && _gexiangzhishu != "" && _gexiangzhishu != {}) {
		gexiangzhishuzuzhuang(type);
	} else {
		getGexiangzhishu(type);
	}
}

function gexiangzhishuzuzhuang(type) {
	document.getElementById("fudao_list").scrollTop = 0;
	var table_data = document.getElementById("chachalist");
	//删除
	for(var i = table_data.children.length - 1; i > 0; i--) {
		table_data.children[i].remove();
	}
	var _gexiangzhishu = JSON.parse(localStorage.getItem('gexiangzhishu_' + type));
	var fragment = document.createDocumentFragment();
	for(var i = 0; i < _gexiangzhishu.length; i++) {
		var _tr = document.createElement("tr");
		_tr.align = "center"
		_tr.style.backgroundColor = "#e2e2e2";
		var _td = document.createElement("td");
		//_td.style.border="1px solid #c8c7cc";
		_td.width = "10%";
		_td.height = 50;
		_td.innerText = i + 1;
		_tr.appendChild(_td);
		_td = document.createElement("td");
		//_td.style.border="1px solid #c8c7cc";
		_td.width = "20%";
		_td.innerText = _gexiangzhishu[i]['name'];
		_tr.appendChild(_td);

		_td = document.createElement("td");
		//_td.style.border="1px solid #c8c7cc";
		_td.width = "20%";
		var _result = _gexiangzhishu[i]['result'];
		if(_result == null || _result == '' || _result == undefined) {
			_result = "";
		}
		_td.innerText = _result;
		_tr.appendChild(_td);

		_td = document.createElement("td");
		//_td.style.border="1px solid #c8c7cc";
		_td.width = "20%";
		var resultPrompt = _gexiangzhishu[i]['resultPrompt'];
		if(resultPrompt == undefined) {
			resultPrompt = "";
		}
		_td.innerText = resultPrompt == "" ? "" : (resultPrompt == '偏高' ? '↑' : '↓');
		_tr.appendChild(_td);

		_td = document.createElement("td");
		//_td.style.border="1px solid #c8c7cc";
		_td.width = "20%";
		_td.innerText = _gexiangzhishu[i]['scroe'];
		_tr.appendChild(_td);
		if(_gexiangzhishu[i]['scroe'] < 5) {
			_tr.style.backgroundColor = "#f2dcdb";
		}
		fragment.appendChild(_tr);
		//分格符////////////////
		_tr = document.createElement("tr");
		_tr.className = "fenge";
		_td = document.createElement("td");
		//_td.style.border="1px solid #c8c7cc";
		_td.colSpan = 5;
		_td.height = 5;
		_tr.appendChild(_td);
		fragment.appendChild(_tr);
	}
	document.getElementById("chachalist").appendChild(fragment);
}

// url各向指数
function getGexiangzhishu(type) {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	var _message = "";
	if(1 == type) {
		_message = "正在获取生理健康指数细览，请稍候...";
	} else if(2 == type) {
		_message = "正在获取心理健康指数细览，请稍候...";
	} else if(3 == type) {
		_message = "正在获取社会健康指数细览，请稍候...";
	} else if(4 == type) {
		_message = "正在获取自测健康指数细览，请稍候...";
	}
	var w = plus.ui.createWaiting(_message);
	//等于空时去服务器查询是否有数据
	mui.ajax(ADDR + GEXIANGZHISHU + random(), {
		data: {
			type: parseInt(type),
			appID: getUser().appid
		},
		dataType: 'json',
		type: 'post',
		timeout: 8000,
		success: function(data) {
			w.close();
			var _gexiangzhishu = data.obj;
			localStorage.setItem('gexiangzhishu_' + type, JSON.stringify(_gexiangzhishu));
			gexiangzhishuzuzhuang(type);
		},
		error: function(xhr, type, errorThrown) {
			w.close();
			plus.nativeUI.toast('服务器出现异常，请重试！');
		}
	});
}
/**
 * 查查记录
 */
function chacharecord() {
	jumpPage('healthindex/historyrecord.html', 'slide-in-right', {}, false);
}
/**
 * 我的问题
 */
function fun_myDisease() {
	jumpPage('healthindex/historyrecorddisease.html', 'slide-in-right', {}, false);
}
/**
 * 我的习惯
 */
function fun_myHabit() {
	jumpPage('myhabit/wo_habit_set.html', 'slide-in-right', {}, false);
}
/**
 * 养一养 疾病
 */
function fun_health() {
	jumpPage('health/health_pagination.html', 'slide-in-right', {}, false);
}

function fun_getData(obj) {
	var operationTime = obj.operationTime;
	var img = obj.img;
	var healthMethod = obj.healthMethod;
	var operationMethod = obj.operationMethod;
	var _html = zuzhuang(operationTime, healthMethod, operationMethod == undefined ? "" : operationMethod, img);
	document.getElementById("quanping").appendChild(_html);
	mui('#yangxinPrompt').popover('hide');
	mui('#yinshiPrompt').popover('hide');
}

function zuzhuang(curTime, healthMethod, operationMethod, img) {
	var _html = document.createElement("div");
	_html.style.position = "fixed";
	_html.style.top = "0px";
	_html.style.left = "0px";
	_html.style.width = "100%";
	_html.style.height = "100%";
	_html.style.background = "#ffffff";
	_html.style.zIndex = 999999;

	var _div = document.createElement("div");
	_div.innerHTML = "养一养";
	_div.className = "mui-bar mui-bar-nav";
	_div.style.textAlign = "center";
	_div.style.paddingTop = "12px";
	_div.style.width = "100%";
	_div.style.fontSize = "17px";
	_div.style.borderBottom = "1px solid #93cde3";
	_html.appendChild(_div);

	var _curTime = document.createElement("div");
	//_curTime.innerHTML = "时间：" + curTime;
	_curTime.innerHTML = "&nbsp;"
	_curTime.style.lineHeight = '120%';
	_curTime.style.marginTop = "50px";
	_curTime.style.textAlign = "center";
	_curTime.style.padding = '25px 30px 0px 30px';
	_html.appendChild(_curTime);
	var h4Parent = document.createElement("div");
	h4Parent.style.width = '300px';
	h4Parent.style.textAlign = "center";
	h4Parent.style.marginLeft = "auto";
	h4Parent.style.marginRight = "auto";
	var _healthMethod = document.createElement("h4");
	_healthMethod.innerHTML = healthMethod
	_healthMethod.style.marginTop = "20px";
	_healthMethod.style.textAlign = "center";
	_healthMethod.style.color = '#5c9eb0';
	h4Parent.appendChild(_healthMethod);
	_html.appendChild(h4Parent);
	if(img != undefined) {
		if(diseasespeople == null) {
			//用户信息判断版本
			diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
		}
		var _img = document.createElement("img");
		_img.src = ADDR + diseasespeople + "/" + img;
		_img.style.marginTop = "25px";
		//_img.style.margin = "auto auto";
		_img.style.textAlign = "center";
		_img.style.width = "260px";
		_img.style.height = "200px";
		_html.appendChild(_img);
	}
	var _center = document.createElement("center");
	var _operationMethodParentDiv = document.createElement("div");
	_operationMethodParentDiv.style.width = "300px";
	_operationMethodParentDiv.style.height = "200px";
	_operationMethodParentDiv.style.overflowY = "auto";
	_operationMethodParentDiv.style.overflowX = "hidden";
	_operationMethodParentDiv.style.margin = "5px 0px";
	_operationMethodParentDiv.style.fontSize = "12px";
	var _operationMethod = document.createElement("div");
	_operationMethod.innerHTML = "&nbsp; &nbsp; &nbsp; &nbsp; " + operationMethod;
	_operationMethod.style.marginTop = "20px";
	_operationMethod.style.textAlign = "left";
	_operationMethod.style.width = "300px";
	_operationMethod.style.height = "200px";

	_operationMethodParentDiv.appendChild(_operationMethod);
	_center.appendChild(_operationMethodParentDiv);
	_html.appendChild(_center);
	return _html;
}

function fun_hidden() {
	document.getElementById("ring_show_time").innerHTML = "";
}

function yangxin_yundong_zuzhuang(_time, message_data) {
	var _html = "";
	for(var i = 0; i < message_data.length; i++) {
		_html += '<li class="mui-table-view-cell">';
		var _temp = 'operationTime="' + _time + '"';
		_temp += 'img="' + message_data[i].img + '"';
		_temp += 'healthMethod="' + message_data[i].healthMethod + '"';
		_temp += 'operationMethod="' + (message_data[i].operationMethod == undefined ? "" : message_data[i].operationMethod) + '"';
		_html += '<a onclick="fun_getData(this)" ' + _temp + '>' + message_data[i].healthMethod + '</a>';
		_html += '</li>';
	}
	document.getElementById("yangxinDIV").innerHTML = _html;
	mui('#yangxinPrompt').popover('show');
	document.getElementById("yangxinPrompt").style.bottom = "0px";
}

var liaoyiliao_zimu;

function loadding_first_letter() {
	if(!liaoyiliao_zimu) {
		liaoyiliao_zimu = [];
		pullupRefresh(document.getElementById("ul_list1"), "全部", "1");
	}
}
/**
 * 疾病分页数据
 * @param {Object} page
 * @param {Object} fl
 */
function pullupRefresh(ul, _title, _page) {
	ul.style.backgroundColor = "#FFFFFF";
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	//用户信息判断版本
	if(diseasespeople == null) {
		diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
	}
	mui.ajax(ADDR + TREATMENTDATA, {
		data: {
			"firstLetter": (_title == "全部" ? "" : _title),
			"type": diseasespeople,
			"page": _page + "",
			"random": random().replace("?random=", "")
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			if(data.success) {
				var obj = data.obj;
				for(var i in obj) {
					var li = document.createElement("li");
					//li.className = "mui-table-view-cell mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3";
					li.className = "mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3";
					li.style.padding = "11px 0px";
					//li.style.backgroundColor = "#DDC0A1";
					//li.style.fontSize = "13px";
					//li.innerHTML = '<a >' + objs[i][1] + '</a>';
					var _a = '<a style="padding:4px 0px;background: #FFFFFF;" val="' + obj[i][0] + '"  >'
					_a += '<img src="img/icon/' + obj[i][2] + '" style="width:40px;height:36px" />';
					_a += '<div class="mui-media-body">' + obj[i][1] + '</div></a>';
					li.innerHTML = _a;
					ul.appendChild(li);

				}
				setPage(ul, _page);
				if(obj.length == 20) {
					mui(ul.parentNode).pullToRefresh().endPullUpToRefresh();
				} else if(obj.length < 20) {
					mui(ul.parentNode).pullToRefresh().endPullUpToRefresh(true);
				}
			} else {
				mui(ul.parentNode).pullToRefresh().endPullUpToRefresh(true);
			}
		},
		error: function(xhr, type, errorThrown) {
			document.getElementById("group_myterritory").style.display = "inline-block";
			//document.getElementById("wait").style.display = "none";
			//异常处理；
			plus.nativeUI.toast('服务器出现异常，请重试！');
		}
	});
}
//重置page
function setPage(ul, _page) {
	_page = parseInt(_page) + 1;
	var _id = ul.getAttribute("id").toString().replace("ul_list", "");
	var obj = document.getElementById("title" + _id);
	obj.setAttribute("page", _page);
	return obj;
}
//获取page
function getPage(ul) {
	var _id = ul.getAttribute("id").toString().replace("ul_list", "");
	var obj = document.getElementById("title" + _id);
	return obj;
}

function fun_ready() {
	//循环初始化所有下拉刷新，上拉加载。
	mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
		//mui-scroll
		mui(pullRefreshEl).pullToRefresh({
			down: {
				callback: function() {
					var self = this;
					setTimeout(function() {
						var ul = self.element.querySelector('.mui-table-view');
						ul.innerHTML = "";
						var obj = getPage(ul);
						var _title = obj.innerText;
						var _page = obj.getAttribute("page");
						pullupRefresh(ul, _title, "1");
						self.endPullDownToRefresh();
						self.endPullUpToRefresh(false);
						self.refresh(true);
					}, 1000);
				}
			},
			up: {
				callback: function() {
					var self = this;
					setTimeout(function() {
						var ul = self.element.querySelector('.mui-table-view');
						var obj = getPage(ul);
						var _title = obj.innerText;
						var _page = obj.getAttribute("page");
						pullupRefresh(ul, _title, _page);
						self.endPullUpToRefresh();
					}, 1000);
				}
			}
		});
	});
}

function init_yingyiyang() {
	var _healthRing = getHealthRing(user.appid);
	var _date = new Date();
	var ymd = _date.getFullYear() + "" + _date.getMonth() + "" + _date.getDate();
	var timeYangYiYang = getTimingYangYiYang();
	if(timeYangYiYang != ymd || _healthRing[_curDisName] == undefined) {
		var task = plus.uploader.createUpload(ADDR + SELFHEALTH, {
			method: "post",
			timeout: 10
		}, function(t, status) {
			if(status != 200) {
				//异常处理；
				plus.nativeUI.toast('服务器出现异常，请重试');
			} else if(status == 200) {
				var respText = t.responseText;
				if(respText != "") {
					var data = JSON.parse(respText);
					if(data.success) {
						saveTimingYangYiYang(ymd);
						_healthRing[_curDisName] = data.obj;
						saveHealthRing(user.appid, _healthRing);
						fengzhuangYangYiYang();
					}
				}
			}
		});
		task.addData("appid", user.appid);
		task.addData("haveDisease", _curDisName);
		task.start();
	} else {
		fengzhuangYangYiYang();
	}
}

function fengzhuangYangYiYang() {
	_yangyiyang = getHealthRing(user.appid);
	//饮食	开始
	document.getElementById("ul_yinshi").innerHTML = "<li>加载中...</li>";
	var ul_yinshi = [];
	var _yinshi = _yangyiyang[_curDisName].healthRing_yinshi;
	for(var i in _yinshi) {
		if(_yinshi[i].name == _curDisName) {
			document.getElementById("yishi").innerHTML = _yinshi[i].yishi;
			document.getElementById("jinshi").innerHTML = _yinshi[i].jinshi;
			for(var shicai in _yinshi[i].shicai_nengliang) {
				ul_yinshi.push(shicai);
			}
		}
	}
	document.getElementById("ul_yinshi").innerHTML = "";
	if(ul_yinshi.length > 0) {
		document.getElementById("yinshidata").style.display = "inline-block";
		ul_yinshi.sort(function(obj1, obj2) {
			var _t1 = obj1.substring(0, obj1.indexOf("-"));
			var _t2 = obj2.substring(0, obj2.indexOf("-"));
			return parseInt(_t1.replace(":", "")) - parseInt(_t2.replace(":", ""));
		});
		document.getElementById("ul_yinshi").innerHTML = "";
		for(var _str in ul_yinshi) {
			var _li = document.createElement("li");
			_li.className = "mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3";
			_li.innerHTML = ul_yinshi[_str];
			_li.style.fontSize = '12px';
			_li.onclick = function() {
				document.getElementById("nengliangPage").style.display = "block";
				document.getElementById("nengliangBackground").style.display = "block";
				for(var i in _yinshi) {
					if(_yinshi[i].name == _curDisName) {
						for(var shicai in _yinshi[i].shicai_nengliang) {
							if(shicai == this.innerText) {
								document.getElementById("name_nengliang").innerText = this.innerText;
								var nengliang = _yinshi[i].shicai_nengliang[this.innerText];
								document.getElementById("energy_nengliang").innerText = nengliang.energy;
								document.getElementById("protein_nengliang").innerText = nengliang.protein;
								document.getElementById("fat_nengliang").innerText = nengliang.fat;
								document.getElementById("carbohydrate_nengliang").innerText = nengliang.carbohydrate;
								document.getElementById("dietaryFiber_nengliang").innerText = nengliang.dietaryFiber;
								document.getElementById("cholesterol_nengliang").innerText = nengliang.cholesterol;
								document.getElementById("content_nengliang").innerText = nengliang.content;
							}
						}
					}
				}
			}
			document.getElementById("ul_yinshi").appendChild(_li);
		}
	} else {
		document.getElementById("yinshidata").style.display = "none";
	}
	//饮食	结束

	//睡觉	开始
	document.getElementById("ul_shuijiao").innerHTML = "<li>加载中...</li>";
	var ul_shuijiao = [];
	var _sleep = _yangyiyang[_curDisName].healthRing_sleep;
	for(var i in _sleep) {
		var _obj = _sleep[i];
		var operationMethod = _obj.operationMethod.replace("提醒：", "");
		ul_shuijiao.push(operationMethod);
	}
	if(ul_shuijiao.length > 0) {
		ul_shuijiao.sort(function(obj1, obj2) {
			var _t1 = obj1.substring(0, obj1.indexOf("-"));
			var _t2 = obj2.substring(0, obj2.indexOf("-"));
			return parseInt(_t1.replace(":", "")) - parseInt(_t2.replace(":", ""));
		});
		document.getElementById("ul_shuijiao").innerHTML = "";
		for(var _str in ul_shuijiao) {
			var _li = document.createElement("li");
			_li.style.padding = "5px";
			_li.innerHTML = ul_shuijiao[_str]
			document.getElementById("ul_shuijiao").appendChild(_li);
		}
	}
	//睡觉	结束
	//运动	开始
	document.getElementById("ul_yundong").innerHTML = "<li>加载中...</li>";
	var ul_yundong = [];
	var _motion = _yangyiyang[_curDisName].healthRing_motion;
	for(var key in _motion) {
		var _data = _motion[key];
		if(_curDisName == _data.disease || document.getElementById("disease_name").innerHTML == "") {
			ul_yundong.push(_data.healthMethod);
		}
	}
	document.getElementById("ul_yundong").innerHTML = "";
	if(ul_yundong.length > 0) {
		document.getElementById("yundongdata").innerHTML = "运动";
		for(var _str in ul_yundong) {
			var _li = document.createElement("li");
			_li.style.padding = "5px";
			_li.innerHTML = ul_yundong[_str];
			document.getElementById("ul_yundong").appendChild(_li);
		}
	} else {
		document.getElementById("yundongdata").innerHTML = "";
	}
	//运动	结束

	//休闲	开始
	document.getElementById("ul_xiuxian").innerHTML = "<li>加载中...</li>";
	var ul_xiuxian = [];
	var _leisure = _yangyiyang[_curDisName].healthRing_leisure;
	for(var key in _leisure) {
		var _data = _leisure[key];
		ul_xiuxian.push(_data.healthMethod);
	}
	document.getElementById("ul_xiuxian").innerHTML = "";
	if(ul_xiuxian.length > 0) {
		document.getElementById("xiuxiandata").innerHTML = "休闲";
		ul_xiuxian.sort(function(obj1, obj2) {
			var _t1 = obj1.substring(0, obj1.indexOf("-"));
			var _t2 = obj2.substring(0, obj2.indexOf("-"));
			return parseInt(_t1.replace(":", "")) - parseInt(_t2.replace(":", ""));
		});
		for(var _str in ul_xiuxian) {
			var _li = document.createElement("li");
			_li.style.padding = "5px";
			_li.innerHTML = ul_xiuxian[_str];
			document.getElementById("ul_xiuxian").appendChild(_li);
		}
	} else {
		document.getElementById("xiuxiandata").innerHTML = "";
	}
	//休闲	结束
	mui('.mui-button-row').each(function() {
		var list = this.children;
		for(var i = 0; i < list.length; i++) {
			list[i].style.background = '';
		}
	});
	fun_data("yinshi", document.getElementById("yinshi"), "#FBE089");
}

function fun_ajax_yinshi(isfirst, type, jieduan) {
	if(jieduan.indexOf("休息") != -1) {
		var obj_caipu = document.getElementById("caipu_" + _jieduanshicaitagname[jieduan] + "0");
		if(obj_caipu != null && obj_caipu.innerText == "加载中...") {
			obj_caipu.innerHTML = "";
		}
		obj_caipu = document.getElementById("caipu_" + _jieduanshicaitagname[jieduan] + "1");
		if(obj_caipu != null && obj_caipu.innerText == "加载中...") {
			obj_caipu.innerHTML = "";
		}
		return true;
	}
	var table_shicai = document.getElementsByName("table_shicai");
	var _init_t_s = 0;
	var _init_table_len = table_shicai.length;
	if(type == 0) {
		_init_table_len = 1;
		var obj_caipu = document.getElementById("caipu_" + _jieduanshicaitagname[jieduan] + "0");
		if(obj_caipu != null) {
			obj_caipu.innerHTML = "加载中...";
		}
	} else if(type == 1) {
		_init_t_s = 1;
		obj_caipu = document.getElementById("caipu_" + _jieduanshicaitagname[jieduan] + "1");
		if(obj_caipu != null) {
			obj_caipu.innerHTML = "加载中...";
		}
	} else {
		var obj_caipu = document.getElementById("caipu_" + _jieduanshicaitagname[jieduan] + "0");
		if(obj_caipu != null) {
			obj_caipu.innerHTML = "加载中...";
		}
		obj_caipu = document.getElementById("caipu_" + _jieduanshicaitagname[jieduan] + "1");
		if(obj_caipu != null) {
			obj_caipu.innerHTML = "加载中...";
		}
	}
	var _json_selected = {};
	for(var _t_s = _init_t_s; _t_s < _init_table_len; _t_s++) {
		var _table = table_shicai[_t_s];
		var _rows = _table.rows.length;
		var _json_par = {};
		for(var _r_i = 0; _r_i < _rows; _r_i++) {
			if(_table.rows[_r_i].cells[1].innerHTML != "") {
				if(_json_selected[_t_s + "_" + table_shicai[_t_s].getAttribute("jinyongshicai")] == undefined) {
					var _arr = [];
					_arr.push(_table.rows[_r_i].cells[0].getAttribute("shicai"));
					_json_selected[_t_s + "_" + table_shicai[_t_s].getAttribute("jinyongshicai")] = _arr;
				} else {
					var _arr = _json_selected[_t_s + "_" + table_shicai[_t_s].getAttribute("jinyongshicai")];
					_arr.push(_table.rows[_r_i].cells[0].getAttribute("shicai"));
				}
			}
		}
	}
	//是否读取数据库
	var _boo = false;
	var _saveshicaicaipu = getShicai_yinshi(user.appid);
	for(var shicaikey in _json_selected) {
		var _shicaicaipuKey = shicaikey.substring(0, 1) + "_" + _json_selected[shicaikey];
		if(_saveshicaicaipu[_shicaicaipuKey] != null) {
			var _json_shicai = {};
			_json_shicai[_shicaicaipuKey] = _saveshicaicaipu[_shicaicaipuKey];
			fun_shicai_caipin(_json_shicai);
			_boo = true;
		}
	}
	if(!_boo) {
		var task = plus.uploader.createUpload(ADDR + SELFHEALTHNEXT, {
			method: "post",
			timeout: 5
		}, function(t, status) {
			if(status != 200) {
				//异常处理；
				plus.nativeUI.toast('服务器出现异常，请重试');
			} else if(status == 200) {
				var respText = t.responseText;
				if(respText != "") {
					var data = JSON.parse(respText);
					if(data.success) {
						var objs = data.obj;
						//数据组装
						fun_shicai_caipin(objs);
						var _shicaicaipu = getShicai_yinshi(user.appid);
						var _index = 0;
						for(var shicaikey in _json_selected) {
							var _shicaicaipuKey = shicaikey.substring(0, 1) + "_" + _json_selected[shicaikey];
							_shicaicaipu[_shicaicaipuKey] = objs[shicaikey];
							_index++;
						}
						saveShicai_yinshi(user.appid, _shicaicaipu);
						var obj_caipu = document.getElementById("caipu_" + _jieduanshicaitagname[jieduan] + "0");
						if(obj_caipu != null && obj_caipu.innerText == "加载中...") {
							obj_caipu.innerHTML = "暂无饮食!";
						}
						obj_caipu = document.getElementById("caipu_" + _jieduanshicaitagname[jieduan] + "1");
						if(obj_caipu != null && obj_caipu.innerText == "加载中...") {
							obj_caipu.innerHTML = "暂无饮食!";
						}
					} else {
						plus.nativeUI.toast('服务器连接异常！');
					}
				}
			}
		});
		task.addData("next", "next");
		task.addData("selfHealthName", "yinshi");
		task.addData("jsonStr", JSON.stringify(_json_selected));
		task.start();
	}
}

function fun_shicai_caipin(_saveshicaicaipu) {
	for(var _shicaicappukey in _saveshicaicaipu) {
		var div_obj_caipu = document.getElementById("caipu_" + _shicaicappukey.split("_")[0]);
		div_obj_caipu.innerHTML = "";
		var arr_caipu = _saveshicaicaipu[_shicaicappukey];
		var _json_caipintu_miaosu = {};
		for(var _i_caipu in arr_caipu) {
			var shicai_shipu = arr_caipu[_i_caipu];
			var _arr_z_f_zuofa = {};
			_arr_z_f_zuofa['主料'] = shicai_shipu.zhuliao;
			_arr_z_f_zuofa['辅料'] = shicai_shipu.fuliao;
			_arr_z_f_zuofa['做法'] = shicai_shipu.zuofabuzhou;
			_json_caipintu_miaosu[shicai_shipu.imagefile + "~" + shicai_shipu.name] = _arr_z_f_zuofa;
		}
		var _table_tu_name = document.createElement("table");
		for(var tu in _json_caipintu_miaosu) {
			var _tr_name = document.createElement("tr");
			var _td_name_1 = document.createElement("td");
			var _img = document.createElement("img");
			var _url = ADDR + diseasespeople + "/yinshi" + tu.split("~")[0];
			_img.src = _url;
			_img.style.width = "50px";
			_img.style.height = "50px";
			_td_name_1.appendChild(_img);
			var _td_name_2 = document.createElement("td");
			_td_name_2.style.paddingLeft = "10px";
			_td_name_2.style.color = "blue";
			var _div = document.createElement("div");
			_div.innerHTML = tu.split("~")[1].length > 5 ? tu.split("~")[1].substring(0, 5) : tu.split("~")[1];
			_td_name_2.appendChild(_div);
			_tr_name.appendChild(_td_name_1);
			_tr_name.appendChild(_td_name_2);
			_tr_name.setAttribute("onclick", "yinshi_zuofa('" + _url + "','" + JSON.stringify(_json_caipintu_miaosu[tu]) + "')");
			_table_tu_name.appendChild(_tr_name);
		}
		div_obj_caipu.appendChild(_table_tu_name);
	}
}