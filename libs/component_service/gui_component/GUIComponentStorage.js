export class GUIComponentStorage {
  constructor() {
    this.loadedComponents = []
  }

  isComponentLoaded(componentName) {
    return this.loadedComponents.some((comp) => comp.name === componentName)
  }

  findComponentIndex(componentName) {
    return this.loadedComponents.findIndex(
      (comp) => comp.name === componentName
    )
  }

  addComponent(componentName, jsModule, allModules) {
    this.loadedComponents.push({ name: componentName, jsModule, allModules })
  }

  removeComponent(componentIndex) {
    this.loadedComponents.splice(componentIndex, 1)
  }
}
