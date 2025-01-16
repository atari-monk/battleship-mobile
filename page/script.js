import {
  GUIContenerFactory,
  ServiceContenerFactory,
} from './../libs/component_service/index.js'
import { DataServiceFactory } from './../libs/data_service/index.js'

export const guiContener = new GUIContenerFactory().generete()
export const serviceContener = new ServiceContenerFactory().generete()
const dataService = new DataServiceFactory().generete()

async function initPage() {
  serviceContener.loadService('data_service', dataService)
  await guiContener.loadComponent('full_screen', 'fs-overlay')
}

document.addEventListener('DOMContentLoaded', initPage)
