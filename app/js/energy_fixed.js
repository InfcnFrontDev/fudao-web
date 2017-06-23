/**
 * Created by lim on 2017/4/20.
 */
// 能量场部分数据得分
/**
 * 获取当前定位得分
 */
function getLocationScore(city_){
    var v = {
        "北京市":95,"上海市":95,"广州":95,"深圳市":95,
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
    } else {
        return 80;
    }
}

//
function getColor(name_){
    var v = {
        "山川":"#25C1C3","河流":"#25C1C3",
        "风":"#C0B0E1","雨":"#C0B0E1","雪":"#C0B0E1","沙尘":"#C0B0E1","空气":"#C0B0E1","日":"#C0B0E1","月相":"#C0B0E1","星辰":"#C0B0E1",
        "动植物":"#4FA9ED",
        "固定场所":"#FFB275",
        "性别":"#dd7e6b","民族":"#dd7e6b","姓氏":"#dd7e6b",
        "感情状态":"#28A7E1","婚姻幸福度":"#28A7E1","健康程度":"#28A7E1","健康习惯":"#28A7E1","重视程度":"#28A7E1","双亲情况":"#28A7E1","家庭状况":"#28A7E1",
        "文艺生活":"#FAD860",
        "宠物":"#F3A43B",
        "旅游":"#E67D00","运动":"#E67D00","花茶艺":"#E67D00","电脑活动":"#E67D00","棋牌":"#E67D00","收藏":"#E67D00",
        "行业":"#D7504B","职业":"#D7504B",
        "专业":"#C6E579","学历":"#C6E579","高校类型":"#C6E579","学习意愿":"#C6E579","学习能力":"#C6E579","学习渠道":"#C6E579","学习类型":"#C6E579",
        "个人态度":"#F4E001","个人心境":"#F4E001","语气":"#F4E001","声音":"#F4E001","语调":"#F4E001","语言":"#F4E001","对人应激":"#F4E001","对事应激":"#F4E001","约束力":"#F4E001",
        "爱国情":"#F0805A","乡情":"#F0805A","家庭情况":"#F0805A","家庭情感":"#F0805A","友情空间":"#F0805A","友情时间":"#F0805A","友情价值":"#F0805A","友情目的":"#F0805A",
        "关系维度":"#F0805A","爱情亲密度":"#F0805A","爱情承诺度":"#F0805A","爱情类型":"#F0805A",
        "道德感":"#26C0C0","教育理智感":"#26C0C0","事物理智感":"#26C0C0","政治理智感":"#26C0C0","宗教":"#26C0C0","社会群体":"#26C0C0"
    };
    if(undefined == v[name_]) return "#A0522D";
    return v[name_];
}

