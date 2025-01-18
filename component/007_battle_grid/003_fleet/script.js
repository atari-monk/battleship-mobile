import { GUIContenerFactory } from '../../../libs/component_service/index.js'
import { DataServiceFactory } from '../../../libs/data_service/index.js'

export const guiContener = new GUIContenerFactory().generete(
  './../../../component/007_battle_grid'
)
const dataService = new DataServiceFactory().generete()

async function init() {
  await guiContener.loadComponent('003_fleet', 'battle-grid')

  const battleGrid = guiContener.getComponentInstance('003_fleet')
  battleGrid.gridRenderer.dataService = dataService
}

document.addEventListener('DOMContentLoaded', init)
