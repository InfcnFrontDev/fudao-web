var userInfomation, _version;
/**
 * 通过疾病查询解决方案
 */
function searchTreatmentByDisease(_v) {
	//fun_hide_reset();
	var appid = getUser().appid;
	userInfomation = getUserInformation(appid);
	_version = chooseVersion(userInfomation.sex, userInfomation.birthdate);
	var _text = '';
	var ring_show_time = document.getElementById("ring_show_time");
	var same_time = {};
	if(_v.status == "select" || _v.status == "checkResult") {
		if(_v.status == "checkResult") {
			var arr = [];
			for(var key in _v.json) {
				if(key == "list") {
					continue;
				}
				var _json = {};
				_json.name = _v.json[key].data;
				_json.show_val = _v.json[key].show_val;
				_json.sum = _v.json[key].hit;
				arr.push(_json);
			}
			arr.sort(function(a, b) {
				return b.sum - a.sum;
			});
			var _myDiaRecord_json = {};
			var _myDiaRecord = []; // 我的诊断记录
			var _myDiaRecord_baihua = []; // 疾病_白话
			for(var key in arr) {
				_myDiaRecord.push(arr[key].name);
				_myDiaRecord_baihua.push(arr[key].show_val); // 疾病_白话
				_myDiaRecord_json[arr[key].name] = arr[key].show_val;
			}
			userInfomation.haveDisease = _myDiaRecord.length == 0 ? '' : _myDiaRecord;
			userInfomation.haveDiseaseBaihua = _myDiaRecord_baihua.length == 0 ? '' : _myDiaRecord_baihua;
			saveUserInformation(appid, userInfomation);
			for(var i in arr) {
				var _show = arr[i].show_val;
				if(_show.length > 5) {
					_show = _show.substring(0, 5) + "...";
				}
				var _html = '<div style="color:#000000;border:1px solid #ebd7ff;border-radius:2px;padding:2px 5px 2px" _text ="' + arr[i].name + '" onclick="fun_showTime(this, \'' + arr[i].name + '\', \'' + arr[i].show_val + '\')">' + _show + '</div>';
				var li = document.createElement("li");
				li.className = "mui-table-view-cell mui-table-view-cell mui-media mui-col-sm-3";
				li.style.marginRight = "15px";
				if(i == 0) {
					_text = arr[i].name;
					li.style.backgroundColor = '#ebd7ff';
				}
				li.style.padding = "0px";
				li.innerHTML = _html;
				document.getElementById("disease_name").appendChild(li);
			}
		} else {
			_text = _v._text;
			var _html = '<div style="color:#000000;border:1px solid #ebd7ff;border-radius:2px;padding:2px 5px 2px" _text ="' + _text + '">' + _v._show_text + '</div>';
			var li = document.createElement("li");
			li.className = "mui-table-view-cell mui-table-view-cell mui-media mui-col-sm-3";
			li.style.marginRight = "15px";
			li.style.backgroundColor = "#ebd7ff";
			li.style.padding = "0px";
			li.innerHTML = _html;
			document.getElementById("disease_name").appendChild(li);
		}
	} else if(_v.status == 'myDiaRecord') {
		var _myDiaRecords = userInfomation.haveDisease;
		var _myDiaRecordsBaihua = userInfomation.haveDiseaseBaihua;
		var _myLen = _myDiaRecords.length;
		for(var i = 0; i < _myLen; i++) {
			var _myDisease = _myDiaRecords[i];
			var _myDiseaseBaihua = _myDiaRecordsBaihua[i];
			var _html = '<div style="color:#000000;border:1px solid #ebd7ff;border-radius:2px;padding:2px 5px 2px" _text ="' + _myDisease + '" ';
			_html += 'onclick="fun_showTime(this, \'' + _myDisease + '\', \'' + _myDiseaseBaihua + '\')">';
			_html += _myDiseaseBaihua + '</div>';
			var li = document.createElement("li");
			li.className = "mui-table-view-cell mui-table-view-cell mui-media mui-col-sm-3";
			li.style.marginRight = "15px";
			if(i == 0) {
				_text = _myDisease;
				li.style.backgroundColor = '#ebd7ff';
			}
			li.style.padding = "0px";
			li.innerHTML = _html;
			document.getElementById("disease_name").appendChild(li);
		}
	}
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
	} else {
		var w = plus.ui.createWaiting("正在获取数据...");
		var _paramData = {};
		if(_v._action.indexOf("selfCultivationAction") > -1) {
			type_data = "selfCultivationAction";
			_paramData['selfCultivationName'] = _text;
		} else if(_v._action.indexOf("threeDiseasesListAction") > -1) {
			_paramData['diseaseName'] = _text;
			type_data = "threeDiseasesListAction";
		}
		_paramData['random'] = random().replace("?random=", "");
		_paramData['renqun'] = _version;
		_paramData['parts'] = _v.buwei;
		mui.ajax(ADDR + _v._action, {
			data: _paramData,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 20000, //超时时间设置为20秒；
			success: function(data) {
				w.close();
				// 自修专业疗法数据
				var majorData = data.obj.zixiu_major;
				if(majorData == null || majorData.length == 0) {
					existData = false;
				} else {
					existData = true;
					fun_setMajorHtml(majorData);
				}
				// 自修起居、动、静、娱乐数据
				var sleepData = data.obj.zixiu_sleep;
				var motionData = data.obj.zixiu_motion;
				var jingData = data.obj.zixiu_jing;
				var leisureData = data.obj.zixiu_leisure;
				existData = true;
				fun_setTypeHtml("qijuYuanli", "ul_shuijiao", sleepData);
				fun_setTypeHtml("yundongYuanli", "ul_yundong", motionData);
				if(jingData != null && jingData.length > 0) {
					fun_setTypeHtml("jingYuanli", "ul_jing", jingData);
					document.getElementById("zixiuJing").style.display = 'inline';
				} else {
					document.getElementById("zixiuJing").style.display = 'none';
					document.getElementById("suxian").style.display = 'none';
				}
				if(leisureData != null && leisureData.length > 0) {
					fun_setTypeHtml("yuleYuanli", "ul_xiuxian", leisureData);
					document.getElementById("zixiuYule").style.display = 'inline';
				} else {
					document.getElementById("zixiuYule").style.display = 'none';
					document.getElementById("suxian").style.display = 'none';
				}

				// 自修饮食
				//饮食	开始
				var ul_yinshi = [];
				var _yinshi = data.obj.zixiu_yinshi;
				if(_yinshi != null && _yinshi != '') {
					for(var i in _yinshi) {
						if(_yinshi[i].name == _curDisName) {
							document.getElementById("yishiDiv").style.display = 'block';
							document.getElementById("jinshiDiv").style.display = 'block';
							if(_yinshi[i].yishi == undefined) {
								document.getElementById("yishi").innerHTML = "无";
							} else {
								document.getElementById("yishi").innerHTML = _yinshi[i].yishi;
							}
							if(_yinshi[i].jinshi == undefined) {
								document.getElementById("jinshi").innerHTML = "无";
							} else {
								document.getElementById("jinshi").innerHTML = _yinshi[i].jinshi;
							}

							for(var shicai in _yinshi[i].shicai_nengliang) {
								ul_yinshi.push(shicai);
							}
						}
					}
					// 加载食材和菜谱
					fun_addShicaiAndCaipu(_yinshi);
				} else {
					var _divNoData = document.createElement("div");
					_divNoData.style.margin = '20px';
					_divNoData.style.fontSize = '18px';
					_divNoData.innerHTML = '暂无数据';
					document.getElementById("caipin").appendChild(_divNoData);
				}
				//饮食	结束
			},
			error: function() {
				w.close();
			}
		});
	}
	// 设置对选中的疾病是添加到健康环还是取消健康环
	fun_setCurDisName();
	fun_setText(_text);
}

