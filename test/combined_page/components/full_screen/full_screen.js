import { loadComponent } from '../../script.js'

const ids = {
  fsOverlay: 'fsOverlay',
  fsOverlayButton: 'fsOverlayButton',
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

const componentFile = {
  menu: 'menu',
}

export function init() {
  console.log(messages.initMsg)
}

const button = document.getElementById(ids.fsOverlayButton)
const overlay = document.getElementById(ids.fsOverlay)

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

button.addEventListener(events.click, goFullScreen)

async function showMenu() {
  await loadComponent(componentFile.menu)
}
