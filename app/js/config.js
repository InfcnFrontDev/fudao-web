
//var apiPath="http://192.168.3.126:18080/fudao-svc/";

var apiPath = 'http://192.168.10.69:9191/api/';
//var apiPath = 'http://103.254.113.11:8080/fudao/';
var urls={
    //生命周期
    LIFE_CYCLE: apiPath + 'app/myCycleAction!calculateCycleAndSave.action',
    //天气
    WEATHER:apiPath +'WeatherApi/getWeather',
    //文章详情
    ARTICLE_GETARTICLE:apiPath + 'ArticleApi/getArticle',
    //添加收藏
    COLLECTION_ADDMYCOLLECTION:apiPath + 'CollectionApi/addMyCollection',
    //问卷测评
    ASSESSMENT:apiPath + 'app/questionnaireAction!getQuestionByType.action',
    //计算得分
    CALCULATE_SCORE:apiPath +'app/questionnaireAction!calculateScore.action',
    //我的时间分段
    TIMEPERIOD_GETMYTIMEPERIOD:apiPath+'TimePeriodApi/getMyTimePeriod',
    //我的时间阶段
    TIMEPERIOD_GETMYTIMESTAGE:apiPath+'TimePeriodApi/getMyTimeStage',
    //通用时间分段
    TIMEPERIOD_GETGENERALTIMEPERIOD:apiPath +'TimePeriodApi/getGeneralTimePeriod',
    //通用时间阶段
    TIMEPERIODAPI_GETGENERALTIMESTAGE:apiPath+'TimePeriodApi/getGeneralTimeStage',
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
