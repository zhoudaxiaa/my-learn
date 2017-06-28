/**
 * Created by Administrator on 2016/8/18.
 */
$(document).ready(function(){
    //导航展开
    var $sddm = $("#sddm li");
    var $m = $("#sddm div");
    $sddm.hover(function(){
        var index = $(this).index();
        //alert($m.length)
        $m.eq(index).css({"visibility":"visible"});
    },function(){
        var index = $(this).index();
        $m.eq(index).css({"visibility":"hidden"});
    });

    //轮播图
    var $img = $("#pic img");
    var $focus_ball = $("#focus_ball li");
    var $pic = $("#pic");
    var $fma = $("#focus_map a");
    var $pre = $(".pre");
    var $next = $(".next");
    var $shadow = $(".shadow");
    var i = 0;
    var timer;
    time();
    moveBtn();
    showBtn();
    clickBtn();
    //计时器
    function time(){
        timer = setInterval(function(){
            if(i === 6){
                i = 0;
            }
            showFun(i);
            //$img.eq(i);
            i++;
        },4000);
    }
    //显示
    function showFun(){
        $img.eq(i).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
        $focus_ball.eq(i).addClass("on").siblings().removeClass("on");
        $shadow.eq(i).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
    }

    //鼠标移到小按钮区
    function moveBtn(){
        $focus_ball.hover(function(){
            clearInterval(timer);
            var index = $(this).index();
            showFun(index);
        },function(){
            var index = $(this).index();
            i = index+1;
            time();
        })
    }

    //鼠标移到图片显示前进后退按钮
    function showBtn(){
        $pic.hover(function(){
            //alert(1)
            $fma.css({"visibility":"visible"});
            $fma.mouseover(function(){
                $fma.css({"visibility":"visible"});
            });
        },function(){
            $fma.css({"visibility":"hidden"});
        })
    }

    //鼠标点击前进后退
    function clickBtn(){
        $pre.click(function(){
            //alert(1)
            clearInterval(timer);
            if(i === -1){
                i = 5;
            }
            i--;
            showFun();
            time();
        });
        $next.click(function(){
            clearInterval(timer);
            //i++;
            if(i === 6){
                i = 0;
            }
            showFun();
            i++;
            time();
        })
    }

});