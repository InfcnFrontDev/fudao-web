/**
 * 初始化
 */
function init(type_name) {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	//用户信息判断版本
	var diseasespeople = '';
	if(userInformation != null) {
		diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
		if(type_name == "basicinformation") {
			document.getElementById('title').value = userInformation.title;
			if(userInformation.sex == '1') {
				document.getElementsByName('sex')[0].checked = true;
			} else if(userInformation.sex == '0') {
				document.getElementsByName('sex')[1].checked = true;
			}
			document.getElementById('birthdate').innerText = userInformation.birthdate;
			fun_assignment(document.getElementsByName("medical_history"), userInformation.medical_history);
			fun_assignment(document.getElementsByName("history_of_allergy"), userInformation.history_of_allergy);
			fun_assignment(document.getElementsByName("living_habits"), userInformation.living_habits);
			document.getElementById('tops').value = userInformation.tops;
			document.getElementById('weight').value = userInformation.weight;
			initData(diseasespeople);
			//赋值
			assignment(userInformation);
			//数据加载结束
		} else if(type_name == "baseInfo") {
			document.getElementById("sex").value = userInformation.sex;
			if(userInformation.sex == '1') {
				document.getElementById('man').style.opacity = 1;
				document.getElementById('woman').style.opacity = 0.1;
			} else if(userInformation.sex == '0') {
				document.getElementById('woman').style.opacity = 1;
				document.getElementById('man').style.opacity = 0.1;
			}
			document.getElementById('birthdate').innerText = userInformation.birthdate;
			document.getElementById("location").innerHTML = userInformation.location;
		} else if(type_name == "myinfomation") {
			//我的头像
			document.getElementById("head_img").src = userInformation.img;
			//判断图片是否存在
			mui.ajax(userInformation.img, {
				timeout: 5, //超时时间设置为10秒；
				async: false,
				error: function(xhr, type, errorThrown) {
					document.getElementById("head_img").src = "../img/xingxiang/default_Head.png";
				}
			});
			//我的姓名
			document.getElementById("my_infomation_div_title").innerText = userInformation.title;
			//性别
			document.getElementById("my_infomation_div_sex").innerText = (userInformation.sex == 1 ? "男" : "女");
			//出生日期
			document.getElementById("my_infomation_div_birthdate").innerText = userInformation.birthdate;
			//身高
			document.getElementById("my_infomation_div_tops").innerText = (userInformation.tops == "" ? "" : userInformation.tops + "CM");
			//体重
			document.getElementById("my_infomation_div_weight").innerText = (userInformation.weight == "" ? "" : userInformation.weight + "KG");
			//个人史
			document.getElementById("my_infomation_div_personal_history").innerText = (userInformation.personal_history == undefined) ? "" : userInformation.personal_history;
			//初始化	家族史
			document.getElementById("my_infomation_div_family_history").innerText = (userInformation.family_history == undefined) ? "" : userInformation.family_history;
			//初始化	婚育史
			document.getElementById("my_infomation_div_obstetrical_history").innerText = (userInformation.obstetrical_history == undefined) ? "" : userInformation.obstetrical_history;
			//初始化	用药史
			document.getElementById("my_infomation_div_medication_history").innerText = (userInformation.medication_history == undefined) ? "" : userInformation.medication_history;
			//初始化	饮食
			document.getElementById("my_infomation_div_diet").innerText = (userInformation.diet == undefined) ? "" : userInformation.diet;
			//初始化	运动
			document.getElementById("my_infomation_div_motion").innerText = (userInformation.motion == undefined) ? "" : userInformation.motion;
			//初始化	睡眠
			document.getElementById("my_infomation_div_sleep").innerText = (userInformation.sleep == undefined) ? "" : userInformation.sleep;
			//初始化	吸烟
			document.getElementById("my_infomation_div_smoke").innerText = (userInformation.smoke == undefined) ? "" : userInformation.smoke;
			//初始化	饮酒
			document.getElementById("my_infomation_div_drink").innerText = (userInformation.drink == undefined) ? "" : userInformation.drink;
			//初始化	精神状况
			document.getElementById("my_infomation_div_mental_state").innerText = (userInformation.mental_state == undefined) ? "" : userInformation.mental_state;
		} else if(type_name = "myinfomation_update") {
			//数据加载开始
			initData(diseasespeople);
		}
	}
}
/**
 * 赋值
 */
