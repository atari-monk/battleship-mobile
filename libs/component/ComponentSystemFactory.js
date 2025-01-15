import { ComponentLoader } from './ComponentLoader.js'
import { ComponentUnloader } from './ComponentUnloader.js'
import { ComponentRegistry } from './ComponentRegistry.js'

export class ComponentSystemFactory {
  genereteComponentSystem() {
    const componentLoader = new ComponentLoader()
    const componentUnloader = new ComponentUnloader()
    return new ComponentRegistry(componentLoader, componentUnloader)
  }
}
