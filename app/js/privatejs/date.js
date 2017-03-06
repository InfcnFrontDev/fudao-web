/* 
 * 日期插件
 * 滑动选取日期（年，月，日）
 * V1.1
 */
(function($) {
	$.fn.date = function(options, Ycallback, Ncallback) {
		//插件默认选项
		var that = $(this);
		var docType = $(this);
		var datetime = false;
		var nowdate = new Date();
		var indexY = 1,
			indexM = 1,
			indexD = 1;
		var indexH = 1,
			indexI = 1,
			indexS = 0;
		var initY = parseInt((nowdate.getFullYear())) - 1900;
		var initM = parseInt(nowdate.getMonth() + "") + 1;
		var initD = parseInt(nowdate.getDate() + "");
		var yearScroll = null,
			monthScroll = null,
			dayScroll = null;
		var HourScroll = null,
			MinuteScroll = null,
			SecondScroll = null;
		$.fn.date.defaultOptions = {
				beginyear: 1900, //日期--年--份开始
				endyear: nowdate.getFullYear() - par_year, //日期--年--份结束
				beginmonth: 1, //日期--月--份结束
				endmonth: 12, //日期--月--份结束
				beginday: 1, //日期--日--份结束
				endday: 31, //日期--日--份结束
				curdate: false, //打开日期是否定位到当前日期
				//theme:"date",                    //控件样式（1：日期，2：日期+时间）
				mode: null, //操作模式（滑动模式）
				event: "click", //打开日期插件默认方式为点击后后弹出日期 
				show: true
			}
			//用户选项覆盖插件默认选项   
		var opts = $.extend(true, {}, $.fn.date.defaultOptions, options);
		createUL(); //动态生成控件显示的日期
		init_iScrll(); //初始化iscrll
		extendOptions(); //显示控件
		that.blur();
		refreshDate();
		bindButton();
		function refreshDate() {
			yearScroll.refresh();
			monthScroll.refresh();
			dayScroll.refresh();
			resetInitDete();
			yearScroll.scrollTo(0, initY * 50, 120, true);
			monthScroll.scrollTo(0, initM * 40 - 40, 100, true);
			dayScroll.scrollTo(0, initD * 40 - 40, 100, true);
		}

		function resetIndex() {
			indexY = 1;
			indexM = 1;
			indexD = 1;
		}

		function resetInitDete() {
			if(opts.curdate) {
				return false;
			} else if(that.text() === "") {
				return false;
			}
			initY = parseInt(that.text().substr(0, 4)) - opts.beginyear;
			initM = parseInt(that.text().substr(5, 2));
			initD = parseInt(that.text().substr(8, 2));
		}

		function bindButton() {
			var datestr = $("#yearwrapper ul li:eq(" + indexY + ")").html().substr(0, $("#yearwrapper ul li:eq(" + indexY + ")").html().length - 1) + "-" +
				$("#monthwrapper ul li:eq(" + indexM + ")").html().substr(0, $("#monthwrapper ul li:eq(" + indexM + ")").html().length - 1) + "-" +
				$("#daywrapper ul li:eq(" + Math.round(indexD) + ")").html().substr(0, $("#daywrapper ul li:eq(" + Math.round(indexD) + ")").html().length - 1);
			that.text(datestr);
		}

		function extendOptions() {
			$("#datePage").show();
			$("#dateshadow").show();
		}
		var strY, strM;

		function getCurYearAndMonth() {
			strY = $("#yearwrapper ul li:eq(" + indexY + ")").html().substr(0, $("#yearwrapper ul li:eq(" + indexY + ")").html().length - 1);
			strM = $("#monthwrapper ul li:eq(" + indexM + ")").html().substr(0, $("#monthwrapper ul li:eq(" + indexM + ")").html().length - 1)
		}
		//日期滑动
		function init_iScrll() {
			getCurYearAndMonth();
			yearScroll = new iScroll("yearwrapper", {
				snap: "li",
				vScrollbar: false,
				onScrollEnd: function() {
					indexY = (this.y / 40) * (-1) + 1;
					getCurYearAndMonth();
					opts.endday = checkdays(strY, strM);
					$("#daywrapper ul").html(createDAY_UL());
					dayScroll.refresh();
					bindButton();
				}
			});
			monthScroll = new iScroll("monthwrapper", {
				snap: "li",
				vScrollbar: false,
				onScrollEnd: function() {
					indexM = (this.y / 40) * (-1) + 1;
					getCurYearAndMonth();
					opts.endday = checkdays(strY, strM);
					$("#daywrapper ul").html(createDAY_UL());
					dayScroll.refresh();
					bindButton();
				}
			});
			dayScroll = new iScroll("daywrapper", {
				snap: "li",
				vScrollbar: false,
				onScrollEnd: function() {
					indexD = (this.y / 40) * (-1) + 1;
					bindButton();
				}
			});
		}

		//日期+时间滑动
		function init_iScroll_datetime() {
			HourScroll = new iScroll("Hourwrapper", {
				snap: "li",
				vScrollbar: false,
				onScrollEnd: function() {
					indexH = Math.round((this.y / 40) * (-1)) + 1;
					HourScroll.refresh();
				}
			})
			MinuteScroll = new iScroll("Minutewrapper", {
				snap: "li",
				vScrollbar: false,
				onScrollEnd: function() {
					indexI = Math.round((this.y / 40) * (-1)) + 1;
					HourScroll.refresh();
				}
			})
			SecondScroll = new iScroll("Secondwrapper", {
				snap: "li",
				vScrollbar: false,
				onScrollEnd: function() {
					indexS = Math.round((this.y / 40) * (-1));
					HourScroll.refresh();
				}
			})
		}

		function checkdays(year, month) {
			var new_year = year; //取当前的年份        
			var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）        
			if(month > 12) { //如果当前大于12月，则年份转到下一年        
				new_month -= 12; //月份减        
				new_year++; //年份增        
			}
			var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天        
			return(new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate(); //获取当月最后一天日期    
		}

		function createUL() {
			CreateDateUI();
			$("#yearwrapper ul").html(createYEAR_UL());
			$("#monthwrapper ul").html(createMONTH_UL());
			$("#daywrapper ul").html(createDAY_UL());
		}

		function CreateDateUI() {
			var str = '' +
				'<div id="datePage" class="page">' +
				'<section>' +
				'<div id="datetitle">选择生日</div>' +
				'<div id="datemark"><a id="markyear"></a><a id="markmonth"></a><a id="markday"></a></div>' +
				'<div id="datescroll">' +
				'<div id="yearwrapper">' +
				'<ul></ul>' +
				'</div>' +
				'<div id="monthwrapper">' +
				'<ul></ul>' +
				'</div>' +
				'<div id="daywrapper">' +
				'<ul></ul>' +
				'</div>' +
				'</div>' +
				'</section>' +
				'</div>';
			$("#datePlugin").html(str);
		}

		function addTimeStyle() {
			$("#datePage").css("height", "380px");
			$("#datePage").css("top", "60px");
			$("#yearwrapper").css("position", "absolute");
			$("#yearwrapper").css("bottom", "200px");
			$("#monthwrapper").css("position", "absolute");
			$("#monthwrapper").css("bottom", "200px");
			$("#daywrapper").css("position", "absolute");
			$("#daywrapper").css("bottom", "200px");
		}
		//创建 --年-- 列表
		function createYEAR_UL() {
			var str = "<li>&nbsp;</li>";
			for(var i = opts.beginyear; i <= opts.endyear; i++) {
				str += '<li>' + i + '年</li>'
			}
			return str + "<li>&nbsp;</li>";;
		}
		//创建 --月-- 列表
		function createMONTH_UL() {
			var str = "<li>&nbsp;</li>";
			for(var i = opts.beginmonth; i <= opts.endmonth; i++) {
				if(i < 10) {
					i = "0" + i
				}
				str += '<li>' + i + '月</li>'
			}
			return str + "<li>&nbsp;</li>";;
		}
		//创建 --日-- 列表
		function createDAY_UL() {
			$("#daywrapper ul").html("");
			var str = "<li>&nbsp;</li>";
			for(var i = opts.beginday; i <= opts.endday; i++) {
				str += '<li>' + i + '日</li>'
			}
			return str + "<li>&nbsp;</li>";;
		}
	}
})(jQuery);