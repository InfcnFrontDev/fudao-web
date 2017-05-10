/**
 * Created by lim on 2017/4/20.
 */
//
var city = "北京";
var weather = "晴";
var winp = "2级";
var air_scope = "50-100";
$(document).ready(function(){
    var xAxis = ['地域', '年龄', '性别', '天气', '民族', '学历', '姓氏', '行业', '专业', 
                '宗教', '高校类型',"双亲情况","家庭情况","动植物","婚姻幸福度","学习意愿"];
    var datas = [12,21,10,4,12,5,6,5,25,23,7,5,6,5,25,23,7];
    var colorList = ['#9BCA63','#9BCA63','#E87C25',
            '#E87C25','#E87C25','#E87C25','#6C7B8B','#6C7B8B',
            '#6C7B8B','#6C7B8B','#6C7B8B','#F0805A','#26C0C0',
            '#A0522D','#9FB6CD','#9FB6CD','#9FB6CD','#8B8B00',
            '#9370DB','#919191','#F4E001','#96CDCD','#8B8B83',
            '#7FFF00','#7EC0EE','#7EC0EE','#76EE00','#6E8B3D',
            '#6C7B8B','#698B69','#6B8E23','#68838B','#66CDAA'];
    if(isNotBlank(getQueryString('city'))) city = getQueryString('city');
    if(isNotBlank(getQueryString('weather'))) city = getQueryString('weather');
    if(isNotBlank(getQueryString('winp'))) city = getQueryString('winp');
    if(isNotBlank(getQueryString('air_scope'))) city = getQueryString('air_scope');
    $.ajax({
        url: "http://192.168.10.69:9191/api/EnergyApi/getEnergy",
        headers: {authorization: getQueryString('token')},
        type: "post",
        dataType: "JSON",
        success: function(data){
            if(undefined != data.ok && data.ok == true){
                if("" != data.obj){
                    preInitEchart(JSON.parse(data.obj));
                } else {
                    initEchart_bar(xAxis,datas,colorList); //　默认初始化
                }
            } else {
                alert(JSON.stringify(data));
            }
        },error: function(data){
            // prompt('title',JSON.stringify(data));
            initEchart_bar(xAxis,datas,colorList); //　默认初始化
        }
    });
});

