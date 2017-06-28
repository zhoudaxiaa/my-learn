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
    var isMousedown = false;   //�ж�����Ƿ���
    var moveX;  //��ʼx����
    var moveY;  //��ʼy����
    var colors = "black";   //������ɫ

    drawDashLine(context, 0, 0, WINDOS_WIDTH, WINDOS_WIDTH, 5);  //���Խ�����
    drawDashLine(context, WINDOS_WIDTH, 0, 0, WINDOS_WIDTH, 5);

    touchLisenner();    //�ֻ���������

    mouseLisenner();   //����������

    drawBorder(WINDOS_WIDTH);       //���߿�

    selectColor();      //ѡ�񻭱���ɫ

    clearCanvas(context);   //�������


    function clearCanvas(ctx) {     //�������
        document.getElementsByTagName("button")[0].onclick = function () {   //����ػ���ť���������
            ctx.clearRect(0, 0, 400, 400);
            drawDashLine(ctx, 0, 0, 400, 400, 5);  //���Խ�����
            drawDashLine(ctx, 400, 0, 0, 400, 5);
            drawBorder();       //���߿�
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

    function drawBorder() {    //���߿�

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

        context.moveTo(0, WINDOS_WIDTH/2);  //���м���
        context.lineTo(WINDOS_WIDTH, WINDOS_WIDTH/2);

        context.moveTo(WINDOS_WIDTH/2, 0);
        context.lineTo(WINDOS_WIDTH/2, WINDOS_WIDTH);
        context.lineWidth = 1;
        context.strokeStyle = "red";
        context.closePath();
        context.stroke();
    }

    function drawDashLine(ctx, x1, y1, x2, y2, dashLength) {   //�����ߺ���
        var dashLen = dashLength === undefined ? 5 : dashLength;  //�ж�dashlength�Ƿ��д���ֵ��û�о�����Ĭ��ֵ
        var xPos = x2 - x1;  //�õ�����
        var yPos = y2 - y1;  //�õ��ݿ��
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

    function touchLisenner(){     //�ֻ����������¼�
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

    function mouseLisenner() {   //�������¼�
        canvas.onmousedown = function (ev) {  //��갴���¼�
            ev.preventDefault();
            isMousedown = true;
            moveX = ev.clientX - canvas.offsetLeft;
            moveY = ev.clientY - canvas.offsetTop;

        };

        canvas.onmouseup = function (ev) {   //��갴�������¼�
            ev.preventDefault();
            isMousedown = false;
        };

        canvas.onmousemove = function (ev) {   //����ƶ��¼�
            ev.preventDefault();
            if (isMousedown) {
                var nowX = ev.clientX - canvas.offsetLeft;
                var nowY = ev.clientY - canvas.offsetTop;
                draw(context, nowX, nowY, colors);
                moveX = nowX;
                moveY = nowY;
            }
        };

        canvas.onmouseout = function (ev) {   //����Ƴ������¼�
            ev.preventDefault();
            isMousedown = false;
        };
    }

    function draw(ctx, x, y, colors) {    //���ʺ���
        ctx.beginPath();      //�����beginpath��������һ�εĻ滭�Ա�����Ӱ��
        ctx.lineWidth = 10;
        ctx.strokeStyle = colors;
        ctx.lineCap="round";
        ctx.moveTo(moveX, moveY);
        ctx.lineTo(x, y);
        //ctx.closePath();   //�˴�Ϊ������������ܼ�closepath�����˺�linecap���޷�ʵ��Ч��
        ctx.stroke();
    }
};