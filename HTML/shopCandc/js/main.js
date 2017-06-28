/**
 * Created by Administrator on 2016/9/22.
 */

var $home = $(".title_nav");
var $navContentItems = $(".nav_content_items");
var $adminLeftNav = $(".nav_title_items li");
$home.attr("href","../è´¢åŠ¡ç³»ç»Ÿ/main.html");

function showTag(str){

    if($("#"+str+"")[0].style.display=="none"){
        $("#"+str+"")[0].style.display="block";
    }else{
        $("#"+str+"")[0].style.display="none";
    }

}

$(window).ready(function(){
   function checkLogin(str){
       if(str.length===0){
           $("#login_mess").innerHTML="";
           return;
       }
       if(window.XMLHttpRequest){
           //IE7+µÈ¸ß°æ±¾ä¯ÀÀÆ÷
           var xmlhttp = new XMLHttpRequest();
       }else{
           //IE6-°æ±¾ä¯ÀÀÆ÷
           var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
       }

       xmlhttp.onreadystatechange=function(){
           if(xmlhttp.readyState==4 && xmlhttp.status==200){
               $("#login_mess").innerHTML=xmlhttp.responseText;
           }
       }

       xmlhttp.open("POST","test.php?name="+str,true);
       xmlhttp.send();
   }
});