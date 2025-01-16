export class ServiceLoader {
  set serviceClass(serviceClass) {
    this._serviceClass = serviceClass
  }

  set serviceName(serviceName) {
    this._serviceName = serviceName
  }

  loadService(...args) {
    try {
      const serviceInstance = new this._serviceClass(...args)
      return { name: this._serviceName, instance: serviceInstance }
    } catch (error) {
      console.error(`Failed to load service: ${this._serviceName}`, error)
      return null
    }
  }
}
