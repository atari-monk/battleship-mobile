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
  initMsg: '3. Load component: full_screen',
}

const componentFile = {
  menu: 'menu',
}

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
  document.querySelector(className.fsOverlay).classList.add(styles.hidden)

  await showMenu()
}

async function showMenu() {
  await guiContener.loadComponentResources(componentFile.menu)
  const menu = guiContener.createInstance(
    componentFile.menu,
    'game-menu',
    'game-menu-1'
  )
  menu.jsInstance()
}

export default function init() {
  const button = document.getElementById(ids.fsOverlayButton)
  button.addEventListener(events.click, goFullScreen)
  console.log(messages.initMsg)
}
