
//开始

var RADIUS=2;       //定义圆球的半径
var MARGIN_TOP=10;      //定义绘图开始的y坐标
var MARGIN_LEFT=10;     //定义绘图开始的x坐标

//var h;
var m=0;
var s=0;
var balls=[];       //彩球数组
var color=["#33B5E5","#0099CC","#AA66CC","#9933CC","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];      //彩球颜色数组
//

//结束


var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
	
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

	//开始

	//updata(clockContext);        //更新时间函数
    //
	//setInterval(function(){     //画面刷新时钟
	//	render(clockContext);        //绘制时钟和彩球函数
	//	upBalls();      //彩球位置更新函数
	//},50);
	//结束


    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {

    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }



});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 60;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);
}

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 100);
		});
		return this;
	};
})(jQuery);

function timeElapse(date,cxt){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	//if (hours < 10) {
	//	hours = "0" + hours;
	//}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	//if (minutes < 10) {
	//	minutes = "0" + minutes;
	//}
	seconds = seconds % 60;
	//if (seconds < 10) {
	//	seconds = "0" + seconds;
	//}
	updata(cxt,minutes,seconds);
	//h = hours;
	m = minutes;
	s = seconds;
	upBalls();
	render(cxt,days,hours,minutes,seconds);

	//var result = "<span class=\"digit\">" + days + "</span> days <span class=\"digit\">" + hours + "</span> hours <span class=\"digit\">" + minutes + "</span> minutes <span class=\"digit\">" + seconds + "</span> seconds";
	//$("#elapseClock").html(result);
}


//开始

//var date = new Date();      //创建时间对象
//var hours = date.getHours();        //获取当前小时
//var minute = date.getMinutes();     //获取当前分钟
//var seconds = date.getSeconds();        //获取当前秒钟

//window.onload=function(){       //程序开始


//};

function render(cxt,days,hours,minute,seconds){       //绘制时钟和彩球函数
	//alert(hours)
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);      //刷新画布
	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(days / 100), cxt);        //绘制天数十位数
	renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(days %100 / 10), cxt);        //绘制天数个位数
	renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, parseInt(days % 100%10), cxt);        //绘制天数个位数
	renderDigit(MARGIN_LEFT + 45 * (RADIUS + 1), MARGIN_TOP, 10, cxt);      //绘制冒号
	renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(hours / 10), cxt);        //绘制小时十位数
	renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);        //绘制小时个位数
	renderDigit(MARGIN_LEFT + 84 * (RADIUS + 1), MARGIN_TOP, 10, cxt);      //绘制冒号
	renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10), cxt);       //绘制分钟十位数
	renderDigit(MARGIN_LEFT + 107 * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10), cxt);       //绘制分钟个位数
	renderDigit(MARGIN_LEFT + 122 * (RADIUS + 1), MARGIN_TOP, 10, cxt);      //绘制冒号
	renderDigit(MARGIN_LEFT + 131 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);      //绘制秒钟十位数
	renderDigit(MARGIN_LEFT + 146 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);      //绘制秒钟个位数

	for(var i=0;i<balls.length;i++){        //绘制彩球
		cxt.beginPath();        //画笔开始
		cxt.fillStyle=balls[i].color;       //画笔颜色
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);      //画彩球的函数
		cxt.closePath();        //画笔结束
		cxt.fill();     //画彩球
	}

}

function renderDigit(x,y,num,cxt){      //绘制时钟函数
	//alert(num);
	for(var i=0;i<digit[num].length;i++){       //循环传入数字数组i
		for(var j=0;j<digit[num][i].length;j++){        //循环传入数字数组j
			if(digit[num][i][j]===1){       //判断是否绘制
				cxt.beginPath();        //画笔开始
				cxt.fillStyle="rgb(10,102,158)";        //圆的颜色
				//cxt.arc(10,10,5,0,2*Math.PI)
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);        //画圆函数
				cxt.closePath();        //画笔结束
				cxt.fill();     //画圆
			}

		}
	}
}

function updata(cxt,minutes,seconds) {      //时钟和彩球数量更新函数

		//if (parseInt(minutes / 10) != parseInt(m % 10)) {       //判断下一分钟十位与当前分钟十位是否相同
		//	addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10));       //不相同就添加相应的彩球
		//}
		if (parseInt(minutes % 10) != parseInt(m % 10)) {       //判断下一分钟十位与当前分钟个位是否相同
			addBalls(MARGIN_LEFT + 107 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10));       //不相同就添加相应的彩球
		}
		if (parseInt(seconds / 10) != parseInt(s / 10)) {     //判断下一分钟十位与当前秒钟十位是否相同
			addBalls(MARGIN_LEFT + 131 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10));      //不相同就添加相应的彩球
		}
		if (parseInt(seconds % 10) != parseInt(s % 10)) {     //判断下一分钟十位与当前秒钟个位是否相同
			addBalls(MARGIN_LEFT + 146 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10));      //不相同就添加相应的彩球
		}
}


function addBalls(x,y,num){     //添加彩球函数
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]===1){
				var aBall={     //定义彩球
					x:x+j*2*(RADIUS+1)+(RADIUS+1),      //x坐标
					y:y+i*2*(RADIUS+1)+(RADIUS+1),      //y坐标
					g:1+Math.random(),        //重力加速度
					vx:Math.pow(-1,Math.ceil(Math.random()*10))*2,      //水平速度
					vy:-3,      //垂直速度
					color:color[Math.ceil(Math.random()*9)]     //彩球颜色
				};
				balls.push(aBall);      //把每个彩球加入彩球数组
			}

		}
	}
}

function upBalls(){     //彩球位置更新函数
	//alert(1)
	//setInterval(function(){
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
	//},50);


}
//结束


function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function() {
		showLoveU();
	});
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 195);
	$('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
	$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
	$('#loveu').fadeIn(3000);
}