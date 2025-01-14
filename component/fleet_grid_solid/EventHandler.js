export class EventHandler {
  constructor(fleetGrid, config) {
    this.fleetGrid = fleetGrid
    this.config = config
  }

  attachEvents() {
    const container = document.querySelector(this.config.cssClass.dot.grid)

    container.addEventListener(
      this.config.events.mousemove,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid)
    )
    container.addEventListener(
      this.config.events.mouseenter,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid)
    )
    container.addEventListener(
      this.config.events.touchmove,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid),
      { passive: true }
    )
    container.addEventListener(
      this.config.events.touchstart,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid),
      { passive: true }
    )
    container.addEventListener(
      this.config.events.click,
      this.fleetGrid.handleClick.bind(this.fleetGrid)
    )

    container.addEventListener(
      this.config.events.wheel,
      this.fleetGrid.handleWheel.bind(this.fleetGrid),
      { passive: true }
    )
  }
}