function assignment(userInformation) {
	fun_assignment(document.getElementsByName("personal_history"), userInformation.personal_history);
	fun_assignment(document.getElementsByName("family_history"), userInformation.family_history);
	fun_assignment(document.getElementsByName("obstetrical_history"), userInformation.obstetrical_history);
	fun_assignment(document.getElementsByName("medication_history"), userInformation.medication_history);
	fun_assignment(document.getElementsByName("diet"), userInformation.diet);
	fun_assignment(document.getElementsByName("motion"), userInformation.motion);
	fun_assignment(document.getElementsByName("sleep"), userInformation.sleep);
	fun_assignment(document.getElementsByName("smoke"), userInformation.smoke);
	fun_assignment(document.getElementsByName("drink"), userInformation.drink);
	fun_assignment(document.getElementsByName("mental_state"), userInformation.mental_state);
}
/**
 * 根据用户性别和年龄（出生日期）获取病史、生活习惯和精神状态数据
 * @param {Object} sex
 * @param {Object} birthdate
 */
function fun_checkVersion(type) {
	var _sex = "";
	if(type == 1) {
		var sex = document.getElementsByName('sex');
		if(sex[0].checked) {
			_sex = sex[0].value;
		} else if(sex[1].checked) {
			_sex = sex[1].value;
		}
	} else {
		_sex = document.getElementById("sex").value;
	}
	var birthdate = document.getElementById('birthdate').innerText;
	if(_sex != "" && birthdate != "请选择日期" && type == 1) {
		//清空	个人史	
		document.getElementById("_personal_history").innerHTML = "";
		//清空	家族史	
		document.getElementById("_family_history").innerHTML = "";
		//清空	婚育史	
		document.getElementById("_obstetrical_history").innerHTML = "";
		//清空	用药史	
		document.getElementById("_medication_history").innerHTML = "";
		//清空	饮食	
		document.getElementById("_diet").innerHTML = "";
		//清空	运动	
		document.getElementById("_motion").innerHTML = "";
		//清空	睡眠	
		document.getElementById("_sleep").innerHTML = "";
		//清空	吸烟	
		document.getElementById("_smoke").innerHTML = "";
		//清空	饮酒	
		document.getElementById("_drink").innerHTML = "";
		//清空	精神状况	
		document.getElementById("_mental_state").innerHTML = "";
		var diseasespeople = chooseVersion(_sex, birthdate);
		initData(diseasespeople);
	}
}

/**
 * 保存基本信息（性别、出生日期、我的位置）
 * @param {Object} type
 */
function fun_saveBaseInfo(type) {
	var sex = document.getElementById('sex').value;
	if(sex == "") {
		plus.nativeUI.toast('请选择性别');
		return false;
	}
	var birthdate = document.getElementById('birthdate').innerText;
	if(birthdate == "请选择日期") {
		plus.nativeUI.toast('请选择出生日期');
		return false;
	}
	var location = document.getElementById('location').innerText;
	if(location == "" || location == "定位中...") {
		plus.nativeUI.toast('请选择您的位置');
		return false;
	}
	var user = getUser();
	var userInformation = getUserInformation(user.appid) || {};
	userInformation.appid = user.appid;
	userInformation.sex = sex || '';
	userInformation.birthdate = birthdate || '';
	userInformation.location = location || '';
	userInformation.tops = '';
	userInformation.bmi = '';
	userInformation.weight = '';
	userInformation.title = '';
	// 个人史
	userInformation.personal_history = '';
	// 家族史
	userInformation.family_history = '';
	// 婚育史
	userInformation.obstetrical_history = '';
	// 用药史
	userInformation.medication_history = '';
	// 饮食
	userInformation.diet = '';
	// 运动
	userInformation.motion = '';
	// 睡眠
	userInformation.sleep = '';
	// 吸烟
	userInformation.smoke = '';
	// 饮酒
	userInformation.drink = '';
	// 精神状况
	userInformation.mental_state = '';
	if(type == 1) {
		jumpPage('userinformation_one.html', "none", {}, false);
		//修改完成保存
		saveUserInformation(user.appid, userInformation);
	} else {
		//修改完成保存
		userInformation.iscomplete = "yes";
		saveUserInformation(user.appid, userInformation);
		var w = plus.ui.createWaiting("提交中...");
		mui.ajax(ADDR + USERINFORMATION, {
			data: {
				jsonStr: JSON.stringify(userInformation),
				ishealthRing: "yes",
				appid: user.appid,
				city: localStorage.getItem('areaPosition') || "北京"
			},
			dataType: 'json', //服务器返回json格式数据
			timeout: 60000,
			type: 'post', //HTTP请求类型
			success: function(data) {
				if(data.success) {
					w.close();
					//习惯
					var hbbit = data.obj.hbbit;
					//本地存储
					saveMyhabit(hbbit);
					jumpPage('../main.html', "slide-in-right", {}, false);
				}
			},
			error: function() {
				w.close();
				plus.nativeUI.toast('服务异常，请稍候重试...');
			}
		});
	}
}
/**
 * 基本信息保存
 */
