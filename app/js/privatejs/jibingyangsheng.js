var sgmentTime = getSegmentTime();
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
	if(val == "yinshi") {
		if(diseasespeople == null) {
			//用户信息判断版本
			diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
		}
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
		var _data = _sleep;
		for(var i in _sleep) {
			if(same_time[_data[i].operationTime] == undefined) {
				same_time[_data[i].operationTime] = _data[i].operationTime;
				fun_show_time(ring_show_time, _data[i].operationTime, undefined, color);
			}
		}
	} else if(val == "yundong") {
		same_time = {};
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
			if(sgmentTime["休闲3"] != undefined && _data.operationTime.indexOf("休闲3") != -1) {
				if(same_time[sgmentTime["休闲3"]] == undefined) {
					same_time[sgmentTime["休闲3"]] = sgmentTime["休闲3"];
					fun_show_time(ring_show_time, sgmentTime["休闲3"], undefined, color);
				}
			}
			if(sgmentTime["休闲4"] != undefined && _data.operationTime.indexOf("休闲4") != -1) {
				if(same_time[sgmentTime["休闲4"]] == undefined) {
					same_time[sgmentTime["休闲4"]] = sgmentTime["休闲4"];
					fun_show_time(ring_show_time, sgmentTime["休闲4"], undefined, color);
				}
			}
		}
	}
}

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
		var _curmotion = _motion;
		var _arr = [];
		for(var _i in _curmotion) {
			if(segmentTime[_time] != undefined && _curmotion[_i].operationTime.indexOf(segmentTime[_time]) != -1) {
				_arr = _curmotion;
			}
		}
		fun_getData(_arr[Math.floor(Math.random() * _arr.length)]);
	} else if(_title == "yangxin") {
		var segmentTime = getSegmentTime();
		var _curleisure = _leisure;
		var _arr = [];
		for(var _i in _curleisure) {
			if(segmentTime[_time] != undefined && _curleisure[_i].operationTime.indexOf(segmentTime[_time]) != -1) {
				_arr = _curleisure;
			}
		}
		fun_getData(_arr[Math.floor(Math.random() * _arr.length)]);
	} else {
		var userInformation = getUserInformation(user.appid);
		var params = {};
		params['_title'] = _title;
		params['_time'] = _time;
		params['_haveDisease'] = disease;
		params['_haveDiseaseBaihua'] = show_disease;
		params['_key'] = _key;
		yinshi_loadding(_time, 0, params);
	}
}
/**
 * 睡觉
 */
