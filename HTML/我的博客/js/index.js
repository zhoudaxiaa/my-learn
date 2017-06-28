/**
 * Created by Administrator on 2016/10/13.
 */

function focusPic(){
    setInterval(function(){
        if(i>=5){i=0;}
        showPic();
        picBoxMove();
        i++;
        t=t+60;
    },3000)
}

function showPic(){
    $(".banner_show li").eq(i).fadeIn(1000).siblings().fadeOut(1000);
}

function picBoxMove(){
    if(t>=300){t=0;}
    $(".pic_box").animate({
        "top":t
    },1000);
}

$(document).ready(function(){
    i=1;
    t=60;
    focusPic();
})