import { loadComponent } from '../../script.js'

const className = {
  gameMenu: '.component-menu',
}

const ids = {
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
  const menu = document.querySelector(className.gameMenu)
  menu.classList.add(styles.hidden)

  const loadedComponents = await loadComponent(componentFile.grid)
  const dataService = loadedComponents.find(
    (comp) => comp.name === 'data_service'
  )
  const grid = loadedComponents.find((comp) => comp.name === componentFile.grid)
  if (dataService && dataService.jsModule && grid && grid.jsModule) {
    grid.jsModule.setDataService(dataService.jsModule)
  }
  await loadComponent(componentFile.toggle)
}
