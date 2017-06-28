/**
 * Created by Administrator on 2016/9/3.
 */
$(window).ready(function(){
    var $home = $(".title_nav");
    var $navContentItems = $(".nav_content_items");
    var $adminLeftNav = $(".nav_title_items li");
    //var clickIndex = 0;
    $home.attr("href","../财务系统/main.html");

    var turnOn0 = false;
    var turnOn1 = false;
    var turnOn2 = false;
    var turnOn3 = false;

    $adminLeftNav.click(function(){
        //if (clickIndex === 0) {
            var index = $(this).index();
            switch (index) {
                case 0:
                    if(turnOn0 ===false){
                        $navContentItems.eq(index).css({"display": "block","margin-bottom": "25px"});
                    }else{
                        $navContentItems.eq(index).css({"display": "none"});
                    }
                    turnOn0 = !turnOn0;
                    break;
                case 1:
                    if(turnOn1 ===false){
                        $navContentItems.eq(index).css({"display": "block","margin-bottom": "25px"});
                    }else{
                        $navContentItems.eq(index).css({"display": "none"});
                    }
                    turnOn1 = !turnOn1;
                    break;
                case 2:
                    if(turnOn2 ===false){
                        $navContentItems.eq(index).css({"display": "block","margin-bottom": "25px"});
                    }else{
                        $navContentItems.eq(index).css({"display": "none"});
                    }
                    turnOn2 = !turnOn2;
                    break;
                case 3:
                    if(turnOn3 ===false){
                        $navContentItems.eq(index).css({"display": "block","margin-bottom": "25px"});
                    }else{
                        $navContentItems.eq(index).css({"display": "none"});
                    }
                    turnOn3 = !turnOn3;
                    break;
            }
            //clickIndex++;
        //} else {
        //    var index = $(this).index();
        //    switch (index) {
        //        case 0:
        //            $navContentItems.eq(index).css({"display": "none"});
        //            $adminLeftNav.eq(index+1).css({"margin-top": "0px"});
        //            break;
        //        case 1:
        //            $navContentItems.eq(index).css({"display": "none"});
        //            $adminLeftNav.eq(index+1).css({"margin-top": "0px"});
        //            break;
        //        case 2:
        //            $navContentItems.eq(index).css({"display": "none"});
        //            $adminLeftNav.eq(index+1).css({"margin-top": "0px"});
        //            break;
        //        case 3:
        //            $navContentItems.eq(index).css({"display": "none"});
        //            $adminLeftNav.eq(index+1).css({"margin-top": "0px"});
        //            break;
        //    }
        //    clickIndex = 0;
        //}
    });

});