
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

    //获取通用时间段
    TIMEPERIODAPI_GETGENERALTIMESTAGE:apiPath+'TimePeriodApi/getGeneralTimeStage',
    //获取全天的运动列表
    TIMEPERIODA_GETALLDAYMOTIONLIST:apiPath+'TimePeriodApi/getAllDayMotionList',
    //获取我的时间段
    TIMEPERIOD_GETMYTIMESTAGE:apiPath+'TimePeriodApi/getMyTimeStage',
    //获取时间段的推荐疗法
    TIMEPERIOD_GETTIMESTAGETHERAPYLIST:apiPath+'TimePeriodApi/getTimeStageTherapyList'
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
