import {
  GUIContenerFactory,
  ServiceContenerFactory,
} from './../libs/component_service/index.js'
import { DataServiceFactory } from './../libs/data_service/index.js'

export const guiContener = new GUIContenerFactory().generete(
  './../../../page/components'
)
export const serviceContener = new ServiceContenerFactory().generete()

async function init() {
  const dataService = await new DataServiceFactory().generete()
  serviceContener.loadService('data_service', dataService)
  await guiContener.loadComponentResources('full_screen')
  guiContener.createInstance('full_screen', 'fs-overlay', 'fs-overlay-1')
}

document.addEventListener('DOMContentLoaded', init)
