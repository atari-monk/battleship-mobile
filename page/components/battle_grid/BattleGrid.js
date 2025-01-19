export class BattleGrid {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(config, gridRenderer) {
    this.gridItems = null

    this.config = config
    this.gridRenderer = gridRenderer
    this.counter = 8
  }

  init(id) {
    this.gridRenderer.generateGridItems(id)
    this.gridItems = this.gridRenderer.getGridItems()
    console.log(this.config.message.initMsg(this.counter, id))
    this.counter++
  }
}
