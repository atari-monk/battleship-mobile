//import { DataService } from './service/data_service.js'
//import { Player } from './model/player.js'

// export const loadedComponents = []

// export async function loadComponent(
//   componentName,
//   rootDivClassName,
//   scripts = []
// ) {
//   if (loadedComponents.includes(componentName)) {
//     console.warn(`Component already loaded: ${componentName}`)
//     return
//   }

//   // Load HTML
//   const basePath = `./components/${componentName}`
//   const htmlResponse = await fetch(`${basePath}/${componentName}.html`)
//   const html = await htmlResponse.text()

//   const container = document.createElement('div')
//   container.className = `${rootDivClassName}`
//   container.innerHTML = html
//   document.body.appendChild(container)

//   // Load CSS
//   const cssLink = document.createElement('link')
//   cssLink.rel = 'stylesheet'
//   cssLink.href = `${basePath}/${componentName}.css`
//   document.head.appendChild(cssLink)

//   const allModules = []
//   for (const script of scripts) {
//     try {
//       const module = await import(`${basePath}/${script}`)
//       allModules.push({ name: script, module })
//     } catch (error) {
//       console.warn(`Failed to load script: ${script}`, error)
//     }
//   }

//   // Load JS
//   let jsModule = null
//   try {
//     jsModule = await import(`${basePath}/${componentName}.js`)
//     if (jsModule.init) {
//       jsModule.init()
//     }
//   } catch (error) {
//     console.error(
//       `Error in main JavaScript for component: ${componentName}`,
//       error
//     )
//   }

//   loadedComponents.push({ name: componentName, jsModule, allModules })
//   return loadedComponents
// }

import {
  GUIContenerFactory,
  ServiceContenerFactory,
} from './../libs/component_service/index.js'

export const guiContener = new GUIContenerFactory().genereteGUIContener()
export const serviceContener =
  new ServiceContenerFactory().genereteServiceContener()

async function initPage() {
  //   const dataService = new DataService()
  //   dataService.player1 = new Player('Captain Jack')
  //   dataService.player2 = new Player('Blackbeard')
  //   loadedComponents.push({ name: 'data_service', jsModule: dataService })
  await guiContener.loadComponent('full_screen', 'fs-overlay')
}

document.addEventListener('DOMContentLoaded', initPage)
