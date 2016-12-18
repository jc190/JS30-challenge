// Elements
const videoPlayer = document.querySelector('.viewer')
const progressBar = document.querySelector('.progress')
const progressBarFilled = document.querySelector('.progress__filled')
const playBtn = document.querySelector('.toggle')
const volumeSlider = document.querySelector('input[name="volume"]')
const playbackSlider = document.querySelector('input[name="playbackRate"]')
const skipBtns = document.querySelectorAll('.skip')
let isDragable = false
console.dir(progressBar)
// Functions

function updateProgress () {
  progressBarFilled.style.flexBasis = (videoPlayer.currentTime / videoPlayer.duration) * 100 + '%'
}

function togglePlay () {
  videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause()
}

function updateBtn () {
  console.log(this)
  playBtn.textContent = this.paused ? '►' : '❚❚'
}

function setVolume (e) {
  videoPlayer.volume = e.target.value
}

function setPlayback (e) {
  videoPlayer.playbackRate = e.target.value
}

function resetPlaybackRate (e) {
  videoPlayer.playbackRate = 1;
  e.target.value = 1;
}

function setSkip (e) {
  videoPlayer.currentTime = parseInt(e.target.dataset.skip) + videoPlayer.currentTime
}

function setPlayPoint (e) {
  const point = (e.offsetX / videoPlayer.videoWidth)
  videoPlayer.currentTime = point * videoPlayer.duration
}


// Listeners

videoPlayer.addEventListener('timeupdate', updateProgress)
videoPlayer.addEventListener('click', togglePlay)
videoPlayer.addEventListener('play', updateBtn)
videoPlayer.addEventListener('pause', updateBtn)
progressBar.addEventListener('mousedown', () => isDragable = true)
progressBar.addEventListener('mouseup', () => isDragable = false)
progressBar.addEventListener('mouseleave', () => isDragable = false)
progressBar.addEventListener('click', setPlayPoint)
progressBar.addEventListener('mousemove', (e) => isDragable && setPlayPoint(e))
playBtn.addEventListener('click', togglePlay)
volumeSlider.addEventListener('input', setVolume)
playbackSlider.addEventListener('input', setPlayback)
playbackSlider.addEventListener('dblclick', resetPlaybackRate)
skipBtns.forEach((btn) => {
  btn.addEventListener('click', setSkip)
})
