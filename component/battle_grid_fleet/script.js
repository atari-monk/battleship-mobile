import {
  GUIContenerFactory,
  ServiceContenerFactory,
} from './../../libs/component_service/index.js'
import { DataServiceFactory } from './../../libs/data_service/index.js'

export const guiContener = new GUIContenerFactory().generete(
  './../../../component'
)
//export const serviceContener = new ServiceContenerFactory().generete()
const dataService = new DataServiceFactory().generete()

async function init() {
  //console.log('init')
  //serviceContener.loadService('data_service', dataService)
  await guiContener.loadComponent('battle_grid_fleet', 'battle-grid')

  const battleGrid = guiContener.getComponentInstance('battle_grid_fleet')
  battleGrid.gridRenderer.dataService = dataService
}

document.addEventListener('DOMContentLoaded', init)
