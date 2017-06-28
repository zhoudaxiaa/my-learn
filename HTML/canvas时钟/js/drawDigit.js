/**
 * Created by Administrator on 2016/8/4.
 */
var WINDOW_WIDTH=1300;   //������Ļ���
var WINDOW_HEIGHT=400;      //������Ļ�߶�
var RADIUS=8;       //����Բ��İ뾶
var MARGIN_TOP=50;      //�����ͼ��ʼ��y����
var MARGIN_LEFT=50;     //�����ͼ��ʼ��x����

var balls=[];       //��������
var color=["#33B5E5","#0099CC","#AA66CC","#9933CC","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];      //������ɫ����

var date = new Date();      //����ʱ�����
var hours = date.getHours();        //��ȡ��ǰСʱ
var minute = date.getMinutes();     //��ȡ��ǰ����
var seconds = date.getSeconds();        //��ȡ��ǰ����

window.onload=function(){       //����ʼ
    var canvas=document.getElementById("canvas");       //��ȡ����
    canvas.width=WINDOW_WIDTH;      //���廭�����
    canvas.height=WINDOW_HEIGHT;        //���廭���߶�
    var context=canvas.getContext("2d");        //��ȡ����
    updata(context);        //����ʱ�亯��

    setInterval(function(){     //����ˢ��ʱ��
        render(context);        //����ʱ�ӺͲ�����
        upBalls();      //����λ�ø��º���
    },50);

};

function render(cxt){       //����ʱ�ӺͲ�����
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);      //ˢ�»���
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);        //����Сʱʮλ��
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);        //����Сʱ��λ��
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);      //����ð��
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10), cxt);       //���Ʒ���ʮλ��
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10), cxt);       //���Ʒ��Ӹ�λ��
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);      //����ð��
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);      //��������ʮλ��
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);      //�������Ӹ�λ��

    for(var i=0;i<balls.length;i++){        //���Ʋ���
        cxt.beginPath();        //���ʿ�ʼ
        cxt.fillStyle=balls[i].color;       //������ɫ
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);      //������ĺ���
        cxt.closePath();        //���ʽ���
        cxt.fill();     //������
    }

}

function renderDigit(x,y,num,cxt){      //����ʱ�Ӻ���
    for(var i=0;i<digit[num].length;i++){       //ѭ��������������i
        for(var j=0;j<digit[num][i].length;j++){        //ѭ��������������j
            if(digit[num][i][j]===1){       //�ж��Ƿ����
                cxt.beginPath();        //���ʿ�ʼ
                cxt.fillStyle="rgb(10,102,158)";        //Բ����ɫ
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);        //��Բ����
                cxt.closePath();        //���ʽ���
                cxt.fill();     //��Բ
            }

        }
    }
}

function updata(cxt) {      //ʱ�ӺͲ����������º���
    setInterval(function(){     //����ʱ�ӣ�ÿ�봥��һ��
        var time=minute*60+seconds;     //���Ӻ����ӻ�Ϊ�������
        var nextminute = parseInt((time+1)/60);     //��һ����
        var nextseconds = parseInt((time+1)%60);        //��һ��

        if (parseInt(minute / 10) != parseInt(nextminute / 10)) {       //�ж���һ����ʮλ�뵱ǰ����ʮλ�Ƿ���ͬ
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10));       //����ͬ�������Ӧ�Ĳ���
        }
        if (parseInt(minute % 10) != parseInt(nextminute % 10)) {       //�ж���һ����ʮλ�뵱ǰ���Ӹ�λ�Ƿ���ͬ
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10));       //����ͬ�������Ӧ�Ĳ���
        }
        if (parseInt(seconds / 10) != parseInt(nextseconds / 10)) {     //�ж���һ����ʮλ�뵱ǰ����ʮλ�Ƿ���ͬ
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10));      //����ͬ�������Ӧ�Ĳ���
        }
        if (parseInt(seconds % 10) != parseInt(nextseconds % 10)) {     //�ж���һ����ʮλ�뵱ǰ���Ӹ�λ�Ƿ���ͬ
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10));      //����ͬ�������Ӧ�Ĳ���
        }
        seconds=nextseconds;        //����һ���Ӹ�����ǰ����
        minute=nextminute;      //����һ�븳����ǰ����
    },1000)
}


function addBalls(x,y,num){     //��Ӳ�����
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]===1){
                var aBall={     //�������
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),      //x����
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),      //y����
                    g:1.5+Math.random(),        //�������ٶ�
                    vx:Math.pow(-1,Math.ceil(Math.random()*10))*4,      //ˮƽ�ٶ�
                    vy:-5,      //��ֱ�ٶ�
                    color:color[Math.ceil(Math.random()*9)]     //������ɫ
                };
                balls.push(aBall);      //��ÿ����������������
            }

        }
    }
}

function upBalls(){     //����λ�ø��º���
    for(var i=0;i<balls.length;i++){
        balls[i].x+=balls[i].vx;        //x����
        balls[i].y+=balls[i].vy;        //y����
        balls[i].vy+=balls[i].g;        //��ֱ�ٶ�

        if(balls[i].y>WINDOW_HEIGHT-RADIUS){        //�ж����Ƿ�����
            balls[i].y=WINDOW_HEIGHT-RADIUS;        //�����y����Ϊ�ײ�
            balls[i].vy=-balls[i].vy*0.6;       //���ٶ��෴������Ч��
        }
        var cnt=0; //�������������
        for(var j=0;j<balls.length;j++) {
            if (balls[j].x + RADIUS > 0 && balls[j].x - RADIUS < WINDOW_WIDTH)
                balls[cnt++] = balls[j];
        }

        while(balls.length>Math.min(300,cnt)){
            balls.pop();
        }
    }
}