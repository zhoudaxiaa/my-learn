/**
 * Created by Administrator on 2016/7/30.
 */
$(function(){
    var $h=$("#line-hours");
    var $m=$("#line-minute");
    var $n=$("#number");
    drawLine($h,12,180);  //画小时刻度
    drawLine($m,60,190);   //画分钟刻度
    drawNumber($n,12,170);    //画数字
    move();
    //var hoursDeg=360/12;   //原生方法计算的转动角度
    //var nindex=0;          //原生方法的下标

    //添加刻度的包装方法
    function drawLine(wrap,total,translateX){    //画刻度方法。三个参数：要画的对象，刻度数，偏移量.
        var deg=360/total;  //获取要转动的度数
        var strHtml="";   //添加标签的字符串
        for(var i=0;i<total;i++){  //循环添加标签
            strHtml+="<li style='transform:rotate("+(i*deg)+"deg)translate("+translateX+"px,-50%)'></li>";
                wrap.html(strHtml);
        }
    }
    //添加刻度的原始写法
    //$h.each(function(){
    //    var eachDeg=hindex*hoursDeg;
    //    $(this).css({"transform":"rotate("+eachDeg+"deg) translate(180px,-50%)"});
    //    hindex++;
    //});
    //$m.each(function(){
    //    var eachDeg=mindex*minuteDeg;
    //    $(this).css({"transform":"rotate("+eachDeg+"deg) translate(190px,-50%)"});
    //    mindex++;
    //});

    //添加数字的打包方法
    function drawNumber(wrap,total,radius){
        var deg=360/total;  //计算需要转动的角度
        var strHtml="";  //添加标签的字符串
        for(var i=0;i<total;i++){
            var myAngle=(i-2)*deg*(Math.PI/180);  //  把度数转化为弧度
            var x=radius*(1+Math.cos(myAngle));
            var y=radius*(1+Math.sin(myAngle));
            strHtml+="<li style='top:"+y+"px;left:"+x+"px'>"+(i+1)+"</li>";
            wrap.html(strHtml);
        }
    }
    //添加数字的原始写法
    //$n.each(function(){
    //    var myAngle=nindex*hoursDeg*(Math.PI/180);
    //    var x=170+170*Math.cos(myAngle);
    //    var y=170+170*Math.sin(myAngle);
    //    $(this).css({"top":y,"left":x});
    //    nindex++;
    //});

    //指针转动方法打包
    function move(){
        var $se=$("#second");
        var $mi=$("#minute");
        var $ho=$("#hour");
        var time=new Date();
        var second=time.getSeconds();
        var minute=time.getMinutes();
        var hours=time.getHours();
        if(hours>12){
            hours-=12;
        }
        hours=hours*30+minute*0.5;
        minute=minute*6+second*0.1;
        setInterval(function(){
            if(second===60){
                second=0;
            }
            $se.css({"transform":"rotate("+second*6+"deg)"});
            $mi.css({"transform":"rotate("+minute+"deg)"});
            $ho.css({"transform":"rotate("+hours+"deg)"});
            second++;
            minute=minute+0.1;
            hours=hours+0.01;
        },1000);
    }

});