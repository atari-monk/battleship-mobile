const loadedComponents = []

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
  try {
    const jsModule = await import(`${basePath}/${componentName}.js`)
    if (jsModule.init) {
      jsModule.init()
    }
  } catch (error) {
    console.warn(`No JavaScript for component: ${componentName}`)
  }

  loadedComponents.push(componentName)
}

async function initPage() {
  await loadComponent('full_screen')
}

document.addEventListener('DOMContentLoaded', initPage)
