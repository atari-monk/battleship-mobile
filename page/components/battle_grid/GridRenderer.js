export class GridRenderer {
  constructor(config) {
    this.gridItems = null
    this.config = config
  }

  generateGridItems() {
    const selector = this.config.dot(this.config.cssClass.fleetGrid)
    const container = document.querySelector(selector)
    if (!container) {
      throw new Error(`Container with selector ${selector} not found.`)
    }

    for (let i = 1; i <= 100; i++) {
      const gridItem = document.createElement(this.config.html.div)
      gridItem.classList.add(this.config.cssClass.fleetGridCell)
      gridItem.addEventListener(this.config.event.click, () =>
        this.handleAtack(gridItem)
      )
      container.appendChild(gridItem)
    }
    this.gridItems = document.querySelectorAll(
      this.config.dot(this.config.cssClass.fleetGridCell)
    )
  }

  handleAtack(cell) {
    const isHit = Math.random() < 0.5
    if (isHit) {
      cell.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'
    } else {
      cell.style.backgroundColor = 'rgba(128, 128, 128, 0.7)'
    }
  }

  getGridItems() {
    if (!this.gridItems) {
      throw new Error('Grid items have not been generated yet.')
    }
    return this.gridItems
  }

  getCellIndex(x, y) {
    const cellSize = document
      .querySelector(this.config.cssClass.fleetGridCell)
      .getBoundingClientRect()
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return row * 10 + col + 1
  }
}
