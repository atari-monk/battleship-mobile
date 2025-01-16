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

  addComponent(componentName, jsModule, allModules, jsInstance) {
    this.loadedComponents.push({
      name: componentName,
      jsModule,
      allModules,
      jsInstance,
    })
  }

  removeComponent(componentIndex) {
    this.loadedComponents.splice(componentIndex, 1)
  }

  getComponentByName(componentName) {
    const component = this.loadedComponents.find(
      (comp) => comp.name === componentName
    )
    return component
  }
}
