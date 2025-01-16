export class ServiceContener {
  constructor(serviceLoader, serviceUnloader, serviceStorage) {
    this.loader = serviceLoader
    this.unloader = serviceUnloader
    this.storage = serviceStorage
  }

  loadService(serviceName, serviceInstance) {
    if (this.storage.isServiceLoaded(serviceName)) {
      console.warn(`service already loaded: ${serviceName}`)
      return
    }

    this.loader.serviceName = serviceName
    this.loader.serviceInstance = serviceInstance

    const serviceData = this.loader.loadService()
    if (serviceData) {
      this.storage.addService(serviceName, serviceData.instance)
      console.log(`service loaded: ${serviceName}`)
    }
  }

  unloadService(serviceName) {
    const serviceIndex = this.storage.findServiceIndex(serviceName)
    if (serviceIndex === -1) {
      console.warn(`service not loaded: ${serviceName}`)
      return
    }

    const serviceData = this.storage.loadedServices[serviceIndex]
    this.unloader.unloadService(serviceData.instance)

    this.storage.removeService(serviceIndex)
    console.log(`service unloaded: ${serviceName}`)
  }

  getServiceByName(serviceName) {
    return this.storage.getServiceByName(serviceName)
  }
}
