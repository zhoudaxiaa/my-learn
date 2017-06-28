/**
 * Created by Administrator on 2016/7/30.
 */
$(function(){
    var $h=$("#line-hours");
    var $m=$("#line-minute");
    var $n=$("#number");
    drawLine($h,12,180);  //��Сʱ�̶�
    drawLine($m,60,190);   //�����ӿ̶�
    drawNumber($n,12,170);    //������
    move();
    //var hoursDeg=360/12;   //ԭ�����������ת���Ƕ�
    //var nindex=0;          //ԭ���������±�

    //��ӿ̶ȵİ�װ����
    function drawLine(wrap,total,translateX){    //���̶ȷ���������������Ҫ���Ķ��󣬿̶�����ƫ����.
        var deg=360/total;  //��ȡҪת���Ķ���
        var strHtml="";   //��ӱ�ǩ���ַ���
        for(var i=0;i<total;i++){  //ѭ����ӱ�ǩ
            strHtml+="<li style='transform:rotate("+(i*deg)+"deg)translate("+translateX+"px,-50%)'></li>";
                wrap.html(strHtml);
        }
    }
    //��ӿ̶ȵ�ԭʼд��
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

    //������ֵĴ������
    function drawNumber(wrap,total,radius){
        var deg=360/total;  //������Ҫת���ĽǶ�
        var strHtml="";  //��ӱ�ǩ���ַ���
        for(var i=0;i<total;i++){
            var myAngle=(i-2)*deg*(Math.PI/180);  //  �Ѷ���ת��Ϊ����
            var x=radius*(1+Math.cos(myAngle));
            var y=radius*(1+Math.sin(myAngle));
            strHtml+="<li style='top:"+y+"px;left:"+x+"px'>"+(i+1)+"</li>";
            wrap.html(strHtml);
        }
    }
    //������ֵ�ԭʼд��
    //$n.each(function(){
    //    var myAngle=nindex*hoursDeg*(Math.PI/180);
    //    var x=170+170*Math.cos(myAngle);
    //    var y=170+170*Math.sin(myAngle);
    //    $(this).css({"top":y,"left":x});
    //    nindex++;
    //});

    //ָ��ת���������
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