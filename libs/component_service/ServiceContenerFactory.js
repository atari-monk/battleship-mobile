import { ServiceLoader } from './service_component/ServiceLoader.js'
import { ServiceUnloader } from './service_component/ServiceUnloader.js'
import { ServiceStorage } from './service_component/ServiceStorage.js'
import { ServiceContener } from './service_component/ServiceContener.js'

export class ServiceContenerFactory {
  generete() {
    const serviceLoader = new ServiceLoader()
    const serviceUnloader = new ServiceUnloader()
    const serviceStorage = new ServiceStorage()
    return new ServiceContener(serviceLoader, serviceUnloader, serviceStorage)
  }
}