function basicInfo() {
	// 关闭软键盘
	document.activeElement.blur();
	var titleBox = document.getElementById('title');
	var sexBox = "";
	var sex = document.getElementsByName('sex');
	if(sex[0].checked) {
		sexBox = sex[0].value;
	} else if(sex[1].checked) {
		sexBox = sex[1].value;
	}
	var birthdateBox = document.getElementById('birthdate');
	// 个人史
	var personal_history = document.getElementsByName("personal_history");
	// 家族史
	var family_history = document.getElementsByName("family_history");
	// 婚育史
	var obstetrical_history = document.getElementsByName("obstetrical_history");
	// 用药史
	var medication_history = document.getElementsByName("medication_history");
	// 饮食
	var diet = document.getElementsByName("diet");
	// 运动
	var motion = document.getElementsByName("motion");
	// 睡眠
	var sleep = document.getElementsByName("sleep");
	// 吸烟
	var smoke = document.getElementsByName("smoke");
	// 饮酒
	var drink = document.getElementsByName("drink");
	// 精神状况
	var mental_state = document.getElementsByName("mental_state");
	var topsBox = document.getElementById('tops');
	var weightBox = document.getElementById('weight');
	if(sexBox == "") {
		plus.nativeUI.toast('请选择性别');
		return false;
	}
	if(birthdateBox.innerText == "请选择日期") {
		plus.nativeUI.toast('请选择出生日期');
		return false;
	}
	var user = getUser();
	var userInformation = getUserInformation(user.appid) || {};
	userInformation.title = titleBox.value || '';
	userInformation.sex = sexBox || '';
	userInformation.birthdate = birthdateBox.innerText || '';
	// 个人史
	userInformation.personal_history = fun_get_data(personal_history);
	// 家族史
	userInformation.family_history = fun_get_data(family_history);
	// 婚育史
	userInformation.obstetrical_history = fun_get_data(obstetrical_history);
	// 用药史
	userInformation.medication_history = fun_get_data(medication_history);
	// 饮食
	userInformation.diet = fun_get_data(diet);
	// 运动
	userInformation.motion = fun_get_data(motion);
	// 睡眠
	userInformation.sleep = fun_get_data(sleep);
	// 吸烟
	userInformation.smoke = fun_get_data(smoke);
	// 饮酒
	userInformation.drink = fun_get_data(drink);
	// 精神状况
	userInformation.mental_state = fun_get_data(mental_state);
	userInformation.tops = topsBox.value || '';
	userInformation.bmi = '';
	userInformation.weight = weightBox.value || '';
	userInformation.iscomplete = "yes";
	saveUserInformation(user.appid, userInformation);
	jumpPage("../informationwrite/checkinfo.html", "slide-in-right", {}, false);
}
/**
 * 根据版本初始化病史、生活习惯和精神状态数据
 * @param {Object} type
 */
