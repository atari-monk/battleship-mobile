import { GUIComponentLoader } from './gui_component/GUIComponentLoader.js'
import { GUIComponentUnloader } from './gui_component/GUIComponentUnloader.js'
import { GUIComponentStorage } from './gui_component/GUIComponentStorage.js'
import { GUIComponentContener } from './gui_component/GUIComponentContener.js'

export class GUIContenerFactory {
  generete() {
    const componentLoader = new GUIComponentLoader()
    const componentUnloader = new GUIComponentUnloader()
    const componentStorage = new GUIComponentStorage()
    return new GUIComponentContener(
      componentLoader,
      componentUnloader,
      componentStorage
    )
  }
}
