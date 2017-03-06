// 我的收藏
mui('body').on('tap', '#me_collection', function() {
	jumpPage('mycollection/collectionList.html', 'slide-in-right', {}, false);
});
// 我的好友
mui('body').on('tap', '#me_friends', function() {
	document.getElementById("myFriend").innerHTML = '&nbsp;';
	// 将为阅读的好友请求设置为已阅读
	mui.ajax(ADDR + UPDATEREAD, {
		data: {
			appid: user.appid
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 20000, //超时时间设置为20秒；
		success: function(data) {
			jumpPage('mycircle/friendList.html', 'slide-in-right', {}, false);
		}
	});
});
// 设置
mui('body').on('tap', '#div_myinfomation', function() {
	//jumpPage('account/myaccount.html', 'slide-in-right', {}, false);
	jumpPage("setting.html", "slide-in-right", {}, false);
});
// 我的基本信息
mui('body').on('tap', '#div_myaccount', function() {
	jumpPage('basicinformation/myinfomation.html', 'slide-in-right', {}, false);
});
// 体检信息
mui('body').on('tap', '#div_check', function() {
	jumpPage('checkinfo/checkAll.html', 'slide-in-right', {}, false);
});
//关于福道
mui('body').on('tap', '#div_about', function() {
	jumpPage('about.html', 'slide-in-right', {}, false);
});
// 推送通知
mui('body').on('tap', '#div_messageList', function() {
	//jumpPage('notification/messageList.html', 'slide-in-right', {}, false);
	var _newMessage = document.getElementById("newMessage").style.display;
	var isnewfriend = 0;
	if(_newMessage == 'block') {
		isnewfriend = 1;
	}
	jumpPage('messClass.html', 'slide-in-right', {
		isnewfriend: isnewfriend
	}, false);
});
mui('body').on('tap', '#a_out', function() {
	//清楚所有数据
	localStorage.clear();
	plus.nativeUI.toast('退出成功！');
	saveFirstLogin("1");
	jumpPage("login.html", "none", {}, false);
});
var page = -1,
	last_page = false,
	first_letter = "",
	message_left = [],
	oldObj,
	diseasespeople,
	userInformation,
	_curDisName,
	_curDisShowName,
	user = getUser();
var _yangyiyang;
var _height, _width;
var mapWindow;
(function($, doc) {
	//去掉疗一疗的mui-active 为什么呢。。（不加还不行）
	document.getElementById("div_self_status").className = "mui-control-content";
	// 设置上次体检的得分 开始
	userInformation = getUserInformation(getUser().appid);
	diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
	if(diseasespeople == "aged" && userInformation.sex == "0") {
		document.getElementById("renti_optimization").src = "img/xingxiang/agedwoman.png";
	} else {
		document.getElementById("renti_optimization").src = "img/xingxiang/" + diseasespeople + ".png";
	}
	document.getElementById("me_renti").src = userInformation.img;
	//判断图片是否存在
	mui.ajax(userInformation.img, {
		timeout: 5, //超时时间设置为10秒；
		async: false,
		error: function(xhr, type, errorThrown) {
			document.getElementById("me_renti").src = "img/xingxiang/default_Head.png";
		}
	});
	document.getElementById("me_title").innerText = userInformation.title
	mui.plusReady(function() {
		_width = plus.screen.resolutionWidth;
		_height = plus.screen.resolutionHeight;
		document.getElementById("div_dashed").style.height = (_height - 125) + "px";
		no_have_yangyiyang();
		fun_areaPosition();
		//仅支持竖屏显示
		plus.screen.lockOrientation("portrait-primary");
		window.setTimeout(function() {
			//除主界面别的都删除
			clearPage("main");
		}, 100);
		//是否第一次登录 	第一次需要加引导
		setTimeout(function() {
			if(getFirstLogin() != 1) {
				document.getElementById("first_remind").style.display = "block";
				saveFirstLogin("1");
			} else {
				timejishi();
				window.setInterval('timejishi()', 5000);
			}
		}, 1000);
		document.getElementById("renti_optimization").style.height = (plus.screen.resolutionHeight - 180) + "px";
		document.getElementById("renti_optimization").style.marginTop = "60px";
		document.getElementById("renti_optimization").style.marginLeft = "-20px";
	});
	//-------动态开始---------//

	// 主页-主页
	mui('body').on('tap', '#self_home', function() {
		fun_nav("img_self_home", "span_self_home", 'img/zhuye.png');
		document.getElementById("header_me").style.display = "block";
		document.getElementById("float_icon").style.display = "block";
		document.getElementById("float_3").style.display = "none";
		document.getElementById("div_dynamic_show_hide").style.display = "block";
		document.getElementById("div_programme_planprogramme").style.display = "none";
		document.getElementById("mui_title").innerHTML = "主页";
		document.getElementById("fangan_back").style.display = "none";
	});
	// 主页-问题
	mui('body').on('tap', '#self_status', function() {
		fun_nav("img_self_status", "span_self_status", 'img/wenti.png');
		document.getElementById("header_me").style.display = "block";
		document.getElementById("float_3").style.display = "block";
		document.getElementById("float_icon").style.display = "none";
		document.getElementById("div_dynamic_show_hide").style.display = "block";
		document.getElementById("div_programme_planprogramme").style.display = "none";
		document.getElementById("mui_title").innerHTML = "问题";
		document.getElementById("fangan_back").style.display = "none";
		loadding_first_letter();
		//阻尼系数
		var deceleration = mui.os.ios ? 0.003 : 0.0009;
		mui('#myterritory_title').scroll({
			bounce: false,
			indicators: true, //是否显示滚动条
			deceleration: deceleration
		});
	});
	// 主页-动态
	mui('body').on('tap', '#self_dynamic', function() {
		fun_nav("img_self_dynamic", "span_self_dynamic", 'img/dongtai.png');
		document.getElementById("header_me").style.display = "block"
		document.getElementById("float_icon").style.display = "none"
		document.getElementById("float_3").style.display = "none";
		document.getElementById("div_dynamic_show_hide").style.display = "block";
		document.getElementById("div_programme_planprogramme").style.display = "none";
		document.getElementById("mui_title").innerHTML = "动态";
		document.getElementById("fangan_back").style.display = "none";
	});
	//-------我-------
	mui('body').on('tap', '#self_me', function() {
		fun_nav("img_self_me", "span_self_me", 'img/bottom_wo.png');
		document.getElementById("header_me").style.display = "none"
		document.getElementById("float_icon").style.display = "none"
		document.getElementById("float_3").style.display = "none";
		document.getElementById("div_dynamic_show_hide").style.display = "block";
		document.getElementById("div_programme_planprogramme").style.display = "none";
		document.getElementById("mui_title").innerHTML = "我";
		document.getElementById("fangan_back").style.display = "none";
		mui.ajax(ADDR + ISHAVEREQUEST, {
			data: {
				appid: user.appid
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 20000, //超时时间设置为20秒；
			success: function(data) {
				if(data.success) {
					document.getElementById("myFriend").style.display = 'block';
					document.getElementById("newMessage").style.display = 'block';
				} else {
					document.getElementById("myFriend").style.display = 'none';
					document.getElementById("newMessage").style.display = 'none';
				}
			}
		});
		//document.getElementById("float_3").style.display = "none";
	});

	// 动态-我的圈子
	mui('body').on('tap', '#div_dynamic', function() {
		jumpPage('mycircle/circleSub.html', null, {}, false);
	});
	// 动态-我的咨询
	mui('body').on('tap', '#div_advice', function() {
		jumpPage('myring/myterritory.html', null, {}, false);
	});
	// 动态-养生
	mui('body').on('tap', '#div_health', function() {
		jumpPage('health/health.html', null, {}, false);
	});
	// 动态-自修
	mui('body').on('tap', '#div_study', function() {
		jumpPage('cultivation/cultivation.html', null, {}, false);
	});
	// 动态-我的方案和效果
	mui('body').on('tap', '#fangan_back', function() {
		fun_nav("img_self_dynamic", "span_self_dynamic", 'img/dongtai.png');
		document.getElementById("header_me").style.display = "block"
		document.getElementById("float_icon").style.display = "none"
		document.getElementById("float_3").style.display = "none";
		document.getElementById("div_dynamic_show_hide").style.display = "block";
		document.getElementById("div_programme_planprogramme").style.display = "none";
		document.getElementById("mui_title").innerHTML = "动态";
		document.getElementById("fangan_back").style.display = "none";
	});

	// 动态-我的方案和效果
	mui('body').on('tap', '#div_effect', function() {
		document.getElementById("fangan_back").style.display = "block";
		document.getElementById("mui_title").innerHTML = "我的方案和效果";
		document.getElementById("div_dynamic_show_hide").style.display = "none";
		document.getElementById("div_programme_planprogramme").style.display = "block";
		//重置
		document.getElementById("div_dashed").innerHTML = '<div id="div_dashed_content0" style="position:relative;width:2px;border :2px dashed #333333; height:' + _height + 'px"></div>';
		//上下之前的距离
		average_height = parseInt(document.getElementById("div_dashed_content0").style.height) / 6;
		//显示左边还是右边
		fangan_left_right = 0;
		//初始化从后台查询数据。
		again_ajax = true;
		var div_dashed_content = document.getElementById("div_dashed").children[0];
		var date = new Date();
		var temp_date = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 7);
		fangan_week = temp_date.getFullYear();
		fangan_week += "-" + ((temp_date.getMonth() + 1) < 10 ? "0" + (temp_date.getMonth() + 1) : (temp_date.getMonth() + 1));
		fangan_week += "-" + (temp_date.getDate() < 10 ? "0" + temp_date.getDate() : temp_date.getDate());
		var date_month = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
		fangan_month = date_month.getFullYear();
		fangan_month += "-" + ((date_month.getMonth() + 1) < 10 ? "0" + (date_month.getMonth() + 1) : (date_month.getMonth() + 1));
		fangan_month += "-" + (date_month.getDate() < 10 ? "0" + date_month.getDate() : date_month.getDate());
		var par_ymd = date.getFullYear();
		par_ymd += "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
		par_ymd += "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
		ajax_get_fangan(div_dashed_content, par_ymd, "first");
	});
	//-------动态结束---------//
	//-------查一查-------
	mui('body').on('tap', '#self_check', function() {
		//document.getElementById("float_3").style.display = "none";
	});
	//-------疗一疗-------
	mui('body').on('tap', '#self_treatment', function() {
		document.getElementById("myzhenduan").style.display = "block";
		//document.getElementById("float_3").style.display = "none";
	});

	//我  头像
	window.addEventListener("me_renti", function(e) {
		document.getElementById("me_renti").src = e.detail._imgPath;
	});
	//疗一疗		滑动事件
	window.addEventListener("swipe", function(e) {
		//标题滑动
		var myterritory_title = document.getElementById("myterritory_title");
		var transform = myterritory_title.style.webkitTransform;
		transform = transform.substring(transform.indexOf("(") + 1, transform.indexOf("px"));
		if(transform < -540) {
			document.getElementById("more_div").style.display = "none";
		} else {
			document.getElementById("more_div").style.display = "block";
		}

		var obj_item = document.querySelectorAll('#myterritory_title .mui-active');
		var _id = obj_item[0].getAttribute("id").toString().replace("title", "");
		_id = parseInt(_id);
		if(e.detail.offsetDirection == "left" && _id !== 1) {
			_id--;
		} else if(e.detail.offsetDirection == "right" && _id !== 10) {
			_id++;
		}
		var obj = document.getElementById("title" + _id);
		if(obj != null) {
			var _title = obj.innerText;
			if((_title == 'X' || _title == 'Y' || _title == 'Z') || transform < -540) {
				document.getElementById("more_div").style.display = "none";
			} else {
				document.getElementById("more_div").style.display = "block";
			}
			var _page = obj.getAttribute("page");
			var ul = document.getElementById("ul_list" + _id);
			if(ul.children.length == 0) {
				pullupRefresh(ul, _title, _page);
			}
		}
	});
	//疗一疗		标题事件
	mui('#myterritory_title').on('tap', 'a', function() {
		//头的ID
		var _id = this.getAttribute("id").toString().replace("title", "");
		var _title = this.innerText;
		var _page = this.getAttribute("page");
		var ul = document.getElementById("ul_list" + _id);
		if(ul.children.length == 0) {
			pullupRefresh(ul, _title, _page);
		}
	});
	//点击事件
	mui('#group_myterritory').on('tap', 'li', function(e) {
		var json = {};
		json["status"] = "select";
		json["_show_text"] = this.children[0].children[1].innerText;
		json["_text"] = this.children[0].getAttribute("val");
		json['_action'] = FINDDAILYTHERAPY;
		jumpPage("self_result.html", "slide-in-right", json, false);
	});
	//-------养一养-------
	mui('body').on('tap', '#self_health', function() {
		//document.getElementById("float_3").style.display = "inline-block";
		oldObj = undefined;
		init_yingyiyang();
	});
	//-------修一修-------
	mui('body').on('tap', '#self_cultivation', function() {
		var svgPath = '';
		if('aged' == diseasespeople) {
			if(userInformation.sex == '1') {
				svgPath = 'app/images/laoren.svg';
			} else {
				svgPath = 'app/images/laotaitai.svg'
			}
		} else if('high_quality_population' == diseasespeople) {
			if(userInformation.sex == '1') {
				svgPath = 'app/images/nanren.svg';
			} else {
				svgPath = 'app/images/nvren.svg'
			}
		}
		loadSvg(svgPath);
	});
	//初始化数据
	main_init();
	// 点击钟表事件
	mui('body').on('tap', '#a_calendar', function() {
		document.getElementById("calendar_interface").style.display = "block";
		var temp_width = document.getElementById("calendar_interface_content").offsetWidth + 20;
		document.getElementById("float_calendar_interface").style.left = temp_width + "px";
		fun_show_calendar_interface();
	});
	// 点击蜗牛事件
	mui('body').on('tap', '#a_woniu', function() {
		document.getElementById("woniu_interface").style.display = "block";
		var temp_width = document.getElementById("woniu_interface_content").offsetWidth + 20;
		document.getElementById("float_woniu_interface").style.left = temp_width + "px";
		if(!woniuWindow) {
			woniuWindow = plus.webview.create("mycycle/mycycle_float.html", "mycycle_float", {
				top: '40px',
				left: '20px',
				width: '85%',
				height: '87%',
				scrollIndicator: 'none',
				scalable: false,
				popGesture: 'none',
				scrollIndicator: 'vertical'
			}, {
				"interface_width": document.getElementById("map_interface_content").offsetWidth
			});
			woniuWindow.show('fade-in', 300);
		}
	});
	// 点击地图事件
	mui('body').on('tap', '#a_map', function() {
		document.getElementById("map_interface").style.display = "block";
		var temp_width = document.getElementById("map_interface_content").offsetWidth + 20;
		document.getElementById("float_map_interface").style.left = temp_width + "px";
		if(!mapWindow) {
			mapWindow = plus.webview.create("map.html", "map", {
				top: '40px',
				left: '20px',
				width: '85%',
				height: '87%',
				scrollIndicator: 'none',
				scalable: false,
				popGesture: 'none',
				scrollIndicator: 'vertical'
			}, {
				"interface_width": document.getElementById("map_interface_content").offsetWidth
			});
			mapWindow.show('fade-in', 300);
		}
	});
	// 点击蜗牛事件
	mui('body').on('tap', '#a_qingxu', function() {
		timejishi('click');
	});
	// 点击健康事件
	mui('body').on('tap', '#a_jiankang', function() {
		document.getElementById("healthy_interface").style.display = "block";
		var temp_width = document.getElementById("healthy_interface_content").offsetWidth + 20;
		document.getElementById("float_healthy_interface").style.left = temp_width + "px";
		if(!floatw_jiankang) {
			floatw_jiankang = plus.webview.create("myhabit/wo_habit_set.html", "wo_habit_set", {
				top: '40px',
				left: '20px',
				width: '85%',
				height: '87%',
				scrollIndicator: 'none',
				scalable: false,
				popGesture: 'none',
				scrollIndicator: 'vertical'
			}, {
				"interface_height": document.getElementById("healthy_interface_content").offsetHeight,
				"interface_width": document.getElementById("healthy_interface_content").offsetWidth
			});
			floatw_jiankang.show('fade-in', 300);
		}

	});
	// 福道数据事件
	mui('body').on('tap', '#a_fudao', function() {
		document.getElementById("fudao_interface_content").style.display = "block";
		document.getElementById("fudao_gexiangzhishu").style.display = "none";
		//、、、、、、、、、、、、、、、、、
		document.getElementById("fudao_interface").style.display = "block";
		var temp_width = document.getElementById("fudao_interface_content").offsetWidth + 20;
		document.getElementById("float_fudao_interface").style.left = temp_width + "px";
	});

	// 我的健康环数据事件
	mui('body').on('tap', '#a_wodehuan', function() {
		document.getElementById("wodehuan_interface").style.display = "block";
		var temp_width = document.getElementById("wodehuan_interface_content").offsetWidth + 20;
		document.getElementById("float_wodehuan_interface").style.left = temp_width + "px";
		if(!floatw_wodehuan) {
			floatw_wodehuan = plus.webview.create("healthring/healthring.html", "healthring", {
				top: '40px',
				left: '20px',
				width: '85%',
				height: '87%',
				scrollIndicator: 'none',
				scalable: false,
				popGesture: 'none',
				scrollIndicator: 'vertical'
			}, {
				"interface_height": document.getElementById("healthy_interface_content").offsetHeight,
				"interface_width": document.getElementById("healthy_interface_content").offsetWidth
			});
			floatw_wodehuan.show('fade-in', 300);
		}
	});
	//疾病-养一养、修一修
	mui('body').on('tap', '#a_self_check', function() {
		jumpPage("checkprocess/check_process_one.html", "slide-in-right", {}, false);
		/*var sel = document.querySelector(".mui-bar-tab .mui-active");
		var _text = sel.children[1].innerText;
		if("养一养" == _text) {
			fun_health();
		} else if("修一修" == _text) {
			jumpPage("cultivation/cultivation_pagination.html", "slide-in-right", {}, false);
		}*/
	});
	//我的设置
	mui('body').on('tap', '#myDevice', function() {
		jumpPage("setting.html", "slide-in-right", {}, false);
	});
	//一键查查
	mui('body').on('tap', '#button_self_check_result', function() {
		document.getElementById("remindMes").style.display = "block";
		//fun_one_check();
	});
	// 生理健康指数
	mui('body').on('tap', '#zhengzhuang_td', function() {
		gexiangzhishu(1);
		event.stopPropagation();
	});
	// 心理健康指数
	mui('body').on('tap', '#xinli_td', function() {
		gexiangzhishu(2);
		event.stopPropagation();
	});
	// 社会健康指数
	mui('body').on('tap', '#shehui_td', function() {
		gexiangzhishu(3);
		event.stopPropagation();
	});
	// 自测健康指数
	mui('body').on('tap', '#zice_td', function() {
		gexiangzhishu(4);
		event.stopPropagation();
	});

	// 福道返回
	mui('body').on('tap', '#div_fudao_back', function() {
		document.getElementById("fudao_interface_content").style.display = "block";
		document.getElementById("fudao_gexiangzhishu").style.display = "none";
	});
	// 疗一疗 我的诊断记录
	mui('body').on('tap', '#myDiaRecord', function() {
		jumpPage('self_result.html', null, {
			status: 'myDiaRecord',
			_action: FINDDAILYTHERAPY
		}, true);
	});
	//养一养的饮食按钮
	mui('body').on('tap', '#yinshi', function() {
		fun_data("yinshi", this, "#FBE089");
	});
	//养一养的睡觉按钮
	mui('body').on('tap', '#shuijiao', function() {
		fun_data("shuijiao", this, "#9B98FE");
	});
	//饮食	换一换
	mui('body').on('tap', '#a_next', function() {
		yinshi_loadding(1);
	});
	mui('body').on('tap', '#a_next_zhishi', function() {
		yinshi_loadding(1);
	});
	//养一养的运动按钮
	mui('body').on('tap', '#yundong', function() {
		fun_data("yundong", this, "#ABCB74");
	});
	//养一养的养心按钮
	mui('body').on('tap', '#yangxin', function() {
		fun_data("yangxin", this, "#cc9900");
	});
	////养一养的弹出饮食的层

	mui('body').on('tap', '#nengliangPage', function() {
		this.style.display = "none";
		document.getElementById("nengliangBackground").style.display = "none";
	});

	// 设置修一修的图片高度
	//var renti = document.getElementById("renti_xiuyixiu");
	//renti.style.width = '200px';
	//renti.style.height = (document.body.clientHeight - 100) + 'px';
	//renti.style.marginLeft = '-30px';
	mui('body').on('tap', '.clickClass', function() {
		fun_selfCultivation(this);
	});
	// 修一修事件 end
	// 我的方案
	mui('body').on('tap', '#chacharecord', function() {
		plus.nativeUI.toast('此功能尚未开放');
		//chacharecord();
	});
	// 我的健康环 
	mui('body').on('tap', '#myDisease', function() {
		jumpPage("healthring/healthring.html", "slide-in-right", {}, false); //fun_myDisease();
	});
	// 我的习惯
	mui('body').on('tap', '#myHabit', function() {
		fun_myHabit();
	});

	/*// 现在的我
	mui('body').on('tap', '#woniu_nowMe', function() {
		jumpPage("mycycle/main_mycycle.html", "slide-in-right", {}, false); //fun_myDisease();
	});*/
	//关闭遮罩
	mui('body').on('tap', '#first_remind', function() {
		this.style.display = "none";
		document.getElementById("first_remind").style.display = "none";
		window.setTimeout(function() {
			timejishi();
			window.setInterval('timejishi()', 5000);
		}, 500);
	});
	/*//计算分后重新赋值
	window.addEventListener("jisuan", function() {
		// 设置上次体检的得分 开始
		userinformation = getUserInformation(user.appid);
		if(userinformation.countSocre != null) {
			document.getElementById("div_countSocre").innerHTML = '您上次测评得了<span style="font-size:30px ;">&nbsp;' + Math.round(parseFloat(userinformation.countSocre)) + '&nbsp;</span>分哟~继续努力'
		}
		fun_question();
	});*/
	//查询出疾病后重新加载养一养的日常疗法数据
	window.addEventListener("yangyiyangdisease", function() {
		no_have_yangyiyang();
	});
	//方案预案保存后回调函数
	window.addEventListener("fanganSaveOrUpdate", function() {
		document.getElementById("fangan_interface").style.display = "none";
		if(fanganWindow) {
			fanganWindow.close("none");
			fanganWindow = null;
		}
	});
	//计算完分后，处理main界面
	window.addEventListener("check_process_event", function(e) {
		/*
				userInformation = getUserInformation(user.appid);
				if(userInformation.countSocre != null) {
					document.getElementById("div_countSocre").innerHTML = '您上次测评得了<span style="font-size:30px ;">&nbsp;' + Math.round(parseFloat(userInformation.countSocre)) + '&nbsp;</span>分哟~继续努力'
				}
				//福道指数
				document.getElementById("countSocre").innerText = Math.round(parseFloat(userInformation.countSocre));
				document.getElementById("zhengzhuang").innerText = Math.round(parseFloat(userInformation.zhengzhuangSocre));
				document.getElementById("xinli").innerText = Math.round(parseFloat(userInformation.xinliSocre));
				document.getElementById("shehui").innerText = Math.round(parseFloat(userInformation.shehuiSocre));
				document.getElementById("zice").innerText = Math.round(parseFloat(userInformation.ziceSocre));
			*/
	});
	//计算完分后，处理main界面
	window.addEventListener("check_process_disease", function(e) {
		fun_hidden();
		oldObj = undefined;
		document.getElementById("yinshi").style.backgroundColor = "";
		document.getElementById("shuijiao").style.backgroundColor = "";
		document.getElementById("yundong").style.backgroundColor = "";
		document.getElementById("yangxin").style.backgroundColor = "";
	});
	//点击进入好友列表后，把红点去掉
	window.addEventListener("mes_event", function(e) {
		document.getElementById("myFriend").style.display = 'none';
		document.getElementById("newMessage").style.display = 'none';
	});
	$.ready(function() {
		fun_ready();
	});
})(mui, document);
mui('.mui-scroll-wrapper').scroll();
//睡觉	弹出框显示
document.getElementById('shuijiaoPrompt').addEventListener('shown', function(e) {
	//原来的样式放到oldcss属性里
	yangyiyangObjEvent.children[0].setAttribute("oldcss", yangyiyangObjEvent.children[0].style.backgroundColor);
	yangyiyangObjEvent.children[0].style.backgroundColor = "rgb(255, 255, 255)";
});
//睡觉	弹出框隐藏
document.getElementById('shuijiaoPrompt').addEventListener('hidden', function(e) {
	yangyiyangObjEvent.children[0].style.backgroundColor = yangyiyangObjEvent.children[0].getAttribute("oldcss");
	//删除oldcss属性
	yangyiyangObjEvent.children[0].removeAttribute("oldcss");
});
//饮食	弹出框显示
document.getElementById('yinshiPrompt').addEventListener('shown', function(e) {
	//原来的样式放到oldcss属性里
	yangyiyangObjEvent.children[0].setAttribute("oldcss", yangyiyangObjEvent.children[0].style.backgroundColor);
	yangyiyangObjEvent.children[0].style.backgroundColor = "rgb(255, 255, 255)";
});
//饮食	弹出框隐藏
document.getElementById('yinshiPrompt').addEventListener('hidden', function(e) {
	yangyiyangObjEvent.children[0].style.backgroundColor = yangyiyangObjEvent.children[0].getAttribute("oldcss");
	//删除oldcss属性
	yangyiyangObjEvent.children[0].removeAttribute("oldcss");
	document.getElementById("yinshiDIV").parentNode.style.webkitTransform = "translate3d(0px, 0px, 0px)";
});
//养心	弹出框显示
document.getElementById('yangxinPrompt').addEventListener('shown', function(e) {
	//原来的样式放到oldcss属性里
	yangyiyangObjEvent.children[0].setAttribute("oldcss", yangyiyangObjEvent.children[0].style.backgroundColor);
	yangyiyangObjEvent.children[0].style.backgroundColor = "rgb(255, 255, 255)";
});
//养心	弹出框隐藏
document.getElementById('yangxinPrompt').addEventListener('hidden', function(e) {
	yangyiyangObjEvent.children[0].style.backgroundColor = yangyiyangObjEvent.children[0].getAttribute("oldcss");
	//删除oldcss属性
	yangyiyangObjEvent.children[0].removeAttribute("oldcss");
	document.getElementById("yangxinDIV").parentNode.style.webkitTransform = "translate3d(0px, 0px, 0px)";
});

function fun_clear(obj) {
	obj.innerHTML = "";
}

function fun_table_hide() {
	document.getElementById("ul_term").innerHTML = "";
	if(youhua_buwei != '') {
		fun_renti(youhua_buwei);
	}
}

function fun_div_hide() {
	event.stopPropagation();
}

function fun_select_tr(obj, td, fangan, jiankanghuan) {
	obj.style.borderBottom = "3px solid #9ed4e3";
	document.getElementById(td).style.borderBottom = "0px";
	document.getElementById(fangan).style.display = "inline";
	document.getElementById(jiankanghuan).style.display = "none";
}

function no_have_yangyiyang() {
	var userInfomation = getUserInformation(user.appid);
	var _myDiaRecords = userInfomation.haveDisease;
	var _myDiaRecordsBaihua = userInfomation.haveDiseaseBaihua;
	//document.getElementById("disease_name").innerHTML = '';
	//document.getElementById("showText").innerHTML = '您可能存在的问题为';
	if(_myDiaRecords != undefined && _myDiaRecords != '' && _myDiaRecords != null) {
		/*
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
									li.style.marginBottom = "5px";
									if(i == 0) {
										fun_showTime('', _myDisease, _myDiseaseBaihua);
										_text = _myDisease;
										li.style.backgroundColor = '#ebd7ff';
									}
									li.style.padding = "0px";
									li.innerHTML = _html;
									document.getElementById("disease_name").appendChild(li);
								}
							*/
	} else {
		/*
				var _noDiseaseShowText = '现在<br /><div style="font-size:18px; margin-top: 5px;">';
				_noDiseaseShowText += "&nbsp;&nbsp;&nbsp;&nbsp;" + document.getElementById("ymd").innerHTML;
				_noDiseaseShowText += "&nbsp;&nbsp;&nbsp;&nbsp;" + document.getElementById("week").innerHTML;
				_noDiseaseShowText += "&nbsp;&nbsp;&nbsp;&nbsp;" + document.getElementById("div_hour").innerHTML + '<br/>';
				_noDiseaseShowText += '<div style="margin-top: 5px;">';
				_noDiseaseShowText += "&nbsp;&nbsp;&nbsp;&nbsp;" + document.getElementById("ymd_yinli").innerHTML;
				_noDiseaseShowText += "&nbsp;&nbsp;&nbsp;&nbsp;" + document.getElementById("lunar").innerHTML;
				_noDiseaseShowText += "&nbsp;&nbsp;&nbsp;&nbsp;" + document.getElementById("lunarHour").innerHTML;
				_noDiseaseShowText += "&nbsp;&nbsp;&nbsp;&nbsp;" + document.getElementById("festival").innerHTML;
				_noDiseaseShowText += '</div></div>';
				document.getElementById("showText").innerHTML = _noDiseaseShowText;
				if(document.getElementById("disease_name").innerHTML == "") {
					_curDisName = document.getElementById("festival").innerHTML;
					_curDisShowName = null;
				}
			*/
	}
}
// 点击疾病在圆圈上显示点
function fun_showTime(obj, name, showName) {
	oldObj = undefined;
	_curDisName = name;
	_curDisShowName = showName;
	if("" != obj) {
		init_yingyiyang();
		var sbil = obj.parentNode.parentNode.children;
		var _len = sbil.length;
		for(var i = 0; i < _len; i++) {
			sbil[i].style.backgroundColor = '';
		}
		obj.parentNode.style.backgroundColor = '#ebd7ff';
	}
}
/*
作者： 125267221 @qq.com
时间： 2016 - 11 - 24
描述： 日历javascript开始
*/
fun_time();
fun_getUpAndNextJieQi();
window.setInterval("fun_time()", 1000);
var _minuteCount = 24 * 60;
var woniu = document.getElementById("woniu");
var re_width;

function fun_show_calendar_interface() {
	re_width = document.getElementById("calendar_interface_content").offsetWidth;
	var x1 = document.getElementById("x1");
	x1.style.width = "95%";
	x1.style.borderBottom = "1px solid #000000";
	for(var i = 0; i <= 12; i++) {
		var _left = re_width / 12.65 * i;
		var _div = document.createElement("div");
		_div.style.width = "2px";
		_div.style.height = "10px";
		_div.style.position = "absolute";
		_div.style.background = "#000000";
		_div.style.left = _left + "px";
		var _span = document.createElement("span");
		_span.style.position = "absolute";
		_span.style.fontSize = "12px";
		_span.style.left = (_left - 2) + "px";
		_span.style.top = "10px";
		var _text = "";
		if(i == 12) {
			_text = 0;
			var temp_left = parseInt(_span.style.left);
			_span.style.left = (temp_left - 2) + "px";
		} else {
			if((i + 1) % 2 == 0) {
				_text = "";
				_div.style.height = "5px";
			} else {
				_text = i * 2;
			}
		}
		_span.innerText = _text;
		x1.appendChild(_div);
		x1.appendChild(_span);
	}
	fun_pa(woniu);
	setInterval(function() {
		fun_pa();
	}, 1000 * 60);
}

function fun_pa() {
	var _date = new Date();
	var _currentMinute = _date.getHours() * 60 + _date.getMinutes();
	woniu.style.left = ((re_width - 10) / _minuteCount * _currentMinute) + "px";
	woniu.style.display = "block";
}

function fun_closeMe() {
	document.getElementById("calendar_interface").style.display = "none";
	document.getElementById("woniu_interface").style.display = "none";
	if(woniuWindow) {
		woniuWindow.close("none");
		woniuWindow = null;
	}
	document.getElementById("map_interface").style.display = "none";
	if(mapWindow) {
		mapWindow.close("none");
		mapWindow = null;
	}
	document.getElementById("emotion_interface").style.display = "none";
	if(floatw) {
		floatw.close("none");
		floatw = null;
	}
	if(floatw_emotion) {
		floatw_emotion.close("none");
		floatw_emotion = null;
	}
	document.getElementById("healthy_interface").style.display = "none";
	if(floatw_jiankang) {
		floatw_jiankang.close("none");
		floatw_jiankang = null;
	}
	document.getElementById("fudao_interface").style.display = "none";
	document.getElementById("wodehuan_interface").style.display = "none";
	if(floatw_wodehuan) {
		floatw_wodehuan.close("none");
		floatw_wodehuan = null;
	}
	if(floatw_questionSection) {
		floatw_questionSection.close("none");
		floatw_questionSection = null;
	}
	var floatw_questionDetail = plus.webview.getWebviewById("questionDetail");
	if(floatw_questionDetail) {
		floatw_questionDetail.close("none");
	}
	document.getElementById("fangan_interface").style.display = "none";
	if(fanganWindow) {
		fanganWindow.close("none");
		fanganWindow = null;
	}

}
/*
作者： 125267221 @qq.com
时间： 2016 - 11 - 24
描述： 日历javascript结束
*/
/*
作者： 125267221 @qq.com
时间： 2016 - 11 - 24
描述： 福道指数javascript结束
*/

function fun_submit(_index) {
	if(_index == 0) { //稍后
		fun_one_check();
	} else { //马上
		jumpPage('checkinfo/checkAll.html', "none", {}, false);
	}
	fun_mes();
	event.stopPropagation();
}

function fun_mes() {
	document.getElementById("remindMes").style.display = "none";
}
window.addEventListener("yijianchachaResult", function(a) {
	plus.webview.close(plus.webview.getWebviewById("questionSection"));
	plus.webview.close(plus.webview.getWebviewById("questionDetail"));
	document.getElementById("div_svg").style.display = "none";
	document.getElementById("div_img").style.display = "block";
	//保存
	saveAnswer(a.detail.answers);
	var user = getUser();
	mui.ajax(ADDR + CALCULATESCORE + random(), {
		data: {
			appID: user.appid,
			scoreMap: a.detail.answers
		},
		dataType: 'json',
		type: 'post',
		timeout: 20000, //超时时间设置为20秒；
		success: function(data) {
			if(data.success) {
				var json = {};
				json['json'] = data.obj;
				var userInformation = getUserInformation(user.appid);
				userInformation['countSocre'] = data.obj.countSocre;
				var countSocre = data.obj.countSocre;
				document.getElementById("countSocre").innerText = countSocre;
				if(countSocre < 60) {
					document.getElementById("score_prompt").innerText = "太糟糕啦！福福帮您调理一下吧！";
				} else if(countSocre >= 60 && countSocre <= 80) {
					document.getElementById("score_prompt").innerText = "有点小糟糕哦！快听福福的话吧！";
				} else if(countSocre > 80 && countSocre <= 90) {
					document.getElementById("score_prompt").innerText = "水平良好~再接再厉哦！";
				} else if(countSocre > 90 && countSocre <= 100) {
					document.getElementById("score_prompt").innerText = "恭喜您！身体棒棒哒~继续保持哦！";
				}
				userInformation['checkDate'] = data.obj.checkDate;
				userInformation['zhengzhuangSocre'] = data.obj.zhengzhuangSocre;
				userInformation['xinliSocre'] = data.obj.xinliSocre;
				userInformation['shehuiSocre'] = data.obj.shehuiSocre;
				userInformation['ziceSocre'] = data.obj.ziceSocre;
				saveUserInformation(user.appid, userInformation);
				yijianchacha();
			}
		},
		error: function(xhr, type, errorThrown) {
			w.close();
			plus.nativeUI.toast('服务器出现异常，请重试！');
		}
	});
});

function yijianchacha() {
	// 设置上次体检的得分 开始
	userInformation = getUserInformation(getUser().appid);
	//福道指数
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
	document.getElementById("div_svg").style.display = "block";
	document.getElementById("div_img").style.display = "none";
};

/*
作者： 125267221 @qq.com
时间： 2016 - 11 - 24
描述： 日历javascript结束
*/

//我的方案和预案	开始
var touch_start, touch_end, touch_move;

function abcd(event) {
	if(document.getElementById("div_dashed").scrollTop == 0 && again_ajax) {
		var _time = new Date(fangan_time);
		_time = new Date(_time.getTime() - 1000 * 60 * 60 * 24);
		ajax_get_fangan(null, _time.getFullYear() + "-" + (_time.getMonth() + 1) + "-" + _time.getDate());
	}
}
var _margin_top;

function fun_fangan(data, obj, strDate, isFirst) {
	if(isFirst == "first") {
		if(data.length == 0 || data.length == 1) {
			_margin_top = 400;
		} else if(data.length == 2) {
			_margin_top = 300;
		} else if(data.length == 3) {
			_margin_top = 200;
		} else if(data.length == 4) {
			_margin_top = 100;
		} else if(data.length == 5) {
			_margin_top = 0;
		}
	}
	var date = new Date();
	var isToday = false;
	var today = date.getFullYear();
	today += "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
	today += "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
	if(isFirst != "first") {
		obj.style.height = (average_height * data.length) + "px";
		document.getElementById("div_dashed").scrollTop = average_height * data.length;
	} else {
		document.getElementById("div_dashed").scrollTop = 50;
	}
	if(data.length > 0) {
		//每天的记录
		for(var _i = 0; _i < data.length; _i++) {
			var _div = document.createElement("div");
			_div.style.width = "100px";
			_div.style.height = "30px";
			_div.style.borderRadius = "5px";
			_div.style.lineHeight = "30px";
			_div.style.background = arr_day_color[fangan_left_right % 5];
			_div.style.position = "absolute";
			_div.style.top = ((_i + 1) * average_height - 50) + "px";
			if(fangan_left_right % 2 != 0) {
				_div.style.left = "-110px";
			} else {
				_div.style.left = "10px";
			}
			if(_i == 0) {
				fangan_time = data[_i].createTime;
			}
			if(today == data[_i].createTime) {
				isToday = true;
			}
			//自然周的上一周
			if(fangan_week == data[_i].createTime) {
				var temp_date = new Date(data[_i].createTime);
				var pre_week = new Date(temp_date.getTime() - 1000 * 60 * 60 * 24 * 7);
				fangan_week = pre_week.getFullYear();
				fangan_week += "-" + ((pre_week.getMonth() + 1) < 10 ? "0" + (pre_week.getMonth() + 1) : (pre_week.getMonth() + 1));
				fangan_week += "-" + (pre_week.getDate() < 10 ? "0" + pre_week.getDate() : pre_week.getDate());
				var _div_week = document.createElement("div");
				_div_week.style.width = "120px";
				_div_week.style.height = "30px";
				_div_week.style.borderRadius = "5px";
				_div_week.style.lineHeight = "30px";
				_div_week.style.background = "rgb(191,191,191)";
				_div_week.style.position = "absolute";
				_div_week.style.top = ((_i + 1) * average_height) + "px";
				_div_week.style.left = "40px";
				var str_week_show = "";
				var date_next_week = new Date(temp_date.getTime() + 1000 * 60 * 60 * 24 * 7);
				var str_next_week = date_next_week.getFullYear();
				str_next_week += "-" + ((date_next_week.getMonth() + 1) < 10 ? "0" + (date_next_week.getMonth() + 1) : (date_next_week.getMonth() + 1));
				str_next_week += "-" + (date_next_week.getDate() < 10 ? "0" + date_next_week.getDate() : date_next_week.getDate());
				if(today == str_next_week) {
					str_week_show = "本周";
				} else {
					str_week_show = (temp_date.getMonth() + 1) + "-" + temp_date.getDate() + "至";
					str_week_show += (date_next_week.getMonth() + 1) + "-" + (date_next_week.getDate() < 10 ? "0" + date_next_week.getDate() : date_next_week.getDate());
				}
				_div_week.innerHTML = str_week_show;
				var str_date = temp_date.getFullYear();
				str_date += "-" + ((temp_date.getMonth() + 1) < 10 ? "0" + (temp_date.getMonth() + 1) : (temp_date.getMonth() + 1));
				str_date += "-" + (temp_date.getDate() < 10 ? "0" + temp_date.getDate() : temp_date.getDate());
				_div_week.setAttribute("onclick", "addfangan_week('" + str_date + "','" + str_next_week + "')");
				_div_week.style.marginTop = _margin_top + "px";
				obj.appendChild(_div_week);
			}
			//自然月的上一月
			if(fangan_month == data[_i].createTime) {
				var temp_date = new Date(data[_i].createTime);
				var pre_month = new Date(temp_date.getFullYear(), temp_date.getMonth() - 1, temp_date.getDate());
				fangan_month = pre_month.getFullYear();
				fangan_month += "-" + ((pre_month.getMonth() + 1) < 10 ? "0" + (pre_month.getMonth() + 1) : (pre_month.getMonth() + 1));
				fangan_month += "-" + (pre_month.getDate() < 10 ? "0" + pre_month.getDate() : pre_month.getDate());
				var _div_month = document.createElement("div");
				_div_month.style.width = "120px";
				_div_month.style.height = "30px";
				_div_month.style.borderRadius = "5px";
				_div_month.style.lineHeight = "30px";
				_div_month.style.background = "rgb(191,191,191)";
				_div_month.style.position = "absolute";
				_div_month.style.top = ((_i + 1) * average_height) + "px";
				_div_month.style.left = "-150px";
				var str_month_show = "";
				var date_next_month = new Date(temp_date.getFullYear(), temp_date.getMonth() + 1, temp_date.getDate());
				var comparison_date = date_next_month.getFullYear();
				comparison_date += "-" + ((date_next_month.getMonth() + 1) < 10 ? "0" + (date_next_month.getMonth() + 1) : (date_next_month.getMonth() + 1));
				comparison_date += "-" + (date_next_month.getDate() < 10 ? "0" + date_next_month.getDate() : date_next_month.getDate());
				if(today == comparison_date) {
					str_month_show = "本月";
				} else {
					str_month_show = (temp_date.getMonth() + 1) + "-" + temp_date.getDate() + "至";
					str_month_show += (date_next_month.getMonth() + 1) + "-" + date_next_month.getDate();
				}
				_div_month.innerHTML = str_month_show;
				var str_date = temp_date.getFullYear();
				str_date += "-" + ((temp_date.getMonth() + 1) < 10 ? "0" + (temp_date.getMonth() + 1) : (temp_date.getMonth() + 1));
				str_date += "-" + (temp_date.getDate() < 10 ? "0" + temp_date.getDate() : temp_date.getDate());
				_div_month.setAttribute("onclick", "addfangan_month('" + str_date + "','" + comparison_date + "')");
				_div_month.style.marginTop = _margin_top + "px";
				obj.appendChild(_div_month);
			}
			_div.innerHTML = today == data[_i].createTime ? "今天" : data[_i].createTime;
			if(data[_i].jsonData != undefined) {
				var isAdd = JSON.parse(data[_i].jsonData);
				if(isAdd['add'] != undefined) {
					_div.setAttribute("onclick", "addfangan('" + data[_i].createTime + "')");
				} else {
					_div.setAttribute("onclick", "addfangan('" + data[_i].createTime + "')");
				}
			}
			_div.style.marginTop = _margin_top + "px";
			obj.appendChild(_div);
			fangan_left_right++;
		}
	}
	if(!isToday && isFirst == "first") {
		if(data.length == 0) {
			fangan_time = strDate;
		}
		var _div = document.createElement("div");
		_div.style.width = "100px";
		_div.style.height = "30px";
		_div.style.borderRadius = "5px";
		_div.style.lineHeight = "30px";
		_div.style.background = arr_day_color[fangan_left_right % 5];
		_div.style.position = "absolute";
		_div.style.top = ((data.length + 1) * average_height - 50) + "px";
		if(fangan_left_right % 2 != 0) {
			_div.style.left = "-110px";
		} else {
			_div.style.left = "10px";
		}
		_div.innerHTML = today == strDate ? "今天" : strDate;
		_div.setAttribute("onclick", "addfangan('" + strDate + "')");
		_div.style.marginTop = _margin_top + "px";
		obj.appendChild(_div);
		fangan_left_right++;
	}
}

function ajax_get_fangan(div_dashed_content, strDate, isFirst) {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置');
		return false;
	}
	var w = plus.ui.createWaiting("正在获取数据，请稍候...");
	var task = plus.uploader.createUpload(ADDR + PROGRAMMEPLANPROGRAMME, {
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
					if(isFirst == "first") {
						fun_fangan(data.obj, div_dashed_content, strDate, isFirst);
					} else {
						if(data.obj.length > 0) {
							var div_dashed_html = document.getElementById("div_dashed").innerHTML;
							var child_len = document.getElementById("div_dashed").children.length;
							var _html = '<div id="div_dashed_content' + child_len + '" style="position:relative;width:2px;border :2px dashed #333333;"></div>';
							document.getElementById("div_dashed").innerHTML = _html + div_dashed_html;
							fun_fangan(data.obj, document.getElementById("div_dashed").children[0], strDate, isFirst);
						} else {
							again_ajax = false;
						}
					}
				} else {
					plus.nativeUI.toast('服务器出现异常，请重试');
				}
			}
		}
	});
	var date = new Date();
	task.addData("appid", user.appid);
	task.addData("currentTime", strDate);
	task.start();
}