function initData(type) {
	if(type == "woman") {
		//初始化	个人史	
		var list = document.getElementById("_personal_history");
		list.appendChild(fun_data(common_woman_personal_history, 'personal_history'));
		//初始化	家族史	
		var list = document.getElementById("_family_history");
		list.appendChild(fun_data(common_woman_family_history, 'family_history'));
		//初始化	婚育史	
		var list = document.getElementById("_obstetrical_history");
		list.appendChild(fun_data(common_woman_obstetrical_history, 'obstetrical_history'));
		//初始化	用药史	
		var list = document.getElementById("_medication_history");
		list.appendChild(fun_data(common_woman_medication_history, 'medication_history'));
		//初始化	饮食	
		var list = document.getElementById("_diet");
		list.appendChild(fun_data(common_woman_diet, 'diet'));
		//初始化	运动	
		var list = document.getElementById("_motion");
		list.appendChild(fun_data(common_woman_motion, 'motion'));
		//初始化	睡眠	
		var list = document.getElementById("_sleep");
		list.appendChild(fun_data(common_woman_sleep, 'sleep'));
		//初始化	吸烟	
		var list = document.getElementById("_smoke");
		list.appendChild(fun_data(common_woman_smoke, 'smoke'));
		//初始化	饮酒	
		var list = document.getElementById("_drink");
		list.appendChild(fun_data(common_woman_drink, 'drink'));
		//初始化	精神状况	
		var list = document.getElementById("_mental_state");
		list.appendChild(fun_data(common_woman_mental_state, 'mental_state'));
	} else if(type == 'aged') {
		//初始化	个人史	
		var list = document.getElementById("_personal_history");
		list.appendChild(fun_data(common_personal_history, 'personal_history'));
		//初始化	家族史	
		var list = document.getElementById("_family_history");
		list.appendChild(fun_data(common_family_history, 'family_history'));
		//初始化	婚育史	
		var list = document.getElementById("_obstetrical_history");
		list.appendChild(fun_data(common_obstetrical_history, 'obstetrical_history'));
		//初始化	用药史	
		var list = document.getElementById("_medication_history");
		list.appendChild(fun_data(common_medication_history, 'medication_history'));
		//初始化	饮食	
		var list = document.getElementById("_diet");
		list.appendChild(fun_data(common_diet, 'diet'));
		//初始化	运动	
		var list = document.getElementById("_motion");
		list.appendChild(fun_data(common_motion, 'motion'));
		//初始化	睡眠	
		var list = document.getElementById("_sleep");
		list.appendChild(fun_data(common_sleep, 'sleep'));
		//初始化	吸烟	
		var list = document.getElementById("_smoke");
		list.appendChild(fun_data(common_smoke, 'smoke'));
		//初始化	饮酒	
		var list = document.getElementById("_drink");
		list.appendChild(fun_data(common_drink, 'drink'));
		//初始化	精神状况	
		var list = document.getElementById("_mental_state");
		list.appendChild(fun_data(common_mental_state, 'mental_state'));
	} else if(type == 'high_quality_population') {
		//初始化	个人史	
		var list = document.getElementById("_personal_history");
		list.appendChild(fun_data(common_high_quality_population_personal_history, 'personal_history'));
		//初始化	家族史	
		var list = document.getElementById("_family_history");
		list.appendChild(fun_data(common_high_quality_population_family_history, 'family_history'));
		//初始化	婚育史	
		var list = document.getElementById("_obstetrical_history");
		list.appendChild(fun_data(common_high_quality_population_obstetrical_history, 'obstetrical_history'));
		//初始化	用药史	
		var list = document.getElementById("_medication_history");
		list.appendChild(fun_data(common_high_quality_population_medication_history, 'medication_history'));
		//初始化	饮食	
		var list = document.getElementById("_diet");
		list.appendChild(fun_data(common_high_quality_population_diet, 'diet'));
		//初始化	运动	
		var list = document.getElementById("_motion");
		list.appendChild(fun_data(common_high_quality_population_motion, 'motion'));
		//初始化	睡眠	
		var list = document.getElementById("_sleep");
		list.appendChild(fun_data(common_high_quality_population_sleep, 'sleep'));
		//初始化	吸烟	
		var list = document.getElementById("_smoke");
		list.appendChild(fun_data(common_high_quality_population_smoke, 'smoke'));
		//初始化	饮酒	
		var list = document.getElementById("_drink");
		list.appendChild(fun_data(common_high_quality_population_drink, 'drink'));
		//初始化	精神状况	
		var list = document.getElementById("_mental_state");
		list.appendChild(fun_data(common_high_quality_population_mental_state, 'mental_state'));
	}
}

/**
 * 基本信息
 */
function fun_myinfomation(obj) {
	var user = getUser();
	var _id = obj.children[0].getAttribute("update_id");
	var _title = obj.children[0].innerText;
	var _value = "";
	if("div_tops" == _id) { //身高
		_value = (obj.children[1].innerText + "").replace("CM", "");
	} else if("div_weight" == _id) { //体重
		_value = (obj.children[1].innerText + "").replace("KG", "");
	} else {
		_value = obj.children[1].innerText;
	}
	var json = {
		'appid': user.appid,
		'_id': _id,
		'_value': _value,
		'_title': _title
	}
	jumpPage("myinfomation_update.html", "slide-in-right", json, false);
}
/**
 * 进入主页后 进入我的基本信息	-	赋值
 */
