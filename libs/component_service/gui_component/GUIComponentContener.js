export class GUIComponentContener {
  set basePath(path) {
    this._basePath = path
  }

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

    const loader = this.loader
    if (!this._basePath) throw new Error('_basePath needs to be set!')
    loader.basePath = `${this._basePath}/${componentName}`
    loader.componentName = componentName

    try {
      const html = await loader.loadHtml()
      const container = loader.generateContainer(rootDivClassName, html)
      document.body.appendChild(container)

      await loader.loadCss()
      const allModules =
        scripts.length > 0 ? await loader.loadScripts(scripts) : []

      const jsModule = await loader.loadJsModule()

      let jsInstance = null
      if (jsModule && jsModule.default) {
        jsInstance = jsModule.default
      }

      this.componentStorage.addComponent(
        componentName,
        jsModule,
        allModules,
        jsInstance
      )
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

  getComponentByName(componentName) {
    return this.componentStorage.getComponentByName(componentName)
  }

  getComponentInstance(componentName) {
    const component = this.componentStorage.getComponentByName(componentName)
    return component ? component.jsInstance : null
  }
}
