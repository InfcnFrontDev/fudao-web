var check_process_one_countSocre, check_process_one_check_result;
/**
 * 数据处理
 */
function fun_handle_data() {
	/*
		var currentWebview = plus.webview.currentWebview();
		check_process_one_check_result = currentWebview.json;
		var condition_one = JSON.stringify(check_process_one_check_result.list);
		var condition_two = 0;
		for(var key in check_process_one_check_result) {
			condition_two++;
		}
		if(parseFloat(check_process_one_check_result.countSocre) < 100 && condition_one != "[]" && condition_two > 7) {
			document.getElementById("div_zeng").style.display = "block";
			//显示部位
			show_position(check_process_one_check_result);
		} else { //本次测评得满分
			document.getElementById("div_zeng").style.display = "none";
			document.getElementById("quanshen").style.display = "none";
			document.getElementById("xiong").style.display = "none";
			document.getElementById("fu").style.display = "none";
			//document.getElementById("renti_optimization").setAttribute("usemap", "#Map");
			check_process_one_countSocre = Math.round(parseFloat(check_process_one_check_result.countSocre));
			document.getElementById("div_socre").innerHTML = '您本次测评得了<span style="font-size:30px ;">&nbsp;' + check_process_one_countSocre + '&nbsp;</span>分哟~快看看 ';
		}
	*/
}

/**
 * 部位事件
 * @param {Object} info
 */
function fun_pathogeny(info) {
	document.getElementById("click_zhengzhuang").style.display = "none";
	document.getElementById("button").style.display = "block";
	var _json = {};
	_json['json'] = check_process_one_check_result;
	_json['position'] = info;
	_json['countSocre'] = check_process_one_countSocre;
	timeOut(info);
	//jumpPage('check_process_two.html', "slide-in-right", _json, false);
}
// 点击人体途中的部位，人体移动效果
var pieChart;

function timeOut(rentidata) {
	var _rentiSvg = document.getElementById("renti_xiuyixiu");
	var marginLeft = parseInt(_rentiSvg.style.marginLeft);
	if(marginLeft > -140) {
		_rentiSvg.style.marginLeft = (marginLeft - 5) + 'px';
		setTimeout(timeOut(rentidata), 10);
	} else {
		pieChart = echarts.init(document.getElementById('pieChart'));
		//数据处理
		fun_check_process_two(rentidata);
		document.getElementById("pieChart").style.display = "block";
	}
}

//显示部位
function show_position(check_result) {
	for(var key in check_result) {
		if(key == "countSocre") { //显示分数
			check_process_one_countSocre = Math.round(parseFloat(check_result[key]));
			document.getElementById("div_socre").innerHTML = '您本次测评得了<span style="font-size:30px ;">&nbsp;' + check_process_one_countSocre + '&nbsp;</span>分哟~快看看 ';
		} else if(key == "list") {

		} else {
			var posi = check_result[key].position;
			for(var key1 in posi) {
				if(posi[key1] == "all") {
					document.getElementById("quanshen").style.display = "block";
				} else if(posi[key1] == "xiong") {
					document.getElementById("xiong").style.display = "block";
				} else if(posi[key1] == "fu") {
					document.getElementById("fu").style.display = "block";
				}
			}
		}
	}
}

/**
 * 自查第二个页面  处理数据
 */
function fun_check_process_two(_position) {
	//清空
	hit = {};
	//document.getElementById("div_selected").innerHTML = "";
	//document.getElementById("div_list").innerHTML = "";
	//document.getElementById("table_data").style.display = "block";
	//document.getElementById("div_selected").style.display = "block";
	//document.getElementById("h4").style.display = "block";
	//document.getElementById("div_buwei_zhengzhuang").style.display = "block";
	fun_buwei_zhengzhuang(_position);
}

