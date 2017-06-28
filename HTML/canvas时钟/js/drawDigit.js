/**
 * Created by Administrator on 2016/8/4.
 */
var WINDOW_WIDTH=1300;   //定义屏幕宽度
var WINDOW_HEIGHT=400;      //定义屏幕高度
var RADIUS=8;       //定义圆球的半径
var MARGIN_TOP=50;      //定义绘图开始的y坐标
var MARGIN_LEFT=50;     //定义绘图开始的x坐标

var balls=[];       //彩球数组
var color=["#33B5E5","#0099CC","#AA66CC","#9933CC","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];      //彩球颜色数组

var date = new Date();      //创建时间对象
var hours = date.getHours();        //获取当前小时
var minute = date.getMinutes();     //获取当前分钟
var seconds = date.getSeconds();        //获取当前秒钟

window.onload=function(){       //程序开始
    var canvas=document.getElementById("canvas");       //获取画布
    canvas.width=WINDOW_WIDTH;      //定义画布宽度
    canvas.height=WINDOW_HEIGHT;        //定义画布高度
    var context=canvas.getContext("2d");        //获取画笔
    updata(context);        //更新时间函数

    setInterval(function(){     //画面刷新时钟
        render(context);        //绘制时钟和彩球函数
        upBalls();      //彩球位置更新函数
    },50);

};

function render(cxt){       //绘制时钟和彩球函数
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);      //刷新画布
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);        //绘制小时十位数
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);        //绘制小时个位数
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);      //绘制冒号
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10), cxt);       //绘制分钟十位数
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10), cxt);       //绘制分钟个位数
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);      //绘制冒号
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);      //绘制秒钟十位数
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);      //绘制秒钟个位数

    for(var i=0;i<balls.length;i++){        //绘制彩球
        cxt.beginPath();        //画笔开始
        cxt.fillStyle=balls[i].color;       //画笔颜色
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);      //画彩球的函数
        cxt.closePath();        //画笔结束
        cxt.fill();     //画彩球
    }

}

function renderDigit(x,y,num,cxt){      //绘制时钟函数
    for(var i=0;i<digit[num].length;i++){       //循环传入数字数组i
        for(var j=0;j<digit[num][i].length;j++){        //循环传入数字数组j
            if(digit[num][i][j]===1){       //判断是否绘制
                cxt.beginPath();        //画笔开始
                cxt.fillStyle="rgb(10,102,158)";        //圆的颜色
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);        //画圆函数
                cxt.closePath();        //画笔结束
                cxt.fill();     //画圆
            }

        }
    }
}

function updata(cxt) {      //时钟和彩球数量更新函数
    setInterval(function(){     //秒钟时钟，每秒触发一次
        var time=minute*60+seconds;     //分钟和秒钟化为秒钟相加
        var nextminute = parseInt((time+1)/60);     //下一分钟
        var nextseconds = parseInt((time+1)%60);        //下一秒

        if (parseInt(minute / 10) != parseInt(nextminute / 10)) {       //判断下一分钟十位与当前分钟十位是否相同
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10));       //不相同就添加相应的彩球
        }
        if (parseInt(minute % 10) != parseInt(nextminute % 10)) {       //判断下一分钟十位与当前分钟个位是否相同
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10));       //不相同就添加相应的彩球
        }
        if (parseInt(seconds / 10) != parseInt(nextseconds / 10)) {     //判断下一分钟十位与当前秒钟十位是否相同
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10));      //不相同就添加相应的彩球
        }
        if (parseInt(seconds % 10) != parseInt(nextseconds % 10)) {     //判断下一分钟十位与当前秒钟个位是否相同
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10));      //不相同就添加相应的彩球
        }
        seconds=nextseconds;        //把下一分钟赋给当前分钟
        minute=nextminute;      //把下一秒赋给当前秒钟
    },1000)
}


function addBalls(x,y,num){     //添加彩球函数
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]===1){
                var aBall={     //定义彩球
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),      //x坐标
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),      //y坐标
                    g:1.5+Math.random(),        //重力加速度
                    vx:Math.pow(-1,Math.ceil(Math.random()*10))*4,      //水平速度
                    vy:-5,      //垂直速度
                    color:color[Math.ceil(Math.random()*9)]     //彩球颜色
                };
                balls.push(aBall);      //把每个彩球加入彩球数组
            }

        }
    }
}

function upBalls(){     //彩球位置更新函数
    for(var i=0;i<balls.length;i++){
        balls[i].x+=balls[i].vx;        //x坐标
        balls[i].y+=balls[i].vy;        //y坐标
        balls[i].vy+=balls[i].g;        //垂直速度

        if(balls[i].y>WINDOW_HEIGHT-RADIUS){        //判断球是否碰地
            balls[i].y=WINDOW_HEIGHT-RADIUS;        //落地则y坐标为底部
            balls[i].vy=-balls[i].vy*0.6;       //加速度相反，反弹效果
        }
        var cnt=0; //定义数组的数量
        for(var j=0;j<balls.length;j++) {
            if (balls[j].x + RADIUS > 0 && balls[j].x - RADIUS < WINDOW_WIDTH)
                balls[cnt++] = balls[j];
        }

        while(balls.length>Math.min(300,cnt)){
            balls.pop();
        }
    }
}