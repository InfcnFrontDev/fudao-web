/**
 * Created by lim on 2017/4/20.
 */
//
var province = "北京市";
var city = "北京市";
var weather = "晴";
var winp = "5级";
var air_scope = "50-100";
$(document).ready(function(){
    // alert('city:'+getQueryString('city')+' weather:'+getQueryString('weather')+' winp:'+getQueryString('winp')+' air_scope:'+getQueryString('air_scope'));
    // alert('-'+getQueryString('city').replace(' ','')+'-');
    if(isNotBlank(getQueryString('city'))) city = getQueryString('city');
    if(isNotBlank(getQueryString('weather'))) weather = getQueryString('weather');
    if(isNotBlank(getQueryString('winp'))) winp = getQueryString('winp');
    if(isNotBlank(getQueryString('air_scope'))) air_scope = getQueryString('air_scope');
    $.ajax({
        url: urls.ENERGY_GET,
        headers: {authorization: getQueryString('token')},
        type: "post",
        dataType: "JSON",
        success: function(data){
            // alert(JSON.stringify(data));
            if(undefined != data.ok && data.ok == true){
                if("" != data.obj){
                    $('#bar_loading').css('display','none');
                    $('#lowerDiv').css('display','block');
                    setTimeout(function(){
                        preInitEchart(data.obj);
                    },500);
                } else {
                    // initEchart_bar(xAxis,datas,colorList); //　默认初始化
                }
            } else {
                alert(JSON.stringify(data));
            }
        },error: function(data){
            // alert(JSON.stringify(data));
            // initEchart_bar(xAxis,datas,colorList); //　默认初始化
        }
    });
});
//
function preInitEchart(result){
    // var colorList = ['#ACC1EA','#ACC1EA','#4168B9','#4168B9','#4168B9','#4168B9','#4168B9','#4168B9','#4168B9','#4168B9'];
    // var indx = xAxis.length;
    // _.forEach(result, function(n, key) { // 循环对象
    //     xAxis[indx] = key;
    //     datas[indx] = n;
    //     colorList[indx] = getColor(key);
    //     indx++;
    // });
    var xAxis = ["自然环境","人文环境","个人生活","情感关系"];
    var i = 0;
    var sum = 0;
    getPeoDatas().forEach(function(data){
        i++;
        sum = sum + Number(data);
    });
    var datas = [parseInt(sum/i),86,72,90];

    var colorList = [ '#03B3D4' , '#D49306' , '#99CB06' , '#7A91D6' ];
    var colorList_ = [ '#AED1D8' , '#D9C597' , '#C0CF99' , '#D3D8E4' ];
    initEchart_bar(xAxis,datas,colorList,colorList_,result); // 初始化柱状图
    initEchart_scatter(result); // 初始化散列图
    $('.tanceImg_s').css('display','block');
}

function initEchart_scatter(result){
    var data_0,data_1,data_2,data_3 = new Array();
    // 自然环境
    data_0 = [[1,getMountainsScore(city,0),"山川"],[3,getMountainsScore(city,1),"河流"],[5,getLocationScore(city),city],
            [2,getWindScore(winp),"风"],[3,getRainScore(weather),"雨"],[4,getSnowScore(weather),"雪"],
                [6,getSandScore(weather),"沙尘"],[7,getAirScore(air_scope),"空气"],[8,getSunScore(weather),"日"],
                [11,getStarsScore(weather),"星辰"]];
    // 人文环境
    data_1 = [[1,getLocationScore(city),"地区魅力"]];
    var i = 1;
    $.getJSON("json/indexScore.json",function(data){
        _.forEach(data, function(n, key) { // 循环对象
            if(key == province){
                _.forEach(n.context, function(n, key) { // 循环对象
                    i++;
                    data_1.push([i,n.score,key]);
                });
            }
        });
    });
    i = 0;
    data_2 = [];
    _.forEach(JSON.parse(result.result_personal), function(n, key) { // 循环对象
        i++;
        data_2.push([i,parseInt(n),key]);
    });
    i = 0;
    data_3 = [];
    _.forEach(JSON.parse(result.result_emotion), function(n, key) { // 循环对象
        i++;
        data_3.push([i,parseInt(n),key]);
    });
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
        color: [ '#03B3D4' , '#D49306' , '#99CB06' , '#7A91D6'],
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
                data: data_0
            },
            {
                name: '',
                type: 'scatter',
                itemStyle: itemStyle,
                data: data_1
            },
            {
                name: '',
                type: 'scatter',
                itemStyle: itemStyle,
                data: data_2
            },
            {
                name: '',
                type: 'scatter',
                itemStyle: itemStyle,
                data: data_3
            }
        ]
    };
    var myChart = echarts.init(document.getElementById('circleDiv'));
    myChart.setOption(option);
}

