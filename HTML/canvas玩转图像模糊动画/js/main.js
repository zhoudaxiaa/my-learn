/**
 * Created by Administrator on 2016/8/6.
 */
window.onload=function(){
    var bgCanvas = document.getElementById("bg-canvas");
    bgCanvas.width = 720;
    bgCanvas.height = 540;
    var bgContext = bgCanvas.getContext("2d");

    var showCanvas = document.getElementById("show-canvas");
    showCanvas.width = 720;
    showCanvas.height = 540;
    var showContext = showCanvas.getContext("2d");

    var radius = 50;
    var clippingRegion = {x:0,y:0,r:0};   //�޼��������

    var image = new Image();
    image.src = "image/car.jpg";

    init();     //��ʼ��

    reset();        //ˢ�½���

    show();     //��ʾͼƬ

    image.onload = function () {
        bgContext.drawImage(image, 0, 0, bgCanvas.width, bgCanvas.height);
        drawImg(clippingRegion.x,clippingRegion.y);
    };

    function reset(){       //ˢ�½���
        var ref = document.getElementById("reset");
        ref.onclick=function(){
            init();
            drawImg(clippingRegion.x,clippingRegion.y);
        };

    }

    function show(){    //��ʾͼƬ
        var show = document.getElementById("show");
        show.onclick=function(){
            var time = setInterval(function(){
                if(clippingRegion.r>720){
                    clearInterval(time);
                }
                 clippingRegion.r+=10;
                drawImg(clippingRegion.x,clippingRegion.y);
                },20)
        }
    }

    function init() {    //��ʼ��

        clippingRegion={x:Math.floor(Math.random()*(showCanvas.width-100))+radius,
                        y:Math.floor(Math.random()*(showCanvas.height-100))+radius,
                        r:50};
    }

    function drawImg(x,y){      //����ʾ����
        showContext.clearRect(0,0,showCanvas.width,showCanvas.height);
        showContext.save();
        showContext.beginPath();
        showContext.arc(x,y,clippingRegion.r,0,2*Math.PI);
        showContext.clip();
        showContext.drawImage(image,0,0,showCanvas.width,showCanvas.height);
        showContext.restore();
    }


};