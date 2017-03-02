/**
 * /注册前验证手机
 */
function fun_regOne() {
	var accountValue = document.getElementById("account").value;
	if(trim(accountValue) == "") {
		plus.nativeUI.toast('手机号不能为空')
		return false;
	}
	if(trim(accountValue).length !== 11) {
		plus.nativeUI.toast('手机号不正确')
		return false;
	}
	var btnArray, _index;
	if("Android".indexOf(plus.os.name) != -1) {
		btnArray = ['取消', '好'];
		_index = 0;
	} else {
		btnArray = ['好', '取消'];
		_index = 1;
	}
	mui.confirm('我们将发送验证码短信到这个手机号\r\n\t\t\t\t\t\t\t+86 ' + accountValue.replace(accountValue.substr(3), "********"), '确认手机号码', btnArray, function(e) {
		if(btnArray[e.index] == '好') {
			fun_getCode(document.getElementById("account"), "reg");
		}
	});
}
// 注册获取短信验证码

//获取验证码
function fun_getCode(obj, _type) {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置');
		return false;
	}
	var w = plus.ui.createWaiting("正在获取验证码");
	mui.ajax(ADDR + CHECKPHONE, {
		data: {
			phone: obj.value,
			type: _type
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 5000,
		async: false,
		success: function(data) {
			w.close();
			if(data.success && "existence" == data.msg) {
				plus.nativeUI.toast('手机号已被注册');
				document.activeElement.blur();
			} else if(data.success && "existence" != data.msg) {
				jumpPage("register_two.html", "none", {
					'phone': obj.value
				}, false);
			}
		},
		error: function(xhr, type, errorThrown) {
			w.close();
			//异常处理；
			plus.nativeUI.toast('服务器出现异常，请重试');
		}
	});
}
// 注册
function fun_regBefore() {
	var accountValue = document.getElementById("account").value;
	var codeValue = document.getElementById("code").value;
	if(trim(codeValue) == "") {
		plus.nativeUI.toast('验证码不能为空')
		return false;
	}
	if(trim(codeValue).length !== 6) {
		plus.nativeUI.toast('请输入六位数字')
		return false;
	}
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置');
		return false;
	}
	var w = plus.ui.createWaiting("注册中...");
	mui.ajax(ADDR + REGBEFORE, {
		data: {
			"account": accountValue,
			"code": codeValue,
			"type": "reg"
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			w.close();
			if(data.success) {
				var _json = {
					"phone": accountValue
				};
				jumpPage("register_three.html", "slide-in-left", _json, false);
			} else {
				document.activeElement.blur();
				plus.nativeUI.toast('验证码错误');
			}
		},
		error: function(xhr, type, errorThrown) {
			w.close();
			//异常处理；
			plus.nativeUI.toast('服务器出现异常，请重试');
		}
	});
}

function fun_reg(_phone) {
	var passwordValue = document.getElementById("password").value;
	var password_confirmValue = document.getElementById("password_confirm").value;
	if(passwordValue.length < 6) {
		plus.nativeUI.toast('密码最短需要 6 个字符')
		return false;
	}
	if(passwordValue != password_confirmValue) {
		plus.nativeUI.toast('密码两次输入不一致');
		return false;
	}
	var w = plus.ui.createWaiting("注册成功");
	mui.ajax(ADDR + REG, {
		data: {
			"appid": plus.device.uuid + Math.floor(Math.random() * 100000000 + 10000000).toString(),
			"account": _phone,
			"pwd": hex_md5(_phone + passwordValue)
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			w.close();
			if(data.success) {
				plus.nativeUI.toast('注册完成，请登录...');
				setTimeout(function() {
					if(plus.webview.getWebviewById('register_two'))
						plus.webview.getWebviewById('register_two').close();
				}, 500);
				jumpPage("auto_login.html", "none", {
					"_name": _phone,
					"_pwd": passwordValue
				}, false);
			}
		},
		error: function(xhr, type, errorThrown) {
			w.close();
			//异常处理；
			plus.nativeUI.toast('服务器出现异常，请重试');
		}
	});
}