function initEchart_bar(xAxis,datas,colorList,colorList_,result){
    $("#lowerDiv").css('width','100%');
    $("#lowerDiv").css('height','100%');
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
            x2: 15,
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
                name: '平均值',
                type: 'bar',
                data: datas,
                barWidth: 45,
                itemStyle: {
                    normal: {
                        barBorderRadius: 10,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#899CD9'
                        }, {
                            offset: 1,
                            color: '#03B3D4'
                        }]),
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        },
                        shadowColor: 'rgba(0, 0, 0, 0.4)',
                        shadowBlur: 20
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('click', function (param) {
        $('#lowerDiv').css('display','none');
        $('#lowerDiv_detail').css('display','block');
        $('#backBar').css('display','block');
        var xAxis = new Array();
        var datas = new Array();
        var colorList = [];
        var colorList_ = [];
        if(param.name.indexOf("自然环境") != -1){
            xAxis = ['山川','河流','风','雨','雪','沙尘','空气','日','星辰'];
            datas = getPeoDatas();
            $("#lowerDiv_detail").css('width',(datas.length)*30+'px');
            colorList = [ '#03B3D4'];
            colorList_ = [ '#AED1D8'];
            initEchart_bar_detail(xAxis,datas,colorList,colorList_);
        } else if (param.name.indexOf("人文环境") != -1){
            xAxis.push('地区魅力')
            datas.push(getLocationScore(city));
            $.getJSON("json/indexScore.json",function(data){
                _.forEach(data, function(n, key) { // 循环对象
                    if(key == province){
                        _.forEach(n.context, function(n, key) { // 循环对象
                            xAxis.push(key)
                            datas.push(n.score);
                        });
                    }
                });
                $("#lowerDiv_detail").css('width',(datas.length)*30+'px');
                colorList = [ '#D49306' ];
                colorList_ = [ '#D9C597' ];
                initEchart_bar_detail(xAxis,datas,colorList,colorList_);
            }); 
        } else if (param.name.indexOf("个人生活") != -1){
            _.forEach(JSON.parse(result.result_personal), function(n, key) { // 循环对象
                xAxis.push(key)
                datas.push(n);
            });
            $("#lowerDiv_detail").css('width',(datas.length)*30+'px');
            colorList = [ '#99CB06' ];
            colorList_ = [ '#C0CF99' ];
            initEchart_bar_detail(xAxis,datas,colorList,colorList_);
        } else { // 情感关系
            _.forEach(JSON.parse(result.result_emotion), function(n, key) { // 循环对象
                xAxis.push(key)
                datas.push(n);
            });
            $("#lowerDiv_detail").css('width',(datas.length)*30+'px');
            colorList = [ '#7A91D6' ];
            colorList_ = [ '#D3D8E4' ];
            initEchart_bar_detail(xAxis,datas,colorList,colorList_);
        }
    });
}

function getPeoDatas(){
    return [getMountainsScore(city,0),getMountainsScore(city,1),getWindScore(winp),getRainScore(weather),
        getSnowScore(weather),getSandScore(weather),getAirScore(air_scope),getSunScore(weather),getStarsScore(weather)];
}

function initEchart_bar_detail(xAxis,datas,colorList,colorList_){
    // 根据展示柱状图个数初始化容器宽度
    var myChart = echarts.init(document.getElementById('lowerDiv_detail'));
    var option = {
        title: {},
        tooltip: {
            trigger: 'axis'
        },
        calculable: true,
        grid: {
            borderWidth: 1,
            x: 10,
            x2: 15,
            y: 40,
            y2: 10
        },
        xAxis: [
            {
                type : 'category',
                show : false,
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
                name: '得分',
                type: 'bar',
                barWidth: 15,
                itemStyle: {
                    normal: {
                        barBorderRadius: 10,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: colorList
                        }, {
                            offset: 1,
                            color: colorList_
                        }]),
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}'
                        }
                    }
                },
                data: datas
            }
        ]
    };
    myChart.setOption(option);
}