//填充饮食div 开始
var jieduans = ['早餐', '休息1', '午餐', '休息2', '晚餐'];
var _jieduanshicaitagname = new Array();
_jieduanshicaitagname['早餐'] = 'zaocan';
_jieduanshicaitagname['休息1'] = 'chaxie1';
_jieduanshicaitagname['午餐'] = 'wucan';
_jieduanshicaitagname['休息2'] = 'chaxie2';
_jieduanshicaitagname['晚餐'] = 'wancan';
// 加载食材和菜谱
function fun_addShicaiAndCaipu(_yangyiyang) {
	var _html = document.createElement("div");
	for(var jieduanIndex = 0; jieduanIndex < jieduans.length; jieduanIndex++) {
		var _divContent = document.createElement("div");
		_divContent.className = "mui-content-padded";
		_divContent.style.textAlign = "left";
		var _jieduanName = document.createElement("div");
		_jieduanName.style.textAlign = "left";
		_jieduanName.style.height = '40px';
		_jieduanName.style.width = '100%';
		_jieduanName.style.lineHeight = '40px';
		_jieduanName.style.color = "#000000";
		_jieduanName.style.background = '#dbeef4';
		_jieduanName.style.border = "1px solid #e0e0e0";
		_divContent.appendChild(_jieduanName);
		_html.appendChild(_divContent);
		var jieduan = jieduans[jieduanIndex];
		var temp_jieduan = jieduan;
		if(jieduan == "休息1") {
			temp_jieduan = "休息"
		} else if(jieduan == "休息2") {
			temp_jieduan = "下午茶"
		}
		_jieduanName.innerHTML = "&nbsp; &nbsp; " + temp_jieduan + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + segmentTime[jieduan];
		var shicai = [];
		var caipintu_miaosu = [];
		var _yinshi = _yangyiyang;
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
				_table_shicai.setAttribute("name", "table_shicai" + _jieduanshicaitagname[jieduan]);
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
					td_1.setAttribute("jieduan", jieduan);
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
				_divcaipin.setAttribute("id", "caipu_" + _jieduanshicaitagname[jieduan] + cs);
				//、、、、、、、、、、、、、、、、、、、、、、、、、
				_divcaipin.innerHTML = "加载中...";
				_div_cs.appendChild(_divcaipin);
				var _clearDiv = document.createElement("div");
				_clearDiv.style.clear = 'both';
				_div_cs.appendChild(_clearDiv);
				if(shicai.length > 1) {
					var _clear = document.createElement("div");
					_clear.style.clear = "both";
					_clear.style.width = "99%";
					_clear.style.height = "20px";
					_div_cs.appendChild(_clear);
					if(cs == 0) {
						var _divHuanZhishi = document.createElement("div");
						_divHuanZhishi.style.textAlign = "right";
						_divHuanZhishi.style.color = "#ff0000";
						_divHuanZhishi.style.marginTop = "-40px";
						_clear.style.borderTop = "1px solid #e0e0e0";
						_divHuanZhishi.style.paddingRight = "10px";
						_divHuanZhishi.innerHTML = '菜品';
						//									_divHuanZhishi.onclick = function() {
						//										fun_ajax_yinshi(1, jieduan);
						//										event.stopPropagation();
						//									};
						_div_cs.appendChild(_divHuanZhishi);
					} else if(cs == 1) {
						var _divHuanZhishi = document.createElement("div");
						_divHuanZhishi.style.textAlign = "right";
						_divHuanZhishi.style.color = "#ff0000";
						_divHuanZhishi.style.marginTop = "-40px";
						_divHuanZhishi.style.paddingRight = "10px";
						_divHuanZhishi.innerHTML = '主食';
						//									_divHuanZhishi.onclick = function() {
						//										fun_ajax_yinshi(1, jieduan);
						//										event.stopPropagation();
						//									};
						_div_cs.appendChild(_divHuanZhishi);
					}
				}
			}
			_html.appendChild(_div_cs);
		}
		document.getElementById("caipin").appendChild(_html);
		if(jieduanIndex == 0 || jieduanIndex == 1 || jieduanIndex == 3) {
			fun_ajax_yinshi(0, jieduan);
		} else if(jieduanIndex == 2 || jieduanIndex == 4) {
			fun_ajax_yinshi(0, jieduan);
			fun_ajax_yinshi(1, jieduan);
		}
	}
}