//部位-症状
function fun_buwei_zhengzhuang(position) {
	var data = [];
	for(var indx in buwei[diseasespeople][position]) {
		for(var key in buwei[diseasespeople][position][indx]) {
			var json = {};
			json.value = 20;
			json.name = key;
			data.push(json);
		}
	}
	fun_pie(data, position, 'buwei_zhengzhuang');
}
//画圆
function fun_pie(data, position, type) {
	var _selectedMode = "multiple";
	if('buwei_zhengzhuang' == type) {
		_selectedMode = "single";
	}
	var option = {
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: ['40%', '80%'],
			selectedMode: _selectedMode, //可以弹出来的
			avoidLabelOverlap: false,
			label: {
				normal: {
					show: true,
					position: 'inner'
				},
				emphasis: {
					show: true,
					textStyle: {
						fontSize: '16',
						fontWeight: 'bold'
					}
				}
			},
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
			data: data
		}]
	}
	var _arr_color = [];
	for(var _i in data) {
		_arr_color.push(common_arr_color[_i])
	}
	option['color'] = _arr_color;
	option['animation'] = false;
	pieChart.setOption(option);
	pieChart.on('pieSelected', function(params) {
		// 控制台打印数据的名称
		if(params.selected["0"][2] && params.target == "更多") {
			mui('#morePopover').popover('show');
		} else if(type == "buwei_zhengzhuang") {
			for(var indx in params.selected["0"]) {
				if(params.selected["0"][indx]) {
					var div_list = document.getElementById("div_list");
					div_list.innerHTML = "";
					var _zhengzhuang = buwei[diseasespeople][position][indx][params.target];
					for(var i in _zhengzhuang) {
						var li = document.createElement("li");
						li.className = "mui-table-view-cell";
						li.innerHTML = '<a class="clickClass" style="background:#FFFFFF;" onclick ="fun_select(this,\'right\')">' + _zhengzhuang[i] + '</a>';
						div_list.appendChild(li);
					}
				}
			}
		}
	});
	pieChart.on('click', function(params) {
		if(params.data.code != "more" && type != "buwei_zhengzhuang") {
			fun_add_remove(params.data);
		}
	});
}
/**
 *	展示数据 
 * @param {Object} obj
 * @param {Object} zhengzhuang
 */
function fun_hypertension(obj) {
	var _position = obj.position.replace("check_", "");
	var divBehavioralBacktracking = document.getElementById("divBehavioralBacktracking");
	divBehavioralBacktracking.innerHTML = "";
	//用于饼图数据JSON
	var data = [];
	var _i_color = 0;
	// 回溯
	var behavioralBacktracking = [];
	//用于饼图数据HTML元素
	for(var key in obj.json) {
		if(key == "list" || key == 'countSocre' || key == 'checkDate' ||
			key == 'xinliSocre' || key == 'shehuiSocre' || key == 'ziceSocre' ||
			key == 'zhengzhuangSocre') {
			continue;
		}
		var zhengzhuang = obj.json[key];
		if(zhengzhuang.position == _position || true) {
			var hitName = zhengzhuang.data;
			//	症状
			var symptom = zhengzhuang.symptom;
			//	回溯
			var huishi = zhengzhuang.behavioralBacktracking;
			//	命中数
			hit[hitName] = zhengzhuang.hit;
			//////////////////////////////////////////////////////////////////////////////
			for(var i in symptom) {
				var json = {};
				json.value = 20;
				json.name = symptom[i].length > 2 ? symptom[i].substring(0, 2) : symptom[i];
				json.code = symptom[i];
				json.title = symptom[i];
				json.selectType = hitName;
				data.push(json);
			}
			if(huishi != null) {
				for(var i = 0; i < huishi.length; i++) {
					behavioralBacktracking.push(huishi[i]);
				}
			}
		}
	}
	if(behavioralBacktracking != null) {
		var _array = [];
		for(var _i in behavioralBacktracking) {
			var _json = {};
			_json['key'] = convertPinyin(behavioralBacktracking[_i]);
			_json['val'] = behavioralBacktracking[_i];
			_array.push(_json);
		}
		_array.sort(function(a, b) {
			return a.key.localeCompare(b.key);
		});
		for(var i = 0; i < _array.length; i++) {
			var div = document.createElement("div");
			div.className = "mui-input-row mui-checkbox";
			var _html = "<label>" + _array[i].val + "</label>";
			_html += '<input name="' + hitName + '" class = "huisu" value=' + _array[i].val + ' type="checkbox">';
			div.innerHTML = _html;
			divBehavioralBacktracking.appendChild(div);
		}
	}
	//饼图	症状选择结束//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//超出正常范围的指标开始//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var table_data = document.getElementById("table_data");
	//删除
	for(var i = table_data.children.length - 1; i > 0; i--) {
		table_data.children[i].remove();
	}
	var list = obj.json['list'];
	if(list != null) {
		for(var i = 0; i < list.length; i++) {

			var tr = document.createElement("tr");
			if(_i_color % 2 == 0) {
				tr.style.background = '#D0D8E8';
			} else {
				tr.style.background = '#E9EDF4';
			}
			if(list[i].checkName != undefined) {
				_i_color++;
				var td = "<td width='50%' height='40px' class='tdBorder tdLeftBorder' align='center'>" + list[i].checkName + "</td>";
				td += "<td width='15%' class='tdBorder' align='center'>" + (list[i].checkResult == undefined ? "" : list[i].checkResult) + "</td>";
				//td += "<td align='center'>" + (list[i].unit == undefined ? "" : list[i].unit) + "</td>";
				td += "<td width='15%' class='tdBorder' align='center'>" + (list[i].referenceValue == undefined ? "" : list[i].referenceValue) + "</td>";
				td += "<td width='10%' class='tdBorder' align='center'>" + (list[i].resultPrompt == undefined ? "" : (list[i].resultPrompt == '偏高' ? '↑' : '↓')) + "</td>";
				tr.innerHTML = td;
				table_data.appendChild(tr);
			}
		}
	}
	//超出正常范围的指标结束//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//饼图	症状选择开始//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(data.length > 5) {
		var fragment = document.createDocumentFragment();
		while(data.length > 5) {
			var json = data.pop();
			var li = document.createElement("li");
			li.className = "mui-table-view-cell";
			li.innerHTML = '<a onclick ="fun_add_remove(this,1,\'' + json.selectType + '\')">' + json.title + '</a>';
			fragment.appendChild(li);
		}
		var json = {};
		json.value = 20;
		json.name = "更多";
		json.code = "more";
		var b = data.splice(2, 1, json);
		data.push(b[0]);
		document.getElementById("ulPopover").appendChild(fragment);
	}
	window.setTimeout(function() {
		fun_pie(data);
	}, 200)
}

