import { loadComponent } from '../../script.js'

const ids = {
  startButton: 'gameMenuStartButton',
  gameMenuContainer: 'gameMenuContainer',
  gridStaticContainer: 'gridStaticContainer',
}

const styles = {
  hidden: 'game-menu--hidden',
}

const messages = {
  initMsg: 'game menu',
}

const events = {
  click: 'click',
}

const componentFile = {
  gridStatic: 'grid_static',
}

export function init() {
  console.log(messages.initMsg)
}

document
  .getElementById(ids.startButton)
  .addEventListener(events.click, async () => {
    await showGridStatic()
  })

async function showGridStatic() {
  const menu = document.getElementById(ids.gameMenuContainer)
  menu.classList.add(styles.hidden)

  await loadComponent(ids.gridStaticContainer, componentFile.gridStatic)
}
