/**
 * Created by Administrator on 2016/12/4.
 */
$(document).ready(function () {

    var close = true;
    var items = $(".items");
    var length = items.length;

    items.click(function () {
        var index = $(this).index();

        var deg = 0;


        for (var i = 0; i < length; i++) {


            if (index === length - 1) {

                if (close) {

                    deg = i * 15 - Math.floor(length / 2) * 15;

                } else {

                        //alert(1);
                        deg = 0;

                }
            }else{
                var a = i-index;

                if(a>0){

                    deg = a*15+20;
                }else if(a === 0){
                    deg = 0;
                }else{
                    deg = a*15;
                }

            }

            items[i].style.transform = "rotate(" + deg + "deg)";
        }

        close = !close;


        //if(index!==12){
        //    items[index].style.transform = "rotate(0deg)";
        //
        //for (var i = index-1; i >= 0; i--) {
        //    items[i].style.transform = "rotate(" + ((i-index) * 15) + "deg)";
        //}
        //
        //for (var i = index+1; i < length; i++) {
        //    items[i].style.transform = "rotate(" + ((i-index) * 15+20) + "deg)";
        //}
        //}else if(!close){
        //        close = true;

        //for (var i = 5; i >= 0; i--) {
        //    items[i].style.transform = "rotate(" + ((i-6) * 15+10) + "deg)";
        //}
        //
        //for (var i = 6; i < length; i++) {
        //    items[i].style.transform = "rotate(" + ((i-6) * 15+10) + "deg)";
        //}
        //}else{
        //    close = false;
        //for (var i = 0; i < length; i++) {
        //    items[i].style.transform = "rotate(0deg)";
        //}
        //}

    })
})