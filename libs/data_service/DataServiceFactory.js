import { Config } from './Config.js'
import { DataService } from './DataService.js'
import { Player } from './Player.js'

export class DataServiceFactory {
  async generete() {
    const dataService = new DataService()

    const config = new Config()
    config.enableFleetGrid = false
    dataService.config = config

    dataService.player1 = new Player('Player 1', 'Captain Jack')
    dataService.player2 = new Player('Player 2', 'Blackbeard')

    if (!dataService.enableFleetGrid) {
      await dataService.loadMatricesFromURL('./../../page/data/boards.json')
    } else dataService.player2.board.setFleetRandomly()

    dataService.logPlayers()

    return dataService
  }
}
