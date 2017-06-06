/**
 * Created by lim on 2017/4/20.
 */
// 能量场部分数据得分
/**
 * 获取当前定位得分
 */
function getLocationScore(city_){
    var v = {
        "北京":95,"上海":95,"广州":95,"深圳":95,
        "成都市":75,"杭州市":75,"武汉市":75,"天津市":75,"南京市":75,"重庆市":75,"西安市":75, "长沙市":75,
        "青岛市":75,"沈阳市":75,"大连市":75,"厦门市":75,"苏州市":75,"宁波市":75,"无锡市":75,
        "福州市":55,"合肥市":55,"郑州市":55,"哈尔滨":55,"佛山市":55,"济南市":55,"东莞市":55,"昆明市":55,
        "太原市":55,"南昌市":55,"南宁市":55,"温州市":55,"石家庄市":55,"长春市":55,"泉州市":55,"贵阳市":55,
        "常州市":55,"珠海市":55,"金华市":55,"烟台市":55,"海口市":55,"惠州市":55,"乌鲁木齐市":55,"徐州市":55,
        "嘉兴市":55,"潍坊市":55,"洛阳市":55,"南通市":55,"扬州市":55,"汕头市":55,
        "其它":35};
    if(undefined == v[city_]) return "35";
    return v[city_];
}

/**
 * 获取雨得分
 */
function getRainScore(weather){
    if (weather.indexOf("小雨-中雨") != -1){
        return 54;
    } else if (weather.indexOf("中雨-大雨") != -1){
        return 34;
    } else if (weather.indexOf("大雨-暴雨") != -1){
        return 18;
    } else if (weather.indexOf("暴雨-大暴雨") != -1){
        return 2;
    } else if (weather.indexOf("大暴雨-特大暴雨") != -1){
        return 1;
    } else if (weather.indexOf("雷阵雨有冰雹") != -1){
        return 24;
    } else if (weather.indexOf("雷阵雨") != -1){
        return 44;
    } else if(weather.indexOf("阵雨") != -1){
        return 60;
    }else if (weather.indexOf("雨夹雪") != -1){
        return 14;
    } else if (weather.indexOf("冻雨") != -1){
        return 34;
    } else if (weather.indexOf("小雨") != -1){
        return 60;
    } else if (weather.indexOf("中雨") != -1){
        return 44;
    } else if (weather.indexOf("大雨") != -1){
        return 24;
    } else if (weather.indexOf("特大暴雨") != -1){
        return 0;
    } else if (weather.indexOf("大暴雨") != -1){
        return 4;
    } else if (weather.indexOf("暴雨") != -1){
        return 14;
    } else {
        return 100;
    }
}

/**
 * 获取雪得分
 */
function getSnowScore(weather){
    if(weather.indexOf("小雪-中雪") != -1){
        return 45;
    } else if (weather.indexOf("中雪-大雪") != -1){
        return 25;
    } else if (weather.indexOf("大雪-暴雪") != -1){
        return 5;
    } else if(weather.indexOf("阵雪") != -1){
        return 75;
    } else if (weather.indexOf("小雪") != -1){
        return 55;
    } else if (weather.indexOf("中雪") != -1){
        return 35;
    } else if (weather.indexOf("大雪") != -1){
        return 15;
    } else if (weather.indexOf("暴雪") != -1){
        return 0;
    } else {
        return 100;
    }
}

/**
 * 获取沙尘得分
 */
function getSandScore(weather){
    if(weather.indexOf("浮尘") != -1){
        return 48;
    } else if (weather.indexOf("扬沙") != -1){
        return 38;
    } else if (weather.indexOf("沙尘暴") != -1){
        return 28;
    } else if (weather.indexOf("强沙尘暴") != -1){
        return 18;
    } else {
        return 100;
    }
}

/**
 * 获取日得分
 */
function getSunScore(weather){
    if(weather.indexOf("晴") != -1){
        return 89;
    } else if (weather.indexOf("多云") != -1){
        return 77;
    } else if (weather.indexOf("阴") != -1){
        return 57;
    } else if (weather.indexOf("雾") != -1){
        return 37;
    } else {
        return 0;
    }
}

/**
 * 获取风得分
 */
function getWindScore(winp){
    if(winp <= "0.2"){
        return 92;
    } else if ("0.3" < winp <= "1.5"){
        return 97;
    } else if ("1.5" < winp <= "3.3"){
        return 100;
    } else if ("3.4" < winp <= "5.4"){
        return 92;
    } else if ("5.4" < winp <= "7.9"){
        return 82;
    } else if ("7.9" < winp <= "10.7"){
        return 72;
    } else if ("10.7" < winp <= "13.8"){
        return 52;
    } else if ("13.8" < winp <= "17.1"){
        return 32;
    } else if ("17.1" < winp <= "20.7"){
        return 22;
    } else if ("20.7" < winp <= "24.4"){
        return 12;
    } else if ("24.4" < winp){
        return 0;
    } else {
        return 90;
    }
}

/**
 * 获取空气得分
 */
function getAirScore(air_scope){
    if(air_scope == "0-50"){
        return 100;
    } else if (air_scope == "50-100"){
        return 93;
    } else if (air_scope == "100-150"){
        return 53;
    } else if (air_scope == "150-200"){
        return 43;
    } else if (air_scope == "200-300"){
        return 23;
    } else if (air_scope == ">300"){
        return 0;
    }
}
