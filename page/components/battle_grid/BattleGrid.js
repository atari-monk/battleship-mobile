import { logger } from './../../../libs/log_service/LogService.js'

export class BattleGrid {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(config, gridRenderer) {
    this.gridItems = null

    this.config = config
    this.gridRenderer = gridRenderer
  }

  init(id) {
    this.gridRenderer.generateGridItems(id)
    this.gridItems = this.gridRenderer.getGridItems()
    logger.debug(this.config.message.initMsg(id))
  }
}
