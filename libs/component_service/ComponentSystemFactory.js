import { GUIComponentLoader } from './gui_component/GUIComponentLoader.js'
import { GUIComponentUnloader } from './gui_component/GUIComponentUnloader.js'
import { GUIComponentStorage } from './gui_component/GUIComponentStorage.js'
import { GUIComponentService } from './gui_component/GUIComponentService.js'

export class ComponentSystemFactory {
  genereteComponentSystem() {
    const componentLoader = new GUIComponentLoader()
    const componentUnloader = new GUIComponentUnloader()
    const componentStorage = new GUIComponentStorage()
    return new GUIComponentService(
      componentLoader,
      componentUnloader,
      componentStorage
    )
  }
}
