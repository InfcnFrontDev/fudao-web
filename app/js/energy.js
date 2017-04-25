/**
 * Created by lim on 2017/4/20.
 */
//
//
$(document).ready(function(){
    var xAxis = ['地域', '年龄', '性别', '天气', '民族', '学历', '姓氏', '行业', '专业', 
                '宗教', '高校类型',"双亲情况","家庭情况","动植物","婚姻幸福度","学习意愿"];
    var datas = [12,21,10,4,12,5,6,5,25,23,7,5,6,5,25,23,7];
    setTimeout(function () {
        initEchart_bar(xAxis,datas);
    },100);
    // initEchart_scatter(xAxis,datas);
    // tance();
});

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
    //  
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
    // 
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

/**
 * 读取问卷调查json 弃用 择机删除
 * @return {[type]} [description]
 */
function readQuestionJson2(){   
    var html = '';
    var data2,data3;
    var indx = 0;
    $.getJSON("json/questionnarie.json",function(data){
        for (var i = 0; i < data.length; i++) {
            for(var key in data[i]){
                data2 = data[i][key];
                for(var j = 0; j < data2.length; j++){
                    for(var key2 in data2[j]){
                        indx++; 
                        html += '<tr><td class="t_fr wid_p40">'+ indx +' . </td>'
                                +'<td class="wid_p60">'+ key2 +'</td></tr>';
                        data3 = data2[j][key2];
                        for(var k = 0; k < data3.length; k++){
                            for(var key3 in data3[k]){
                                 html += '<tr><td class="t_fr wid_p40"></td>'
                                    +'<td class="wid_p60"><input name="'+ key2 +'" value="'+ data3[k][key3] 
                                    +'" type="radio"/>'+ key3 +'</td></tr>';
                            }
                        }
                    }
                }
            }
        }
        $('.quesTab').html(html);
    });
}

function initEchart_scatter(xAxis,datas){

    var dataBJ = [
        [1,55,9,56,0.46,18,6,"良"],
        [2,25,11,21,0.65,34,9,"优"],
        [3,56,7,63,0.3,14,5,"良"],
        [4,33,7,29,0.33,16,6,"优"],
        [5,42,24,44,0.76,40,16,"优"],
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
        [31,46,5,49,0.28,10,6,"优"]
    ];

    var option = {
        backgroundColor: '#404a59',
        color: [ '#dd4444' ],
        grid: {
            borderWidth: 0,
            x: 0,
            x2: 0,
            y: 0,
            y2: 0
        },
        xAxis: {
            type: 'value',
            show: false,
        },
        yAxis: {
            type: 'value',
            show: false
        },
        visualMap: [
            {
                left: 'right',
                top: '10%',
                show: false,
                dimension: 2,
                min: 0,
                max: 250,
                itemWidth: 30,
                itemHeight: 120,
                calculable: true,
                precision: 0.1,
                textGap: 30,
                textStyle: {
                    color: '#fff'
                },
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
                left: 'right',
                bottom: '5%',
                show: false,
                dimension: 6,
                min: 0,
                max: 50,
                itemHeight: 120,
                calculable: false,
                precision: 0.1,
                textGap: 30,
                textStyle: {
                    color: '#fff'
                },
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
                name: '北京',
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
            x2: 40,
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

// 暂时弃用
function initEcharts(id,type,option){
    require.config({ 
        paths: {
            echarts: 'http://echarts.baidu.com/build/dist'
        }
    });
    // 使用
    require(
        [
            'echarts',
            'echarts/chart/'+type // 使用柱状图就加载bar模块，按需加载
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById(id)); 
            // 为echarts对象加载数据 
            myChart.setOption(option); 
        }
    );
}