function fun_ajax_yinshi(type, jieduan) {
	var table_shicai = document.getElementsByName("table_shicai" + _jieduanshicaitagname[jieduan]);
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
		if(_table != undefined) {
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

	}
	//是否读取数据库
	var _boo = false;
	//				var _saveshicaicaipu = getShicai_yinshi(user.appid);
	//				for(var shicaikey in _json_selected) {
	//					var _shicaicaipuKey = shicaikey.substring(0, 1) + "_" + _json_selected[shicaikey];
	//					if(_saveshicaicaipu[_shicaicaipuKey] != null) {
	//						var _json_shicai = {};
	//						_json_shicai[_shicaicaipuKey] = _saveshicaicaipu[_shicaicaipuKey];
	//						fun_health_shicai_caipin(_json_shicai);
	//						_boo = true;
	//					}
	//				}
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
						fun_health_shicai_caipin(objs, _jieduanshicaitagname[jieduan]);
						var _shicaicaipu = getShicai_yinshi(user.appid);
						var _index = 0;
						for(var shicaikey in _json_selected) {
							var _shicaicaipuKey = shicaikey.substring(0, 1) + "_" + _json_selected[shicaikey];
							_shicaicaipu[_shicaicaipuKey] = objs[shicaikey];
							_index++;
						}
						//saveShicai_yinshi(user.appid, _shicaicaipu);
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
		task.addData("jieduan", jieduan);
		task.addData("selfHealthName", "yinshi");
		task.addData("jsonStr", JSON.stringify(_json_selected));
		task.addData("jsonStr", JSON.stringify(_json_selected));
		task.start();
	}
}

