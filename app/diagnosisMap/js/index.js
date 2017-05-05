function loadSvg(svgPath) {
    // 加载SVG
    $('#svgGraph').load(svgPath, function (result) {
        var $buweis = $('#buweis path');
        $buweis.attr('fill', 'transparent').css('cursor', 'pointer');
        $buweis.mouseover(function () {
            $(this).attr('fill', 'blue').css('opacity', '0.3');
        });
        $buweis.mouseout(function () {
            $(this).attr('fill', 'transparent')
        });
        // 单击事件
        $buweis.click(function () {
            var id = $(this).attr('id');
            if ("zuoshou" === id || 'youshou' === id|| 'tui' === id) {
            	id = 'sizhi';
            }
            fun_renti(id);
        });
    });
}