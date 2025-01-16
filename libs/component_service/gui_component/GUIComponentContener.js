export class GUIComponentContener {
  constructor(componentLoader, componentUnloader, componentStorage) {
    this.loader = componentLoader
    this.unloader = componentUnloader
    this.componentStorage = componentStorage
  }

  async loadComponent(componentName, rootDivClassName, scripts = []) {
    if (this.componentStorage.isComponentLoaded(componentName)) {
      console.warn(`Component already loaded: ${componentName}`)
      return
    }

    const basePath = `./../../../page/components/${componentName}`
    const loader = this.loader
    loader.basePath = basePath
    loader.componentName = componentName

    try {
      const html = await loader.loadHtml()
      const container = loader.generateContainer(rootDivClassName, html)
      document.body.appendChild(container)

      await loader.loadCss()
      const allModules =
        scripts.length > 0 ? await loader.loadScripts(scripts) : []

      const jsModule = await loader.loadJsModule()
      this.componentStorage.addComponent(componentName, jsModule, allModules)
    } catch (error) {
      console.error(`Error loading component: ${componentName}`, error)
    }
  }

  unloadComponent(componentName, unloadFromMemory = false) {
    const componentIndex =
      this.componentStorage.findComponentIndex(componentName)
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
      this.componentStorage.loadedComponents[componentIndex].allModules.map(
        (module) => module.name
      )
    )
    unloader.unloadJsModule()

    if (unloadFromMemory) {
      this.componentStorage.removeComponent(componentIndex)
    }

    console.log(
      `Component unloaded: ${componentName}${
        unloadFromMemory ? ' and removed from memory' : ''
      }`
    )
  }
}