function fun_health_shicai_caipin(_saveshicaicaipu, _caipindiv) {
	for(var _shicaicappukey in _saveshicaicaipu) {
		var div_obj_caipu = document.getElementById("caipu_" + _caipindiv + _shicaicappukey.split("_")[0]);
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
			var _url = ADDR + _version + "/yinshi" + tu.split("~")[0].replace("tupian", "");
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

function yinshi_zuofa(url, zf) {
	document.getElementById("muiContent").style.height = '100%';
	document.getElementById("muiContent").style.overflow = 'hidden';
	zf = zf.replace(/(\n)/gi, "");
	zf = zf.replace(/(&quot;)/gi, "\"");
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
	//_html.appendChild(_div);

	var _divTitle = document.createElement("div");
	_divTitle.style.textAlign = "left";
	_divTitle.style.marginTop = "30px";
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
	_divnei.style.paddingBottom = '25px';
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
	document.getElementById("quanpingyinshi_zuofa").style.display = 'block';
	document.getElementById("beijing").style.display = 'block';
	event.stopPropagation();
}
//填充饮食div 结束

// 填充起居、动、静、娱乐的div
function fun_setTypeHtml(yuanliDivId, dataDivID, _jsonData) {
	if(_jsonData == null || _jsonData.length == 0) {
		document.getElementById(dataDivID).innerHTML = '<div style="margin: 20px">暂无数据</div>';
		return false;
	}
	var ul_type = {};
	var ul_xiaotieshi = {};
	document.getElementById(yuanliDivId).innerHTML = _jsonData[0].principle;
	for(var key in _jsonData) {
		var _data = _jsonData[key];
		if(_data.operationTime == "小贴士") {
			if(ul_xiaotieshi[_data.operationTime]) {
				var _timeData = ul_xiaotieshi[_data.operationTime];
				_timeData.push(_data);
				ul_xiaotieshi[_data.operationTime] = _timeData;
			} else {
				var _timeData = new Array();
				_timeData.push(_data);
				ul_xiaotieshi[_data.operationTime] = _timeData;
			}
		} else {
			if(ul_type[_data.operationTime]) {
				var _timeData = ul_type[_data.operationTime];
				_timeData.push(_data);
				ul_type[_data.operationTime] = _timeData;
			} else {
				var _timeData = new Array();
				_timeData.push(_data);
				ul_type[_data.operationTime] = _timeData;
			}
		}
	}
	if(ul_xiaotieshi['小贴士'] != undefined) {
		ul_type['小贴士'] = ul_xiaotieshi['小贴士'];
	}
	document.getElementById(dataDivID).innerHTML = "";
	var _timeKey = '';
	for(var _time in ul_type) {
		if(_time == '醒来-平静-起床') {
			_timeKey = '起床';
		} else if(_time == '午睡') {
			_timeKey = '午睡开始';
		} else {
			_timeKey = _time
		}
		var _timeName = document.createElement("div");
		_timeName.className = 'label_background';
		var _timeNameHtml = '<div style="border-left: 5px solid rgb(49,133,149);">';
		_timeNameHtml += '&nbsp;&nbsp;&nbsp;&nbsp;' + _time;
		_timeNameHtml += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		if(_timeKey != '小贴士') {
			_timeNameHtml += segmentTime[_timeKey];
		}
		_timeNameHtml += '</div>';
		_timeName.innerHTML = _timeNameHtml;
		document.getElementById(dataDivID).appendChild(_timeName);
		var _ul = document.createElement("ul");
		for(var _curTimeData in ul_type[_time]) {
			var _li = document.createElement("li");
			_li.style.marginBottom = '10px';
			_li.setAttribute('data', JSON.stringify(ul_type[_time][_curTimeData]));
			_li.onclick = function() {
				var _curData = JSON.parse(this.getAttribute('data'));
				var _html = zuzhuang('curTime', _curData.healthMethod, _curData.operationMethod, _curData.img);
				document.getElementById("quanping").appendChild(_html);
				document.getElementById("beijing").style.display = 'block';
				document.getElementById("quanping").style.display = 'block';
				document.getElementById("muiContent").style.height = '100%';
				document.getElementById("muiContent").style.overflow = 'hidden';
			}
			_li.innerHTML = ul_type[_time][_curTimeData].healthMethod;
			_ul.appendChild(_li);
			document.getElementById(dataDivID).appendChild(_ul);
		}
	}
}

// 填充专业疗法的div层
function fun_setMajorHtml(majorData) {
	var ul_richangliaofa = {};
	for(var i = 0; i < majorData.length; i++) {
		var _time = majorData[i].fangfafeilei;
		var _timeName = _time;
		if(ul_richangliaofa[_timeName] == undefined) {
			var _timeNames = [];
			_timeNames.push(majorData[i]);
			ul_richangliaofa[_timeName] = _timeNames;
		} else {
			var _timeNames = ul_richangliaofa[_timeName];
			_timeNames.push(majorData[i]);
			ul_richangliaofa[_timeName] = _timeNames;
		}
	}
	document.getElementById("div_zhuanyeliaofa").innerHTML = "";
	var fragment = document.createDocumentFragment();
	for(var key in ul_richangliaofa) {
		var middle_div = document.createElement("div");
		middle_div.setAttribute("id", "middle");
		var anmo_div = document.createElement("div");
		anmo_div.className = "anmo";
		anmo_div.style.float = "right";
		anmo_div.innerHTML = key;
		anmo_div.style.height = "38px";
		anmo_div.style.borderRight = "3px solid #9ed4e3";
		middle_div.appendChild(anmo_div);
		var fangfa_div = document.createElement("div");
		fangfa_div.setAttribute("id", "fangfa");
		fangfa_div.className = "info";
		anmo_div.style.float = "left";
		for(var i = 0; i < ul_richangliaofa[key].length; i++) {
			var li = document.createElement("li");
			li.className = "mui-table-view-cell mui-collapse";
			li.style.listStyle = "none";
			var _html = '<a class ="mui-navigate-right">';
			var _title = ul_richangliaofa[key][i].healthMethod;
			_html += '<div class="mui-media-body" style ="font-size:14px">' + _title + '</div>';
			_html += '</a>';
			li.innerHTML = _html;
			fangfa_div.appendChild(li);
			var ul = document.createElement("ul");
			ul.className = "mui-table-view";
			var _li = document.createElement("li");
			_li.className = "mui-table-view-cell";
			var div_content = "<div>";
			div_content += "<b>原料</b><br/>" + ul_richangliaofa[key][i].principle + "<br/>";
			div_content += "<b>制作方法</b><br/>" + ul_richangliaofa[key][i].zhizuofangfa + "<br/>";
			div_content += "<b>使用方法</b><br/>" + ul_richangliaofa[key][i].operationMethod + "<br/>";
			div_content += "</div>";
			_li.innerHTML = div_content;
			ul.appendChild(_li);
			li.appendChild(ul);
		}
		middle_div.appendChild(fangfa_div);
		var clear_div = document.createElement("div");
		clear_div.style.clear = "both";
		middle_div.appendChild(clear_div);
		fragment.appendChild(middle_div);
	}
	document.getElementById("div_zhuanyeliaofa").appendChild(fragment);
}
/**
 * 设置当前选中的疾病名称
 */
function fun_setCurDisName() {
	var sbil = document.getElementById("disease_name").children;
	var _len = sbil.length;
	for(var i = 0; i < _len; i++) {
		if(sbil[i].style.backgroundColor == 'rgb(235, 215, 255)') {
			_curDisName = sbil[i].children[0].getAttribute("_text");
			_curDisShowName = sbil[i].children[0].innerHTML;
			break;
		}
	}
}
/**
 * 设置对选中的疾病是添加到健康环还是取消健康环
 */
function fun_setText(_text) {
	userInformation = getUserInformation(getUser().appid);
	if(userInformation.symptom != undefined) {
		var arr = userInformation.symptom.split(",");
		var boo = false;
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == _curDisName) {
				boo = true;
			}
		}
		if(boo) {
			document.getElementById("div_jian").style.display = "block";
		} else {
			document.getElementById("div_jia").style.display = "block";
		}
	}
	/*var hr = getAddHealthRing(user.appid);
	if(hr != null) {
		if(hr[_text] != undefined) {
			document.getElementById("addHealthRing").innerHTML = "<a>取消健康环</a>";
		} else {
			document.getElementById("addHealthRing").innerHTML = "<a>添加到健康环</a>";
		}
	}*/
}

