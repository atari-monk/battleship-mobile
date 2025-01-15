export class ComponentRegistry {
  constructor(componentLoader, componentUnloader) {
    this.loadedComponents = []
    this.loader = componentLoader
    this.unloader = componentUnloader
  }

  async loadComponent(componentName, rootDivClassName, scripts = []) {
    if (this.isComponentLoaded(componentName)) {
      console.warn(`Component already loaded: ${componentName}`)
      return
    }

    const basePath = `./../../page/components/${componentName}`
    const loader = this.loader
    loader.basePath = basePath
    loader.componentName = componentName

    try {
      const html = await loader.loadHtml()
      const container = this.createContainer(rootDivClassName, html)
      document.body.appendChild(container)

      await loader.loadCss()
      const allModules =
        scripts.length > 0 ? await loader.loadScripts(scripts) : []

      const jsModule = await loader.loadJsModule()
      this.loadedComponents.push({ name: componentName, jsModule, allModules })
    } catch (error) {
      console.error(`Error loading component: ${componentName}`, error)
    }
  }

  isComponentLoaded(componentName) {
    return this.loadedComponents.some((comp) => comp.name === componentName)
  }

  createContainer(rootDivClassName, html) {
    const container = document.createElement('div')
    container.className = rootDivClassName
    container.innerHTML = html
    return container
  }

  unloadComponent(componentName, unloadFromMemory = false) {
    const componentIndex = this.findComponentIndex(componentName)
    if (componentIndex === -1) {
      console.warn(`Component not loaded: ${componentName}`)
      return
    }

    const unloader = this.unloader
    unloader.basePath = `./components/${componentName}`
    unloader.componentName = componentName

    unloader.unloadHtml()
    unloader.unloadCss()
    unloader.unloadScripts(
      this.loadedComponents[componentIndex].allModules.map(
        (module) => module.name
      )
    )
    unloader.unloadJsModule()

    if (unloadFromMemory) {
      this.loadedComponents.splice(componentIndex, 1)
    }

    console.log(
      `Component unloaded: ${componentName}${
        unloadFromMemory ? ' and removed from memory' : ''
      }`
    )
  }

  findComponentIndex(componentName) {
    return this.loadedComponents.findIndex(
      (comp) => comp.name === componentName
    )
  }
}
