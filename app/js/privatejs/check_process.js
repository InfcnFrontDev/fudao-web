var check_process_one_countSocre, check_process_one_check_result;
var symptom = [];
var choosed = [];
var things = [];
var submitSymptomType = 1;
/**
 * 部位事件
 * @param {Object} info
 */
function fun_pathogeny(info, list, flag) {
    symptom = list;
    // var div_list = document.getElementById("div_list");
    // div_list.innerHTML = "";
    document.getElementById("click_zhengzhuang").style.display = "none";
    var _json = {};
    _json['json'] = check_process_one_check_result;
    _json['position'] = info;
    _json['countSocre'] = check_process_one_countSocre;
    timeOut(info, flag);
}
// 点击人体途中的部位，人体移动效果
var pieChart;

function timeOut(rentidata, flag) {
    var _rentiSvg = document.getElementById("renti_xiuyixiu");
    var opacityNext = document.getElementById("opacityNext");
    var svgGraph = document.getElementById("svgGraph");
    opacityNext.style.opacity = '1'
    _rentiSvg.style.marginTop = '0';
    _rentiSvg.style.marginRight = '20%';
    svgGraph.style.marginRight = '30%';
    svgGraph.style.width = '86%';
    svgGraph.style.height = '86%';
    document.getElementById("listContain").style.display = "block";
    document.getElementById("div_list_selected").style.display = "block";
    document.getElementById("mengban").style.display = "block";
    document.getElementById("deepPage1").style.height = "70%";

    // pieChart = echarts.init(document.getElementById('pieChart'));
    //数据处理
    // fun_organ_zhengzhuang(rentidata, flag);

    fun_organ_zhengzhuang()
}

//版本2-手风琴效果-部位-症状
function fun_organ_zhengzhuang() {
    var accordion = document.getElementById("accordion");
    accordion.innerHTML = ''
    var key = 1;
    for (var i in symptom) {
        accordion.innerHTML += '<div class="panel"><div class="panel-heading" role="tab" id="heading' + key + '">' +
            '<p class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse' + key + '" aria-expanded="false" aria-controls="collapse' + key + '" class="collapsed">' + i +
            '</a></p></div><div id="collapse' + key + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + key + '"><div class="panel-body">' +
            '<ul id="div_list' + key + '" style="background:#FAFAFA "></ul>' + '</div></div></div>';
        fun_li(symptom[i], key)
        key++;
    }
}


/**
 * 自查第二个页面  处理数据
 */
function fun_check_process_two(_position, flag) {
    //清空
    hit = {};
    if (flag) {
        fun_buwei_zhengzhuang(_position);
    } else {
        var data = [];
        for (var i = 0; i < 2; i++) {
            var json = {};
            json.value = 20;
            json.name = symptom[i];
            data.push(json);
        }
        var json = {};
        json.value = 20;
        json.name = "更多";
        data.push(json);
        for (var i = 2; i < 4; i++) {
            var json = {};
            json.value = 20;
            json.name = symptom[i];
            data.push(json);
        }
        fun_pie(data, _position, 'more');
    }
}

//部位-症状
function fun_buwei_zhengzhuang(position) {
    var data = [];
    for (var indx in symptom) {
        var json = {};
        json.value = 20;
        json.name = indx;
        data.push(json);
    }
    fun_pie(data, position, 'buwei_zhengzhuang');
}
//画圆
function fun_pie(data, position, type) {
    var _selectedMode = "single";
    // if ('buwei_zhengzhuang' == type) {
    //     _selectedMode = "single";
    // }
    var _arr_color = [];
    for (var _i in data) {
        _arr_color.push(common_arr_color[_i])
    }
    var option = {
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '80%'],
            selectedMode: _selectedMode, //可以弹出来的
            selectedOffset: 0,
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'inner'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        position: 'inner',
                        textStyle: {
                            color: "#000000"
                        }
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            data: data,
            // color:_arr_color,
        }],
        animationDuration: 50
    }
    //
    option['color'] = _arr_color;
    // option['animation'] = false;
    pieChart.setOption(option);
    pieChart.on('pieSelected', function (params) {
        // 控制台打印数据的名称
        if (params.target == "更多") {
            var div_list = document.getElementById("div_list");
            div_list.innerHTML = "";
            var _zhengzhuang = symptom.slice(4);
            fun_li(_zhengzhuang)
        } else if (type == 'more') {
            var moreObj = {
                innerText: params.target
            }
            fun_select(moreObj, 'right');
        } else if (type == "buwei_zhengzhuang") {
            var div_list = document.getElementById("div_list");
            div_list.innerHTML = "";
            var _zhengzhuang = symptom[params.target];
            fun_li(_zhengzhuang)
        }
    });
}

