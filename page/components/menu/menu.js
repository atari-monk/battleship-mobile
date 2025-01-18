import { guiContener, serviceContener } from '../../script.js'
import { MenuConfig } from './MenuConfig.js'

const config = new MenuConfig()

export function init() {
  console.log(config.component.menu.msg.initMsg)
}

document
  .getElementById(config.component.menu.id.menuStartButton)
  .addEventListener(config.component.menu.event.click, async () => {
    await showGridStatic()
  })

async function showGridStatic() {
  const {
    cssClass: { component: menuClass },
    style: { hidden: menuStyle },
  } = config.component.menu
  document.querySelector(config.dot(menuClass)).classList.add(menuStyle)

  const {
    name: fleetGridName,
    scripts,
    cssClass: { component: fleetGrid1Class },
  } = config.component.fleetGrid
  const {} = config.component.fleetGrid
  await guiContener.loadComponent(fleetGridName, fleetGrid1Class, scripts)

  const dataService = serviceContener.getServiceByName(
    config.service.dataService.name
  )
  const grid1 = guiContener.getComponentInstance(fleetGridName)

  if (dataService && grid1) {
    grid1.fleetService.dataService = dataService
  }

  const {
    name: toggleName,
    cssClass: { component: toggleClass },
  } = config.component.toggle
  await guiContener.loadComponent(toggleName, toggleClass)
}
