/**
 * Created by yangkk on 2016/9/26.
 */

$(function () {

    $('ul.fly li').click(function () {
        var $flyStart = $(this);
        var $flyEnd = $('.fly-end');

        if (browser() == 'IE' && ieVersion() < 10) {
            $flyEnd.val($flyStart.text())
        } else {

            $('<div style="z-index: 99;">' + $flyStart.text() + '</div>').fly({
                start: {top: $flyStart.offset().top, left: $flyStart.offset().left},
                end: {top: $flyEnd.offset().top, left: $flyEnd.offset().left + 100},
                vertex_Rtop: 200,
                onEnd: function () {
                    this.destroy();
                    $flyEnd.val($flyStart.text())
                }
            });
        }
    });

    function browser() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera"
        } //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "Firefox";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1) {
            return "Chrome";
        }//判断是否Chrome浏览器
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        }//判断是否IE浏览器
    }

    function ieVersion() {
        var browser = navigator.appName
        var b_version = navigator.appVersion
        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");

        if (browser == "Microsoft Internet Explorer") {
            return parseInt(trim_Version.replace('MSIE', ''));
        }
    }

});