function isNotBlank(v){
    if(null == v || undefined == v || '' == v) return false;
    return true;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//
function preInitEchart(result){
    var xAxis = ['山川','河流','固定场所','风','雨','雪','沙尘','空气','日','月相','星辰'];
    var datas = [50,50,getLocationScore(city),getWindScore(winp),getRainScore(weather),getSnowScore(weather)
                ,getSandScore(weather),getAirScore(air_scope),getSunScore(weather),90,getStarsScore(weather)];
    var colorList = ['#25C1C3','#25C1C3','#25C1C3','#C0B0E1','#C0B0E1','#C0B0E1','#C0B0E1','#C0B0E1','#C0B0E1','#C0B0E1','#C0B0E1'];
    var indx = xAxis.length;
    _.forEach(result, function(n, key) { // 循环对象
        xAxis[indx] = key;
        datas[indx] = n;
        colorList[indx] = getColor(key);
        indx++;
    });
    initEchart_bar(xAxis,datas,colorList);
    initEchart_scatter(result);
}

/**
 * 打开探测器
 * @return {[type]} [description]
 */
function closeTance(){
    $('#shadeDiv').css('display','none');
    $('#HBox').css('display','none');
}

/**
 * 打开探测器
 * @return {[type]} [description]
 */
function tance(){
    $('#shadeDiv').css('display','block');
    $('#peoForm').css('height',($('#HBox').css('height').replace("px",""))-95+"px");
    $('#HBox').css('display','block');
    // 初始化
    readNation('nation'); // 民族
    readSurname('surname'); // 姓氏
    readSurname('industry'); // 行业
    readSurname('occupation'); // 职业
    readNation('major'); // 专业
    readQuestionJson();
}

/**
 * 计算并保存问卷
 * @return {[type]} [description]
 */
function save(){
    var result = {};
    result.性别 = $(":radio:checked[name='sex']").val();
    result.民族 = $("#nationSel").val();
    result.姓氏 = $("#surnameSel").val();
    result.感情状态 = $("#emotionSel").val();
    result.学历 = $("#educationSel").val();
    result.高校类型 = $("#collageSel").val();
    result.行业 = $("#industrySel").val();
    result.职业 = $("#occupationSel").val();
    result.专业 = $("#majorSel").val();
    result.宗教 = $("#religionSel").val();
    result.双亲情况 = $("#parentsSel").val();
    result.家庭情况 = $("#familySel").val();
    setResult(result);
    closeTance();
}

function setResult(result){
    var v = 0;
    var vt = 0;
    var weight = 0;
    $.getJSON("json/questionnarie.json",function(data){
        _.forEach(data, function(n, key) { // 循环对象 
            v = 0;
            _(n).forEach(function(n2) { // 循环数组 
                _.forEach(n2, function(n3, key2) { 
                    if(key2 != 'weight') {  
                        vt = $(":radio:checked[name='"+ key2 +"']").val();
                        if(vt == undefined) vt = 0;
                    } else {
                        weight = parseFloat(n3);
                    }
                    vt = parseFloat(vt);
                });
                if(n.length == 1){
                    v += vt;
                } else { 
                    v += vt*weight;
                }
            });
            // if(v == 0) v = 0.1;
            if(v != 0) 
                result[key] = v;
        });
        // 保存结果至数据库
        $.ajax({
            url: "http://192.168.10.69:9191/api/EnergyApi/submitInformationResult",
            headers: {
                authorization: getQueryString('token')
            },
            data: {"jsonData":JSON.stringify(result)},
            type: "POST",
            dataType: "JSON",
            success: function(data){
                if(undefined == data.ok || data.ok == false){
                    alert(JSON.stringify(data));
                }
            }
        });
        preInitEchart(result);
    });
    return result;
}

/**
 * 读取民族json
 * @return {[type]} [description]
 */
function readNation(type){
    $.getJSON("json/"+ type +".json",function(data){
        var html = '';
        _.forEach(data, function(n, key) {
            html += '<option value="'+ n +'">'+ key +'</option>';
        });
        $('#'+ type +'Sel').html(html);
    });
}

/**
 * 读取姓氏json
 * @return {[type]} [description]
 */
function readSurname(type){
    $.getJSON("json/"+ type +".json",function(data){
        var html = '';
        _.forEach(data, function(n, key) {
            html += '<optgroup label="'+ key +'">';
            _.forEach(n, function(n2, key) {
                html += '<option value="'+ n2 +'">'+ key +'</option>';
            });
            html += '</optgroup>';
        });
        $('#'+ type +'Sel').html(html);
    });
}

function readQuestionJson(){
    var html = '';
    var indx = 0;
    $.getJSON("json/questionnarie.json",function(data){
        _.forEach(data, function(n, key1) { // 循环对象
            _(n).forEach(function(n2) { // 循环数组
                _.forEach(n2, function(n3, key2) { // 循环对象
                    if(key2 != 'weight') {
                        indx++; 
                        html += '<tr><td class="t_fr wid_p40">'+ indx +' . </td>'
                                +'<td class="wid_p60">'+ key2 +'</td></tr>';
                        _(n3).forEach(function(n4) { // 循环数组
                            _.forEach(n4, function(n5, key3) { // 循环对象
                                html += '<tr><td class="t_fr wid_p40"></td>'
                                    +'<td class="wid_p60"><input name="'+ key2 +'" value="'+ n5 
                                    +'" type="radio"/>'+ key3 +'</td></tr>';
                            }) 
                        }); 
                    }
                });
            });
        });
        $('.quesTab').html(html);
    });
}

function initEchart_scatter(result){
    var data0 = [];
    var data2 = [];
    var data = [];
    var indx = 0;
    var data_temp = [3];
    _.forEach(result, function(n, key) { // 循环对象
        data_temp = [3];
        data[indx] = data_temp;
        indx++;
        data_temp[0] = indx;
        data_temp[1] = n;
        data_temp[2] = key;
    });
    data0 = [[1,50,"山川"],[3,50,"河流"],[5,getLocationScore(city),city]];
    data2 = [[2,getWindScore(winp),"风"],[3,getRainScore(weather),"雨"],[4,getSnowScore(weather),"雪"],
                [6,getSandScore(weather),"沙尘"],[7,getAirScore(air_scope),"空气"],[8,getSunScore(weather),"日"],
                [9,60,"月相"],[11,getStarsScore(weather),"星辰"]];
    var itemStyle = {
        normal: {
            opacity: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
    };
    var option = {
        backgroundColor: '#153371',
        color: [ '#dd4444' , '#fec42c' , '#80F1BE'],
        grid: {
            left: '1%',
            right:'5%',
            bottom: 30,
            containLabel: true
        },
        tooltip: {
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1,
            formatter: function (obj) {
                var value = obj.value;
                return '<div align="center" style="border-bottom: 1px solid rgba(255,255,255,.3); ' +
                    'font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                    + value[2] + '</div>'
                    + '得分 ：' + value[1] + '<br>';
            }
        },
        xAxis: {
            type: 'value',
            show: false
        },
        yAxis: {
            type: 'value',
            show: false
        },
        visualMap: [
            {
                left: 'right',
                bottom: 0,
                dimension: 1,
                min: 0,
                max: 100,
                show:false,
                text: ['得分'],
                textGap: 30,
                inRange: {
                    symbolSize: [10, 40]
                },
                outOfRange: {
                    symbolSize: [10, 40],
                    color: ['rgba(255,255,255,.2)']
                },
                controller: {
                    inRange: {
                        color: ['#c23531']
                    },
                    outOfRange: {
                        color: ['#444']
                    }
                }
            },
            {
                dimension: 1,
                min: 0,
                max: 100,
                show:false,
                inRange: {
                    colorLightness: [1, 0.5]
                },
                outOfRange: {
                    color: ['rgba(255,255,255,.2)']
                },
                controller: {
                    inRange: {
                        color: ['#c23531']
                    },
                    outOfRange: {
                        color: ['#444']
                    }
                }
            }
        ],
        series: [
            {
                name: '',
                type: 'scatter',
                itemStyle: itemStyle,
                data: data
            },
            {
                name: '',
                type: 'scatter',
                itemStyle: itemStyle,
                data: data0
            },
            {
                name: '',
                type: 'scatter',
                itemStyle: itemStyle,
                data: data2
            }
        ]
    };
    var myChart = echarts.init(document.getElementById('circleDiv'));
    myChart.setOption(option);
}

function initEchart_bar(xAxis,datas,colorList){
    // 根据展示柱状图个数初始化容器宽度 
    $("#lowerDiv").css('width',(datas.length)*30+'px');
    var myChart = echarts.init(document.getElementById('lowerDiv'));
    var option = {
        title: {},
        tooltip: {
            trigger: 'axis'
        },
        calculable: true,
        grid: {
            borderWidth: 1,
            x: 10,
            x2: 35,
            y: 40,
            y2: 10
        },
        xAxis: [
            {
                type : 'category',
                show : false,
                axisLabel : {
                    rotate: 45
                },
                data : xAxis
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                barWidth: 16,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}'
                        }
                    }
                },
                data: datas,
            }
        ]
    };
    myChart.setOption(option);
}

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
        "旅游":"#60C0DD","运动":"#60C0DD","花茶艺":"#60C0DD","电脑活动":"#60C0DD","棋牌":"#60C0DD","收藏":"#60C0DD",
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

