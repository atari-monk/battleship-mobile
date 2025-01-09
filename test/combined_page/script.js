export async function loadComponent(containerId, componentName) {
  const basePath = `./components/${componentName}`

  // Load HTML
  const htmlResponse = await fetch(`${basePath}/${componentName}.html`)
  const html = await htmlResponse.text()

  // Inject HTML into the container
  document.getElementById(containerId).innerHTML = html

  // Load and append CSS
  const cssLink = document.createElement('link')
  cssLink.rel = 'stylesheet'
  cssLink.href = `${basePath}/${componentName}.css`
  document.head.appendChild(cssLink)

  // Load JavaScript if exists
  try {
    const jsModule = await import(`${basePath}/${componentName}.js`)
    if (jsModule.init) {
      jsModule.init() // Optional init function for the component
    }
  } catch (error) {
    console.warn(`No JavaScript for component: ${componentName}`)
  }
}

// Load all components
async function initPage() {
  await loadComponent('fullScreenContainer', 'full_screen')
  //await loadComponent('menu-container', 'menu')
  //await loadComponent('grid-static-container', 'grid_static')
}

document.addEventListener('DOMContentLoaded', initPage)
