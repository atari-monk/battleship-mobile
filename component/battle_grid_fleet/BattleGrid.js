export class BattleGrid {
  constructor(config, gridRenderer) {
    this.gridItems = null

    this.config = config
    this.gridRenderer = gridRenderer
  }

  init() {
    this.gridRenderer.generateGridItems()
    this.gridItems = this.gridRenderer.getGridItems()
    console.log(this.config.messages.initMsg)
  }
}
