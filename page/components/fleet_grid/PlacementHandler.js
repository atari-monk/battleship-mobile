export class PlacementHandler {
  constructor(
    gridRenderer,
    placementValidator,
    shipPreview,
    fleetService,
    colors
  ) {
    this.gridRenderer = gridRenderer
    this.placementValidator = placementValidator
    this.shipPreview = shipPreview
    this.fleetService = fleetService
    this.colors = colors
    this.currentHoverPosition = null
  }

  paintOnHover(event, gridItems) {
    const touch = event.touches ? event.touches[0] : event
    const index = this.getCellIndex(touch.clientX, touch.clientY)
    const shipSize =
      this.fleetService.shipSizes[this.fleetService.currentShipIndex]

    this.currentHoverPosition = {
      clientX: touch.clientX,
      clientY: touch.clientY,
      touches: event.touches,
    }

    this.shipPreview.resetPreview(gridItems)

    if (
      this.placementValidator.validatePlacement(
        index,
        shipSize,
        this.fleetService.isHorizontal,
        this.fleetService.placedShips
      )
    ) {
      this.shipPreview.paintPreview(
        index,
        shipSize,
        this.fleetService.isHorizontal,
        this.fleetService.placedShips,
        gridItems,
        this.colors.green
      )
    } else {
      this.shipPreview.paintPreview(
        index,
        shipSize,
        this.fleetService.isHorizontal,
        this.fleetService.placedShips,
        gridItems,
        this.colors.red
      )
    }
  }

  handleClick(event, gridItems) {
    const touch = event.touches ? event.touches[0] : event
    const index = this.getCellIndex(touch.clientX, touch.clientY)

    if (
      this.fleetService.validateAndPlaceShip(
        index,
        this.placementValidator,
        this.shipPreview,
        gridItems,
        this.colors
      )
    ) {
      if (this.fleetService.isPlacementComplete()) {
        console.log('fleet placement complete!')
        document
          .querySelector('.fleet-grid__grid')
          .removeEventListener('click', this.handleClick.bind(this))

        this.fleetService.saveGridData()
        console.log('player1 grid array:')
        console.table(this.fleetService.gridArray)
      }
    }
  }

  getCellIndex(clientX, clientY) {
    return this.gridRenderer.getCellIndex(clientX, clientY)
  }
}
