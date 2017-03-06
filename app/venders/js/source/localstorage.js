//是否第一次登录开始----------------------------------------------------------
function getFirstLogin() {
	var users = localStorage.getItem('firstLogin') || null;
	return users;
}

function saveFirstLogin(info) {
	localStorage.setItem('firstLogin', info);
}
//是否第一次登录结束----------------------------------------------------------
//默认心情开始----------------------------------------------------------
function getNowMood() {
	var nowmood = JSON.parse(localStorage.getItem('nowmood') || null);
	return nowmood;
}

function saveNowMood(info) {
	localStorage.setItem('nowmood', JSON.stringify(info));
}
//默认心情结束----------------------------------------------------------
//Account开始----------------------------------------------------------
//查询账户信息
function getUser() {
	var users = JSON.parse(localStorage.getItem('$users') || null);
	return users;
}
//保存账户信息
function saveUser(userInfo) {
	localStorage.setItem('$users', JSON.stringify(userInfo));
}
//Account结束----------------------------------------------------------

//UserInformation开始--------------------------------------------------
//ID获得填写信息
function getUserInformation(id) {
	var userinformation = JSON.parse(localStorage.getItem(id) || null);
	if(userinformation != null) {
		return userinformation;
	} else {
		return null;
	}
}
//保存填写信息
function saveUserInformation(id, userinformation) {
	localStorage.setItem(id, JSON.stringify(userinformation));
}
//UserInformation结束--------------------------------------------------

//myHealthRing开始-----------------------------------------------------
//保存	我的健康环数据
function saveHealthRing(id, healthRing) {
	localStorage.setItem("hr" + id, JSON.stringify(healthRing));
}

//获取	我的健康环数据
function getHealthRing(id) {
	var healthRing = JSON.parse(localStorage.getItem("hr" + id)) || {};
	return healthRing;
}
//保存	添加的健康环
function saveAddHealthRing(id, healthRing) {
	localStorage.setItem("addhr" + id, JSON.stringify(healthRing));
}

//获取	添加的健康环
function getAddHealthRing(id) {
	var healthRing = JSON.parse(localStorage.getItem("addhr" + id) || null);
	return healthRing;
}
//myHealthRing结束-----------------------------------------------------

//定时弹出情绪窗口
function getTimingEmotion() {
	var emotion = JSON.parse(localStorage.getItem("timing") || null);
	return emotion;
}
//定时弹出情绪窗口
function saveTimingEmotion(date) {
	//本地存储
	localStorage.setItem("timing", date);
}
//MonitorInfo开始-----------------------------------------------------

//保存	健康监控信息
function saveMonitorInfo(id, monitorInfo) {
	//本地存储
	localStorage.setItem("mi" + id, JSON.stringify(monitorInfo));
}

//获取	健康监控信息
function getMonitorInfo(id) {
	var monitorInfo = JSON.parse(localStorage.getItem("mi" + id) || null);
	return monitorInfo;
}
//MonitorInfo结束-----------------------------------------------------

//answer开始-----------------------------------------------------
//保存	答案
function saveAnswer(answer) {
	//本地存储
	localStorage.setItem("answer", JSON.stringify(answer));
}
//获取	答案
function getAnswer() {
	var answer = JSON.parse(localStorage.getItem("answer")) || {};
	return answer;
}
//answer结束-----------------------------------------------------

//myhabit开始-----------------------------------------------------
//保存	习惯
function saveMyhabit(myhabit) {
	var segmentTime = {};
	for(var _h in myhabit) {
		var childrenTimes = myhabit[_h].childrenTimes;
		for(var _c in childrenTimes) {
			segmentTime[childrenTimes[_c].name] = childrenTimes[_c].startTime;
			segmentTime[childrenTimes[_c].startTime] = childrenTimes[_c].name;
		}
	}
	//保存分段时间
	saveSegmentTime(segmentTime);

	//本地存储
	localStorage.setItem("myhabit", JSON.stringify(myhabit));
}
//获取	习惯
function getMyhabit() {
	var myhabit = JSON.parse(localStorage.getItem("myhabit")) || {};
	return myhabit;
}
//myhabit结束-----------------------------------------------------

//保存	分段时间
function saveSegmentTime(segmentTime) {
	//本地存储
	localStorage.setItem("segmentTime", JSON.stringify(segmentTime));
}
//获取	分段时间
function getSegmentTime() {
	var segmentTime = JSON.parse(localStorage.getItem("segmentTime")) || {};
	return segmentTime;
}
//myhabit结束-----------------------------------------------------

//保存	养一养一天查询一次。当自查的时候养就养就需要重新查询
function getTimingYangYiYang() {
	var emotion = JSON.parse(localStorage.getItem("TimingYangYiYang") || null);
	return emotion;
}
//获取 养一养一天查询一次。当自查的时候养就养就需要重新查询
function saveTimingYangYiYang(date) {
	//本地存储
	localStorage.setItem("TimingYangYiYang", date);
}

//Shicai_yinshi-----------------------------------------------------
//保存	食材--饮食
function saveShicai_yinshi(id, shicai_yinshi) {
	localStorage.setItem("shicai_yinshi" + id, JSON.stringify(shicai_yinshi));
}
//获取	食材--饮食
function getShicai_yinshi(id) {
	var shicai_yinshi = JSON.parse(localStorage.getItem("shicai_yinshi" + id)) || {};
	return shicai_yinshi;
}
//Shicai_yinshi-----------------------------------------------------
//方案预案饮食--开始---------------------------------------------------
function savefangan_yinshi(id, key, fangan_yinshi) {
	localStorage.setItem("fangan_yinshi" + id + key, JSON.stringify(fangan_yinshi));
}
//获取	食材--饮食
function getfangan_yinshi(id, key) {
	var fangan_yinshi = JSON.parse(localStorage.getItem("fangan_yinshi" + id + key)) || {};
	return fangan_yinshi;
}
//方案预案饮食--结束---------------------------------------------------

//运动需要过滤重复的部位 开始
function saveNotInPosition(position) {
	localStorage.setItem("notInposition", position);
}
function getNotInPosition() {
	return localStorage.getItem("notInposition");
}
//运动需要过滤重复的部位 结束