/**
 * 打开探测器
 * @return {[type]} [description]
 */
function closeTance(){
    $('#shadeDiv').css('display','none');
    $('#HBox').css('display','none');
}

function quesTab_Nav_click(v1,v2){
    $('#quesTab_Nav_'+v1).addClass('quesTab_Nav_Sel');
    $('#quesTab_Nav_'+v2).removeClass('quesTab_Nav_Sel');
    $('#'+v1+'Form').css('display','block');
    $('#'+v2+'Form').css('display','none');
}

/**
 * 打开探测器
 * @return {[type]} [description]
 */
function tance(){
    $('#shadeDiv').css('display','block');
    $('#peoForm').css('height',($('#HBox').css('height').replace("px",""))-95+"px");
    $('#emotionForm').css('height',($('#HBox').css('height').replace("px",""))-95+"px");
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
    var result_peo = {}; // 个人生活
    var result_emo = {}; // 情感关系
    result_peo.学历 = $("#educationSel").val();
    result_peo.高校类型 = $("#collageSel").val();
    result_peo.专业 = $("#majorSel").val();
    result_peo.行业 = $("#industrySel").val();
    result_peo.职业 = $("#occupationSel").val();
    result_emo.民族 = $("#nationSel").val();
    result_emo.姓氏 = $("#surnameSel").val();
    result_emo.宗教 = $("#religionSel").val();
    result_emo.感情状态 = $("#emotionSel").val();
    if($('#peoForm').css('display') == 'block'){
        setResult(result_peo,result_emo,0);
    } else {
        setResult(result_peo,result_emo,1);
    }
    closeTance();
}

function setResult(result_peo,result_emo,type){
    var v = 0;
    var vt = 0;
    var weight = 0;
    if(type == 0){
        $.getJSON("json/questionnarie_peo.json",function(data){
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
                    result_peo[key] = v;
            });
            $.ajax({
                url: urls.ENERGY_SUBMITSYMPTOM,
                headers: {
                    authorization: getQueryString('token')
                },
                data: {"result_peo":JSON.stringify(result_peo)},
                type: "POST",
                dataType: "JSON",
                success: function(data){
                    if(undefined == data.ok || data.ok == false){
                        alert(JSON.stringify(data));
                    }
                }
            });
        });
    } else if(type == 1){
        $.getJSON("json/questionnarie_emo.json",function(data){
            _.forEach(data, function(n, key) { // 循环对象
                v = 0;
                _(n).forEach(function(n2) { // 循环数组
                    _.forEach(n2, function(n3, key2) {
                        if(key2 != 'weight') {
                            vt = $(":radio:checked[name='"+ key2 +"']").val();
                            // console.log(vt);
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
                    result_emo[key] = v;
            });
            $.ajax({
                url: urls.ENERGY_SUBMITSYMPTOM,
                headers: {
                    authorization: getQueryString('token')
                },
                data: {"result_emo":JSON.stringify(result_emo)},
                type: "POST",
                dataType: "JSON",
                success: function(data){
                    if(undefined == data.ok || data.ok == false){
                        alert(JSON.stringify(data));
                    }
                }
            });
        });
    }
    //提示层
    // layer.msg('玩命提示中');
    setTimeout(function(){
        // 保存结果至数据库
        // $.ajax({
        //     url: urls.ENERGY_SUBMITSYMPTOM,
        //     headers: {
        //         authorization: getQueryString('token')
        //     },
        //     data: {"result_peo":JSON.stringify(result_peo),"result_emo":JSON.stringify(result_emo)},
        //     type: "POST",
        //     dataType: "JSON",
        //     success: function(data){
        //         if(undefined == data.ok || data.ok == false){
        //             alert(JSON.stringify(data));
        //         }
        //     }
        // });
        $('#bar_loading').css('display','none');
        $('#lowerDiv').css('display','block');
        var result = new Object();
        result['result_personal'] = JSON.stringify(result_peo);
        result['result_emotion'] = JSON.stringify(result_emo);
        preInitEchart(result);
    },2000);
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
            // html += '<optgroup label="'+ key +'">';
            _.forEach(n, function(n2, key) {
                html += '<option value="'+ n2 +'">'+ key +'</option>';
            });
            // html += '</optgroup>';
        });
        $('#'+ type +'Sel').html(html);
    });
}

