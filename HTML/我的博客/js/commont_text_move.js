/**
 * Created by Administrator on 2016/10/13.
 */

function text_move(ele){
   $(ele).animate({
       "text-indent":"50px",
       "opacity":"1"
   },3000,function(){
       $(this).css( "text-indent","0");
   });

}

function text_flash(ele){
    $(ele).animate({
        "opacity":"0.8"
    },1000);

    setTimeout(
        $(ele).animate({
            "opacity":"0.3"
        },100)
        ,1000);

    setTimeout(
        $(ele).animate({
            "opacity":"0.8"
        },200)
        ,1200);

    setTimeout(
        $(ele).animate({
            "opacity":"0.3"
        },200)
        ,1300);

    setTimeout(
        $(ele).animate({
            "opacity":"1"
        },200)
        ,1500);

}

function fixedActive(){
    var $returnTop = $(".return_top");
    $(window).scroll(function() {
        if ($(document).scrollTop() > 0) {
            //alert(1)
            $returnTop.css("display", "block");
        } else {
            //alert($(document).scrollTop())
            $returnTop.css("display", "none");
        }
    });

    $returnTop.click(function(){
        $(document).scrollTop(0);
    })
}

$(document).ready(function(){
        text_move(".logo_text1");
        setTimeout("text_move('.logo_text2')",4000);
        setTimeout("text_flash('.logo_text3')",7000);
        fixedActive();
}
);