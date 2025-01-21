import { Config } from './Config.js'
import { DataService } from './DataService.js'
import { Player } from './Player.js'
import { Fleet } from './Fleet.js'
import { AIFleet } from './AIFleet.js'
import { Board } from './Board.js'
import { AIBoard } from './AIBoard.js'

export class DataServiceFactory {
  async generete() {
    const dataService = new DataService()

    const config = new Config()
    config.enableFleetGrid = false
    dataService.config = config

    dataService.player1 = new Player(
      'Player 1',
      'Captain Jack',
      new AIFleet(),
      new Board()
    )
    dataService.player2 = new Player(
      'Player 2',
      'Blackbeard',
      new Fleet(),
      new AIBoard()
    )

    if (!dataService.enableFleetGrid) {
      await dataService.loadMatricesFromURL('./../../page/data/fleets.json')
    } else dataService.player2.fleet.setFleetRandomly()

    dataService.logPlayers()

    return dataService
  }
}
