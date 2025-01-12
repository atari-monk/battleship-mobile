async function loadComponent(containerId, componentName) {
  const basePath = `./components/${componentName}`

  const htmlResponse = await fetch(`${basePath}/${componentName}.html`)
  const html = await htmlResponse.text()

  document.getElementById(containerId).innerHTML = html

  const cssLink = document.createElement('link')
  cssLink.rel = 'stylesheet'
  cssLink.href = `${basePath}/${componentName}.css`
  document.head.appendChild(cssLink)

  try {
    const jsModule = await import(`${basePath}/${componentName}.js`)
    if (jsModule.init) {
      jsModule.init()
    }
  } catch (error) {
    console.warn(`No JavaScript for component: ${componentName}`)
  }
}

async function initPage() {
  await loadComponent('header-container', 'header')
  await loadComponent('main-container', 'main')
  await loadComponent('footer-container', 'footer')
}

document.addEventListener('DOMContentLoaded', initPage)
