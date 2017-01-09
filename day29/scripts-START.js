const display = document.querySelector('.display')
const timeLeft = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')

const controls = document.querySelector('.timer__controls')
const buttons = controls.querySelectorAll('.timer__button')
const form = controls.querySelector('form[name=customForm]')
const input = form.querySelector('input[name=minutes]')

let countDown

function timer (seconds) {
  const now = Date.now()
  const then = now + seconds * 1000
  updateTimeEnd(then)
  updateTimeLeft(seconds)
  countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    if(secondsLeft < 0) {
      clearInterval(countDown)
      return
    }
    updateTimeLeft(secondsLeft)
  }, 1000)
}

function updateTimeLeft (seconds) {
  let min, sec
  if(seconds / 60 > 1) {
    min = Math.floor(seconds / 60)
    sec = seconds % 60
  } else {
    min = '00'
    sec = seconds
  }
  if(sec < 10) {
    sec = '0' + sec
  }
  timeLeft.textContent = document.title = `${min}:${sec}`
}

function updateTimeEnd (timeEnd) {
  const time = new Date(timeEnd)
  let hour = time.getHours()
  let minute = time.getMinutes()
  hour = hour > 12 ? hour - 12 : hour
  endTime.textContent = `Come back at ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`
}

function stopTimer () {
  if(countDown) {
    clearInterval(countDown)
  }
}

function handleClick () {
  stopTimer()
  timer(this.dataset.time)
}

function handleInput (e) {
  e.preventDefault()
  stopTimer()
  timer(parseInt(input.value) * 60)
  this.reset()
}

buttons.forEach((button) => {
  button. addEventListener('click', handleClick)
})

form.addEventListener('submit', handleInput)
