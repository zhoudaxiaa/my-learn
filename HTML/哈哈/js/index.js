/*
DONE:
- play/pause;
- volume;
- progress bar.

TODO:
- backward/forward;
- repeat/shuffle;
- lyrics;
- playlist.
*/

$(document).ready(function() {

	var audio = document.getElementById('audio');
	//var progress = document.getElementById('progress');
	var playpause = document.getElementById("play");
	var replay = document.getElementById("replay");
	var volume = document.getElementById("volume");
	var time = document.getElementById('times');
	//var canvas = document.getElementById('progress');
	//var ctx = canvas.getContext('2d');
	 togglePlay();
	//alert($("#play"))
	//var cwidth = document.body.clientWidth;
	//var cheight = document.body.clientHeight;


	flower();

	//$("#start").click(function(){
	//	$("#mainDiv").fadeIn(2000);
	//	togglePlay();
	//	$(this).css("display","none");
	//});

	//$("#bg")[0].style.width= cwidth+"px";
	//$("#bg")[0].style.height= cheight+"px";

	//$("#mainDiv")[0].style.width= cwidth+"px";
	//$("#mainDiv")[0].style.height= cheight+"px";


	setInterval(function(){
		$("#loveHeart").css("transform","scale(1.02)");
	},200);
	setInterval(function(){
		$("#loveHeart").css("transform","scale(1)");
	},400);

	$("#btn").click(function(){
		$("video").fadeIn(2000);
		if($("video")[0].paused){
			$("video")[0].play();
		}else{
			$("video")[0].pause();
		}

		$("#audio")[0].pause();
		$("#loveHeart").css({"background":"url('')"});
	});

	$("#volume").change(function(){
		setVolume();
	});

	$("#play").click(function(){
		//alert(1)
		togglePlay();
	});
	$("#replay").click(function(){
		//alert(1)
		replayAudio();
	});

	function flower() {
		var wid=$(window).width();
		var hei=$(window).height();
		var time=300;
		var minsize=1;
		var maxsize=9;
		var color="white";
		var $snow=$("<img src='image/hb.png'/>").css({"position":"absolute","top":"-100px","z-index":"11"});
		$("img").css({"width":wid,"height":hei});
		setInterval(function(){
			var startPosition=Math.random()*wid;
			var size=Math.random()*maxsize+minsize;
			$snow.clone().appendTo("body").css({"left":startPosition,"top":-5,"color":color,"font-size":size}).animate({"left":startPosition,"top":hei},4000,function(){
				$(this).remove();
			});
			//console.log($("img").length);
		},time);
	}

	audio.addEventListener('timeupdate', function () {

		//updateProgress();
		if (audio.ended) {
					resetPlayer();
				};
		var aTime = parseInt(audio.currentTime);
		var aLength = parseInt(audio.duration);
		if (aTime < 10) {
			time.innerHTML = '00:0' + aTime + '/00:' + aLength;
		} else {
			time.innerHTML = '00:' + aTime + '/00:' + aLength;
		}

	}, false);

	function togglePlay() {
		if (audio.paused || audio.ended) {

			playpause.title = "Pause";
			playpause.innerHTML = '<i>&#xe603;</i>';
			audio.play();
		} else {
			playpause.title = "Play";
			playpause.innerHTML = '<i>&#xe600;</i>';
			audio.pause();
		}
	}

	function replayAudio() {
		audio.currentTime = 0;
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
	}


	function setVolume() {
		audio.volume = volume.value;
	}


	//function updateProgress() {
	//	var percent = Math.floor((100 / audio.duration) * audio.currentTime);
	//	//progress.value = percent;
	//	var centerX = canvas.width / 2;
	//	var centerY = canvas.height / 2;
	//	var radius = 150;
	//	var circ = Math.PI;
	//	var quart = Math.PI / 4;
	//	var cpercent = percent / 100;
	//	/* current percent */
	//	ctx.beginPath();
	//	ctx.lineCap = 'round';
	//	ctx.arc(centerX, centerY, radius, 0, ((circ) * cpercent), false);
	//	ctx.lineWidth = 5;
	//	ctx.strokeStyle = 'yellow';
	//	ctx.stroke();
	//	if (audio.ended) {
	//		resetPlayer();
	//	}
	//}

	function resetPlayer() {
		audio.currentTime = 0;
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		playpause.title = "Play";
		playpause.innerHTML = '<i>&#xe600;</i>';

		/*playpause.title = "Play";
		 playpause.innerHTML = '<i class="fa fa-play fa-3x"></i>';*/
	}
});

// thx to: http://www.adobe.com/devnet/html5/articles/html5-multimedia-pt3.html