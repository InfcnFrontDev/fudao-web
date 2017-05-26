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
    var div_list = document.getElementById("div_list");
    div_list.innerHTML = "";
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
    _rentiSvg.style.marginTop = '60px';
    _rentiSvg.style.marginRight = '20%';
    svgGraph.style.marginRight = '30%';
    svgGraph.style.width = '86%';
    svgGraph.style.height = '86%';
    pieChart = echarts.init(document.getElementById('pieChart'));
    //数据处理
    fun_check_process_two(rentidata, flag);
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

function fun_li(_zhengzhuang) {
    for (var i in _zhengzhuang) {
        var li = document.createElement("li");
        li.className = "mui-table-view-cell";
        li.innerHTML = '<a class="clickClass" style="background:#FFFFFF;" onclick ="fun_select(this,\'right\')">' + _zhengzhuang[i] + '</a>';
        div_list.appendChild(li);
    }

}


/*
 /!**
 *    展示数据
 * @param {Object} obj
 * @param {Object} zhengzhuang
 *!/
 function fun_hypertension(obj) {
 var _position = obj.position.replace("check_", "");
 var divBehavioralBacktracking = document.getElementById("divBehavioralBacktracking");
 divBehavioralBacktracking.innerHTML = "";
 //用于饼图数据JSON
 var data = [];
 var _i_color = 0;
 // 回溯
 var behavioralBacktracking = [];
 //用于饼图数据HTML元素
 for (var key in obj.json) {
 if (key == "list" || key == 'countSocre' || key == 'checkDate' ||
 key == 'xinliSocre' || key == 'shehuiSocre' || key == 'ziceSocre' ||
 key == 'zhengzhuangSocre') {
 continue;
 }
 var zhengzhuang = obj.json[key];
 if (zhengzhuang.position == _position || true) {
 var hitName = zhengzhuang.data;
 //	症状
 var symptom = zhengzhuang.symptom;
 //	回溯
 var huishi = zhengzhuang.behavioralBacktracking;
 //	命中数
 hit[hitName] = zhengzhuang.hit;
 //////////////////////////////////////////////////////////////////////////////
 for (var i in symptom) {
 var json = {};
 json.value = 20;
 json.name = symptom[i].length > 2 ? symptom[i].substring(0, 2) : symptom[i];
 json.code = symptom[i];
 json.title = symptom[i];
 json.selectType = hitName;
 data.push(json);
 }
 if (huishi != null) {
 for (var i = 0; i < huishi.length; i++) {
 behavioralBacktracking.push(huishi[i]);
 }
 }
 }
 }
 if (behavioralBacktracking != null) {
 var _array = [];
 for (var _i in behavioralBacktracking) {
 var _json = {};
 _json['key'] = convertPinyin(behavioralBacktracking[_i]);
 _json['val'] = behavioralBacktracking[_i];
 _array.push(_json);
 }
 _array.sort(function (a, b) {
 return a.key.localeCompare(b.key);
 });
 for (var i = 0; i < _array.length; i++) {
 var div = document.createElement("div");
 div.className = "mui-input-row mui-checkbox";
 var _html = "<label>" + _array[i].val + "</label>";
 _html += '<input name="' + hitName + '" class = "huisu" value=' + _array[i].val + ' type="checkbox">';
 div.innerHTML = _html;
 divBehavioralBacktracking.appendChild(div);
 }
 }
 //饼图	症状选择结束//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //超出正常范围的指标开始//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 var table_data = document.getElementById("table_data");
 //删除
 for (var i = table_data.children.length - 1; i > 0; i--) {
 table_data.children[i].remove();
 }
 var list = obj.json['list'];
 if (list != null) {
 for (var i = 0; i < list.length; i++) {

 var tr = document.createElement("tr");
 if (_i_color % 2 == 0) {
 tr.style.background = '#D0D8E8';
 } else {
 tr.style.background = '#E9EDF4';
 }
 if (list[i].checkName != undefined) {
 _i_color++;
 var td = "<td width='50%' height='40px' class='tdBorder tdLeftBorder' align='center'>" + list[i].checkName + "</td>";
 td += "<td width='15%' class='tdBorder' align='center'>" + (list[i].checkResult == undefined ? "" : list[i].checkResult) + "</td>";
 //td += "<td align='center'>" + (list[i].unit == undefined ? "" : list[i].unit) + "</td>";
 td += "<td width='15%' class='tdBorder' align='center'>" + (list[i].referenceValue == undefined ? "" : list[i].referenceValue) + "</td>";
 td += "<td width='10%' class='tdBorder' align='center'>" + (list[i].resultPrompt == undefined ? "" : (list[i].resultPrompt == '偏高' ? '↑' : '↓')) + "</td>";
 tr.innerHTML = td;
 table_data.appendChild(tr);
 }
 }
 }
 //超出正常范围的指标结束//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //饼图	症状选择开始//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 if (data.length > 5) {
 var fragment = document.createDocumentFragment();
 while (data.length > 5) {
 var json = data.pop();
 var li = document.createElement("li");
 li.className = "mui-table-view-cell";
 li.innerHTML = '<a onclick ="fun_add_remove(this,1,\'' + json.selectType + '\')">' + json.title + '</a>';
 fragment.appendChild(li);
 }
 var json = {};
 json.value = 20;
 json.name = "更多";
 json.code = "more";
 var b = data.splice(2, 1, json);
 data.push(b[0]);
 document.getElementById("ulPopover").appendChild(fragment);
 }
 window.setTimeout(function () {
 fun_pie(data);
 }, 200)
 }

 function fun_add_remove(obj, type, selectType) {
 var _text;
 var _selectType;
 if (type == 1) {
 _text = obj.innerText;
 _selectType = selectType;
 } else {
 _text = obj.code;
 _selectType = obj.selectType;
 }
 var _selected = document.getElementById("div_selected");
 var boo = null;
 for (var i = 0; i < _selected.children.length; i++) {
 if (_selected.children[i].innerText == _text) {
 boo = _selected.children[i];
 }
 }
 //添加
 if (!boo) {
 var _div = document.createElement("div");
 _div.className = "div_selected";
 _div.innerText = _text;
 document.getElementById("div_selected").insertBefore(_div, _selected.firstChild);
 hit[_selectType] = hit[_selectType] + 1;
 } else if (boo) { //删除
 boo.remove();
 hit[_selectType] = hit[_selectType] - 1;
 }
 }

 /!**
 * 自查过程结果    -    按钮
 *!/
 function check_process_two_sure() {
 var zhengzhuang = "";
 var huisu = "";
 //	//100分的时候
 var _children = document.getElementById("div_list_selected").children;
 for (var i = 0; i < _children.length; i++) {
 zhengzhuang += _children[i].children[0].getAttribute("text") + ",";
 }
 if (zhengzhuang == "") {
 plus.nativeUI.toast('请选择人体部位或选择症状');
 return false;
 }
 var user = getUser();
 var userInformation = getUserInformation(user.appid)
 var diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
 //等于空时去服务器查询是否有数据
 if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
 plus.nativeUI.toast('网络异常，请检查网络设置！');
 } else {
 var w = plus.ui.createWaiting("请耐心等待！正在计算检查信息...");
 var task = plus.uploader.createUpload(ADDR + AHEALTHCHECK, {
 method: "post",
 timeout: 5
 }, function (t, status) {
 w.close();
 if (status != 200) {
 //异常处理；
 plus.nativeUI.toast('服务器出现异常，请重试');
 } else if (status == 200) {
 var respText = t.responseText;
 if (respText != "") {
 var data = JSON.parse(respText);
 if (data.success) {
 var _json = {};
 _json['status'] = "checkResult";
 _json['json'] = data.obj;
 _json['_action'] = FINDDAILYTHERAPY;
 //养一养重新查询
 saveTimingYangYiYang(null);
 //清空健康环的数据
 saveHealthRing(user.appid, {});
 jumpPage("../self_result.html", "none", _json, false);
 } else {
 plus.nativeUI.toast('服务器出现异常，请重试');
 }
 }
 }
 });
 task.addData("appid", getUser().appid);
 task.addData("zhengzhuang", zhengzhuang);
 task.addData("huisu", huisu);
 task.addData("countSocre", "0");
 task.addData("renqun", diseasespeople);
 task.addData("checkDate", userInformation.checkDate);
 task.start();
 }
 }*/

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
            // res = {
            //     "ok": true,
            //     "obj": [
            //         "进食过量",
            //         "缺乏运动",
            //         "夜间加餐",
            //         "睡前进食",
            //         "睡前运动",
            //
            //     ]
            // };

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
    console.log(choosed.join(","));
    console.log(things.join(","));
    $.ajax({
        type: "post",
        url: urls.DIAGNOSIS_SUBMITSYMPTOM,
        headers: {
            // authorization: token
            authorization: token
        },
        data: {
            symptoms: choosed.join(","),
            things: things.join(","),
            type: submitSymptomType
        },
        success: function (res) {
            // console.log(res)
            alert('提交成功');
            window.postMessage('2');
        },
        error: function () {
            console.log('err')
        }
    });
}