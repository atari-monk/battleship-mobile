import { guiContener } from '../../script.js'

const className = {
  fsOverlay: '.fs-overlay',
}

const ids = {
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
const overlay = document.querySelector(className.fsOverlay)

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
  await guiContener.loadComponent(componentFile.menu, 'game-menu')
}
