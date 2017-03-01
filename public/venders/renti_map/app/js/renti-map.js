(function () {
    'use strict';

    var RentiMap = function (element, options) {

        var $popover = $('<div class="popover-box popover-hide"><div class="popover" transition="modal"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>');

        $(element).after($popover);

        var data = options.data;

        var jl_maps = data.jl_map.split(',');

        $(element).empty();
        $(element).load('venders/renti_map/app/svg/' + jl_maps[0] + '.svg', function () {
            var $svg = $("#svg");
            $svg.attr('style', 'display: inline; width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit;');

            var $jingluo = $('#jingluo');

            $(data.jl_id.split(',')).each(function () {
                $jingluo.find('#' + this).attr('display', 'block');
            });

            // Expose to window namespace for testing purposes
            var panZoom = svgPanZoom("#svg", {
                zoomEnabled: true,
                panEnabled: true,
                controlIconsEnabled: false,
                zoomScaleSensitivity: 0.5,
                minZoom: 0,
                maxZoom: 50,
                fit: 1,
                center: 1
            });

            showJlInfo(data);
        });

        function showJlInfo(data) {

            var title = "<strong>健康提醒：</strong>" + data.tixing;
            var content = "<p><strong>循行筋络：</strong>" + data.jl_name + "</p>";
            content += "<p><strong>当令器官：</strong>" + data.qiguan + "</p>";
            content += "<p><strong>身体状况：</strong>" + data.zhuangkuang + "</p>";
            content += "<p><strong>常见症状：</strong>" + data.zhengzhuang + "</p>";
            content += "<p><strong>宜：</strong>" + data.yi + "</p>";
            content += "<p><strong>忌：</strong>" + data.ji + "</p>";
            content += "<p><strong>养生方法：</strong>" + data.yangsheng + "</p>";
            content += "<p><strong>健康小贴士：</strong>" + data.laonianren + "</p>";
            showPopover(title, content);
        }

        function showPopover(title, content) {
            //$popover.find('.popover-title').html(title);
            $popover.find('.popover-title').html(title);
            $popover.find('.popover-content').html(content);
            $popover.removeClass('popover-hide').addClass('popover-show');
            //$popover.removeClass('popover-hide').addClass('popover-show');

        }

        function hidePopover() {
            $popover.removeClass('popover-show').addClass('popover-hide');
        }

        function clickPopover() {
            var ele = event.srcElement || event.target;

            if ($(ele).parents('.popover').length == 0) {
                hidePopover();
            }
        }

        $popover.on("click", clickPopover);
    };

    window.RentiMap = RentiMap;

})();
