import { guiContener, serviceContener } from '../../script.js'

const className_dot = {
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

const component = {
  grid: {
    name: 'fleet_grid',
    className: 'fleet-grid',
    scripts: [
      'EventHandler.js',
      'FleetGridConfig.js',
      'FleetGridConfig.js',
      'FleetService.js',
      'GridRenderer.js',
      'PlacementValidator.js',
      'ShipPreview.js',
      'PlacementHandler.js',
      'FleetGrid.js',
    ],
  },
  toggle: 'toggle',
}

const service = {
  data_service: 'data_service',
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
  const menu = document.querySelector(className_dot.gameMenu)
  menu.classList.add(styles.hidden)

  const { name, className, scripts } = component.grid
  await guiContener.loadComponent(name, className, scripts)

  const dataService = serviceContener.getServiceByName(service.data_service)
  const gridInstance = guiContener.getComponentInstance(component.grid.name)
  if (dataService && gridInstance) {
    gridInstance.fleetService.dataService = dataService
  }
  await guiContener.loadComponent(component.toggle, 'toggle')
}
