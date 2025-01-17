export class GridRenderer {
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
      gridItem.addEventListener(this.events.click, () =>
        this.handleAtack(gridItem)
      )
      container.appendChild(gridItem)
    }
    this.gridItems = document.querySelectorAll(this.cssClass.dot.cell)
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
      .querySelector(this.cssClass.dot.cell)
      .getBoundingClientRect()
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return row * 10 + col + 1
  }
}
