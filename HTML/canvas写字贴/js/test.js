/**
 * Created by Administrator on 2016/8/4.
 */
var WINDOS_WIDTH=Math.min(500,$(window).width()-20);

window.onload = function () {
    //alert(1);
    var canvas = document.getElementById("canvas");
    canvas.width = WINDOS_WIDTH;
    canvas.height = WINDOS_WIDTH;
    var context = canvas.getContext("2d");
    var isMousedown = false;   //判断鼠标是否按下
    var moveX;  //开始x坐标
    var moveY;  //开始y坐标
    var colors = "black";   //画笔颜色

    drawDashLine(context, 0, 0, WINDOS_WIDTH, WINDOS_WIDTH, 5);  //画对角虚线
    drawDashLine(context, WINDOS_WIDTH, 0, 0, WINDOS_WIDTH, 5);

    touchLisenner();    //手机触摸监听

    mouseLisenner();   //鼠标监听函数

    drawBorder(WINDOS_WIDTH);       //画边框

    selectColor();      //选择画笔颜色

    clearCanvas(context);   //清除画布


    function clearCanvas(ctx) {     //清除画布
        document.getElementsByTagName("button")[0].onclick = function () {   //点击重画按钮，清除画布
            ctx.clearRect(0, 0, 400, 400);
            drawDashLine(ctx, 0, 0, 400, 400, 5);  //画对角虚线
            drawDashLine(ctx, 400, 0, 0, 400, 5);
            drawBorder();       //画边框
        }
    }

    function selectColor() {
        var switchColor = document.getElementsByClassName("color");

        switchColor[0].onmousedown = function () {
            colors = "red";
        };
        switchColor[1].onmousedown = function () {
            colors = "blue";
        };
        switchColor[2].onmousedown = function () {
            colors = "black";
        };
        switchColor[3].onmousedown = function () {
            colors = "yellow"
        };
    }

    function drawBorder() {    //画边框

        context.beginPath();
        context.moveTo(3, 3);
        context.lineTo(WINDOS_WIDTH-3, 3);
        context.lineTo(WINDOS_WIDTH-3, WINDOS_WIDTH-3);
        context.lineTo(3, WINDOS_WIDTH-3);
        context.lineTo(3, 3);
        context.strokeStyle = "red";
        context.lineWidth = 6;
        context.closePath();
        context.stroke();

        context.beginPath();

        context.moveTo(0, WINDOS_WIDTH/2);  //画中间线
        context.lineTo(WINDOS_WIDTH, WINDOS_WIDTH/2);

        context.moveTo(WINDOS_WIDTH/2, 0);
        context.lineTo(WINDOS_WIDTH/2, WINDOS_WIDTH);
        context.lineWidth = 1;
        context.strokeStyle = "red";
        context.closePath();
        context.stroke();
    }

    function drawDashLine(ctx, x1, y1, x2, y2, dashLength) {   //画虚线函数
        var dashLen = dashLength === undefined ? 5 : dashLength;  //判断dashlength是否有传入值，没有就设置默认值
        var xPos = x2 - x1;  //得到横跨度
        var yPos = y2 - y1;  //得到纵跨度
        var dashNum = Math.floor(Math.sqrt(xPos * xPos + yPos * yPos) / dashLen);
        for (var i = 0; i < dashNum; i++) {
            if (i % 2 === 0) {
                ctx.moveTo(x1 + (xPos / dashNum) * i, y1 + (yPos / dashNum) * i);
            }
            else {
                ctx.lineTo(x1 + (xPos / dashNum) * i, y1 + (yPos / dashNum) * i);
            }

            ctx.strokeStyle = "red";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    function touchLisenner(){     //手机触摸监听事件
        canvas.addEventListener("touchstart",function(ev){
            isMousedown = true;
            var touch=ev.touches[0];
            moveX=touch.pageX - canvas.offsetLeft;
            moveY=touch.pageY - canvas.offsetTop;
        });

        canvas.addEventListener("touchmove",function(ev){
            if(isMousedown){
                var touch=ev.touches[0];
                var nowX=touch.pageX - canvas.offsetLeft;
                var nowY=touch.pageY - canvas.offsetTop;
                draw(context,nowX,nowY,colors);
                moveX=nowX;
                moveY=nowY;
            }

        });

        canvas.addEventListener("touchend",function(ev){
            isMousedown = false;
        });
    }

    function mouseLisenner() {   //鼠标监听事件
        canvas.onmousedown = function (ev) {  //鼠标按下事件
            ev.preventDefault();
            isMousedown = true;
            moveX = ev.clientX - canvas.offsetLeft;
            moveY = ev.clientY - canvas.offsetTop;

        };

        canvas.onmouseup = function (ev) {   //鼠标按键弹起事件
            ev.preventDefault();
            isMousedown = false;
        };

        canvas.onmousemove = function (ev) {   //鼠标移动事件
            ev.preventDefault();
            if (isMousedown) {
                var nowX = ev.clientX - canvas.offsetLeft;
                var nowY = ev.clientY - canvas.offsetTop;
                draw(context, nowX, nowY, colors);
                moveX = nowX;
                moveY = nowY;
            }
        };

        canvas.onmouseout = function (ev) {   //鼠标移出画布事件
            ev.preventDefault();
            isMousedown = false;
        };
    }

    function draw(ctx, x, y, colors) {    //画笔函数
        ctx.beginPath();      //必须加beginpath，否则上一次的绘画对本次有影响
        ctx.lineWidth = 10;
        ctx.strokeStyle = colors;
        ctx.lineCap="round";
        ctx.moveTo(moveX, moveY);
        ctx.lineTo(x, y);
        //ctx.closePath();   //此处为特殊情况，不能加closepath，加了后linecap则无法实现效果
        ctx.stroke();
    }
};