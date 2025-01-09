export async function loadComponent(componentName) {
  const basePath = `./components/${componentName}`

  const htmlResponse = await fetch(`${basePath}/${componentName}.html`)
  const html = await htmlResponse.text()

  document.body.innerHTML += html

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
  await loadComponent('full_screen')
}

document.addEventListener('DOMContentLoaded', initPage)
