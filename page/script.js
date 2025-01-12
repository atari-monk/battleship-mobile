import { DataService } from './service/data_service.js'
import { Player } from './model/player.js'

export const loadedComponents = []

export async function loadComponent(componentName) {
  if (loadedComponents.includes(componentName)) {
    console.warn(`Component already loaded: ${componentName}`)
    return
  }

  // Load HTML
  const basePath = `./components/${componentName}`
  const htmlResponse = await fetch(`${basePath}/${componentName}.html`)
  const html = await htmlResponse.text()

  const container = document.createElement('div')
  container.className = `component-${componentName}`
  container.innerHTML = html
  document.body.appendChild(container)

  // Load CSS
  const cssLink = document.createElement('link')
  cssLink.rel = 'stylesheet'
  cssLink.href = `${basePath}/${componentName}.css`
  document.head.appendChild(cssLink)

  // Load JS
  let jsModule = null
  try {
    jsModule = await import(`${basePath}/${componentName}.js`)
    if (jsModule.init) {
      jsModule.init()
    }
  } catch (error) {
    console.warn(`No JavaScript for component: ${componentName}`)
  }

  loadedComponents.push({ name: componentName, jsModule })
  return loadedComponents
}

async function initPage() {
  const dataService = new DataService()
  dataService.player1 = new Player('Captain Jack')
  dataService.player2 = new Player('Blackbeard')
  loadedComponents.push({ name: 'data_service', jsModule: dataService })
  await loadComponent('full_screen')
}

document.addEventListener('DOMContentLoaded', initPage)
