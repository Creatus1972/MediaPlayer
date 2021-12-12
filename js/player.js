var infobox = document.getElementById('infobox'),
    song = document.getElementById('playlist').getElementsByTagName('a'),
    music = document.getElementById('music'),
    duration,
    toggle = document.getElementById('toggle-wrap'),
    playhead = document.getElementById('playhead'),
    timeline = document.getElementById('timeline'),
    timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
window.addEventListener('resize', function () {
    timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
}, false);
music.addEventListener('playing', function () {
    toggle.className = 'pause';
    infobox.className = 'show';
    infobox.style.display = 'block';
}, false);
music.addEventListener('ended', function () {  
    toggle.className = 'play';
    infobox.className = 'hide';
    infobox.style.display = 'none';
    playhead.style.marginLeft = '0px';
}, false);
music.addEventListener('timeupdate', timeUpdate, false);
timeline.addEventListener('click', function (event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
    if (!music.pause) {
        toggle.className = 'pause';
        infobox.className = 'show';
    }
}, false);
function clickPercent(e) {
    return (event.pageX - timeline.offsetLeft) / timelineWidth;
}
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);
var onplayhead = false;
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}
function mouseUp(e) {
    if (onplayhead === true) {
        moveplayhead(e);
        window.removeEventListener('mousemove', moveplayhead, true);
        music.currentTime = duration * clickPercent(e);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}
function moveplayhead(e) {
    var newMargLeft = e.pageX - timeline.offsetLeft;
    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + 'px';
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = '0px';
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + 'px';
    }
}
function timeUpdate() { // sync playhead position with current point in audio
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + 'px';
    if (music.currentTime === duration) {
        toggle.className = 'play';
    }
}
function play() {
    if (music.paused) {
        music.play();
        toggle.className = 'pause loading';
        infobox.className = 'show';
        infobox.style.display = 'block';
    } else {
        music.pause();
        toggle.className = 'play';
        infobox.className = 'hide';
        infobox.style.display = 'none';
        if (document.all && !window.atob) {
            infobox.style.display = 'none';
        }
    }
}
toggle.addEventListener('click', play, false);
music.addEventListener('canplaythrough', function () {
    duration = music.duration;
}, false);
for (var i = 0; i < song.length; ++i) {
    song[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        music.getElementsByTagName('source')[0].src = this.getAttribute('data-audio-src');
        music.load();
        play();
        infobox.getElementsByTagName('b')[0].innerHTML = this.getElementsByTagName('b')[0].innerHTML;
    }, false);
}
