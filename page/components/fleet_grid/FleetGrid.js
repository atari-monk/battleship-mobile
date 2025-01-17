import { EventHandler } from './EventHandler.js'
import { FleetService } from './FleetService.js'
import { GridRenderer } from './GridRenderer.js'
import { PlacementHandler } from './PlacementHandler.js'
import { PlacementValidator } from './PlacementValidator.js'
import { ShipPreview } from './ShipPreview.js'

export class FleetGrid {
  set dataService(dataService) {
    this.fleetService.dataService = dataService
  }

  constructor(config) {
    this.gridItems = null

    this.config = config
    this.placementValidator = new PlacementValidator()
    this.shipPreview = new ShipPreview(config.cssClass, config.colors)
    this.gridRenderer = new GridRenderer(config.cssClass, config.html)
    this.eventHandler = new EventHandler(this, config)
    this.fleetService = new FleetService(config)
    this.placementHandler = new PlacementHandler(
      this.gridRenderer,
      this.placementValidator,
      this.shipPreview,
      this.fleetService,
      this.config.colors
    )
  }

  paintOnHover(event) {
    this.placementHandler.paintOnHover(event, this.gridItems)
  }

  handleClick(event) {
    this.placementHandler.handleClick(event, this.gridItems)
  }

  handleWheel(event) {
    this.fleetService.isHorizontal =
      event.deltaY > 0 || event.deltaX > 0 ? false : true
    this.placementHandler.paintOnHover(event, this.gridItems)
  }

  init() {
    this.gridRenderer.generateGridItems()
    this.gridItems = this.gridRenderer.getGridItems()
    this.eventHandler.attachEvents()
    console.log(this.config.messages.initMsg)
  }
}
