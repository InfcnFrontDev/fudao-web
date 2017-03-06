// 显示我关注的圈子
function showMyTerritory() {
	userInformation = getUserInformation(user.appid);
	/*if(userInformation.territory == undefined) {
		return false;
	}*/
	var myTerritory = ['健康饮食', '健康常识', '疾病偏方', '疾病预防', '美容美体', '养生方法'];
	var fragment = document.createDocumentFragment();
	document.getElementById("myterritory_title").innerHTML = "";
	document.getElementById("group_myterritory").innerHTML = "";
	var _len = myTerritory.length;
	if(_len == 0) {
		document.getElementById("wait").innerHTML = "暂无关注！&nbsp; &nbsp;";
	}
	for(var i = 0; i < _len; i++) {
		var _curTerritory = myTerritory[i];
		//显示标题列表
		var _a = document.createElement("a");
		if(i == 0) {
			_a.className = "mui-control-item mui-active";
		} else {
			_a.className = "mui-control-item";
		}
		_a.href = "#item" + (i + 1);
		if(i+1 == _len){
			_a.innerHTML = "&nbsp; " +_curTerritory+"&nbsp; ";
		}else {
			_a.innerHTML = "&nbsp; " +_curTerritory+"&nbsp; &nbsp; &nbsp;|";
		}
		_a.setAttribute("id", "title" + (i + 1));
		_a.setAttribute("text", _curTerritory);
		_a.setAttribute("page", "1");
		fragment.appendChild(_a);

		//显示数据列表
		var _div_list = document.createElement("div");
		_div_list.setAttribute("id", "item" + (i + 1));
		if(i == 0) {
			_div_list.className = "mui-slider-item mui-control-content mui-active";
		} else {
			_div_list.className = "mui-slider-item mui-control-content";
		}
		var _div_scroll_wrapper_list = document.createElement("div");
		_div_scroll_wrapper_list.className = "mui-scroll-wrapper";
		var _div_scroll_list = document.createElement("div");
		_div_scroll_list.className = "mui-scroll";
		var _ul_table_view_list = document.createElement("ul");
		_ul_table_view_list.setAttribute("id", "ul_list" + (i + 1));
		_ul_table_view_list.className = "mui-table-view";
		var _fragment_li_list = document.createDocumentFragment();
		if(i == 0) {
			pullupRefresh(_ul_table_view_list, _curTerritory, "1");
		}
		_ul_table_view_list.appendChild(_fragment_li_list);
		_div_scroll_list.appendChild(_ul_table_view_list);
		_div_scroll_wrapper_list.appendChild(_div_scroll_list);
		_div_list.appendChild(_div_scroll_wrapper_list);
		document.getElementById("group_myterritory").appendChild(_div_list);
	}
	document.getElementById("myterritory_title").appendChild(fragment);
}
// 查看圈子数据
function pullupRefresh(ul, _title, _page) {
	userInformation = getUserInformation(user.appid);
	var diseasespeople = chooseVersion(userInformation.sex, userInformation.birthdate);
	mui.ajax(ADDR + MYTERRITORYLIST, {
		data: {
			"name": _title,
			"page": _page,
			"renqun": diseasespeople
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			if(data.success) {
				document.getElementById("group_myterritory").style.display = "inline-block";
				document.getElementById("wait").style.display = "none";
				var objs = data.obj;
				for(var i in objs) {
					var li = document.createElement("li");
					li.style.textAlign = 'left';
					li.className = "mui-table-view-cell";
					li.setAttribute("id", objs[i][0]);
					li.setAttribute("text", objs[i][1]);
					var div = document.createElement("div");
					var len = 0;
					var div_right = document.createElement("div");
					div_right.style.float = "right";
					var _imgHtml = "";
					if(objs[i][2]!=null){
						var arr_img = objs[i][2].split(",");
						len = arr_img.length;
						if(len==1){
							div_right.innerHTML = "<img style ='width:60px;height:50px' src ="+ADDR+"zixun/"+arr_img[0].replace("tupian","")+" />";
						}else {
							_imgHtml = "<img style ='width:28%;height:55px' src ="+ADDR+"zixun/"+arr_img[0].replace("tupian","")+" /> &nbsp;  &nbsp; ";
							_imgHtml += "<img style ='width:28%;height:55px' src ="+ADDR+"zixun/"+arr_img[1].replace("tupian","")+" /> &nbsp;  &nbsp; ";
							_imgHtml += "<img style ='width:28%;height:55px' src ="+ADDR+"zixun/"+arr_img[2].replace("tupian","")+" /> &nbsp;  &nbsp; ";
						}
					}
					div.appendChild(div_right);
					var div_left = document.createElement("div");
					div_left.style.float = "left";
					div_left.innerHTML = objs[i][1]+"<div style ='font-style:oblique;'>来源:" + objs[i][3] + "&nbsp; &nbsp; 日期:"+objs[i][4]+"</div></div>"+_imgHtml;
					if(len==1){
						div_left.style.width = "80%";
						
					}
					div.appendChild(div_left);
					 
					li.appendChild(div);
					ul.appendChild(li);
				}
				setPage(ul, _page);
				if(objs.length == 10) {
					mui(ul.parentNode).pullToRefresh().endPullUpToRefresh();
				} else if(objs.length < 10) {
					mui(ul.parentNode).pullToRefresh().endPullUpToRefresh(true);
				}
			} else {
				mui(ul.parentNode).pullToRefresh().endPullUpToRefresh(true);
			}
		},
		error: function(xhr, type, errorThrown) {
			document.getElementById("group_myterritory").style.display = "inline-block";
			document.getElementById("wait").style.display = "none";
			//异常处理；
			plus.nativeUI.toast('服务器出现异常，请重试！');
		}
	});
}

function fun_ready() {
	//循环初始化所有下拉刷新，上拉加载。
	mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
		//mui-scroll
		mui(pullRefreshEl).pullToRefresh({
			down: {
				callback: function() {
					var self = this;
					setTimeout(function() {
						var ul = self.element.querySelector('.mui-table-view');
						ul.innerHTML = "";
						var obj = getPage(ul);
						var _title = obj.getAttribute("text");
						var _page = obj.getAttribute("page");
						document.getElementById("group_myterritory").style.display = "none";
						document.getElementById("wait").style.display = "inline-block";
						pullupRefresh(ul, _title, "1");
						self.endPullDownToRefresh();
						self.endPullUpToRefresh(false);
						self.refresh(true);
					}, 1000);
				}
			},
			up: {
				callback: function() {
					var self = this;
					setTimeout(function() {
						var ul = self.element.querySelector('.mui-table-view');
						var obj = getPage(ul);
						var _title = obj.getAttribute("text");
						var _page = obj.getAttribute("page");
						pullupRefresh(ul, _title, _page);
						self.endPullUpToRefresh();
					}, 1000);
				}
			}
		});
	});
}
//重置page
function setPage(ul, _page) {
	_page = parseInt(_page) + 1;
	var _id = ul.getAttribute("id").toString().replace("ul_list", "");
	var obj = document.getElementById("title" + _id);
	obj.setAttribute("page", _page);
	return obj;
}
//获取page
function getPage(ul) {
	var _id = ul.getAttribute("id").toString().replace("ul_list", "");
	var obj = document.getElementById("title" + _id);
	return obj;
}