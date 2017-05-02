/**
 * Created by lim on 2017/4/20.
 */
//
//
$(document).ready(function(){
    var xAxis = ['地域', '年龄', '性别', '天气', '民族', '学历', '姓氏', '行业', '专业', 
                '宗教', '高校类型',"双亲情况","家庭情况","动植物","婚姻幸福度","学习意愿"];
    var datas = [12,21,10,4,12,5,6,5,25,23,7,5,6,5,25,23,7];
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
            // prompt('title',JSON.stringify(data));
            initEchart_bar(xAxis,datas); //　默认初始化
        }
    });
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
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
        color: [ '#dd4444' ],
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
                name: '地理',
                type: 'scatter',
                itemStyle: itemStyle,
                data: data
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
            x2: 10,
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
                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                                '#A0522D','#A020F0','#9FB6CD','#A52A2A','#8B8B00',
                                '#9370DB','#919191','#F4E001','#96CDCD','#8B8B83',
                                '#7FFF00','#7EC0EE','#7EC0EE','#76EE00','#6E8B3D',
                                '#6C7B8B','#698B69','#6B8E23','#68838B','#66CDAA'
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