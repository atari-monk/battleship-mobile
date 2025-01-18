import { guiContener } from '../../script.js'

export class FleetService {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(config, shipSizes = [5, 4, 3, 3, 2]) {
    this.config = config
    this.shipSizes = shipSizes
    this.currentShipIndex = 0
    this.isHorizontal = true
    this.placedShips = new Set()
    this.gridArray = Array.from({ length: 10 }, () => Array(10).fill(0))
  }

  toggleOrientation() {
    this.isHorizontal = !this.isHorizontal
  }

  validateAndPlaceShip(index, placementValidator, shipPreview, gridItems) {
    const shipSize = this.shipSizes[this.currentShipIndex]

    if (
      placementValidator.validatePlacement(
        index,
        shipSize,
        this.isHorizontal,
        this.placedShips
      )
    ) {
      shipPreview.paintPreview(
        index,
        shipSize,
        this.isHorizontal,
        this.placedShips,
        gridItems,
        this.config.color.blue
      )

      if (this.isHorizontal) {
        for (let i = 0; i < shipSize; i++) {
          this.placedShips.add(index + i)
        }
      } else {
        for (let i = 0; i < shipSize; i++) {
          this.placedShips.add(index + i * 10)
        }
      }

      this.addShipToGrid(index, shipSize)
      this.currentShipIndex++
      return true
    }
    return false
  }

  addShipToGrid(startIndex, shipSize) {
    const startRow = Math.floor((startIndex - 1) / 10)
    const startCol = (startIndex - 1) % 10

    if (this.isHorizontal) {
      for (let i = 0; i < shipSize; i++) {
        this.gridArray[startRow][startCol + i] = 1
      }
    } else {
      for (let i = 0; i < shipSize; i++) {
        this.gridArray[startRow + i][startCol] = 1
      }
    }
  }

  isPlacementComplete() {
    return this.currentShipIndex >= this.shipSizes.length
  }

  async saveGridData() {
    if (this._dataService) {
      this._dataService.player1.grid = this.gridArray

      document
        .querySelector(this.config.dot(this.config.cssClass.fleetGrid))
        .classList.add(this.config.style.hidden)
      document
        .querySelector(this.config.dot(this.config.cssClass.toogle))
        .classList.add(this.config.style.hidden)

      this._dataService.initializeTurn()
      this._dataService.turn.printTurnInfo()

      await guiContener.loadComponent(
        this.config.component.battleGrid,
        this.config.cssClass.battleGrid
      )
    }
  }
}
