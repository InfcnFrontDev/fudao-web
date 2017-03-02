/**
 * 下拉更新具体业务实现
 */
function pulldownRefresh() {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	var table = document.body.querySelector('.mui-table-view');
	table.innerHTML = "";
	//等于空时去服务器查询是否有数据
	mui.ajax(ADDR + MESSAGELIST + random(), {
		data: {
			"appid": getUser().appid,
			"now": now
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {
			var objs = data.obj;
			for(var i = objs.length - 1; i >= 0; i--) {
				var li = document.createElement('li');
				var div_one = document.createElement('div');
				var div_one_one = document.createElement('div');
				li.className = 'mui-table-view-cell';
				var _type = objs[i].type;
				li.title = _type;
				li.id = objs[i].id;
				li.setAttribute('time', objs[i].create_date);
				div_one.className = 'mui-table';
				div_one.style.width = '85%';
				div_one_one.className = 'mui-table-cell mui-col-xs-10';
				div_one_one.innerHTML = '<h4 class="mui-ellipsis">' + objs[i].title + '</h4><h5>发送时间：' + objs[i].create_date + '</h5><div style ="white-space: normal;" class="mui-h6 mui-ellipsis">' + objs[i].content + '</div>';
				div_one.appendChild(div_one_one);
				li.appendChild(div_one);
				//下拉刷新，新纪录插到最前面；
				table.insertBefore(li, table.firstChild);
			}
			if(now > 1) {
				now--;
			}
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
		},
		error: function(xhr, type, errorThrown) {
			setTimeout("pullupRefresh()", 1000);
		}
	});
}
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	var table = document.body.querySelector('.mui-table-view');
	//等于空时去服务器查询是否有数据
	mui.ajax(ADDR + MESSAGELIST + random(), {
		data: {
			"appid": getUser().appid,
			"now": now
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {
			var objs = data.obj;
			for(var i = 0; i < objs.length; i++) {
				var li = document.createElement('li');
				var div_one = document.createElement('div');
				var div_one_one = document.createElement('div');
				li.className = 'mui-table-view-cell';
				var _type = objs[i].type;
				li.title = _type;
				li.id = objs[i].id;
				li.setAttribute('time', objs[i].create_date);
				var _date = objs[i].create_date;
				div_one.className = 'mui-table';
				div_one.style.width = '85%';
				div_one_one.className = 'mui-table-cell mui-col-xs-10';
				div_one_one.innerHTML = '<h4 class="mui-ellipsis">' + objs[i].title + '</h4><h5>发送时间：' + objs[i].create_date + '</h5><div style ="white-space: normal;" class="mui-h6 mui-ellipsis">' + objs[i].content + '</div>';
				div_one.appendChild(div_one_one);
				li.appendChild(div_one);
				table.appendChild(li);
			}
			now++; //第二页
			if(objs.length == 10) {
				mui('#pullrefresh').pullRefresh().endPullupToRefresh();
			} else if(objs.length < 10) {
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
			}
		},
		error: function(xhr, type, errorThrown) {
			setTimeout("pullupRefresh()", 1000);
		}
	});
}

/**
 * 跳转到推送的详细信息页面
 * @param {Object} id
 * @param {Object} type
 */
function fun_getMes(id, metadbid, time) {
	jumpPage('pushMessage.html', 'slide-in-buttom', {
		"_id": id,
		"params": metadbid,
		'_time': time
	}, true);
}
/**
 * 获取一条推送的详细信息
 * @param {Object} a
 */
function fun_getMessages(a) {
	var detail = a;
	var _mnID = detail._id;
	var params = detail.params.split("?");
	var _time = detail._time;
	var w = plus.ui.createWaiting("正在查询数据，请稍候...");
	var metadbid = params[0];
	var _type = params[1];
	//doc.getElementById("abcd").innerHTML = params;
	var appid = getUser().appid;
	var userInformation = getUserInformation(appid);
	var diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
	mui.ajax(ADDR + GETPUSHMES, {
		data: {
			appid: appid,
			metadbid: metadbid,
			type: _type,
			time: _time,
			renqun: diseasespeople,
			id: _mnID
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 15000, //超时时间设置为10秒；
		success: function(data) {
			if(data.success) {
				w.close();
				var fragment = document.createDocumentFragment();
				var message_data = data.obj;
				if (metadbid == '睡觉') {
					fun_zuzhuangSleep(message_data, diseasespeople, _time, _type);
				} else {
					for(var i = 0; i < message_data.length; i++) {
						var _data = message_data[i];
						if(_data != '' && _data != null) {
							var divHtml = document.createElement("div");
							divHtml.className = "";
							var _html = '<div style="text-align:center;">';
							if(_data.disease == null || _data.disease == '' || _data.disease == 'null') {
								_html += '<div style="font:italic bold 16px arial,sans-serif; margin: 10px 40px;">提醒时间：' + _data.operationTime + '</div>';
								_html += '<div style="font:italic bold 16px arial,sans-serif; margin: 10px 40px;">养生方法：' + _data.healthMethod + '</div>';
								if(_data.operationMethod != null && _data.operationMethod != '') {
									_html += '<p style="font:italic bold 16px arial,sans-serif; margin: 10px 40px;">操作方法：' + _data.operationMethod + '</p>';
								}
							} else {
								_html += '<div style="font:italic bold 20px arial,sans-serif; margin: 20px 20px;">疾病名称：' + _data.disease + '</div>';
								_html += '<div style="font:italic bold 16px arial,sans-serif; margin: 10px 40px;">提醒时间：' + _data.operationTime + '</div>';
								_html += '<div style="font:italic bold 16px arial,sans-serif; margin: 10px 40px;">养生方法：' + _data.healthMethod + '</div>';
								if(_data.operationMethod != null && _data.operationMethod != '') {
									var operationMethod = _data.operationMethod;
									if(operationMethod.indexOf("photo") == -1 && operationMethod.indexOf("qingxu") == -1 &&
										operationMethod.indexOf("richangliaofa") == -1 && operationMethod.indexOf("shuimian") == -1 &&
										operationMethod.indexOf("yundong") == -1) {
										_html += '<p style="font:italic bold 16px arial,sans-serif; margin: 10px 40px;">操作方法：' + _data.operationMethod + '</p>';
									} else {
										_html += '<img src="' + ADDR + diseasespeople + '/' + operationMethod + '" style="marginTop:20px;margin:auto auto;text-align:center;width:220px;" /> <br/>';
									}
								}
							}
							if(_data.img != null && _data.img != '') {
								_html += '<img src="' + ADDR + diseasespeople + '/' + _data.img + '" style="marginTop:20px;margin:auto auto;text-align:center;width:220px;" /> <br/>';
							}
							_html += '</div>';
							divHtml.innerHTML = _html;
							fragment.appendChild(divHtml);
						}
					}
					document.getElementById("abcd").innerHTML = '';
					document.getElementById("abcd").appendChild(fragment);
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			w.close();
			//异常处理；
			plus.nativeUI.toast('服务器出现异常，请重试！');
		}
	});
}

function fun_zuzhuangSleep(message_data, diseasespeople, curTime, filed) {
	var _html = document.createElement("div");
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
	_healthMethod.innerHTML = message_data[filed];
	_healthMethod.style.marginTop = "20px";
	_healthMethod.style.textAlign = "center";
	_healthMethod.style.color = '#5c9eb0';
	h4Parent.appendChild(_healthMethod);
	_html.appendChild(h4Parent);
	//用户信息判断版本
	var _img = document.createElement("img");
	_img.src = ADDR + diseasespeople + "/" + message_data[filed.replace('notice', 'img')];
	_img.style.marginTop = "25px";
	//_img.style.margin = "auto auto";
	_img.style.textAlign = "center";
	_img.style.width = "260px";
	_img.style.height = "200px";
	_html.appendChild(_img);
	var _center = document.createElement("center");
	var _operationMethodParentDiv = document.createElement("div");
	_operationMethodParentDiv.style.width = "300px";
	_operationMethodParentDiv.style.height = "200px";
	_operationMethodParentDiv.style.overflowY = "auto";
	_operationMethodParentDiv.style.overflowX = "hidden";
	_operationMethodParentDiv.style.margin = "5px 0px";
	_operationMethodParentDiv.style.fontSize = "12px";
	var _operationMethod = document.createElement("div");
	_operationMethod.innerHTML = "&nbsp; &nbsp; &nbsp; &nbsp; " + message_data[filed];
	_operationMethod.style.marginTop = "20px";
	_operationMethod.style.textAlign = "left";
	_operationMethod.style.width = "300px";
	_operationMethod.style.height = "200px";

	_operationMethodParentDiv.appendChild(_operationMethod);
	_center.appendChild(_operationMethodParentDiv);
	_html.appendChild(_center);
	document.getElementById("abcd").appendChild(_html);
}
