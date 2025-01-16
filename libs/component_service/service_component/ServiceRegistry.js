export class ServiceRegistry {
  constructor(serviceLoader, serviceUnloader, serviceStorage) {
    this.loader = serviceLoader
    this.unloader = serviceUnloader
    this.storage = serviceStorage
  }

  loadService(serviceName, serviceClass, ...args) {
    if (this.storage.isServiceLoaded(serviceName)) {
      console.warn(`Service already loaded: ${serviceName}`)
      return
    }

    this.loader.serviceClass = serviceClass
    this.loader.serviceName = serviceName

    const serviceData = this.loader.loadService(...args)
    if (serviceData) {
      this.storage.addService(serviceName, serviceData.instance)
      console.log(`Service loaded: ${serviceName}`)
    }
  }

  unloadService(serviceName) {
    const serviceIndex = this.storage.findServiceIndex(serviceName)
    if (serviceIndex === -1) {
      console.warn(`Service not loaded: ${serviceName}`)
      return
    }

    const serviceData = this.storage.loadedServices[serviceIndex]
    this.unloader.unloadService(serviceData.instance)

    this.storage.removeService(serviceIndex)
    console.log(`Service unloaded: ${serviceName}`)
  }
}