function info_data_assignment() {
	var selfWebview = plus.webview.currentWebview();
	document.getElementById("title_show").innerText = selfWebview._title;
	var divObj = document.getElementById(selfWebview._id);
	divObj.style.display = "block";
	if("div_personal_history" == selfWebview._id) {
		fun_assignment(document.getElementsByName("personal_history"), selfWebview._value);
	} else if("div_family_history" == selfWebview._id) {
		fun_assignment(document.getElementsByName("family_history"), selfWebview._value);
	} else if("div_obstetrical_history" == selfWebview._id) {
		fun_assignment(document.getElementsByName("obstetrical_history"), selfWebview._value);
	} else if("div_medication_history" == selfWebview._id) {
		fun_assignment(document.getElementsByName("medication_history"), selfWebview._value);
	} else if("div_diet" == selfWebview._id) {
		fun_assignment(document.getElementsByName("diet"), selfWebview._value);
	} else if("div_motion" == selfWebview._id) {
		fun_assignment(document.getElementsByName("motion"), selfWebview._value);
	} else if("div_sleep" == selfWebview._id) {
		fun_assignment(document.getElementsByName("sleep"), selfWebview._value);
	} else if("div_smoke" == selfWebview._id) {
		fun_assignment(document.getElementsByName("smoke"), selfWebview._value);
	} else if("div_drink" == selfWebview._id) {
		fun_assignment(document.getElementsByName("drink"), selfWebview._value);
	} else if("div_mental_state" == selfWebview._id) {
		fun_assignment(document.getElementsByName("mental_state"), selfWebview._value);
	} else {
		divObj.children[1].value = selfWebview._value;
	}
}
/**
 * 头像上传
 */
function fun_head_upload() {
	var a = [{
		title: "拍照"
	}, {
		title: "从手机相册选择"
	}];
	plus.nativeUI.actionSheet({
		cancel: "取消",
		buttons: a
	}, function(b) {
		switch(b.index) {
			case 1:
				getPictures();
				break;
			case 2:
				getAlbums();
				break;
			default:
				break
		}
	});
	event.stopPropagation();
}

/**
 * 进入主页后 进入我的基本信息	修改单个页面的值
 */
function fun_div_save() {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	var selfWebview = plus.webview.currentWebview();
	var divObj = document.getElementById(selfWebview._id);
	var _value = "";
	if("div_personal_history" == selfWebview._id) {
		_value = fun_get_data(document.getElementsByName("personal_history"));
	} else if("div_family_history" == selfWebview._id) {
		_value = fun_get_data(document.getElementsByName("family_history"));
	} else if("div_obstetrical_history" == selfWebview._id) {
		_value = fun_get_data(document.getElementsByName("obstetrical_history"));
	} else if("div_medication_history" == selfWebview._id) {
		_value = fun_get_data(document.getElementsByName("medication_history"));
	} else if("div_diet" == selfWebview._id) {
		_value = fun_get_data(document.getElementsByName("diet"));
	} else if("div_motion" == selfWebview._id) {
		_value = fun_get_data(document.getElementsByName("motion"));
	} else if("div_sleep" == selfWebview._id) {
		_value = fun_get_data(document.getElementsByName("sleep"));
	} else if("div_smoke" == selfWebview._id) {
		_value = fun_get_data(document.getElementsByName("smoke"));
	} else if("div_drink" == selfWebview._id) {
		_value = fun_get_data(document.getElementsByName("drink"));
	} else if("div_mental_state" == selfWebview._id) {
		_value = fun_get_data(document.getElementsByName("mental_state"));
	} else {
		_value = divObj.children[1].value
	}
	var main = selfWebview.opener();
	mui.fire(main, "myinfomation_update", {
		"status": "myinfomation_update",
		"_id": "my_infomation_" + selfWebview._id,
		"_value": _value,
	});

	var userInformation = getUserInformation(selfWebview.appid);
	userInformation[(selfWebview._id + "").replace("div_", "")] = _value;
	saveUserInformation(selfWebview.appid, userInformation);
	plus.nativeUI.toast('保存完成');
	//异步提交
	asyncSubmit("userinformation", selfWebview.appid, selfWebview._id, _value);
	reback();
}
///////////////////////病史，过敏史，生活习惯/////////////////////////////
//病史，过敏史，生活习惯数据加载
function fun_data(data, name) {
	var fragment = document.createDocumentFragment();
	for(var i = 0; i < data.length; i++) {
		var li = document.createElement('div');
		li.className = 'mui-input-row mui-checkbox';
		li.innerHTML = '<label>' + data[i] + '</label><input name="' + name + '" value="' + data[i] + '" type="checkbox">';
		fragment.appendChild(li);
	}
	return fragment;
};
//病史，过敏史，生活习惯数据赋值
function fun_assignment(documents, values) {
	if(values != undefined && values != null) {
		var arr = values.split(",");
		for(var i = 0; i < arr.length; i++) {
			for(var j = 0; j < documents.length; j++) {
				if(arr[i] == documents[j].value) {
					documents[j].setAttribute("checked", "checked");
				}
			}
		}
	}
};
//病史，过敏史，生活习惯获取数据
function fun_get_data(data) {
	var temp = "";
	for(var i = 0; i < data.length; i++) {
		if(data[i].checked) {
			if("" == temp) {
				temp = data[i].value;
			} else {
				temp += "," + data[i].value;
			}
		}
	}
	return temp;
}
/**
 * 拍照
 */
