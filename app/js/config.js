// var apiPath = 'http://103.254.113.11:8080/fudao-svc/app/';
// var apiPath = 'http://192.168.10.69:8080/fudao-svc/app/';
var apiPath="http://192.168.3.126:18080/fudao-svc/app/";
var urls = {
	//生命周期
	LIFE_CYCLE: apiPath + 'myCycleAction!calculateCycleAndSave.action',
	//天气
	WEATHER: apiPath + 'weatherAction!getWeather.action',
	//文章详情
	ARTICLA_DETAIL: apiPath + 'myTerritoryAction!detail.action',
	//添加收藏
	ADD_COLLECT: apiPath + 'collectionAction!addMyCollection.action',
	//问卷测评
	ASSESSMENT: apiPath + 'questionnaireAction!getQuestionByType.action',
	//计算得分
	CALCULATE_SCORE: apiPath + 'questionnaireAction!calculateScore.action',
	//个人习惯（时间段）
	MYHABIT: apiPath + 'accountInfoAction!getMyHabit.action'
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
