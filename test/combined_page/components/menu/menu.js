import { loadComponent } from '../../script.js'

const ids = {
  gameMenu: 'gameMenu',
  gameMenuStartButton: 'gameMenuStartButton',
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
  grid: 'grid',
  toggle: 'toggle',
}

export function init() {
  console.log(messages.initMsg)
}

document
  .getElementById(ids.gameMenuStartButton)
  .addEventListener(events.click, async () => {
    await showGridStatic()
  })

async function showGridStatic() {
  const menu = document.getElementById(ids.gameMenu)
  menu.classList.add(styles.hidden)

  await loadComponent(componentFile.grid)
  await loadComponent(componentFile.toggle)
}