function fun_li(_zhengzhuang, key) {
    var div_list = document.getElementById("div_list" + key);
    for (var i in _zhengzhuang) {
        var li = document.createElement("li");
        li.className = "mui-table-view-cell";
        li.style.textAlign = 'left';
        li.style.color = ' #8E8E8E';
        li.style.paddingTop = '5px';
        li.innerHTML = '<a class="clickClass" style="background:#FFFFFF;color: #8E8E8E;font-size: 14px" onclick ="fun_select(this,\'right\')">' + _zhengzhuang[i] + '</a>';
        div_list.appendChild(li);
    }

}

function fun_select(obj, type) {
    if (type == 'right') {
        var div_list_selected = document.getElementById("div_list_selected");
        var boo = false;
        for (var i = 0; i < choosed.length; i++) {
            if (choosed[i] == obj.innerText) {
                boo = true;
            }
        }
        if (!boo) {
            choosed.push(obj.innerText);
            var _div = document.createElement("div");
            _div.style.float = "left";
            _div.innerHTML = '<a title="' + obj.innerText + '" style="font-size: 14px;color:#000000;background:#D9ECF3;margin:5px;padding: 4px;display: inline-block" onclick ="fun_select(this)">' + obj.innerText + '&nbsp;&nbsp;<span style="color:#D6D5D1;background: #fff;border-radius: 30px;">&nbsp;x&nbsp;</span></a>';
            div_list_selected.appendChild(_div);
        }
    } else {
        for (var i in choosed) {
            if (choosed[i] == obj.title) {
                choosed.splice(i, 1);
                break;
            }
        }
        console.log(obj)
        obj.parentNode.remove();
    }
}

function fun_choosed_render(token, type) {
    //alert(JSON.stringify(choosed));
    submitSymptomType = type ? 2 : 1;
    //最近做过的项事渲染
    var checkBox = document.getElementById("checkBox");
    checkBox.innerHTML = "";
//   复选框
    $.ajax({
        type: "post",
        url: urls.DIAGNOSIS_GETRECENTTHINGLIST,
        headers: {
            authorization: token
        },
        data: {
            symptoms: choosed.join(",")
        },
        success: function (res) {
            for (var index in res.obj) {
                var _p = document.createElement("p");
                _p.innerHTML = '<p style="text-align: left;margin: 0 40px;border-bottom: 1px solid #D8D8D8;padding-bottom: 10px;font-size: 15px"><span style="display: inline-block;width:90%;">' + res.obj[index] + '</span><input type="checkbox"  name="category" value="' + res.obj[index] + '"  onclick="my_func()"/></p>';
                checkBox.appendChild(_p);
            }
        },
        error: function () {
            console.log('err')
        }
    });

    //已选择症状渲染
    if (choosed.length == 0) {
        return;
    }
    var div_list_selected2 = document.getElementById("div_list_selected2");
    div_list_selected2.innerHTML = '';
    for (var i in choosed) {
        var _div = document.createElement("div");
        _div.style.float = "left";
        _div.innerHTML = '<a text ="' + choosed[i] + '" style="font-size: 12px;color:#000000;background:#D9ECF3;margin:5px;padding: 4px;display: inline-block" >' + choosed[i] + '&nbsp;&nbsp;<span style="color:#D6D5D1;background: #fff;border-radius: 30px;">&nbsp;x&nbsp;</span></a>';
        div_list_selected2.appendChild(_div);
    }
    var __div = document.createElement("div");
    __div.style.clear = "both";
    div_list_selected2.appendChild(__div);

}

function my_func() {
    var items = document.getElementsByName("category");
    things = [];
    if (items[0].checked) {
        for (var i = 1; i < items.length; i++) {
            items[i].checked = false;
        }
        things[0] = '都没有'
        return;
    }
    for (var i in items) {
        if (items[i].checked) {
            things.push(items[i].value)
        }
    }
}

function depth_submit() {
    var token = localStorage.getItem('zizhen_token');
    //token='8185589d-be9f-4d51-bfa9-6b2b1328e178';
    $.ajax({
        type: "post",
        url: urls.DIAGNOSIS_SUBMITSYMPTOM,
        headers: {
            authorization: token
        },
        data: {
            symptoms: choosed.join(","),
            things: things.join(","),
            type: submitSymptomType
        },
        success: function (res) {
            window.postMessage('2');
        },
        error: function () {
            console.log('err')
        }
    });
}
//
function fill_color(buwei) {
    var arr_buwei = ["toujing", "xiong", "fu", "zuoshou", "youshou", "tui"]
    for (var i = 0; i < arr_buwei.length; i++) {
        if (arr_buwei[i] == buwei) {
            document.getElementById(buwei).setAttribute("fill", "#000")
            document.getElementById(buwei).style.opacity = "0.4";
        }else{
            if(document.getElementById(arr_buwei[i]).style.opacity=='0.4')
            document.getElementById(arr_buwei[i]).style.opacity = "0";
        }
    }

}