function getPictures() {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var s = entry.toLocalURL();
			saveImg(s);
		});
	})
}
/**
 * 拍照
 */
function getAlbums() {
	plus.gallery.pick(function(path) {
		saveImg(path);
	}, function(e) {}, {
		filter: "image"
	});
};
/**
 * 保存头像
 * @param {Object} src
 */
var img_update = 0; //图片是否修改标实
function saveImg(src) {
	img_update = 1;
	var imgMsg = plus.ui.createWaiting("正在向服务器上传图片，请等待...");
	var img = new Image();
	img.src = src; // 传过来的图片路径在这里用。
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	userInformation.img = src;
	saveUserInformation(user.appid, userInformation);
	img.onload = function() {
		var that = this;
		//生成比例 
		var w = that.width,
			h = that.height,
			scale = w / h;
		w = 240 || w; //480  你想压缩到多大，改这里
		h = w / scale;
		//生成canvas
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = w;
		canvas.height = h;
		ctx.drawImage(that, 0, 0, w, h);
		var base64 = canvas.toDataURL('image/jpeg', 1 || 0.8); //1最清晰，越低越模糊。\
		var task = plus.uploader.createUpload(ADDR + HEADPORTRAIT, {
			method: "post",
			timeout: 120, //上传任务超时时间
			blocksize: base64.length
		}, function(t, status) {
			if(t.responseText != '') {
				var obj = JSON.parse(t.responseText);
				if(obj.success) {
					var _imgPath = ADDR + "uploadimg" + obj.msg + "?version=" + new Date().getTime();
					document.getElementById("head_img").src = _imgPath;
					var _bigImg = document.getElementById("__mui_img");
					if(_bigImg != null) {
						_bigImg.src = _imgPath;
					}
				}
				imgMsg.close();
				var wv = plus.webview.getWebviewById("main");
				mui.fire(wv, "me_renti", {
					_imgPath: _imgPath
				});
			}
		});
		task.addData("jsonStr", base64)
		task.addData("appid", user.appid)
		task.addData("random", random().replace("?random=", ""))
		task.setRequestHeader('contentType', 'application/x-www-form-urlencoded; charset=utf-8');
		task.start();
	}
}
/**
 * 弹出头像
 */
function initImgPreview() {
	if(document.getElementById("__mui_img") != null) {
		document.getElementById("__mui_img").src = document.getElementById("head_img").src;
	} else {
		var imgs = document.querySelectorAll("#head_img");
		imgs = mui.slice.call(imgs);
		if(imgs && imgs.length > 0) {
			var slider = document.createElement("div");
			slider.setAttribute("id", "__mui-imageview__");
			slider.classList.add("mui-slider");
			slider.classList.add("mui-fullscreen");
			slider.addEventListener("tap", function() {
				slider.style.display = "none";
			});
			slider.addEventListener("touchmove", function(event) {
				event.preventDefault();
			})
			var slider_group = document.createElement("div");
			slider_group.setAttribute("id", "__mui-imageview__group");
			slider_group.classList.add("mui-slider-group");
			imgs.forEach(function(value, index, array) {
				//给图片添加点击事件，触发预览显示；
				value.addEventListener('tap', function() {
					slider.style.display = "block";
					_slider.refresh();
					_slider.gotoItem(index, 0);
				})
				var item = document.createElement("div");
				item.classList.add("mui-slider-item");
				var a = document.createElement("a");
				var img = document.createElement("img");
				img.setAttribute("id", "__mui_img");
				img.setAttribute("src", value.src);
				a.appendChild(img)
				item.appendChild(a);
				slider_group.appendChild(item);
			});
			slider.appendChild(slider_group);
			document.body.appendChild(slider);
			var _slider = mui(slider).slider();
		}
	}
}