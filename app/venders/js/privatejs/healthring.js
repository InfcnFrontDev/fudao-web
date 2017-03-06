// 获取我的健康环的键值
var jiankanghuanObjEvent;

function fun_message(obj) {
	jiankanghuanObjEvent = obj;
	//几点的数据
	var _time = obj.id.replace("message_", "");
	//类型
	var _type = obj.getAttribute("type");
	var _array = [];
	var _array_jing = [];
	//睡觉
	if(_type == "sleep") {
		var arr_val = obj.getAttribute("val").split("^!^");
		for(var _i in arr_val) {
			_array.push(JSON.parse(arr_val[_i]));
		}
		var _random = Math.floor(Math.random() * _array.length);
		var message_data = _array[_random];
		var _html = zuzhuang(message_data.operationTime, message_data.healthMethod,
			message_data.operationMethod == undefined ? "" : message_data.operationMethod, message_data.img == undefined ? "" : message_data.img);
		document.getElementById("quanping").appendChild(_html);
	} else if(_type == "yinshi") { //饮食
		yinshi_zuzhuang(_time);
	} else if(_type == "motion" || _type == "leisure" || _type == "other") { //运动、休闲 、其它
		var arr_val = obj.getAttribute("val").split("^!^");
		for(var _i in arr_val) {
			_array.push(JSON.parse(arr_val[_i]));
		}
		var _random = Math.floor(Math.random() * _array.length);
		var message_data = _array[_random];
		var _html = zuzhuang(message_data.operationTime, message_data.healthMethod,
			message_data.operationMethod == undefined ? "" : message_data.operationMethod, message_data.img == undefined ? "" : message_data.img);
		document.getElementById("quanping").appendChild(_html);
	}
}
// 根据健康环的键值获取数据
function fun_getData(obj) {
	var operationTime = obj.getAttribute("operationTime");
	var healthMethod = obj.getAttribute("healthMethod");
	var operationMethod = obj.getAttribute("operationMethod");
	var img = obj.getAttribute("img");
	var _html = zuzhuang(operationTime, healthMethod, operationMethod == undefined ? "" : operationMethod, img);
	document.getElementById("quanping").appendChild(_html);
	mui('#forward').popover('hide');
}

