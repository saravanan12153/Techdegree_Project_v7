// SETTING VARIABLES
var $video = $('#myVideo'),
    $vidContainer = $(".vidContainer"),
    $controlBar = $('.control-bar'),

    $playBtn = $('#playpausebuttons'),
    $muteButton = $('#mute'),
    $volumeSlider = $('#volume-slider'),
    $speedx1 = $('#speedx1'),
    $speedx3 = $('#speedx3'),
    $slowMo = $('#slowMo'),
    $fullscreen = $('#fullScreen'),
    

    $duration = $('#duration'),
    $progressBar = $('.progressBar'),
    $timeBar = $('.timeBar'),
    $timeDrag = false,
    $bufferBar = $('.bufferBar'); 


// HIDING AND SHOWING CONTROLS

$vidContainer.mouseenter(function () {
    $controlBar.fadeIn(700);
});
$vidContainer.mouseleave(function () {
    $controlBar.fadeOut(700);
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

//SLOW MOTION

$slowMo.on('click', function() {
    fastfowrd(this, 0.5);
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

function fullScreen() {
  if($video[0].requestFullscreen) {
    $video[0].requestFullscreen();
  } else if($video[0].mozRequestFullScreen) {
    $video[0].mozRequestFullScreen();
  } else if($video[0].webkitRequestFullscreen) {
    $video[0].webkitRequestFullscreen();
  } else if($video[0].msRequestFullscreen) {
    $video[0].msRequestFullscreen();
  }
}


$fullscreen.click(function() {
  fullScreen();
}); 

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
    var progress = $progressBar;
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
    
    $timeBar.css('width', percentage+'%');
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

// HIGHLIGHT TEXT

$video.on("timeupdate", function() {
  var $videoTime = $video[0].currentTime;
    function triggerHighlight(h) {
      $('span[data-start-time]').removeClass("highlight");
      $('span[data-start-time="' + h + '"]').addClass("highlight");
  }

    if ($videoTime > -1 && $videoTime < 4.130) {
       triggerHighlight(0);
    } else if ($videoTime > 4.13 && $videoTime < 7.535) {
       triggerHighlight(4.13);
    } else if ($videoTime > 7.535 && $videoTime < 11.27) {
      triggerHighlight(7.535);
    } else if ($videoTime > 11.27 && $videoTime < 13.96) {
        triggerHighlight(11.27);
    } else if ($videoTime > 13.96 && $videoTime < 17.94) {
        triggerHighlight(13.96);
    } else if ($videoTime > 17.94 && $videoTime < 22.37) {
        triggerHighlight(17.94);
    } else if ($videoTime > 22.37 && $videoTime < 26.88) {
        triggerHighlight(22.37);
    } else if ($videoTime > 26.88 && $videoTime < 30.92) {
        triggerHighlight(26.88);
    } else if ($videoTime > 32.1 && $videoTime < 34.73) {
        triggerHighlight(32.1);
    } else if ($videoTime > 34.73 && $videoTime < 39.43) {
        triggerHighlight(34.73 );
    } else if ($videoTime > 39.43 && $videoTime < 41.19) {
        triggerHighlight(39.43);
    } else if ($videoTime > 42.35 && $videoTime < 46.3) {
        triggerHighlight(42.35);
    } else if ($videoTime > 46.3 && $videoTime < 49.27) {
        triggerHighlight(46.3);
    } else if ($videoTime > 49.27 && $videoTime < 53.76) {
        triggerHighlight(49.27);
    } else if ($videoTime > 53.76 && $videoTime < 57.78 ) {
        triggerHighlight(53.76);
    } else if ($videoTime > 57.78) {
        triggerHighlight(57.78);
    }

});

// CLICKING ON SENTENCE TAKES YOU ON THAT PART IN THE VIDEO

$("span").click(function() {
  var transcriptTime = $(this).attr("data-start-time");
  $video[0].currentTime = transcriptTime;
});








