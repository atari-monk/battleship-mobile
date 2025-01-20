import { Config } from './Config.js'
import { DataService } from './DataService.js'
import { Player } from './Player.js'
import { logger } from './../log_service/LogService.js'

export class DataServiceFactory {
  generete() {
    const dataService = new DataService()

    dataService.player1 = new Player('Captain Jack')
    dataService.player2 = new Player('Blackbeard')

    const test = true
    if (test) {
      dataService.player1.setTestFleet(false)
      dataService.player2.setTestFleet()
    } else dataService.player2.setFleetRandomly()

    const config = new Config()
    config.enableFleetGrid = false
    dataService.config = config

    this.logPlayerData(dataService)

    return dataService
  }

  logPlayerData(dataService) {
    const { name: name1, grid: grid1 } = dataService.player1
    const { name: name2, grid: grid2 } = dataService.player2
    logger.debug(
      `Load data: \n\tPlayer 1 - '${name1}'\n\tFleet:\n\t\t${grid1
        .map((row) => row.join(' '))
        .join('\n\t\t')}\n\tPlayer 2 - '${name2}'\n\tFleet:\n\t\t${grid2
        .map((row) => row.join(' '))
        .join('\n\t\t')}`
    )
  }
}
