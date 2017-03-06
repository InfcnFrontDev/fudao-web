/**
 * 下拉更新具体业务实现
 */
function pulldownRefresh() {
	fun_display();
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	var table = document.body.querySelector('.mui-table-view');
	table.innerHTML = "";
	//等于空时去服务器查询是否有数据
	mui.ajax(ADDR + GETDYNAMICS + random(), {
		data: {
			"appid": getUser().appid,
			"page": page
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {
			if(data) {
				var objs = data;
				fun_addHtml(table, objs, 1);
				page = 1;
			}
		},
		error: function(xhr, type, errorThrown) {
			setTimeout("pulldownRefresh()", 1000);
		}
	});
}
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	fun_display();
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	var table = document.body.querySelector('.mui-table-view');
	//等于空时去服务器查询是否有数据
	mui.ajax(ADDR + GETDYNAMICS + random(), {
		data: {
			"appid": getUser().appid,
			"page": page
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {
			if(data) {
				var objs = data;
				fun_addHtml(table, objs, 0);
				page++;
				if(objs.length == 10) {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh();
				} else if(objs.length < 10) {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				}
			} else {
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				if(page == 1) {
					var prompts = document.createElement("div");
					prompts.style.width = '100%';
					prompts.style.textAlign = 'center';
					var _promptsHtml = '<span>您还没有好友哦，快去添加吧！</span>';
					var class_obj = document.getElementsByClassName("mui-pull-caption mui-pull-caption-nomore");
					if(class_obj.length > 0) {
						class_obj[0].style.display = "none";
					}
					prompts.innerHTML = _promptsHtml;
					table.appendChild(prompts);
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			setTimeout("pullupRefresh()", 1000);
		}
	});
}

var curTime = new Date();
var curDate = curTime.getDate();
var curHour = curTime.getHours();
var curMine = curTime.getMinutes();
// 填充界面
function fun_addHtml(table, objs, type) {
	// 循环获取动态，填充界面
	for(var i = 0; i < objs.length; i++) {
		var _li = document.createElement("li");
		var _div = document.createElement('div');
		_div.style.width = '100%';
		// 左边的头像容器
		var _leftDiv = document.createElement('div');
		var _rightDiv = document.createElement('div');
		_rightDiv.style.marginLeft = '55px';
		// 昵称容器
		var _fontDiv = document.createElement('div');
		// 动态图片列表容器
		var _imgDiv = document.createElement('div');
		_leftDiv.style.float = 'left';
		_leftDiv.style.marginLeft = '3px';
		// 头像容器的具体内容
		var _leftDivHtml = '<img width="50" height="50" src="';

		mui.ajax(ADDR + "/uploadimg/" + objs[i].friendImg, {
			timeout: 5, //超时时间设置为10秒；
			async: false,
			success: function() {
				_leftDivHtml += ADDR + "/uploadimg/" + objs[i].friendImg;
			},
			error: function(xhr, type, errorThrown) {
				_leftDivHtml += "../img/xingxiang/default_Head.png";
			}
		});
		_leftDivHtml += '"/>';

		_leftDiv.innerHTML = _leftDivHtml;
		// 昵称容器的具体内容
		var _fontDivHtml = '<h5>' + objs[i].friendRemak + '</h5>';
		_fontDivHtml += '<span style="margin:3px;">' + objs[i].content + '</span>';
		_fontDiv.innerHTML = _fontDivHtml;
		_rightDiv.appendChild(_fontDiv);
		var _imgDivHtml = '';
		var _imgPath = objs[i].imgPath;
		if(_imgPath && 'null' != _imgPath) {
			// 动态图片列表容器的具体内容
			var _imgStrs = _imgPath.split(',');
			var _imgLen = _imgStrs.length;
			for(var j = 0; j < _imgLen; j++) {
				_imgDivHtml += '<div class="imgList" style="width:';
				_imgDivHtml += _imgListWidth + 'px;">';
				_imgDivHtml += '<img width="100%" height="100%"';
				_imgDivHtml += 'src="' + ADDR + _imgStrs[j] + '" /></div>';
			}
			_imgDiv.innerHTML = _imgDivHtml;
			_rightDiv.appendChild(_imgDiv);
		}
		var _cleanDiv = document.createElement("div");
		_cleanDiv.style.clear = 'both';
		_rightDiv.appendChild(_cleanDiv);
		var _funDiv = document.createElement("div");
		_funDiv.style.margin = '5px 5px 10px 5px';
		_funDiv.style.height = '15px';
		var publishDate = objs[i].publishDate;
		var _thisDate = publishDate.split(' ')[0].split('-')[2];
		var _thisHour = publishDate.split(' ')[1].split(':')[0];
		var _thisMine = publishDate.split(' ')[1].split(':')[1];
		var thisTime = '';
		if(_thisDate == curDate) {
			var _curTime = new Date();
			var _publishTime = new Date(publishDate);
			var _mine = parseInt((_curTime - _publishTime) / 1000 / 60);
			if(_mine <= 10) {
				thisTime = '刚刚';
			} else if(_mine > 10 && _mine < 60) {
				thisTime = _mine + '分钟前';
			} else {
				thisTime = parseInt(_mine / 60) + '小时前';
			}
		} else if(curDate - _thisDate == 1) {
			thisTime = '昨天';
		} else {
			var _curTime = new Date();
			var _publishTime = new Date(publishDate);
			thisTime = parseInt((_curTime - _publishTime) / 1000 / 60 / 60 / 24) + '天前';
		}
		var _funDivHtml = '<div style="float:left; margin-top: 8px;">' + thisTime + '</div>';
		_funDivHtml += '<div style="float:right;">';
		_funDivHtml += '<img class="comment" title="' + objs[i].dynamicID;
		_funDivHtml += '" src="../img/comment.png" /></div>';
		_funDivHtml += '<div class="commentDiv" id="' + objs[i].dynamicID + '">';
		_funDivHtml += '<a class="fa fa-heart-o likeBtn" onclick="fun_like(\'' + objs[i].dynamicID + '\')">&nbsp;赞<a>';
		_funDivHtml += '<a class="fa fa-comment-o commentBtn" onclick="fun_showComment(\'' + objs[i].dynamicID + '\')">&nbsp;评论<a></div>';
		_funDiv.innerHTML = _funDivHtml;
		_rightDiv.appendChild(_funDiv);
		var _commentDiv = document.createElement("div");
		_commentDiv.style.background = '#E3E3E3';
		_commentDiv.style.margin = '20px 5px 5px 5px';
		var childrens = objs[i].childrenList;
		if(childrens) {
			_commentDiv.style.padding = '5px 5px';
			var _likeDivHtml = '';
			var _commentDivHtml = '';
			var _html = '';
			for(var j = 0; j < childrens.length; j++) {
				if(childrens[j].type == 2) {
					_likeDivHtml += '<a class="fa fa-heart-o">' + childrens[j].friendRemak + '</a>';
				} else {
					_commentDivHtml += '<div class="divComment" id="';
					_commentDivHtml += childrens[j].dynamicID + '" title="';
					_commentDivHtml += childrens[j].friendRemak + '"><a>';
					_commentDivHtml += childrens[j].friendRemak;
					_commentDivHtml += '</a>：' + childrens[j].content + '</div>';
					var grandsons = childrens[j].childrenList;
					_commentDivHtml += fun_showGrandson(childrens[j], grandsons);
				}
			}
			if(_likeDivHtml == '') {
				_commentDiv.innerHTML = _commentDivHtml;
			} else {
				_commentDiv.innerHTML = _likeDivHtml + '<br>' + _commentDivHtml;
			}
		}
		_rightDiv.appendChild(_commentDiv);
		_div.appendChild(_leftDiv);
		_div.appendChild(_rightDiv);
		_cleanDiv = document.createElement("div");
		_cleanDiv.style.clear = 'both';
		_cleanDiv.style.marginTop = '20px';
		_div.appendChild(_cleanDiv);
		_div.appendChild(document.createElement("hr"));
		_li.appendChild(_div);
		if(type == 1) {
			//下拉刷新，新纪录插到最前面；
			table.insertBefore(li, table.firstChild);
		} else {
			table.appendChild(_li);
		}
	}
}

// 显示评论的评论
function fun_showGrandson(parent, list) {
	var html = '';
	if(list) {
		for(var k = 0; k < list.length; k++) {
			html += '<div class="divComment" id="';
			html += list[k].dynamicID + '" title="';
			html += list[k].friendRemak + '"><a>';
			html += list[k].friendRemak;
			html += '</a>回复<a>' + parent.friendRemak + "</a>:" + list[k].content + '</div>';
			html += fun_showGrandson(list[k], list[k].childrenList);
		}
	}
	return html;
}

// 点击评论图标，显示评论按钮
function fun_showCommentBtn(pid) {
	var _targetDiv = document.getElementById(pid);
	var _displayVal = _targetDiv.style.display;
	if('block' == _displayVal) {
		_targetDiv.style.display = 'none';
	} else {
		_targetDiv.style.display = 'block';
	}
}

// 点赞
function fun_like(id) {
	document.getElementById("commentConetnt").style.display = 'none';
	mui.ajax(ADDR + EDITDYNAMIC + random(), {
		data: {
			appid: getUser().appid,
			pid: id,
			type: 2
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {

		},
		error: function(xhr, type, errorThrown) {

		}
	});
}

// 点击评论按钮，展示评论输入框
function fun_showComment(id, name) {
	document.getElementById("parentID").value = id;
	if(name) {
		document.getElementById("commentInput").placeholder = '回复' + name;
	} else {
		document.getElementById("commentInput").placeholder = '';
		document.getElementById(id).style.display = 'none';
	}
	document.getElementById("commentConetnt").style.display = 'block';
	document.getElementById("commentInput").focus();
}

// 发表评论
function fun_commentOK() {
	document.getElementById("commentConetnt").style.display = 'none';
	mui.ajax(ADDR + EDITDYNAMIC + random(), {
		data: {
			appid: getUser().appid,
			content: document.getElementById("commentInput").value,
			pid: document.getElementById("parentID").value,
			type: 1
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {

		},
		error: function(xhr, type, errorThrown) {

		}
	});
}