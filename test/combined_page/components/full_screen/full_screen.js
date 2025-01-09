import { loadComponent } from '../../script.js'

const ids = {
  fullScreenButton: 'fs-fullScreenButton',
  overlay: 'fs-overlay',
  menuContainer: 'menu-container',
}

const styles = {
  hidden: 'none',
}

const events = {
  click: 'click',
}

const messages = {
  initMsg: 'full screen overlay request component',
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
  overlay.style.display = styles.hidden

  await showMenu()
}

fullScreenButton.addEventListener(events.click, goFullScreen)

async function showMenu() {
  await loadComponent(ids.menuContainer, component.menu)
}
