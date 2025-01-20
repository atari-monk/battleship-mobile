import { guiContener, serviceContener } from '../../script.js'
import { MenuConfig } from './MenuConfig.js'

const config = new MenuConfig()

export default function init() {
  document
    .getElementById(config.component.menu.id.menuStartButton)
    .addEventListener(config.component.menu.event.click, async () => {
      await showGridStatic()
    })
  console.log(config.component.menu.msg.initMsg)
}

async function showGridStatic() {
  const {
    cssClass: { component: menuClass },
    style: { hidden: menuStyle },
  } = config.component.menu
  document.querySelector(config.dot(menuClass)).classList.add(menuStyle)

  const {
    name: fleetGridName,
    cssClass: { component: fleetGridClass },
    ids: { id1: fleetGridId1 },
    scripts,
  } = config.component.fleetGrid
  await guiContener.loadComponentResources(fleetGridName, scripts)

  const dataService = serviceContener.getServiceByName(
    config.service.dataService.name
  )
  const fleetGrid = guiContener.createInstance(
    fleetGridName,
    fleetGridClass,
    fleetGridId1
  )

  if (dataService && fleetGrid) {
    fleetGrid.jsInstance.dataService = dataService
  }

  const {
    name: toggleName,
    cssClass: { component: toggleClass },
    ids: { id1: toggleId1 },
  } = config.component.toggle
  await guiContener.loadComponentResources(toggleName)
  guiContener.createInstance(toggleName, toggleClass, toggleId1)
}
