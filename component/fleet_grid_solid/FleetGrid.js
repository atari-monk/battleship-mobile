import { PlacementValidator } from './PlacementValidator.js'
import { ShipPreview } from './ShipPreview.js'
import { GridRenderer } from './GridRenderer.js'
import { EventHandler } from './EventHandler.js'
import { FleetLogic } from './FleetLogic.js'

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
    this.logic = new FleetLogic(dataService)
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
    const touch = event.touches ? event.touches[0] : event
    const index = this.gridRenderer.getCellIndex(touch.clientX, touch.clientY)
    const shipSize = this.logic.shipSizes[this.logic.currentShipIndex]

    this.currentHoverPosition = {
      clientX: touch.clientX,
      clientY: touch.clientY,
      touches: event.touches,
    }

    this.shipPreview.resetPreview(this.gridItems)

    if (
      this.placementValidator.validatePlacement(
        index,
        shipSize,
        this.logic.isHorizontal,
        this.logic.placedShips
      )
    ) {
      this.shipPreview.paintPreview(
        index,
        shipSize,
        this.logic.isHorizontal,
        this.logic.placedShips,
        this.gridItems,
        this.colors.green
      )
    } else {
      this.shipPreview.paintPreview(
        index,
        shipSize,
        this.logic.isHorizontal,
        this.logic.placedShips,
        this.gridItems,
        this.colors.red
      )
    }
  }

  handleClick(event) {
    const touch = event.touches ? event.touches[0] : event
    const index = this.gridRenderer.getCellIndex(touch.clientX, touch.clientY)

    if (
      this.logic.validateAndPlaceShip(
        index,
        this.placementValidator,
        this.shipPreview,
        this.gridItems,
        this.colors
      )
    ) {
      if (this.logic.isPlacementComplete()) {
        console.log(this.messages.complete)
        document
          .querySelector(this.cssClass.dot.grid)
          .removeEventListener(this.events.click, this.handleClick.bind(this))

        console.log(this.messages.player1Grid)
        this.logic.saveGridData()
        console.table(this.logic.gridArray)
      }
    }
  }

  handleWheel(event) {
    this.logic.isHorizontal =
      event.deltaY > 0 || event.deltaX > 0 ? false : true
    this.paintOnHover(event)
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
