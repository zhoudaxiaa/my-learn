$(document).ready(function(){
    //滚动条发生滚动
     var menu=$("#menu");
    $(window).scroll(function(){
        var top=$(document).scrollTop();
        var $items=$("#content").find(".item");
        var currentId="";
        $items.each(function(){
            var $m=$(this);
            var itemtop=$m.offset().top;
            if(top>itemtop-300){
                currentId="#"+$m.attr("id");
            }
            else{
                return false;
            }
        });
        var currentLink = menu.find(".current");
        if (currentId && currentLink.attr("href") != currentId) {
            currentLink.removeClass("current");
            $("#menu [href="+currentId+"]").addClass("current");
        }
    });
});
