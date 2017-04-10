
//var apiPath="http://192.168.3.126:18080/fudao-svc/";

var apiPath = 'http://192.168.10.69:8080/fudao-svc/';
//var apiPath = 'http://103.254.113.11:8080/fudao/';
var urls={
    //生命周期
    LIFE_CYCLE: apiPath + 'app/myCycleAction!calculateCycleAndSave.action',
    //天气
    WEATHER:apiPath +'/app/weatherAction!getWeather.action',
    //文章详情
    ARTICLA_DETAIL:apiPath + 'app/myTerritoryAction!detail.action',
    //添加收藏
    ADD_COLLECT:apiPath + 'app/collectionAction!addMyCollection.action',
    //问卷测评
    ASSESSMENT:apiPath + 'app/questionnaireAction!getQuestionByType.action',
    //计算得分
    CALCULATE_SCORE:apiPath +'app/questionnaireAction!calculateScore.action',
    //个人习惯（时间段）
    MYHABIT:apiPath +'app/accountInfoAction!getMyHabit.action'
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
