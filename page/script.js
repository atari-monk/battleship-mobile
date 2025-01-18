import {
  GUIContenerFactory,
  ServiceContenerFactory,
} from './../libs/component_service/index.js'
import { DataServiceFactory } from './../libs/data_service/index.js'

export const guiContener = new GUIContenerFactory().generete('./../../../page/components')
export const serviceContener = new ServiceContenerFactory().generete()
const dataService = new DataServiceFactory().generete()

async function init() {
  serviceContener.loadService('data_service', dataService)
  await guiContener.loadComponent('full_screen', 'fs-overlay')
}

document.addEventListener('DOMContentLoaded', init)
