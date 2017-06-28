/**
 * Created by Administrator on 2016/7/30.
 */
//window.onload=function(){
//    document.getElementsByClassName("btn")[0].onclick=function(){
//        //alert(1);
//        document.getElementsByClassName("page").
//    }
//}
$(document).ready(function(){
    var i=0;
    var $m=$(".menu");
    var startAngle=0;
    var endAngle=360;
    var mwidth=$(".pagewrapper").width();
    var radius=mwidth/2;
    var d=(endAngle-startAngle)/$m.length;
    var index=0;
    $m.each(function(){
        var myAngle=index*d*(Math.PI/180);
        var x=radius+radius*Math.cos(myAngle)-10;
        var y=radius+radius*Math.sin(myAngle)-10;
        $(this).css({"position":"absolute","top":y,"left":x});
        index++;
    });
    $(".btn").click(function(){
        if(i===0){
            $(".page").addClass("active");
            i++;
        }
      else{
            $(".page").removeClass("active");
            i=0;
        }
        //alert(1);
    });
})