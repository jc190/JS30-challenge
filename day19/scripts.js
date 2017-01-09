const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ audio: false, video: true })
    .then((mediaStream) => {
      video.src = window.URL.createObjectURL(mediaStream)
      video.play()
    })
    .catch((err) => {
      console.log(err)
    })
}

function paintToCanvas() {
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)
    let pixels = ctx.getImageData(0, 0, width, height)
    // pixels = redEffect(pixels)
    pixels = rgbSplit(pixels)
    ctx.globalAlpha = 0.5
    ctx.putImageData(pixels, 0, 0)
  }, 16)
}

function takePhoto() {
  snap.currentTime = 0
  snap.play()
  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'handsome')
  link.innerHTML = `<img src="${data}" alt="Ugly mug" />`
  strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] += 100 // r
    pixels.data[i + 1] += -50 // g
    pixels.data[i + 2] *= .5 // b
  }
  return pixels
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 100] = pixels.data[i + 0] // r
    pixels.data[i + 100] = pixels.data[i + 1] // g
    pixels.data[i - 100] = pixels.data[i + 2] // b
  }
  return pixels
}

// getVideo()

video.addEventListener('canplay', paintToCanvas)