function addfangan(type, data) {
	var date = new Date();
	var today = date.getFullYear();
	today += "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
	today += "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
	document.getElementById("fangan_interface").style.display = "block";
	if(type == today || data) { //等于今进行添加数据
		if(!fanganWindow) {
			fanganWindow = plus.webview.create("healthindex/addfangan.html", "addfangan", {
				top: '40px',
				left: '20px',
				width: '85%',
				height: '80%',
				scrollIndicator: 'none',
				scalable: false,
				popGesture: 'none',
				scrollIndicator: 'vertical'
			}, {
				"interface_width": document.getElementById("fangan_interface_content").offsetWidth,
				"date": type
			});
			fanganWindow.show('fade-in', 300);
		}
	} else { //否则查看添加的数据
		if(!fanganWindow) {
			fanganWindow = plus.webview.create("healthindex/queryfangan.html", "queryfangan", {
				top: '40px',
				left: '20px',
				width: '85%',
				height: '80%',
				scrollIndicator: 'none',
				scalable: false,
				popGesture: 'none',
				scrollIndicator: 'vertical'
			}, {
				"interface_width": document.getElementById("fangan_interface_content").offsetWidth,
				"date": type
			});
			fanganWindow.show('fade-in', 300);
		}
	}
}

function addfangan_week(curr_week, next_week) {
	document.getElementById("fangan_interface").style.display = "block";
	if(!fanganWindow) {
		fanganWindow = plus.webview.create("healthindex/queryweekfangan.html", "queryweekfangan", {
			top: '40px',
			left: '20px',
			width: '85%',
			height: '80%',
			scrollIndicator: 'none',
			scalable: false,
			popGesture: 'none',
			scrollIndicator: 'vertical'
		}, {
			"interface_width": document.getElementById("fangan_interface_content").offsetWidth,
			"curr_week": curr_week,
			"next_week": next_week
		});
		fanganWindow.show('fade-in', 300);
	}
}

