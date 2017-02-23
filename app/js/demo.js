/**
 * Created by dell on 2016/8/22.
 */
window.onload=function () {
    var li=$(".l-bottom li");
    var li2=$(".l-bottom2 li");
    var li3=$(".l-bottom3 li");
    var box=$(".l-box");
    var box2=$(".l-box2");
    var box3=$(".box3");
    var ini1=$(".ini1");
    var ini2=$(".ini2");
    var nope1=$(".nope1");
    var nope2=$(".nope2");
    var uu1=$(".uu1 li img");
    var uu2=$(".uu2 li img");
    var lll=$(".jiasuo-list li")
    var la=$(".la option")
    $(".l-bottom li").on("click",function(){
        for(var i=0;i< li.length;i++){
            li[i].className="";
            box.css("display","none")
        }
        box.eq($(this).index()).css("display","block");
        $(this).addClass("blue")
    });
    //["全部","期刊","论文","会议","专利","成果","标准","网络信息"]

    var arr=[];
    for(var j=0;j< la.length;j++){
        arr[j]=la[j].innerHTML

    }
    Array.prototype.hj=function(){
        var arr3=[];
        var df={};
        for(var k=0;k<this.length;k++){
            if(!df[this[k]]){
                arr3.push(this[k]);
                df[this[k]]=2;
            }
        }
        return arr3
    };
    arr2=arr.hj();
    $(".jiasuo-list li").on("click",function(){
        var num=$(this).index();
        var str=$(this).text();
        for(var i=0;i< lll.length;i++){
            lll[i].className="";

        }
    console.log(num);
     arr2.splice(num,1);
        la[0].innerHTML=str;
        for(var z=1;z<=la.length-1;z++){
            k=z-1;
            la[z].innerHTML=arr2[k]
        }
        arr2=arr.hj();
        $(this).addClass("linee")
    });


    $(".uu1 li").on("click",function(){
        var num=$(this).index();
        for(var i=0;i< uu1.length;i++){
            uu1[i].src="img/ccc.png";
            uu2[i].src="img/ccc.png";
        }
        uu1[num].src="img/blue-circle.png"
    });
    $(".uu2 li").on("click",function(){
        var num=$(this).index();
        for(var i=0;i< uu2.length;i++){
            uu2[i].src="img/ccc.png";
            uu1[i].src="img/ccc.png";
        }
        uu2[num].src="img/blue-circle.png"
    });
    var imgg=$(".uuu li img")
    $(".uuu li").on("click",function(){
        var num=$(this).index();
        for(var i=0;i< $(".uuu li").length;i++){
            imgg[i].src="img/ccc.png";

        }
        imgg[num].src="img/red.png"
    });
    $(".tr1 .td2 .s1").on("click",function(){

            $(this).addClass("cblue");
            $(".tr1 .td2 .s2").addClass("cc")

    });
    $(".tr1 .td2 .s2").on("click",function(){
            $(this).removeClass("cc");
            $(".tr1 .td2 .s1").removeClass("cblue")

    });
    $(".tr1 .td3 #ww1").on("click",function(){

        $(this).addClass("cblue");
        $(".tr1 .td3 #ww2").addClass("cc")

    });
    $(".tr1 .td3 #ww2").on("click",function(){
        $(this).removeClass("cc");
        $(".tr1 .td3 #ww1").removeClass("cblue")

    });
    $(".tr1 .td4 #ww4").on("click",function(){

        $(this).addClass("cblue");
        $(".tr1 .td4 #ww5").addClass("cc")

    });
    $(".tr1 .td4 #ww5").on("click",function(){
        $(this).removeClass("cc");
        $(".tr1 .td4 #ww4").removeClass("cblue")

    });
    $(".tr1 .td5 #ww6").on("click",function(){

        $(this).addClass("cblue");
        $(".tr1 .td5 #ww7").addClass("cc")

    });
    $(".tr1 .td5 #ww7").on("click",function(){
        $(this).removeClass("cc");
        $(".tr1 .td5 #ww6").removeClass("cblue")

    });

    $(".l-bottom2 li").on("click",function(){
        for(var i=0;i< li2.length;i++){
            li2[i].className="";
            box2.css("display","none")
        }
        box2.eq($(this).index()).css("display","block");
        $(this).addClass("blue")
    });
    var lan=$(".lan h5")
    var qie=$(".book-qie")
    $(".lan h5").on("click",function(){
        for(var i=0;i< lan.length;i++){
            lan[i].style.backgroundColor="#ffffff"
            qie.css("display","none")
        }
        console.log(qie)
        qie.eq($(this).index()).css("display","block");
        $(this).css("background-color","#0065b3")
    });
var h1=$(".lanmu-left h2")
    $(".lanmu-left h2").on("click",function(){
        for(var i=0;i< h1.length;i++){
            h1[i].className=""

        }
        console.log(55)
        $(this).addClass("h2")
    });
    $(".l-bottom3 li").on("click",function(){
        for(var i=0;i< li3.length;i++){
            li3[i].className="";
            box3.css("display","none")
        }
        box3.eq($(this).index()).css("display","block");
        $(this).addClass("blue")
    });
    ini1.on("focus", function () {
        nope2.css("display","none")
    });
    var inno= $(".tr1 .td1 input")

    $(".tr1 .td1 input").on("click", function () {

        if($('.tr2 .td1 input').is(':checked')){
            $(".tr2 .td1 input").prop("checked",false)

            flag=false
        }else{
            $(".tr2 .td1 input").prop("checked",true)
            flag=true
        }

    });

    var shou1=$(".tr2 .td6 .shou1");
    var shou2=$(".tr2 .td6 .shou2");
    var shou3=$(".tr2 .td6 .shou3");
    for(var k=0;k<shou3.length;k++){

        shou3[k].onclick=function () {
             var num=$(this).parent().parent().index()-1
            for(var i=0;i<shou3.length;i++){
                shou1[i].src="img/flie2.png";
                shou2[i].src="img/down2.png";
                shou3[i].src="img/star2.png"
            }
            this.src="img/star.png"

            shou2[num].src="img/down.png"
            shou1[num].src="img/flie.png"

        }
    }
var fl=true
    var h2=$(".h2")
    var  i3=document.getElementById("i3")
$(".i3").on("click", function () {

    $(".uuu").slideToggle();
    if(fl){
        this.src="img/xia-v.png"
        fl=false
        //console.log(fl)
    }else{
        this.src="img/shang-v.png"
        fl=true
        console.log(fl)
    }

})
    $(".h2").on("click", function () {
        var num=$("this").index()
        i3.click()
    })

    //var in3=document.getElementById("nope2")
    //var imm1=document.getElementById("imm1")
    //
    ////in3.onblur= function () {
    ////    if(this.value=""){
    ////      imm1.style.display="block"
    ////    }else{
    ////        imm1.style.display="none"
    ////    }
    ////    console.log(in3.value)
    ////}
    //ini1.on("blur",function(){
    //    if(ini1.value===undefined){
    //        nope2.css("display","block")
    //    }else if(ini1.value=" "){
    //        nope2.css("display","none")
    //    }
//console.log(ini1.value)
//    })
    ini2.on("focus", function () {
        nope1.css("display","none")
    })
    var z=0;
    function botton(){
        var li=$("#body .botton ul li");
        $("#body .botton ul li").on("click", function () {
            $(this).addClass("bluee").siblings().removeClass("bluee");
            z=$(this).index()-2
        })


    }
    botton();

    function next(){
        var li=$("#body .botton ul li");
        $(".last").on("click", function () {
//console.log(z)
            for(var i=0;i<li.length;i++){
                li[i].className=""
            }
            if(z<li.length-1){
                z++
            }else{
                z=0
            }
            li[z].className="bluee"
        });
        $(".next").on("click", function () {
            for(var i=0;i<li.length;i++){
                li[i].className=""
            }
            if(z>0){
                z--
            }else{
                z=9
            }
            li[z].className="bluee"
        });
        //$(".shouye").on("click", function () {
        //    for(var i=0;i<li.length;i++){
        //        li[i].className=""
        //    }
        //    li[0].className="blue";
        //    z=0
        //});
        //
        //$(".shouye2").on("click", function () {
        //    for(var i=0;i<li.length;i++){
        //        li[i].className=""
        //    }
        //    li[8].className="blue";
        //    z=8;
        //})
    }
    next()


}
