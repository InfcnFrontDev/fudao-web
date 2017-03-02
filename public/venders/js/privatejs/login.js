/**
 * 登录页面的登录按钮功能
 */
function fun_loginButton() {
	var accountValue = document.getElementById("account").value;
	var passwordValue = document.getElementById("password").value;
	if(trim(accountValue) == "") {
		plus.nativeUI.toast('手机号不能为空');
		return false;
	}
	if(trim(accountValue).length !== 11) {
		plus.nativeUI.toast('手机号不正确');
		return false;
	}
	if(trim(passwordValue) == "") {
		plus.nativeUI.toast('密码不能为空');
		return false;
	}
	fun_login(accountValue, passwordValue, 'login');
}
/**
 *	登录功能
 */
function fun_login(accountValue, passwordValue, type) {
	//手机上设备的token/clientid
	var clientInfo = plus.push.getClientInfo();
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置');
		return false;
	}
	var w = plus.ui.createWaiting("正在登录");
	var task = plus.uploader.createUpload(ADDR + LOGIN, {
		method: "post",
		timeout: 30
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
					//账号
					var users_objs = data.obj.accountInfo;
					//本地存储
					saveUser(users_objs);
					//习惯
					var hbbit = data.obj.hbbit;
					//本地存储
					saveMyhabit(hbbit);
					//添加的健康环
					saveAddHealthRing(users_objs.appid,data.obj.addHealthRing);
					//基本信息
					var userInformation = data.obj.userInformation;
					if(userInformation != undefined) { //基本信息已经添加完成
						userInformation.img = ADDR + "uploadimg/" + userInformation.img;
						if(data.obj.userScore != null) { //是否进行了“一键查查”
							userInformation['countSocre'] = data.obj.userScore.score;
							userInformation['checkDate'] = data.obj.userScore.checkDate;
							userInformation['zhengzhuangSocre'] = data.obj.userScore.zhengzhuang;
							userInformation['xinliSocre'] = data.obj.userScore.xinli;
							userInformation['shehuiSocre'] = data.obj.userScore.shehui;
							userInformation['ziceSocre'] = data.obj.userScore.zice;
							var _myAnswer = data.obj.userScore.answers || '{}';
							saveAnswer(JSON.parse(_myAnswer));
						}
						if(userInformation.territory != undefined) {
							userInformation['territory'] = JSON.parse(userInformation['territory']);
						}
						if(userInformation.haveDisease != undefined) {
							userInformation['haveDisease'] = JSON.parse(userInformation['haveDisease']);
							userInformation['haveDiseaseBaihua'] = JSON.parse(userInformation['haveDiseaseBaihua']);
						}
						saveUserInformation(users_objs.appid, userInformation);
						var obj = plus.webview.getWebviewById("main");
						if(obj != null) {
							window.location.href = "main.html";
						} else {
							jumpPage("main.html", "none", {}, false);
						}
					} else { //没有基本信息表示第一次登录需要添写信息
						var url = 'basicinformation/baseInfo.html';
						if(type == 'reg') {
							url = "../" + url;
						}
						jumpPage(url, "none", {}, false);
					}
				} else {
					plus.nativeUI.toast('账号或密码不正确');
				}
			}
		}
	});
	task.addData("account", accountValue);
	task.addData("token", clientInfo.token);
	task.addData("clientid", clientInfo.clientid);
	task.addData("pwd", hex_md5(accountValue + passwordValue));
	task.addData("phoneSystem", plus.os.name);
	task.start();
}

function isAutoLogin() {
	var users = getUser();
	if(users != null) {
		var userInformation = getUserInformation(users.appid);
		if(userInformation != null) {
			if("yes" == userInformation.iscomplete) { //进入主页面
				jumpPage("main.html", "none", {}, false);
			} else if("yes" != userInformation.iscomplete || userInformation.iscomplete == undefined) { //进入填写资料
				jumpPage("basicinformation/userinformation_one.html", "none", {}, false);
			}
			return true;
		} else {
			jumpPage("basicinformation/baseInfo.html", "none", {}, false);
			return true;
		}
	} else if(getFirstLogin() == "1") {
		jumpPage("login.html", "none", {}, false);
		return true;
	}
	return false;
}