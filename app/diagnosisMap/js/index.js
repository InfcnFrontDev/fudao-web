function loadSvg(svgPath) {
    // 加载SVG
    $('#svgGraph').load(svgPath, function (result) {
        var $buweis = $('#buweis path');
        $buweis.attr('fill', 'transparent').css('cursor', 'pointer');
        // $buweis.mouseover(function () {
        //     $(this).attr('fill', '#fff').css('opacity', '0.3');
        // });
        // $buweis.mouseout(function () {
        //     $(this).attr('fill', 'transparent')
        // });
        // 单击事件
        // svgGraph
        // $('#svgGraph').on("click",$buweis,function () {
        //     var id = $(this).attr('id');
        //     if ("zuoshou" === id || 'youshou' === id|| 'tui' === id) {
        //         id = 'sizhi';
        //     }
        //     fun_renti(id);
        // })
        $buweis.click(function (e) {
            console.log("aaaaaa")
            // $(this).attr('fill', '#fff').css('opacity', '0.7');

            var id = $(this).attr('id');
            if ("zuoshou" === id || 'youshou' === id|| 'tui' === id) {
            	id = 'sizhi';
            }
            fun_renti(id);
            // e.preventDefault();
        });
    });
}