import { ServiceLoader } from './service_component/ServiceLoader.js'
import { ServiceUnloader } from './service_component/ServiceUnloader.js'
import { ServiceStorage } from './service_component/ServiceStorage.js'
import { ServiceRegistry } from './service_component/ServiceRegistry.js'

export class ServiceContenerFactory {
  genereteServiceContener() {
    const serviceLoader = new ServiceLoader()
    const serviceUnloader = new ServiceUnloader()
    const serviceStorage = new ServiceStorage()
    return new ServiceRegistry(serviceLoader, serviceUnloader, serviceStorage)
  }
}
