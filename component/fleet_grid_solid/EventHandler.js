export class EventHandler {
  constructor(fleetGrid) {
    this.fleetGrid = fleetGrid
  }

  attachEvents() {
    const container = document.querySelector(this.fleetGrid.cssClass.dot.grid)

    container.addEventListener(
      this.fleetGrid.events.mousemove,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid)
    )
    container.addEventListener(
      this.fleetGrid.events.mouseenter,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid)
    )
    container.addEventListener(
      this.fleetGrid.events.touchmove,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid),
      { passive: true }
    )
    container.addEventListener(
      this.fleetGrid.events.touchstart,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid),
      { passive: true }
    )
    container.addEventListener(
      this.fleetGrid.events.click,
      this.fleetGrid.handleClick.bind(this.fleetGrid)
    )

    container.addEventListener(
      this.fleetGrid.events.wheel,
      this.fleetGrid.handleWheel.bind(this.fleetGrid),
      { passive: true }
    )
  }
}
