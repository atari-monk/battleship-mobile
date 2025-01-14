import { PlacementValidator } from './PlacementValidator.js'
import { ShipPreview } from './ShipPreview.js'
import { GridRenderer } from './GridRenderer.js'
import { EventHandler } from './EventHandler.js'
import { FleetLogic as FleetService } from './FleetService.js'
import { PlacementHandler } from './PlacementHandler.js'
import { FleetGridConfig } from './FleetGridConfig.js'
import { DataService } from './../../shared_library/DataService.js'
import { Player } from './../../shared_library/Player.js'

export class FleetGrid {
  constructor(dataService, config) {
    this.currentHoverPosition = null
    this.gridItems = null

    this.config = config
    this.placementValidator = new PlacementValidator()
    this.shipPreview = new ShipPreview(this.config.cssClass, this.config.colors)
    this.gridRenderer = new GridRenderer(this.config.cssClass, this.config.html)
    this.eventHandler = new EventHandler(this, this.config)
    this.fleetService = new FleetService(dataService)
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

const dataService = new DataService()
dataService.player1 = new Player()
const fleetGrid = new FleetGrid(dataService, new FleetGridConfig())
fleetGrid.init()
