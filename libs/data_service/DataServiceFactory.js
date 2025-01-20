import { Config } from './Config.js'
import { DataService } from './DataService.js'
import { Player } from './Player.js'

export class DataServiceFactory {
  generete() {
    const dataService = new DataService()

    dataService.player1 = new Player('Player 1', 'Captain Jack')
    dataService.player2 = new Player('Player 2', 'Blackbeard')

    const test = true
    if (test) {
      dataService.player1.board.setTestFleet(false)
      dataService.player2.board.setTestFleet()
    } else dataService.player2.board.setFleetRandomly()

    const config = new Config()
    config.enableFleetGrid = false
    dataService.config = config

    dataService.logPlayers()

    return dataService
  }
}
