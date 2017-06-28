/**
 * Created by Administrator on 2016/8/20.
 */
$(document).ready(function(){
    var $mainNavItems = $(".main_nav_items");
    var $subNavItems = $(".sub_nav_items");
    $mainNavItems.mouseover(function(){
        var index = $(this).index();
        if(index === 9){
            $mainNavItems.removeClass("nav_on");
            $subNavItems.css({"display":"none"});
        }
        else{
            $mainNavItems.eq(index).addClass("nav_on").siblings().removeClass("nav_on");
            $subNavItems.eq(index).css({"display":"block"}).siblings().css({"display":"none"});
        }
    });

    jpgMove();
    var $focusMap = $("#jpg");
    var jpgLeft = 0;
    var timer;
        function jpgMove(){
        timer = setInterval(function(){
            if(jpgLeft <= -1390){
                jpgLeft = 0;
            }
            else{
                $focusMap.css({"margin-left":jpgLeft--});
            }
        },30);
    }

    $focusMap.hover(function(){
        clearInterval(timer);
    },function(){
        jpgMove();
    })
});
