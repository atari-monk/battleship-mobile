export class GridRenderer {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(config) {
    this.gridItems = null
    this.config = config
    this.isFiring = true
  }

  generateGridItems(id) {
    const { cssClass: css, html, event, dot } = this.config
    const grid = `#${id} ${dot(css.battleGridGrid)}`
    const container = document.querySelector(grid)
    if (!container) {
      throw new Error(`Container with selector ${grid} not found.`)
    }

    for (let i = 1; i <= 100; i++) {
      const gridItem = document.createElement(html.div)
      gridItem.classList.add(css.battleGridCell)
      container.appendChild(gridItem)
    }
    this.gridItems = document.querySelectorAll(
      `#${id} ${dot(css.battleGridCell)}`
    )

    container.addEventListener(event.click, (event) =>
      this.handleGlobalAtack(event, id)
    )
  }

  getGridItems() {
    if (!this.gridItems) {
      throw new Error('Grid items have not been generated yet.')
    }
    return this.gridItems
  }

  getCellIndex(x, y, id) {
    const { cssClass: css, dot } = this.config
    const cellSize = document
      .querySelector(`#${id} ${dot(css.battleGridCell)}`)
      .getBoundingClientRect()
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return row * 10 + col
  }

  handleAtack(cell, cellIndex, playerGrid) {
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

  handleGlobalAtack(event, id) {
    if (this.isFiring) {
      console.debug('fireing...')
      this.atack(id, event)
      this.isFiring = false
      return
    } else {
      console.debug('ending turn...')
      this.endTurn()
      this.isFiring = true
    }
  }

  atack(id, event) {
    const container = document.getElementById(id)
    const rect = container.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const cellIndex = this.getCellIndex(x, y, id)
    const cell = this.gridItems[cellIndex]

    if (cell) {
      this.handleAtack(cell, cellIndex, this._dataService.getEnemyGrid())
    } else {
      throw new Error('No cell found!')
    }
  }

  endTurn() {
    this._dataService.turn.incrementTurn()
    this._dataService.turn.printTurnInfo()
    if (
      this._dataService.turn.currentPlayer === this._dataService.player1.name
    ) {
      document
        .getElementById('battle-grid-1')
        .classList.add('battle-grid--hidden')
      document
        .getElementById('battle-grid-2')
        .classList.remove('battle-grid--hidden')
      console.debug('show battle-grid-2')
    }

    if (
      this._dataService.turn.currentPlayer === this._dataService.player2.name
    ) {
      document
        .getElementById('battle-grid-1')
        .classList.remove('battle-grid--hidden')
      document
        .getElementById('battle-grid-2')
        .classList.add('battle-grid--hidden')
      console.debug('show battle-grid-1')
    }
  }
}
