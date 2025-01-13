import { PlacementValidator } from './PlacementValidator.js'
import { ShipPreview } from './ShipPreview.js'

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
    this.placementValidator = new PlacementValidator()
    this.shipPreview = new ShipPreview(this.cssClass, this.colors)
    this.messages = {
      initMsg: 'fleet grid',
      colmpete: 'Fleet placement complete!',
      player1Grid: 'Player1 Grid Array:',
    }
    this.html = { div: 'div' }
    this.events = {
      click: 'click',
      mousemove: 'mousemove',
      mouseenter: 'mouseenter',
      touchmove: 'touchmove',
      touchstart: 'touchstart',
      wheel: 'wheel',
    }
    this.shipSizes = [5, 4, 3, 3, 2]
    this.currentShipIndex = 0
    this.isHorizontal = true
    this.placedShips = new Set()
    this.gridArray = Array.from({ length: 10 }, () => Array(10).fill(0))
    this._dataService = dataService
    this.currentHoverPosition = null
    this.gridItems = null
  }

  generateGridItems() {
    const container = document.querySelector(this.cssClass.dot.grid)
    for (let i = 1; i <= 100; i++) {
      const gridItem = document.createElement(this.html.div)
      gridItem.classList.add(this.cssClass.cell)
      container.appendChild(gridItem)
    }
    this.gridItems = document.querySelectorAll(this.cssClass.dot.cell)
  }

  hitToggle() {
    this.isHorizontal = !this.isHorizontal
  }

  getCellIndex(x, y) {
    const cellSize = document
      .querySelector(this.cssClass.dot.cell)
      .getBoundingClientRect()
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return row * 10 + col + 1
  }

  //   validatePlacement(startIndex, shipSize) {
  //     const startRow = Math.floor((startIndex - 1) / 10)
  //     const startCol = (startIndex - 1) % 10

  //     if (this.isHorizontal) {
  //       for (let i = 0; i < shipSize; i++) {
  //         const currentIndex = startIndex + i
  //         const currentCol = startCol + i
  //         if (
  //           currentCol >= 10 ||
  //           currentIndex > 100 ||
  //           this.placedShips.has(currentIndex)
  //         ) {
  //           return false
  //         }
  //       }
  //     } else {
  //       for (let i = 0; i < shipSize; i++) {
  //         const currentIndex = startIndex + i * 10
  //         const currentRow = Math.floor((currentIndex - 1) / 10)
  //         if (
  //           currentRow !== startRow + i ||
  //           currentIndex > 100 ||
  //           this.placedShips.has(currentIndex)
  //         ) {
  //           return false
  //         }
  //       }
  //     }
  //     return true
  //   }

  //   paintPreview(startIndex, shipSize, color) {
  //     const gridItems = document.querySelectorAll(this.cssClass.dot.cell)
  //     const startRow = Math.floor((startIndex - 1) / 10)
  //     const startCol = (startIndex - 1) % 10

  //     if (this.isHorizontal) {
  //       for (let i = 0; i < shipSize; i++) {
  //         const currentIndex = startIndex + i
  //         if (startCol + i >= 10 || currentIndex > 100) break
  //         if (!this.placedShips.has(currentIndex)) {
  //           gridItems[currentIndex - 1].style.backgroundColor = color
  //         }
  //       }
  //     } else {
  //       for (let i = 0; i < shipSize; i++) {
  //         const currentIndex = startIndex + i * 10
  //         const currentRow = Math.floor((currentIndex - 1) / 10)
  //         if (currentRow !== startRow + i || currentIndex > 100 || startCol >= 10)
  //           break
  //         if (!this.placedShips.has(currentIndex)) {
  //           gridItems[currentIndex - 1].style.backgroundColor = color
  //         }
  //       }
  //     }
  //   }

  //   resetPreview() {
  //     const gridItems = document.querySelectorAll(this.cssClass.dot.cell)
  //     gridItems.forEach((item) => {
  //       if (item.style.backgroundColor === this.colors.blue) {
  //         return
  //       }
  //       if (item.style.backgroundColor) {
  //         item.style.backgroundColor = ''
  //       }
  //     })
  //   }

  paintOnHover(event) {
    const touch = event.touches ? event.touches[0] : event
    const index = this.getCellIndex(touch.clientX, touch.clientY)
    const shipSize = this.shipSizes[this.currentShipIndex]

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
        this.isHorizontal,
        this.placedShips
      )
    ) {
      this.shipPreview.paintPreview(
        index,
        shipSize,
        this.isHorizontal,
        this.placedShips,
        this.gridItems,
        this.colors.green
      )
    } else {
      this.shipPreview.paintPreview(
        index,
        shipSize,
        this.isHorizontal,
        this.placedShips,
        this.gridItems,
        this.colors.red
      )
    }
  }

  handleClick(event) {
    const touch = event.touches ? event.touches[0] : event
    const index = this.getCellIndex(touch.clientX, touch.clientY)
    const shipSize = this.shipSizes[this.currentShipIndex]

    if (
      this.placementValidator.validatePlacement(
        index,
        shipSize,
        this.isHorizontal,
        this.placedShips
      )
    ) {
      this.shipPreview.paintPreview(
        index,
        shipSize,
        this.isHorizontal,
        this.placedShips,
        this.gridItems,
        this.colors.blue
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

      this.updateGridArray(index, shipSize)
      this.currentShipIndex++

      if (this.currentShipIndex >= this.shipSizes.length) {
        console.log(this.messages.colmpete)
        document
          .querySelector(this.cssClass.dot.grid)
          .removeEventListener(this.events.click, this.handleClick.bind(this))

        console.log(this.messages.player1Grid)
        this._dataService.player1.grid = this.gridArray
        console.table(this._dataService.player1.grid)
      }
    }
  }

  updateGridArray(startIndex, shipSize) {
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

  initGridEvents() {
    const container = document.querySelector(this.cssClass.dot.grid)

    container.addEventListener(
      this.events.mousemove,
      this.paintOnHover.bind(this)
    )
    container.addEventListener(
      this.events.mouseenter,
      this.paintOnHover.bind(this)
    )

    container.addEventListener(
      this.events.touchmove,
      this.paintOnHover.bind(this),
      { passive: true }
    )
    container.addEventListener(
      this.events.touchstart,
      this.paintOnHover.bind(this),
      { passive: true }
    )
    container.addEventListener(this.events.click, this.handleClick.bind(this))

    container.addEventListener(
      this.events.wheel,
      (event) => {
        if (event.deltaY > 0 || event.deltaX > 0) {
          this.isHorizontal = false
        } else {
          this.isHorizontal = true
        }

        this.paintOnHover(event)
      },
      { passive: true }
    )
  }

  init() {
    this.generateGridItems()
    this.initGridEvents()
    console.log(this.messages.initMsg)
  }
}

const fleetGrid = new FleetGrid()
fleetGrid.init()
