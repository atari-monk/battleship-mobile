import { GUIComponentLoader } from './gui_component/GUIComponentLoader.js'
import { GUIComponentUnloader } from './gui_component/GUIComponentUnloader.js'
import { GUIComponentStorage } from './gui_component/GUIComponentStorage.js'
import { GUIComponentContener } from './gui_component/GUIComponentContener.js'

export class GUIContenerFactory {
  generete(basePath) {
    const componentLoader = new GUIComponentLoader()
    const componentUnloader = new GUIComponentUnloader()
    const componentStorage = new GUIComponentStorage()
    const contener = new GUIComponentContener(
      componentLoader,
      componentUnloader,
      componentStorage
    )
    contener.basePath = basePath
    return contener
  }
}
