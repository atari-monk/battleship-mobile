import { loadComponent } from '../../script.js'

const ids = {
  fullScreenButton: 'fsFullScreenButton',
  overlay: 'fsOverlay',
  menuContainer: 'menuContainer',
}

const styles = {
  hidden: 'fs-overlay--hidden',
}

const events = {
  click: 'click',
}

const messages = {
  initMsg: 'full screen overlay',
}

const component = {
  menu: 'menu',
}

export function init() {
  console.log(messages.initMsg)
}

const fullScreenButton = document.getElementById(ids.fullScreenButton)
const overlay = document.getElementById(ids.overlay)

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
  overlay.classList.add(styles.hidden)

  await showMenu()
}

fullScreenButton.addEventListener(events.click, goFullScreen)

async function showMenu() {
  await loadComponent(ids.menuContainer, component.menu)
}