var treatmentEvent;
/**
 * 获取疾病的治疗数据
 * @param {Object} obj
 */
function fun_message(obj) {
	treatmentEvent = obj;
	var curTime = obj.getAttribute('id').replace('message_', '');
	var _data = obj.getAttribute("val");
	if(_data.split("^!^").length > 1) {
		var arr = _data.split("^!^");
		var _random = Math.floor(Math.random() * arr.length);
		var message_data = JSON.parse(arr[_random]);
		var _html = zuzhuang(curTime, message_data.healthMethod, message_data.operationMethod);
		document.getElementById("quanping").appendChild(_html);
	} else {
		var message_data = JSON.parse(_data);
		var _html = zuzhuang(curTime, message_data.healthMethod, message_data.operationMethod);
		document.getElementById("quanping").appendChild(_html);
	}
};

/**
 * 保存添加、删除 健康环数据
 */
function fun_saveHealthRing(appid, hr, operation, disName) {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
	} else {
		if(existData) {
			saveAddHealthRing(appid, hr);
			if(operation == 'add') {
				plus.nativeUI.toast('添加完成！');
				document.getElementById("addHealthRing").innerHTML = "<a>取消健康环</a>";
			} else if(operation == 'del') {
				plus.nativeUI.toast('取消完成！');
				document.getElementById("addHealthRing").innerHTML = "<a>添加到健康环</a>";
			}
			var task = plus.uploader.createUpload(ADDR + MYHEALTH, {
				method: "post",
				timeout: 120 //上传任务超时时间
			}, function(t, status) {});
			task.addData("appid", user.appid);
			task.addData("typedata", type_data);
			var arr = hr[disName];
			var recids = "";
			for(var idx in arr) {
				recids += arr[idx].operationTime + "_" + arr[idx].recid + ",";
			}
			task.addData("recids", recids);
			task.addData("data", disName);
			task.addData("operation", operation);
			task.addData("random", random().replace("?random=", ""));
			task.setRequestHeader('contentType', 'application/x-www-form-urlencoded; charset=utf-8');
			task.start();
		} else {
			plus.nativeUI.toast('当前疾病没有日常疗法，不能够添加健康环！');
		}
	}
}