function addfangan_month(curr_month, next_month) {
	document.getElementById("fangan_interface").style.display = "block";
	if(!fanganWindow) {
		fanganWindow = plus.webview.create("healthindex/querymonthfangan.html", "querymonthfangan", {
			top: '40px',
			left: '20px',
			width: '85%',
			height: '80%',
			scrollIndicator: 'none',
			scalable: false,
			popGesture: 'none',
			scrollIndicator: 'vertical'
		}, {
			"interface_width": document.getElementById("fangan_interface_content").offsetWidth,
			"curr_month": curr_month,
			"next_month": next_month
		});
		fanganWindow.show('fade-in', 300);
	}
}

function fun_nav(img_id, span_id, src) {
	document.getElementById("img_self_home").src = 'img/zhuye_hui.png';
	document.getElementById("span_self_home").style.color = "#929292";
	document.getElementById("img_self_status").src = 'img/wenti_hui.png';
	document.getElementById("span_self_status").style.color = "#929292";
	document.getElementById("img_self_dynamic").src = 'img/dongtai_hui.png';
	document.getElementById("span_self_dynamic").style.color = "#929292";
	document.getElementById("img_self_me").src = 'img/bottom_wo_hui.png';
	document.getElementById("span_self_me").style.color = "#929292";
	document.getElementById(img_id).src = src;
	if(span_id == "span_self_home" || span_id == "span_self_dynamic") {
		document.getElementById(span_id).style.color = "#007aff";
	} else {
		document.getElementById(span_id).style.color = "#ECB100";
	}

}
//我的方案和预案	结束