function readQuestionJson(){
    var html = '';
    var indx = 0;
    $.getJSON("json/questionnarie_peo.json",function(data){
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
        $('#peoTab_').html(html);
    });
    indx = 0;
    html = '';
    $.getJSON("json/questionnarie_emo.json",function(data){
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
        $('#emotionTab').html(html);
    });
}

function backBar(){
    $('#lowerDiv_detail').css('display','none');
    $('#lowerDiv').css('display','block');
    $('#backBar').css('display','none');
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

/**
 * 获取山川河流得分
 */
function getMountainsScore(city_,type){
    var val;
    city_ = "北京市";
    $.ajaxSettings.async = false;
    $.getJSON("json/mountain.json",function(data) {
        _.find(data, function (n, key) { // 循环对象
            if(city_ == key){
                if(type == 0){
                    val = n.sc_score;
                } else {
                    val = n.hl_score;
                }
            }
        });
    });
    return val;
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
        return 80;
    } else if (weather.indexOf("中雨-大雨") != -1){
        return 60;
    } else if (weather.indexOf("大雨-暴雨") != -1){
        return 40;
    } else if (weather.indexOf("暴雨-大暴雨") != -1){
        return 20;
    } else if (weather.indexOf("大暴雨-特大暴雨") != -1){
        return 5;
    } else if (weather.indexOf("雷阵雨有冰雹") != -1){
        return 55;
    } else if (weather.indexOf("雷阵雨") != -1){
        return 80;
    } else if(weather.indexOf("阵雨") != -1){
        return 95;
    }else if (weather.indexOf("雨夹雪") != -1){
        return 35;
    } else if (weather.indexOf("冻雨") != -1){
        return 45;
    } else if (weather.indexOf("小雨") != -1){
        return 90;
    } else if (weather.indexOf("中雨") != -1){
        return 70;
    } else if (weather.indexOf("大雨") != -1){
        return 50;
    } else if (weather.indexOf("特大暴雨") != -1){
        return 0;
    } else if (weather.indexOf("大暴雨") != -1){
        return 10;
    } else if (weather.indexOf("暴雨") != -1){
        return 30;
    } else {
        return 100;
    }
}

/**
 * 获取雪得分
 */
function getSnowScore(weather){
    if(weather.indexOf("小雪-中雪") != -1){
        return 50;
    } else if (weather.indexOf("中雪-大雪") != -1){
        return 30;
    } else if (weather.indexOf("大雪-暴雪") != -1){
        return 10;
    } else if(weather.indexOf("阵雪") != -1){
        return 80;
    } else if (weather.indexOf("小雪") != -1){
        return 60;
    } else if (weather.indexOf("中雪") != -1){
        return 40;
    } else if (weather.indexOf("大雪") != -1){
        return 20;
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
        return 50;
    } else if (weather.indexOf("扬沙") != -1){
        return 40;
    } else if (weather.indexOf("沙尘暴") != -1){
        return 20;
    } else if (weather.indexOf("强沙尘暴") != -1){
        return 10;
    } else {
        return 100;
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
 * 获取星辰得分
 */
function getStarsScore(weather){
    if(weather.indexOf("晴") != -1){
        return 90;
    } else {
        return 10;
    }
}

/**
 * 获取风得分
 */
function getWindScore(winp){
    if(winp <= "0.2"){
        return 90;
    } else if ("0.3" < winp <= "1.5"){
        return 95;
    } else if ("1.5" < winp <= "3.3"){
        return 100;
    } else if ("3.4" < winp <= "5.4"){
        return 90;
    } else if ("5.4" < winp <= "7.9"){
        return 80;
    } else if ("7.9" < winp <= "10.7"){
        return 70;
    } else if ("10.7" < winp <= "13.8"){
        return 50;
    } else if ("13.8" < winp <= "17.1"){
        return 30;
    } else if ("17.1" < winp <= "20.7"){
        return 20;
    } else if ("20.7" < winp <= "24.4"){
        return 10;
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

function isNotBlank(v){
    if(null == v || undefined == v || '' == v) return false;
    return true;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}