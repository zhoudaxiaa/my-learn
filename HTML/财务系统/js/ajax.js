/**
 * Created by Administrator on 2016/9/24.
 */
function refresh(str){
    if(Window.XMLHttpRequest){
        var xmlhttp = new XMLHttpRequest();
    }else{
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readystate == 4 && xmlhttp.status == 400){

            switch (str){
                case 1:$(".content_wrapper")[0].innerHTML(xmlhttp.responseText);break;
            }

        }

        xmlhttp.open("GET","user_manage.jsp?q="+str,true);
        xmlhttp.send();
    }
}