function zuzhuang(curTime, healthMethod, operationMethod, img) {
	var _html = document.createElement("div");
	_html.style.position = "absolute";
	_html.style.top = "0px";
	_html.style.left = "0px";
	_html.style.width = "100%";
	_html.style.height = "100%";
	_html.style.background = "#ffffff";
	_html.style.zIndex = 999999;

	var _div = document.createElement("div");
	_div.innerHTML = "检查结果";
	_div.className = "mui-bar mui-bar-nav";
	_div.style.textAlign = "center";
	_div.style.paddingTop = "12px";
	_div.style.width = "100%";
	_div.style.fontSize = "17px";
	_div.style.borderBottom = "1px solid #93cde3";
	//_html.appendChild(_div);

	var _curTime = document.createElement("div");
	//_curTime.innerHTML = "时间：" + curTime
	//_curTime.innerHTML = "&nbsp;"
	//_curTime.style.lineHeight = '120%';
	//_curTime.style.marginTop = "50px";
	_curTime.style.marginTop = "15px";
	_curTime.style.textAlign = "center";
	//_curTime.style.padding = '25px 30px 0px 30px';
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
	_html.appendChild(_healthMethod);
	h4Parent.appendChild(_healthMethod);
	_html.appendChild(h4Parent);
	if(img != undefined && img != "") {
		var diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
		var _img = document.createElement("img");
		_img.src = ADDR + diseasespeople + "/" + img;
		_img.style.marginTop = "25px";
		_img.style.textAlign = "center";
		_img.style.width = "260px";
		_img.style.height = "200px";
		_img.appendChild(document.createElement("br"));
		_html.appendChild(_img);
	}
	if(operationMethod.indexOf("photo") == -1 && operationMethod.indexOf("qingxu") == -1 &&
		operationMethod.indexOf("richangliaofa") == -1 && operationMethod.indexOf("shuimian") == -1 &&
		operationMethod.indexOf("yundong") == -1) { //文字
		var _center = document.createElement("center");
		var _operationMethod = document.createElement("div");
		_operationMethod.style.width = "260px";
		_operationMethod.style.height = "200px";
		_operationMethod.style.overflowY = "auto";
		_operationMethod.style.overflowX = "hidden";
		_operationMethod.style.margin = "5px 0px";
		_operationMethod.style.fontSize = "12px";
		var _div_content = document.createElement("div");
		_div_content.innerHTML = "&nbsp; &nbsp; &nbsp; &nbsp; " + operationMethod;
		_div_content.style.marginTop = "20px";
		_div_content.style.textAlign = "left";
		_div_content.style.width = "260px";
		_operationMethod.appendChild(_div_content);
		_center.appendChild(_operationMethod);
		_html.appendChild(_center);
	} else if(img == undefined || img == "") { //图片
		var diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
		var _operationMethod = document.createElement("img");
		_operationMethod.src = ADDR + diseasespeople + "/" + operationMethod;
		_operationMethod.style.marginTop = "25px";
		_operationMethod.style.textAlign = "center";
		_operationMethod.style.width = "260px";
		_operationMethod.style.height = "200px";
		_healthMethod.appendChild(document.createElement("br"));
		_html.appendChild(_operationMethod);
	}
	return _html;
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
	//_html.appendChild(_div);

	var _divTitle = document.createElement("div");
	_divTitle.style.textAlign = "left";
	//_divTitle.style.paddingTop = "55px";
	_divTitle.style.paddingTop = "15px";
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
	var _click_text = '<div><img src="../img/hulu.png" width="40" height="40"/>点击选择您喜欢的食材~</div>';
	var _text_title = "&nbsp; 针对您[" + _text + "</span>" + "]的症状，福福为您推荐以下食材：" + _click_text;
	for(var _solar in arrSolarTerm){
		if(arrSolarTerm[_solar]==_curDisShowName){
			var _text_title = "&nbsp; 现在是[" + _text + "</span>" + "]，福福为您推荐以下食材：" + _click_text;		
		}
	}
	_divTitle.innerHTML = _text_title;
	_html.appendChild(_divTitle);
	//、、、、、、、、、、、、、、、、
	_html.appendChild(_divContent);
	var segmentTime = getSegmentTime();
	if(segmentTime[time] != undefined) {
		jieduan = segmentTime[time];
	}
	var shicai = [];
	var caipintu_miaosu = [];
	var shicai_selected = {};
	var yinshi = _healthRing[_curDisName].healthRing_yinshi;
	//如果有多少疾病随机出一个
	var _ran = parseInt(yinshi.length * Math.random());
	for(var shipu in yinshi[_ran].shicai) {
		if(shipu == jieduan) {
			var _json = {};
			_json[yinshi[_ran].shicai[shipu]] = yinshi[_ran].jinyongshicai;
			shicai.push(_json);
		} else if(shipu == jieduan + "_菜品") {
			var _json = {};
			_json[yinshi[_ran].shicai[shipu]] = yinshi[_ran].jinyongshicai;
			shicai[0] = _json;
		} else if(shipu == jieduan + "_主食") {
			var _json = {};
			_json[yinshi[_ran].shicai[shipu]] = yinshi[_ran].jinyongshicai;
			shicai[1] = _json;
		}
	}
	for(var cs in shicai) {
		var _div_cs = document.createElement("div");
		for(var _j_cs in shicai[cs]) {
			var _divshicai = document.createElement("div");
			_divshicai.style.float = "left"
			var arr_shicai = _j_cs.split(",");
			var _table_shicai = document.createElement("table");
			_table_shicai.setAttribute("name", "table_shicai")
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
				td_1.innerHTML = "<div style ='border:1px solid " + shicai_border[i] +
					"; " + _background + " margin:5px 0px 5px 15px;width:100px;height:40px'>" + arr_shicai[i] + "</div>";
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
			if(cs == 0) {
				var _clear = document.createElement("div");
				_clear.style.clear = "both";
				_clear.style.borderTop = "1px solid #e0e0e0";
				_clear.style.width = "99%";
				_clear.style.height = "20px";
				_div_cs.appendChild(_clear);
			}
			if(cs == 1) {
				var _divHuanZhishi = document.createElement("div");
				_divHuanZhishi.style.textAlign = "right";
				_divHuanZhishi.style.color = "#ff0000";
				_divHuanZhishi.style.marginTop = "20px";
				_divHuanZhishi.style.paddingRight = "10px";
				_divHuanZhishi.style.borderBottom = "1px solid #e0e0e0";
				_divHuanZhishi.innerHTML = '换一批';
				_divHuanZhishi.onclick = function() {
					var params = {};
					params["_title"] = "yinshi";
					params["_time"] = jieduan;
					params['_shicai'] = JSON.stringify(shicai[1]);
					yinshi_loadding(time, 1, params, "zhushi");
					event.stopPropagation();
				};
				//_div_cs.appendChild(_divHuanZhishi);
			}
		}
		_html.appendChild(_div_cs);
	}
	document.getElementById("quanpingyinshi").appendChild(_html);
	fun_ajax_yinshi();
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

function fun_yuansu(_json) {
	var _h = "";
	for(var _j in _json) {
		if(_json[_j] != "" && _json[_j] != undefined && _json[_j] != "0") {
			var _t = "";
			if(_j == "energy") {
				_t = "<b>能量:</b>";
			} else if(_j == "protein") {
				_t = "<b>蛋白质:</b>";
			} else if(_j == "fat") {
				_t = "<b>脂肪:</b>";
			} else if(_j == "carbohydrate") {
				_t = "<b>碳水化合物:</b>";
			} else if(_j == "dietaryFiber") {
				_t = "<b>膳食纤维:</b>";
			} else if(_j == "cholesterol") {
				_t = "<b>胆固醇:</b>";
			}
			_h += _t + _json[_j] + " ";
		}
	}
	return _h;
}

function fun_ajax_yinshi(type) {
	if(jieduan.indexOf("休息") != -1) {
		var obj_caipu = document.getElementById("caipu_" +  "0");
		if(obj_caipu != null && obj_caipu.innerText == "加载中...") {
			obj_caipu.innerHTML = "";
		}
		obj_caipu = document.getElementById("caipu_" +  "1");
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
		var obj_caipu = document.getElementById("caipu_" +  "0");
		if(obj_caipu != null) {
			obj_caipu.innerHTML = "加载中...";
		}
	} else if(type == 1) {
		_init_t_s = 1;
		obj_caipu = document.getElementById("caipu_" +  "1");
		if(obj_caipu != null) {
			obj_caipu.innerHTML = "加载中...";
		}
	} else {
		var obj_caipu = document.getElementById("caipu_" +  "0");
		if(obj_caipu != null) {
			obj_caipu.innerHTML = "加载中...";
		}
		obj_caipu = document.getElementById("caipu_" +  "1");
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
					for(var key in objs) {
						var obj_caipu = document.getElementById("caipu_" + key.split("_")[0]);
						obj_caipu.innerHTML = "";
						var arr_caipu = objs[key];
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
							var diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
							var _url = ADDR + "/yinshi/" + tu.split("~")[0];
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
						obj_caipu.appendChild(_table_tu_name);
					}
					var obj_caipu = document.getElementById("caipu_" +  "0");
					if(obj_caipu != null && obj_caipu.innerText == "加载中...") {
						obj_caipu.innerHTML = "暂无饮食!";
					}
					obj_caipu = document.getElementById("caipu_" +  "1");
					if(obj_caipu != null && obj_caipu.innerText == "加载中...") {
						obj_caipu.innerHTML = "暂无饮食!";
					}
				} else {
					plus.nativeUI.toast('服务器出现异常，请重试');
				}
			}
		}
	});
	task.addData("next", "next");
	task.addData("selfHealthName", "yinshi");
	task.addData("jieduan", jieduan);
	task.addData("jsonStr", JSON.stringify(_json_selected));
	task.start();
}