function fun_myCanvas() {
	//时间位置
	var _hour = document.getElementById("hour");
	_hour.style.left = (document.body.offsetWidth / 2 - 30) + "px";
	_hour.style.top = "80px";
}

/**
 * 隐藏圆圈上的点
 */
function fun_hide_reset() {
	document.getElementById("ring_show_time").innerHTML = "";
}

// 点击疾病在圆圈上显示点
function fun_showTime(obj, name, showName) {
	//fun_setText(name);
	_curDisName = name;
	_curDisShowName = showName;
	// 先将圆圈上的点隐藏
	fun_hide_reset();
	var ring_show_time = document.getElementById("ring_show_time");
	var same_time = {};
	var sbil = obj.parentNode.parentNode.children;
	var _len = sbil.length;
	for(var i = 0; i < _len; i++) {
		sbil[i].style.backgroundColor = '';
	}
	obj.parentNode.style.backgroundColor = '#ebd7ff';
	var task = plus.uploader.createUpload(ADDR + FINDDAILYTHERAPY, {
		method: "post",
		timeout: 120 //上传任务超时时间
	}, function(t, status) {
		var respText = t.responseText;
		message_data = JSON.parse(respText).obj;
		if(message_data != null && message_data.length > 0) {
			existData = true;
			var ul_richangliaofa = [];
			for(var i = 0; i < message_data.length; i++) {
				var _time = message_data[i].operationTime;
				ul_richangliaofa.push(message_data[i].healthMethod);
				if(_time.split("/").length > 1) {
					var arr = _time.split("/");
					for(var a in arr) {
						fun_show_time(ring_show_time, arr[a], JSON.stringify(message_data[i]));
					}
				} else {
					fun_show_time(ring_show_time, _time, JSON.stringify(message_data[i]));
				}
			}
			if(ul_richangliaofa.length > 0) {
				document.getElementById("ul_richangliaofa").innerHTML = "";
				for(var _str in ul_richangliaofa) {
					var _li = document.createElement("li");
					_li.style.padding = "5px";
					_li.innerHTML = ul_richangliaofa[_str]
					document.getElementById("ul_richangliaofa").appendChild(_li);
				}
			}
			fun_loadAllPT(name);
		} else {
			existData = false;
		}
	});
	task.addData("diseaseName", name);
	task.addData("renqun", _version);
	type_data = "threeDiseasesListAction";
	task.addData("random", random().replace("?random=", ""));
	task.setRequestHeader('contentType', 'application/x-www-form-urlencoded; charset=utf-8');
	task.start();
	var ul = document.getElementById("ptType");
	ul.innerHTML = ''
}

