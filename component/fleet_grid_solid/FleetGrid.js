import { PlacementValidator } from './PlacementValidator.js'
import { ShipPreview } from './ShipPreview.js'
import { GridRenderer } from './GridRenderer.js'
import { EventHandler } from './EventHandler.js'
import { FleetLogic as FleetService } from './FleetService.js'
import { PlacementHandler } from './PlacementHandler.js'

export class FleetGrid {
  constructor(dataService = null) {
    this.cssClass = {
      dot: {
        grid: '.fleet-grid__grid',
        cell: '.fleet-grid__item',
      },
      cell: 'fleet-grid__item',
    }
    this.colors = { blue: 'blue', green: 'green', red: 'red' }
    this.html = { div: 'div' }
    this.placementValidator = new PlacementValidator()
    this.shipPreview = new ShipPreview(this.cssClass, this.colors)
    this.gridRenderer = new GridRenderer(this.cssClass, this.html)
    this.eventHandler = new EventHandler(this)
    this.fleetService = new FleetService(dataService)
    this.placementHandler = new PlacementHandler(
      this.gridRenderer,
      this.placementValidator,
      this.shipPreview,
      this.fleetService,
      this.colors
    )
    this.messages = {
      initMsg: 'fleet grid',
      complete: 'fleet placement complete!',
      player1Grid: 'player1 grid array:',
    }
    this.events = {
      click: 'click',
      mousemove: 'mousemove',
      mouseenter: 'mouseenter',
      touchmove: 'touchmove',
      touchstart: 'touchstart',
      wheel: 'wheel',
    }
    this.currentHoverPosition = null
    this.gridItems = null
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
    console.log(this.messages.initMsg)
  }
}

const fleetGrid = new FleetGrid()
fleetGrid.init()