function fun_add_remove(obj, type, selectType) {
	var _text;
	var _selectType;
	if(type == 1) {
		_text = obj.innerText;
		_selectType = selectType;
	} else {
		_text = obj.code;
		_selectType = obj.selectType;
	}
	var _selected = document.getElementById("div_selected");
	var boo = null;
	for(var i = 0; i < _selected.children.length; i++) {
		if(_selected.children[i].innerText == _text) {
			boo = _selected.children[i];
		}
	}
	//添加
	if(!boo) {
		var _div = document.createElement("div");
		_div.className = "div_selected";
		_div.innerText = _text;
		document.getElementById("div_selected").insertBefore(_div, _selected.firstChild);
		hit[_selectType] = hit[_selectType] + 1;
	} else if(boo) { //删除
		boo.remove();
		hit[_selectType] = hit[_selectType] - 1;
	}
}

/**
 * 自查过程结果	-	按钮
 */
function check_process_two_sure() {
	var zhengzhuang = "";
	var huisu = "";
	//	//100分的时候
	var _children = document.getElementById("div_list_selected").children;
	for(var i = 0; i < _children.length; i++) {
		zhengzhuang += _children[i].children[0].getAttribute("text") + ",";
	}
	if(zhengzhuang == "") {
		plus.nativeUI.toast('请选择人体部位或选择症状');
		return false;
	}
	var user = getUser();
	var userInformation = getUserInformation(user.appid)
	var diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
	//等于空时去服务器查询是否有数据
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
	} else {
		var w = plus.ui.createWaiting("请耐心等待！正在计算检查信息...");
		var task = plus.uploader.createUpload(ADDR + AHEALTHCHECK, {
			method: "post",
			timeout: 5
		}, function(t, status) {
			w.close();
			if(status != 200) {
				//异常处理；
				plus.nativeUI.toast('服务器出现异常，请重试');
			} else if(status == 200) {
				var respText = t.responseText;
				if(respText != "") {
					var data = JSON.parse(respText);
					if(data.success) {
						var _json = {};
						_json['status'] = "checkResult";
						_json['json'] = data.obj;
						_json['_action'] = FINDDAILYTHERAPY;
						//养一养重新查询
						saveTimingYangYiYang(null);
						//清空健康环的数据
						saveHealthRing(user.appid, {});
						jumpPage("../self_result.html", "none", _json, false);
					} else {
						plus.nativeUI.toast('服务器出现异常，请重试');
					}
				}
			}
		});
		task.addData("appid", getUser().appid);
		task.addData("zhengzhuang", zhengzhuang);
		task.addData("huisu", huisu);
		task.addData("countSocre", "0");
		task.addData("renqun", diseasespeople);
		task.addData("checkDate", userInformation.checkDate);
		task.start();
	}
}

function fun_select(obj, type) {
	if(type == 'right') {
		var div_list_selected = document.getElementById("div_list_selected");
		var boo = false;
		for(var i = 0; i < div_list_selected.children.length; i++) {
			if(div_list_selected.children[i].children[0].getAttribute("text") == obj.innerText) {
				boo = true;
			}
		}
		if(!boo) {
			var _div = document.createElement("div");
			_div.style.float = "left";
			_div.innerHTML = '<a text ="' + obj.innerText + '" style="color:#000000;border:1px solid #38726a ;margin:5px;" onclick ="fun_select(this)">' + obj.innerText + '</a>';
			div_list_selected.appendChild(_div);
		}
	} else {
		obj.parentNode.remove();
	}
}