function fun_areaPosition() {
	var areaPosition = localStorage.getItem('areaPosition') || null;
	plus.geolocation.getCurrentPosition(function(position) {
		if(areaPosition == null) {
			areaPosition = position.address.city;
			localStorage.setItem('areaPosition', areaPosition);
			syncAJAX();
		} else if(areaPosition != position.address.city && areaPosition != null) {
			areaPosition = position.address.city;
			localStorage.setItem('areaPosition', areaPosition);
			syncAJAX();
		}
		window.setTimeout("fun_areaPosition()", 600000);
	}, function(error) {
		window.setTimeout("fun_areaPosition()", 600000);
	}, {
		enableHighAccuracy: false,
		maximumAge: 1000,
		provider: "baidu"
	});
}

function syncAJAX() {
	mui.ajax(ADDR + "app/accountInfoAction!areaPosition.action", {
		data: {
			appid: getUser().appid,
			areaPosition: localStorage.getItem('areaPosition')
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 5000,
		async: false,
		success: function(data) {

		},
		error: function(xhr, type, errorThrown) {}
	});
}