function zuzhuang(curTime, healthMethod, operationMethod, img) {
	var _html = document.createElement("div");
	_html.style.position = "fixed";
	_html.style.top = "0px";
	_html.style.left = "0px";
	_html.style.width = "100%";
	_html.style.overflowY = 'auto';
	_html.style.height = "100%";
	_html.style.background = "#ffffff";
	_html.style.zIndex = 999999;

	var _curTime = document.createElement("div");
	//_curTime.innerHTML = "时间：" + curTime;
	_curTime.innerHTML = "&nbsp;";
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

	if(img) {
		var medalType = img.substring(img.lastIndexOf('.'));
		if(medalType == '.mp3' || medalType == '.wav' || medalType == '.m4a') {
			var _medalCenter = document.createElement("center");
			var _medalHtml = "<div style ='width:180px;height:180px;margin-top: 100px;'>";
			_medalHtml = "<img id='abc' src='img/bfzn_004.ico' url ='" + ADDR + _version + "/" + img + "' /></div>"
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
				_img.src = ADDR + _version + "/" + _imgsrc;
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
	_operationMethodParentDiv.style.height = "200px";
	_operationMethodParentDiv.style.overflowY = "auto";
	_operationMethodParentDiv.style.overflowX = "hidden";
	_operationMethodParentDiv.style.margin = "5px 0px";
	_operationMethodParentDiv.style.fontSize = "12px";
	var _operationMethod = document.createElement("div");
	if(operationMethod) {
		_operationMethod.innerHTML = "&nbsp; &nbsp; &nbsp; &nbsp; " + operationMethod;
	}
	_operationMethod.style.marginTop = "20px";
	_operationMethod.style.textAlign = "left";
	_operationMethod.style.width = "300px";
	_operationMethod.style.height = "200px";

	_operationMethodParentDiv.appendChild(_operationMethod);
	_center.appendChild(_operationMethodParentDiv);
	_html.appendChild(_center);
	return _html;
}