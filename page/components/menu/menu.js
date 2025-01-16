import { guiContener } from '../../script.js'

const className = {
  gameMenu: '.game-menu',
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
  grid: 'fleet_grid',
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

  await guiContener.loadComponent(componentFile.grid, 'fleet-grid', [
    'EventHandler.js',
    'FleetGridConfig.js',
    'FleetGridConfig.js',
    'FleetService.js',
    'GridRenderer.js',
    'PlacementValidator.js',
    'ShipPreview.js',
    'PlacementHandler.js',
    'FleetGrid.js',
  ])
  //   const dataService = loadedComponents.find(
  //     (comp) => comp.name === 'data_service'
  //   )
  //   const grid = componentSystem.loadedComponents.find(
  //     (comp) => comp.name === componentFile.grid
  //   )
  //   if (dataService && dataService.jsModule && grid && grid.jsModule) {
  //     //grid.jsModule.setDataService(dataService.jsModule)
  //   }
  await guiContener.loadComponent(componentFile.toggle, 'toggle')
}
