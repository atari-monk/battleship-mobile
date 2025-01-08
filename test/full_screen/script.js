// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  const fullScreenButton = document.getElementById('fs-fullScreenButton')
  const overlay = document.getElementById('fs-overlay')

  // Function to enable full screen
  const goFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      // Firefox
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      // IE/Edge
      document.documentElement.msRequestFullscreen()
    }
    overlay.style.display = 'none' // Hide the overlay
  }

  // Add event listener to the button
  fullScreenButton.addEventListener('click', goFullScreen)
})
