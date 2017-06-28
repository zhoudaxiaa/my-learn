/**
 * Created by Administrator on 2016/8/18.
 */
$(document).ready(function(){
    //����չ��
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

    //�ֲ�ͼ
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
    //��ʱ��
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
    //��ʾ
    function showFun(){
        $img.eq(i).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
        $focus_ball.eq(i).addClass("on").siblings().removeClass("on");
        $shadow.eq(i).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
    }

    //����Ƶ�С��ť��
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

    //����Ƶ�ͼƬ��ʾǰ�����˰�ť
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

    //�����ǰ������
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