var answers = {};
// 设置当前问题及答案
function fun_getCurQuestion() {
	fun_setButton();
	var _json = JSON.parse(localStorage.getItem('questions'));
	document.getElementById("sum").innerHTML = index + "/" + _json.length;
	var curQuestion = _json[index - 1];
	document.getElementById("title").innerHTML = questionTypes[curQuestion.type];
	document.getElementById("question").innerHTML = "<div class='_index'>" + index + "</div>&nbsp; " + curQuestion.question;
	document.getElementById("answer1").innerHTML = fun_createRadio(curQuestion, 'asnwerAScore') + "<label style ='text-align:left'>" + curQuestion.answerA + "</label>";
	document.getElementById("answer2").innerHTML = fun_createRadio(curQuestion, 'asnwerBScore') + "<label style ='text-align:left'>" + curQuestion.answerB + "</label>";
	document.getElementById("answer3").innerHTML = fun_createRadio(curQuestion, 'asnwerCScore') + "<label style ='text-align:left'>" + curQuestion.answerC + "</label>";
	document.getElementById("answer4").innerHTML = fun_createRadio(curQuestion, 'asnwerDScore') + "<label style ='text-align:left'>" + curQuestion.answerD + "</label>";
	document.getElementById("answer5").innerHTML = fun_createRadio(curQuestion, 'asnwerEScore') + "<label style ='text-align:left'>" + curQuestion.answerE + "</label>";
	fun_showProgress(index);
}

function fun_showProgress(index) {
	answerProgress.setAttribute('data-progress', (index - 1) / 62 * 100);
	// 显示进度
	mui("#demo5 .mui-progressbar").each(function() {
		mui(this).progressbar({
			progress: this.getAttribute("data-progress")
		}).show();
	});
}

// 生成单选按钮
function fun_createRadio(question, answer) {
	var _radio = '<input type="radio" name="' + question.num + '"';
	_radio += ' value="' + question[answer] + '"';
	if(answers[question.num] == question[answer]) {
		_radio += ' checked="checked"';
	}
	_radio += ' onclick="fun_recordingAnswer(this);" />';
	return _radio;
}
// 记录答案
function fun_recordingAnswer(obj) {
	if(index == 62) {
		fun_showProgress(63);
		answers[obj.name] = obj.value;
		fun_submit();
		return false;
	}
	answers[obj.name] = obj.value;
	index++;
	window.setTimeout("fun_getCurQuestion()", 800);
}

// 设置问题上一题/下一题按钮是否可用
function fun_setButton() {
	if(index == 1) {
		//plus.nativeUI.toast('当前问题已经是第一题');
		document.getElementById("up").style.display = 'none';
	} else if(index == 62) {
		document.getElementById("next").style.display = 'none';
		document.getElementById("submit").style.display = 'block';
	} else {
		document.getElementById("up").style.display = 'block';
		document.getElementById("next").style.display = 'block';
		document.getElementById("submit").style.display = 'none';
	}
}
// 提交答案
function fun_submit() {
	var btnArray, _index;
	if("Android".indexOf(plus.os.name) != -1) {
		btnArray = ['继续提交', '返回填写'];
		_index = 0;
	} else {
		btnArray = ['返回填写', '继续提交'];
		_index = 1;
	}
	mui.confirm('是否提交问卷', '温馨提示', btnArray, function(e) {
		if(e.index == _index) {
			var _json = JSON.parse(localStorage.getItem('questions'));
			for(var indx in _json) {
				var _key = _json[indx].num;
				if(answers[_key] == null) {
					answers[_key] = 5;
				}
			}
			var main = plus.webview.getWebviewById("main");
			mui.fire(main, "yijianchachaResult", {"answers":answers});
		}
	});
}