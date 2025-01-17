export class GridRenderer {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(config) {
    this.gridItems = null
    this.config = config
    this.html = config.html
    this.cssClass = config.cssClass
    this.events = config.events
  }

  generateGridItems() {
    const container = document.querySelector(this.cssClass.dot.grid)
    if (!container) {
      throw new Error(
        `Container with selector ${this.cssClass.dot.grid} not found.`
      )
    }

    for (let i = 1; i <= 100; i++) {
      const gridItem = document.createElement(this.html.div)
      gridItem.classList.add(this.cssClass.cell)
      container.appendChild(gridItem)
    }
    this.gridItems = document.querySelectorAll(this.cssClass.dot.cell)

    container.addEventListener(this.events.click, (event) =>
      this.handleGlobalAtack(event)
    )
  }

  getGridItems() {
    if (!this.gridItems) {
      throw new Error('Grid items have not been generated yet.')
    }
    return this.gridItems
  }

  getCellIndex(x, y) {
    const cellSize = document
      .querySelector(this.cssClass.dot.cell)
      .getBoundingClientRect()
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return row * 10 + col
  }

  handleAtack(cell, cellIndex) {
    const playerGrid = this._dataService.player2.grid
    const row = Math.floor(cellIndex / 10)
    const col = cellIndex % 10

    if (playerGrid[row][col] === 2) return
    const isHit = playerGrid[row][col] === 1

    if (isHit) {
      cell.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'
      playerGrid[row][col] = 2
    } else {
      cell.style.backgroundColor = 'rgba(128, 128, 128, 0.7)'
    }
  }

  handleGlobalAtack(event) {
    const container = document.querySelector(this.cssClass.dot.grid)
    const rect = container.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const cellIndex = this.getCellIndex(x, y)
    const cell = this.gridItems[cellIndex]

    if (cell) {
      this.handleAtack(cell, cellIndex)
    }
  }
}
