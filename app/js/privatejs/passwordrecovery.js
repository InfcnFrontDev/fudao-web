/**
 * /密码找回前验证手机
 */
function fun_passwordrecoveryBefore() {
	var accountValue = document.getElementById("account").value;
	var codeValue = document.getElementById("code").value;
	if (trim(accountValue) == "") {
		plus.nativeUI.toast('手机号不能为空')
		return false;
	}
	if (trim(accountValue).length !== 11) {
		plus.nativeUI.toast('手机号不正确')
		return false;
	}
	if (trim(codeValue) == "") {
		plus.nativeUI.toast('验证码不能为空')
		return false;
	}
	if (trim(codeValue).length !== 6) {
		plus.nativeUI.toast('请输入六位数字')
		return false;
	}
	if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置');
		return false;
	}
	var w = plus.ui.createWaiting("确认中...");
	mui.ajax(ADDR + REGBEFORE, {
		data: {
			"account": accountValue,
			"code": codeValue,
			"type": "findPwd"
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			w.close();
			if (data.success) {
				var _json = {
					"phone": accountValue
				};
				jumpPage("passwordrecovery_two.html", "slide-in-right", _json, false);
			} else {
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

function fun_passwordrecovery(_phone) {
	var passwordValue = document.getElementById("password").value;
	var password_confirmValue = document.getElementById("password_confirm").value;
	if (passwordValue.length < 6) {
		plus.nativeUI.toast('密码最短需要 6 个字符1')
		return false;
	}
	if (passwordValue != password_confirmValue) {
		plus.nativeUI.toast('密码两次输入不一致');
		return false;
	}
	var w = plus.ui.createWaiting("密码找回成功");
	mui.ajax(ADDR + PWDRECOVERY, {
		data: {
			"phone": _phone,
			"pwd": hex_md5(_phone + passwordValue)
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			w.close();
			if (data.success) {
				plus.nativeUI.toast('密码修改完成，请登录...');
				setTimeout(function() {
					plus.webview.getWebviewById('passwordrecovery_two').close();
				}, 500);
				jumpPage("../login.html", "none", {}, false);
			}
		},
		error: function(xhr, type, errorThrown) {
			w.close();
			//异常处理；
			plus.nativeUI.toast('服务器出现异常，请重试');
		}
	});
}