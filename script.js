const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.querySelector('#play-btn');
const volumeIcon = document.querySelector('.vol-change');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullScreen = document.querySelector('.fullscreen');
const controlsContainer = document.querySelector('.controls-container');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const player = document.querySelector('.player');

let volumeStart = 1;
// Play & Pause-------------------------------------------------------
function showIconOnEnded() {
  playBtn.setAttribute('title', 'Play');
  playBtn.classList.replace('fa-pause', 'fa-play');
  //   controlsContainer.style.opacity= '1';
  //   controlsContainer.style.transition = 'all 0.2s ease-out'
}
function togglePlayPause() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    {
      video.pause();
      showIconOnEnded();
    }
  }
}

playBtn.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);
video.addEventListener('ended', showIconOnEnded);

//Progress Bar-----------------------------------------------------------
function progressUpdate() {
  let curMinutes = (video.currentTime / 60000).toFixed().padStart(2, '0');
  let curSeconds = parseInt(video.currentTime % 60)
    .toString()
    .padStart(2, '0');
  let durMinutes = (video.duration / 60000).toFixed().padStart(2, '0');
  let durSeconds = parseInt(video.duration % 60)
    .toString()
    .padStart(2, '0');

  currentTime.textContent = `${curMinutes}:${curSeconds} /`;
  duration.textContent = `${durMinutes}:${durSeconds}`;

  let width = (video.currentTime / video.duration) * 100;

  progressBar.style.width = `${width}%`;
}

function seekProgress(e) {
  let totalWidth = this.clientWidth;
  let onclickWidth = e.layerX;
  let seek = (onclickWidth / totalWidth) * video.duration;

  video.currentTime = seek;
}

video.addEventListener('timeupdate', progressUpdate);
video.addEventListener('canplay', progressUpdate);
progressRange.addEventListener('click', seekProgress);
// Volume Controls-----------------------------------------------------
function volumeUpdate(e) {
  let totalVolume = this.clientWidth;
  let pointVolume = e.layerX;
  let volumeWidth = (pointVolume / totalVolume) * 100;
  let volumechange = volumeWidth / 100;
  video.volume = volumechange;

  volumeBar.style.width = `${volumeWidth}%`;
  if (video.volume > 0.5) {
    volumeIcon.classList.replace('fa-volume-low', 'fa-volume-high');
  } else if (video.volume > 0 && video.volume < 0.5) {
    volumeIcon.classList.replace('fa-volume-high', 'fa-volume-low');
  } else if (video.volume === 0) {
    toggleMute();
  }
}

function toggleMute() {
  if (video.volume > 0.5) {
    volumeIcon.classList.replace('fa-volume-high', 'fa-volume-mute');
    volumeBar.style.width = `0%`;
    video.volume = 0;
  } else if (video.volume > 0 && video.volume < 0.5) {
    volumeIcon.classList.replace('fa-volume-low', 'fa-volume-mute');
    volumeBar.style.width = `0%`;
    video.volume = 0;
  } else if (video.volume === 0) {
    video.volume = volumeStart;
    volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-high');
    volumeBar.style.width = `${video.volume * 100}%`;
  }
}

volumeRange.addEventListener('click', volumeUpdate);
volumeIcon.addEventListener('click', toggleMute);

// Change Playback Speed-----------------------------------------------
function playbackSpeed() {
  video.playbackRate = this.value;
}
speed.addEventListener('change', playbackSpeed);

//Video Full-Screen Controller-------------------------------------------

let isfullscreen = false;

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}
function toggleFullscreen() {
  if (!isfullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }

  isfullscreen = !isfullscreen;
}
fullScreen.addEventListener('click', toggleFullscreen);
