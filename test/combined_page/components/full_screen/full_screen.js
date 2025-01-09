import { loadComponent } from '../../script.js'

export function init() {
  console.log('full screen overlay request component')
}

const fullScreenButton = document.getElementById('fs-fullScreenButton')
const overlay = document.getElementById('fs-overlay')

const goFullScreen = async () => {
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

  await showMenu()
}

fullScreenButton.addEventListener('click', goFullScreen)

async function showMenu() {
  await loadComponent('menu-container', 'menu')
}