/**
 * 获取当前定位得分
 */
function getLocationScore(city_){
    var v = {
        "北京":100,"上海":100,"广州":100,"深圳":100,
        "成都市":80,"杭州市":80,"武汉市":80,"天津市":80,"南京市":80,"重庆市":80,"西安市":80, "长沙市":80,
            "青岛市":80,"沈阳市":80,"大连市":80,"厦门市":80,"苏州市":80,"宁波市":80,"无锡市":80,
        "福州市":60,"合肥市":60,"郑州市":60,"哈尔滨":60,"佛山市":60,"济南市":60,"东莞市":60,"昆明市":60,
            "太原市":60,"南昌市":60,"南宁市":60,"温州市":60,"石家庄市":60,"长春市":60,"泉州市":60,"贵阳市":60,
            "常州市":60,"珠海市":60,"金华市":60,"烟台市":60,"海口市":60,"惠州市":60,"乌鲁木齐市":60,"徐州市":60,
            "嘉兴市":60,"潍坊市":60,"洛阳市":60,"南通市":60,"扬州市":60,"汕头市":60,
        "其它":40};
    if(undefined == v[city_]) return "40";
    return v[city_];
}

/**
 * 获取雨得分
 */
function getRainScore(weather){
    if (weather.indexOf("小雨-中雨") != -1){
        return 20;
    } else if (weather.indexOf("中雨-大雨") != -1){
        return 40;
    } else if (weather.indexOf("大雨-暴雨") != -1){
        return 60;
    } else if (weather.indexOf("暴雨-大暴雨") != -1){
        return 80;
    } else if (weather.indexOf("大暴雨-特大暴雨") != -1){
        return 95;
    } else if (weather.indexOf("雷阵雨有冰雹") != -1){
        return 45;
    } else if (weather.indexOf("雷阵雨") != -1){
        return 20;
    } else if(weather.indexOf("阵雨") != -1){
        return 5;
    }else if (weather.indexOf("雨夹雪") != -1){
        return 65;
    } else if (weather.indexOf("冻雨") != -1){
        return 55;
    } else if (weather.indexOf("小雨") != -1){
        return 10;
    } else if (weather.indexOf("中雨") != -1){
        return 30;
    } else if (weather.indexOf("大雨") != -1){
        return 50;
    } else if (weather.indexOf("特大暴雨") != -1){
        return 100;
    } else if (weather.indexOf("大暴雨") != -1){
        return 90;
    } else if (weather.indexOf("暴雨") != -1){
        return 70;
    } else {
        return 0;
    }
}

