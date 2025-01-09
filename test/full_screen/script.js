document.addEventListener('DOMContentLoaded', () => {
  const fullScreenButton = document.getElementById('fs-fullScreenButton')
  const overlay = document.getElementById('fs-overlay')

  const goFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    }
    overlay.style.display = 'none'
  }

  fullScreenButton.addEventListener('click', goFullScreen)
})
