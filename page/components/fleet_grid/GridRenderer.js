export class GridRenderer {
  constructor(cssClass, html) {
    this.cssClass = cssClass
    this.html = html
    this.gridItems = null
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