/**
 * 获取雪得分
 */
function getSnowScore(weather){
    if(weather.indexOf("阵雪") != -1){
        return 20;
    } else if (weather.indexOf("小雪") != -1){
        return 40;
    } else if (weather.indexOf("中雪") != -1){
        return 60;
    } else if (weather.indexOf("大雪") != -1){
        return 80;
    } else if (weather.indexOf("暴雪") != -1){
        return 100;
    } else {
        return 0;
    }
}

/**
 * 获取沙尘得分
 */
function getSandScore(weather){
    if(weather.indexOf("浮沉") != -1){
        return 10;
    } else if (weather.indexOf("扬沙") != -1){
        return 40;
    } else if (weather.indexOf("沙尘暴") != -1){
        return 70;
    } else if (weather.indexOf("强沙尘暴") != -1){
        return 100;
    } else {
        return 0;
    }
}

/**
 * 获取日得分
 */
function getSunScore(weather){
    if(weather.indexOf("晴") != -1){
        return 100;
    } else if (weather.indexOf("多云") != -1){
        return 80;
    } else if (weather.indexOf("阴") != -1){
        return 60;
    } else if (weather.indexOf("雾") != -1){
        return 50;
    } else {
        return 0;
    }
}

/**
 * 获取沙尘得分
 */
function getStarsScore(weather){
    if(weather.indexOf("晴") != -1 || weather.indexOf("多云") != -1){
        return 90;
    } else {
        return 10;
    }
}

/**
 * 获取风得分
 */
function getWindScore(winp){
    var v = {"无风":90,"1级":100,"2级":90,"3级":90,"4级":80,"5级":60,"6级":40};
    if(undefined == v[winp]) return "0";
    return v[winp];
}

/**
 * 获取空气得分
 */
function getAirScore(air_scope){
    if(air_scope == "0-50"){
        return 100;
    } else if (air_scope == "50-100"){
        return 90;
    } else if (air_scope == "100-150"){
        return 50;
    } else if (air_scope == "150-200"){
        return 40;
    } else if (air_scope == "200-300"){
        return 20;
    } else if (air_scope == ">300"){
        return 0;
    }
}