function shuijiao(_time) {
	var _data = _sleep;
	for(var i in _data) {
		if(_data[i].operationTime == _time) {
			var operationTime = _data[i]["operationTime"];
			var img = _data[i]["img"];
			var healthMethod = _data[i]["healthMethod"];
			var operationMethod = _data[i]["operationMethod"];
			var _html = zuzhuang(operationTime, healthMethod, operationMethod == undefined ? "" : operationMethod, img);
			document.getElementById("quanping").appendChild(_html);
		}
	}
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
	_div.innerHTML = "疾病养生";
	_div.className = "mui-bar mui-bar-nav";
	_div.style.textAlign = "center";
	_div.style.paddingTop = "12px";
	_div.style.width = "100%";
	_div.style.fontSize = "17px";
	_div.style.borderBottom = "1px solid #93cde3";
	//_html.appendChild(_div);

	var _curTime = document.createElement("div");
	//_curTime.innerHTML = "时间：" + curTime;
	_curTime.innerHTML = "&nbsp;"
	_curTime.style.marginTop = "50px";
	_curTime.style.textAlign = "center";
	_html.appendChild(_curTime);
	var _healthMethod = document.createElement("div");
	_healthMethod.innerHTML = healthMethod
	_healthMethod.style.marginTop = "20px";
	_healthMethod.style.paddingLeft = "50px";
	_healthMethod.style.paddingRight = "50px";
	_healthMethod.style.textAlign = "center";
	_html.appendChild(_healthMethod);
	if(img) {
		var userInformation = getUserInformation(user.appid)
		var diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
		var medalType = img.substring(img.lastIndexOf('.'));
		if(medalType == '.mp3' || medalType == '.wav' || medalType == '.m4a') {
			var _medalCenter = document.createElement("center");
			var _medalHtml = "<div style ='width:180px;height:180px;margin-top: 100px;'>";
			_medalHtml = "<img id='abc' src='../img/bfzn_004.ico' url ='" + ADDR + diseasespeople + "/" + img + "' /></div>"
			_medalHtml += "</div>";
			_medalCenter.innerHTML = _medalHtml;
			_html.appendChild(_medalCenter);
		} else {
			var imgsrcs = img.split(',');
			for(var i = 0; i < imgsrcs.length; i++) {
				var _imgcenter = document.createElement("center");
				var _imgsrc = imgsrcs[i];
				if(imgsrcs[i].substring(0, 2) == 'gl') {
					_imgsrc = imgsrcs[i].substring(2);
				}
				var _img = document.createElement("img");
				_img.src = ADDR + diseasespeople + "/" + _imgsrc;
				_img.style.marginTop = "25px";
				_img.style.textAlign = "center";
				_img.style.width = "260px";
				_img.style.height = "200px";

				_imgcenter.appendChild(_img);
				_html.appendChild(_imgcenter);
			}
		}
	}

	var _center = document.createElement("center");
	var _operationMethodParentDiv = document.createElement("div");
	_operationMethodParentDiv.style.width = "300px";
	_operationMethodParentDiv.style.height = "260px";
	_operationMethodParentDiv.style.overflowY = "auto";
	_operationMethodParentDiv.style.overflowX = "hidden";
	_operationMethodParentDiv.style.margin = "5px 0px";
	_operationMethodParentDiv.style.fontSize = "12px";
	var _operationMethod = document.createElement("div");
	_operationMethod.innerHTML = operationMethod;
	_operationMethod.style.marginTop = "20px";
	_operationMethod.style.textAlign = "center";
	_operationMethodParentDiv.style.width = "300px";
	_operationMethod.style.height = "260px";
	_operationMethodParentDiv.appendChild(_operationMethod);
	_center.appendChild(_operationMethodParentDiv);
	_html.appendChild(_center);
	return _html;
}

/**
 * 养心 和 运动
 */
function _yangxin_yundong_loadding(_time, name) {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	var w = plus.ui.createWaiting("正在获取数据，请稍候...");
	var task = plus.uploader.createUpload(ADDR + SELFHEALTH, {
		method: "post",
		timeout: 5 //上传任务超时时间
	}, function(t, status) {
		w.close();
		var respText = t.responseText;
		if(respText != "") {
			message_data = JSON.parse(respText).obj;
			var _html = "";
			fun_getData(message_data[0]);
		}
	});
	task.addData("selfHealthName", name);
	task.addData("haveDisease", disease);
	task.addData("random", random().replace("?random=", ""));
	task.addData("renqun", diseasespeople);
	task.addData("time", _time);
	task.setRequestHeader('contentType', 'application/x-www-form-urlencoded; charset=utf-8');
	task.start();
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
				var _yinshi_curDisName = yangyiyang_yinshi[disease];
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
		task.addData("haveDisease", disease);
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
	var _text = "<span style ='color:red'>" + (show_disease == undefined ? "" : show_disease);
	//、、、、、、、、、、、、、、、、
	var _click_text = '<div><img src="../img/hulu.png" width="40" height="40"/>点击选择您喜欢的食材~</div>';
	if(disease != null && show_disease == null) {
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
					//if(jieduan.indexOf("休息") != -1) {
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

function fun_hidden() {
	document.getElementById("ring_show_time").innerHTML = "";
}

function fun_clear(obj) {
	obj.innerHTML = "";
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