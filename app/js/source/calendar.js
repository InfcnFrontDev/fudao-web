var LunarDate = {
	sTermInfo: new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758),
	madd: new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334),
	HsString: '甲乙丙丁戊己庚辛壬癸',
	EbString: '子丑寅卯辰巳午未申酉戌亥',
	NumString: "一二三四五六七八九十",
	MonString: "正二三四五六七八九十冬腊",
	solarTerm: new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"),
	jq: new Array('0105小寒', '0120大寒', '0203立春', '0218雨水', '0305惊蜇', '0320春分', '0404清明', '0419谷雨', '0505立夏', '0520小满', '0605芒种', '0621夏至', '0706小暑', '0722大暑', '0807立秋', '0822处暑', '0907白露', '0922秋分', '1008寒露', '1023霜降', '1107立冬', '1122小雪', '1206大雪', '1221冬至'),
	CalendarData: new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95),
	ancientHour: new Array({
		s: '23-00',
		c: '子时'
	}, {
		s: '01-03',
		c: '丑时'
	}, {
		s: '03-04',
		c: '寅时'
	}, {
		s: '05-06',
		c: '卯时'
	}, {
		s: '07-08',
		c: '辰时'
	}, {
		s: '09-10',
		c: '巳时'
	}, {
		s: '11-12',
		c: '午时'
	}, {
		s: '13-14',
		c: '未时'
	}, {
		s: '15-16',
		c: '申时'
	}, {
		s: '17-18',
		c: '酉时'
	}, {
		s: '19-20',
		c: '戌时'
	}, {
		s: '21-22',
		c: '亥时'
	}),
	ancientOneFour: new Array({
		s: 0,
		e: 15,
		c: '一刻'
	}, {
		s: 16,
		e: 30,
		c: '二刻'
	}, {
		s: 31,
		e: 45,
		c: '三刻'
	}, {
		s: 46,
		e: 59,
		c: '四刻'
	}),
	ancientFiveEight: new Array({
		s: 0,
		e: 15,
		c: '五刻'
	}, {
		s: 16,
		e: 30,
		c: '六刻'
	}, {
		s: 31,
		e: 45,
		c: '七刻'
	}, {
		s: 46,
		e: 59,
		c: '八刻'
	}),
	Year: null,
	Month: null,
	Day: null,
	TheDate: null,
	GetBit: function(m, n) {
		return(m >> n) & 1;
	},
	//===== 某年的第n个节气为某月某日(从0小寒起算)
	sTerm: function(y, n) {
		var offDate = new Date((31556925974.7 * (y - 1900) + this.sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
		//return (offDate.getUTCDate())
		return offDate;
	},
	getSolarTerms: function(year, SolarTermsNo) {
		return parseInt(365.242 * (year - 1900) + 6.2 + 15.22 * SolarTermsNo - 1.9 * Math.sin(0.262 * SolarTermsNo));
	},
	e2c: function() {
		this.TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
		var total, m, n, k;
		var isEnd = false;
		var tmp = this.TheDate.getFullYear();
		total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + this.madd[this.TheDate.getMonth()] + this.TheDate.getDate() - 38;
		if(this.TheDate.getYear() % 4 == 0 && this.TheDate.getMonth() > 1) {
			total++;
		}
		for(m = 0;; m++) {
			k = (this.CalendarData[m] < 0xfff) ? 11 : 12;
			for(n = k; n >= 0; n--) {
				if(total <= 29 + this.GetBit(this.CalendarData[m], n)) {
					isEnd = true;
					break;
				}
				total = total - 29 - this.GetBit(this.CalendarData[m], n);
			}
			if(isEnd)
				break;
		}
		this.Year = 1921 + m;
		this.Month = k - n + 1;
		this.Day = total;
		if(k == 12) {
			if(this.Month == Math.floor(this.CalendarData[m] / 0x10000) + 1) {
				this.Month = 1 - this.Month;
			}
			if(this.Month > Math.floor(this.CalendarData[m] / 0x10000) + 1) {
				this.Month--;
			}
		}
	},
	GetcDateString: function() {
		var tmp = "";
		if(this.Month < 1) {
			tmp += "(闰)";
			tmp += this.MonString.charAt(-this.Month - 1);
		} else {
			tmp += this.MonString.charAt(this.Month - 1);
		}
		tmp += "月";
		tmp += (this.Day < 11) ? "初" : ((this.Day < 20) ? "十" : ((this.Day < 30) ? "廿" : "三十"));
		if(this.Day % 10 != 0 || this.Day == 10) {
			tmp += this.NumString.charAt((this.Day - 1) % 10);
		}
		return tmp;
	},
	GetLunarDay: function(solarYear, solarMonth, solarDay, solarHour, solarMinute) {
		if(solarYear < 1921 || solarYear > 2220) {
			return "";
		} else {

			solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
			this.e2c(solarYear, solarMonth, solarDay);
			var jieqi = "d1";
			var s = '';
			if(solarMonth < 9) s += '0';
			s += '' + (solarMonth + 1);
			if(solarDay < 10) s += '0';
			s += '' + (solarDay);
			var i = 0;
			while(i < this.jq.length && s >= this.jq[i]) {
				i++;
			}
			if(i == 24) {
				i--;
			} else if(s != this.jq[i].substr(0, 4) && i != 0) {
				i--;
			}
			jieqi = this.jq[i].substr(4);
			var ancientHour = "";
			var ancientKey = "";
			var ancientValue = "";
			for(var i = 0; i < this.ancientHour.length; i++) {
				if(this.ancientHour[i].s.indexOf(solarHour) == 0) {
					ancientKey = "ancientOneFour";
					ancientHour = this.ancientHour[i].c;
				} else if(this.ancientHour[i].s.indexOf(solarHour) > 0) {
					ancientKey = "ancientFiveEight";
					ancientHour = this.ancientHour[i].c;
				} else {}
			}
			for(var j = 0; j < this[ancientKey].length; j++) {
				if(this[ancientKey][j].s <= solarMinute && this[ancientKey][j].e >= solarMinute) {
					ancientValue = this[ancientKey][j].c;
				}
			}
			return this.GetcDateString() + "," + jieqi + "," + ancientHour + ancientValue;
		}
	}
};

function fun_time() {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth();
	var d = date.getDate();
	var h = date.getHours();
	var min = date.getMinutes();

	var _hours, minutes;
	if(h < 10) {
		_hours = "0" + h;
	} else {
		_hours = h;
	}
	if(min < 10) {
		minutes = "0" + min;
	} else {
		minutes = min;
	}
	var Tiangan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
	var Dizhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
	var YYYY = y - 1864;
	if(document.getElementById("ymd") != null) {
		document.getElementById("ymd").innerText = y + '年' + (m + 1) + "月" + d + "日";
	}
	if(document.getElementById("ymd_yinli") != null) {
		document.getElementById("ymd_yinli").innerText = Tiangan[YYYY % 10] + Dizhi[YYYY % 12] + "年";
	}
	if(document.getElementById("div_hour") != null) {
		document.getElementById("div_hour").innerText = _hours + ":" + minutes;
	}
	if(document.getElementById("week") != null) {
		document.getElementById("week").innerText = getDayofWeek(date);
	}
	if(document.getElementById("lunar") != null) {
		var temp = LunarDate.GetLunarDay(y, (m + 1), d, h, min).split(",");
		document.getElementById("lunar").innerHTML = temp[0];
		document.getElementById("lunarHour").innerHTML = temp[2];
	}
	if(document.getElementById("festival")!=null){
		var temp = LunarDate.GetLunarDay(y, (m + 1), d, h, min).split(",");
		document.getElementById("festival").innerHTML = temp[1] == "" ? "" : "" + temp[1];
	}
	if(document.getElementById("jieri") != null) {
		var festival = '';
		var lDObj = new Lunar(date);
		var LM = lDObj.month;
		var LD = parseInt(lDObj.day);
		var reg = new RegExp((LM < 10 && "0" || "") + LM + (LD < 10 && "0" || "") + LD + '([^\\d]+)', '');
		if(lFtv.match(reg) != null) {
			festival += ' <font color="#ff0000">' + RegExp.$1 + '</font>'
		};
		reg = new RegExp((m < 9 && "0" || "") + (m + 1) + (d < 10 && "0" || "") + d + '([^\\d]+)', '');
		if(sFtv.match(reg) != null) festival += ' <font color="#ff0000">' + RegExp.$1 + '</font>';
		document.getElementById("jieri").innerHTML = festival;
	}

}
var lFtv = "0101春节0115元宵节0505端午节0707七夕情人节0715中元节0815中秋节0909重阳节1208腊八节1224小年0100除夕";
var sFtv = "0101元旦0214情人节0308妇女节0312植树节0315消费者权益日0401愚人节0501劳动节0504青年节0512护士节0601儿童节0701建党节0801建军节0910教师节0928孔子诞辰1001国庆节1006老人节1024联合国日1224平安夜1225圣诞节";

// 获取节气
function fun_getJieQi() {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth();
	var d = date.getDate();
	var h = date.getHours();
	var min = date.getMinutes();
	return LunarDate.GetLunarDay(y, (m + 1), d, h, min).split(",");
}

// 获取当前节气的上、下节气
function fun_getUpAndNextJieQi() {
	var jieqis = new Array('小寒', '大寒', '立春', '雨水', '惊蜇', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至');
	var curJieQi = fun_getJieQi()[1],
		curIndex = 0,
		_len = jieqis.length,
		nextIndex, upIndex;
	for(var i = 0; i < _len; i++) {
		if(jieqis[i] == curJieQi) {
			curIndex = i;
		}
	}
	if(curIndex == 0) {
		upIndex = 23;
		nextIndex = curIndex + 1;
	} else if(curIndex == 23) {
		upIndex = curIndex - 1;
		nextIndex = 0;
	} else {
		upIndex = curIndex - 1;
		nextIndex = curIndex + 1;
	}
	var _curDate = new Date(),
		_year = _curDate.getFullYear(),
		curJqDate, upJqDate, nextJqDate;
	// 当前节气日期类型
	curJqDate = LunarDate.sTerm(_year, curIndex);
	// 当前节气第几天
	var days = parseInt((_curDate - curJqDate) / (1000 * 60 * 60 * 24)) + 1;
	document.getElementById("days").innerHTML = '第 ' + days + ' 天';
	upJqDate = LunarDate.sTerm(_year, upIndex).Format('yyyy-MM-dd');
	nextJqDate = LunarDate.sTerm(_year, nextIndex).Format('yyyy-MM-dd');
	document.getElementById("upJieQi").innerHTML = jieqis[upIndex] + " (" + upJqDate + ")";
	document.getElementById("nextJieQi").innerHTML = jieqis[nextIndex] + " (" + nextJqDate + ")";
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function getDayofWeek(date) {
	var numOfWeek = date.getDay();
	switch(numOfWeek) {
		case 0:
			return "星期日";
		case 1:
			return "星期一";
		case 2:
			return "星期二";
		case 3:
			return "星期三";
		case 4:
			return "星期四";
		case 5:
			return "星期五";
		case 6:
			return "星期六";
	}
}

function Lunar(objDate) {
	var i, leap = 0,
		temp = 0;
	var baseDate = new Date(1900, 0, 31);
	var offset = (objDate - baseDate) / 86400000;
	this.dayCyl = offset + 40;
	this.monCyl = 14;
	for(i = 1900; i < 2050 && offset > 0; i++) {
		temp = lYearDays(i);
		offset -= temp;
		this.monCyl += 12;
	}
	if(offset < 0) {
		offset += temp;
		i--;
		this.monCyl -= 12;
	}
	this.year = i;
	this.yearCyl = i - 1864;
	leap = leapMonth(i);
	this.isLeap = false
	for(i = 1; i < 13 && offset > 0; i++) {
		if(leap > 0 && i == (leap + 1) && this.isLeap == false) {
			--i;
			this.isLeap = true;
			temp = leapDays(this.year);
		} else {
			temp = monthDays(this.year, i);
		}
		if(this.isLeap == true && i == (leap + 1)) this.isLeap = false;
		offset -= temp;
		if(this.isLeap == false) this.monCyl++;
	}
	if(offset == 0 && leap > 0 && i == leap + 1)
		if(this.isLeap) {
			this.isLeap = false;
		} else {
			--i;
			this.isLeap = true;
			--this.monCyl;
		}
	if(offset < 0) {
		offset += temp;
		--i;
		--this.monCyl;
	}
	this.month = i;
	this.day = offset + 1;
}
var lunarInfo = new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);

function lYearDays(y) {
	var i, sum = 348;
	for(i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
	return sum + leapDays(y);
}

function leapMonth(y) {
	return lunarInfo[y - 1900] & 0xf;
}

function leapDays(y) {
	if(leapMonth(y)) return(lunarInfo[y - 1900] & 0x10000) ? 30 : 29;
	else return(0);
}

function monthDays(y, m) {
	return(lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29;
}