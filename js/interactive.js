// SETTING VARIABLES
var $video = $('#myVideo'),
    $vidContainer = $(".vidContainer"),
    $controlBar = $('.control-bar'),

    $playBtn = $('#playpausebuttons'),
    $muteButton = $('#mute'),
    $volumeSlider = $('#volume-slider'),
    $speedx1 = $('#speedx1'),
    $speedx3 = $('#speedx3'),
    $fullscreen = $('#fullScreen'),
    

    $duration = $('#duration'),
    $progressBar = $('.progressBar'),
    $timeBar = $('.timeBar'),
    $timeDrag = false,
    $bufferBar = $('.bufferBar'); 


// HIDING AND SHOWING CONTROLS

$vidContainer.mouseenter(function () {
    $controlBar.fadeIn(350);
});
$vidContainer.mouseleave(function () {
    $controlBar.fadeOut(350);
});



// PLAY / PAUSE CONTROL

$playBtn.click(function () { 
  if ($video.get(0).paused){ 
      $video.get(0).play(); 
      $('#play').hide();
      $('#pause').show();   
    } else{
      $video.get(0).pause(); 
      $('#pause').hide();
      $('#play').show();
    }
});


// VOLUME CONTROLS

$muteButton.click(function () { 
  if($video[0].muted === false){ 
    $video[0].muted = true; 
      $('#muted').hide();
      $('#volume').show();
      $volumeSlider[0].value = 0;    
  } else {
    $video[0].muted = false; 
      $('#volume').hide();
      $('#muted').show();
      $volumeSlider[0].value = 100;
    }
});


// VOLUME SLIDER

$volumeSlider.on("change", function(){ 
  $video[0].volume = $volumeSlider[0].value;
});



// FULLSCREEN BUTTON

$fullscreen.on('click', function() {
	if($.isFunction($video[0].webkitEnterFullscreen)) {
		$video[0].webkitEnterFullscreen();
	}	
	else if ($.isFunction($video[0].mozRequestFullScreen)) {
		$video[0].mozRequestFullScreen();
	}
	else if ($.isFunction($video[0].msRequestFullScreen)) {
		$video[0].msRequestFullScreen();
	}
	else if ($.isFunction($video[0].oRequestFullScreen)) {
		$video[0].oRequestFullScreen();
	}
});



// SPEED VIDEO CONTROLS

$speedx1.on('click', function() {
	fastfowrd(this, 1); 
});
$speedx3.on('click', function() { 
	fastfowrd(this, 3); });
var fastfowrd = function(obj, spd) {
	$video[0].playbackRate = spd;
	$video[0].play();
};	
	



// CURRENT TIME AND DURATION

$video.on("timeupdate", function() {
  var $videoTime = $video[0].currentTime;
  if ($videoTime < 10) {
    $duration.html('00:0' + Math.floor($videoTime) + ' / 00:59');   
  } else {
    $duration.html('00:' + Math.floor($videoTime) + ' / 00:59');      
  }
});


 
// PROGRESS BAR

$video.on('timeupdate', function() {
   var currentPos = $video[0].currentTime; 
   var maxduration = $video[0].duration; 
   var percentage = 100 * currentPos / maxduration; 
   $timeBar.css('width', percentage+'%');
});

$progressBar.mousedown(function(e) {
    $timeDrag = true;
    updatebar(e.pageX);
});
$(document).mouseup(function(e) {
    if($timeDrag) {
        $timeDrag = false;
        updatebar(e.pageX);
    }
});
$(document).mousemove(function(e) {
    if($timeDrag) {
        updatebar(e.pageX);
    }
});


 
// PROGRESS BAR CONTROL

var updatebar = function(x) {
    var progress = $('.progressBar');
    var maxduration = $video[0].duration; 
    var position = x - progress.offset().left; 
    var percentage = 100 * position / progress.width();
 
    
    if(percentage > 100) {
        percentage = 100;
    }
    if(percentage < 0) {
        percentage = 0;
    }
 
    // UPDATE FOR PROGRESS BAR AND VIDEO CURRENT TIME
    
    $('.timeBar').css('width', percentage+'%');
    $video[0].currentTime = maxduration * percentage / 100;
};



// BUFFER BAR

var startBuffer = function() {
    var maxduration = $video[0].duration;
    var currentBuffer = $video[0].buffered.end(0);
    var percentage = 100 * currentBuffer / maxduration;
    $bufferBar.css('width', percentage+'%');
 
    if(currentBuffer < maxduration) {
        setTimeout(startBuffer, 500);
    }
};
setTimeout(startBuffer, 500);


// SETUP FOR TEXT HIGHLIGHT


function secondsFromTimespan(timeSpan) {
    if(!timeSpan || !timeSpan.indexOf(':')) return 0;
    var parts = timeSpan.split(':');
    return +parts[0] * 60 + +parts[1];
}

function constructIntervals(transcripts) {
    var intervals = [];
    for(var i = 0; i < transcripts.length; i++) {
        if(i == transcripts.length - 1) {
            intervals.push({
                lowerBound: secondsFromTimespan($(transcripts[i]).attr('data-time')),
                upperBound: Math.floor($video[0].duration),
                transcript: transcripts[i] 
            });
        } else {
            intervals.push({
                lowerBound: secondsFromTimespan($(transcripts[i]).attr('data-time')),
                upperBound: secondsFromTimespan($(transcripts[i + 1]).attr('data-time')),
                transcript: transcripts[i]
            });
        }

    }
    return intervals;
}

function isTimeWithinInterval(interval, currentTime) {
    var lowerBoundSeconds = interval.lowerBound;
    var upperBoundSeconds = interval.upperBound;
    return lowerBoundSeconds <= currentTime && currentTime < upperBoundSeconds;
}

// HIGHLIGHT TEXT FROM A VIDEO


$(function () {

    var transcripts = $("span[data-time]");
    var intervals = constructIntervals(transcripts);
    $video[0].addEventListener('timeupdate', function () {

        $('span[data-time]').removeClass('highlight');
        for(var i = 0; i < intervals.length; i++) {
            if(isTimeWithinInterval(intervals[i], $video[0].currentTime)) {
                $(intervals[i].transcript).addClass('highlight');
            }
        }
    });

});






