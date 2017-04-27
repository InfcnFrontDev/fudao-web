/**
 * Created by lim on 2017/4/20.
 */
//
//
$(document).ready(function(){
    var xAxis = ['地域', '年龄', '性别', '天气', '民族', '学历', '姓氏', '行业', '专业', 
                '宗教', '高校类型',"双亲情况","家庭情况","动植物","婚姻幸福度","学习意愿"];
    var datas = [12,21,10,4,12,5,6,5,25,23,7,5,6,5,25,23,7];
    initEchart_scatter();
    return;
    // 查询用户能力场探测结果
    $.ajax({
        url: "http://192.168.10.69:9191/api/EnergyApi/getEnergy",
        headers: {
            authorization: getQueryString('token')
        },
        type: "post",
        dataType: "JSON",
        success: function(data){
            if(undefined != data.ok && data.ok == true){
                if("" != data.obj){
                    preInitEchart(JSON.parse(data.obj));
                } else {
                    initEchart_bar(xAxis,datas); //　默认初始化
                }
            } else {
                alert(JSON.stringify(data));
            }
        },error: function(data){
            initEchart_bar(xAxis,datas); //　默认初始化
        }
    });
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
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

//
function preInitEchart(result){
    var xAxis = [];
    var datas = [];
    var indx = 0;
    _.forEach(result, function(n, key) { // 循环对象
        xAxis[indx] = key;
        datas[indx] = n;
        indx++;
    });
    initEchart_bar(xAxis,datas);
    initEchart_scatter(xAxis,datas);
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

function initEchart_scatter(xAxis,datas){
    var dataBJ = [
        [3,50,"山川"],
        [4,50,"河流"],
        [5,100,"固定场所"],
        [6,90,"风"],
        [7,60,"雨"],
        [8,0,"雷电"],
        [9,40,"空气"],
        [10,70,"日照"],
        [11,60,"月相"],
        [12,10,"星辰"],
        [13,85,"性别"],
        [14,50,"民族"],
        [15,90,"姓氏"],
        [16,100,"感情状态"],
        [17,60,"学历"],
        [18,70,"高校类型"],
        [19,90,"行业"],
        [20,60,"职业"],
        [21,75,"专业"],
        [22,50,"宗教"],
        [23,90,"双亲情况"],
        [24,10,"家庭情况"]
        /*[5,42,24,44,0.76,40,16,"优"],
        [6,82,58,90,1.77,68,33,"良"],
        [7,74,49,77,1.46,48,27,"良"],
        [8,78,55,80,1.29,59,29,"良"],
        [9,267,216,280,4.8,108,64,"重度污染"],
        [10,185,127,216,2.52,61,27,"中度污染"],
        [11,39,19,38,0.57,31,15,"优"],
        [12,41,11,40,0.43,21,7,"优"],
        [13,64,38,74,1.04,46,22,"良"],
        [14,108,79,120,1.7,75,41,"轻度污染"],
        [15,108,63,116,1.48,44,26,"轻度污染"],
        [16,33,6,29,0.34,13,5,"优"],
        [17,94,66,110,1.54,62,31,"良"],
        [18,186,142,192,3.88,93,79,"中度污染"],
        [19,57,31,54,0.96,32,14,"良"],
        [20,22,8,17,0.48,23,10,"优"],
        [21,39,15,36,0.61,29,13,"优"],
        [22,94,69,114,2.08,73,39,"良"],
        [23,99,73,110,2.43,76,48,"良"],
        [24,31,12,30,0.5,32,16,"优"],
        [25,42,27,43,1,53,22,"优"],
        [26,154,117,157,3.05,92,58,"中度污染"],
        [27,234,185,230,4.09,123,69,"重度污染"],
        [28,160,120,186,2.77,91,50,"中度污染"],
        [29,134,96,165,2.76,83,41,"轻度污染"],
        [30,52,24,60,1.03,50,21,"良"],
        [31,46,5,49,0.28,10,6,"优"]*/
    ];

    var option = {
        backgroundColor: '#404a59',
        color: [
            '#dd4444', '#fec42c', '#80F1BE'
        ],
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
                return '<div align="center" style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                    + value[2]
                    + '</div>'
                    + schema[1].text + '：' + value[1] + '<br>';
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
                dimension: 1,
                min: 0,
                max: 100,
                show:false,
                inRange: {
                    symbolSize: [10, 70]
                },
                outOfRange: {
                    symbolSize: [10, 70],
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
                name: '地理',
                type: 'scatter',
                data: dataBJ
            }
        ]
    };
    var myChart = echarts.init(document.getElementById('circleDiv'));
    myChart.setOption(option);
}

function initEchart_bar(xAxis,datas){
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
            x2: 20,
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
                barWidth: 22,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                              '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
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