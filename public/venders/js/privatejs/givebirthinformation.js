/**
 * 是否生育
 * @param {Object} type
 */
function chooseBear(type) {
	var _windowUrl;
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	userInformation.isBear = type;
	saveUserInformation(user.appid, userInformation);
	asyncSubmit('userinformation', user.appid, 'isBear', type, '');
	if(userInformation != null) {
		if(type === '未生育') {
			_windowUrl = "../emotion/emotion_list.html";
		} else if(type == '怀孕中') {
			_windowUrl = 'pregnancy_date.html';
		} else if(type == '已生育') {
			_windowUrl = 'exist_child.html';
		}
		jumpPage(_windowUrl, "slide-in-right", {}, false);
	}
}
/**
 * 确定	-	请选择您的怀孕日期
 */
function fun_pregnancy_date() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	var pregnancy_date = document.getElementById("pregnancy_date").value;
	userInformation.pregnancyDate = pregnancy_date;
	saveUserInformation(user.appid, userInformation);
	asyncSubmit('userinformation', user.appid, 'pregnancyDate', pregnancy_date, '');
	jumpPage('../emotion/emotion_list.html', "slide-in-right", {}, false);
}
/**
 * 确定	-	你是否有孩子
 * @param {Object} type
 */
function fun_exist_child(type) {
	var existChild = type;
	if(type == 1) {
		var radios = document.getElementsByName('radioBtn');
		var flag = false;
		for(var i = 0; i < radios.length; i++) {
			if(radios[i].checked) {
				flag = true;
				existChild = radios[i].value;
				break;
			}
		}
		if(!flag) {
			plus.nativeUI.toast('请选择是否有孩子！');
			return false;
		}
	}
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	userInformation.existChild = existChild || 0;
	saveUserInformation(user.appid, userInformation);
	asyncSubmit('userinformation', user.appid, 'existChild', existChild, '');
	jumpPage('../emotion/emotion_list.html', "slide-in-right", {}, false);
}