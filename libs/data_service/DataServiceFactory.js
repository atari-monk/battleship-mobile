import { DataService } from './DataService.js'
import { Player } from './Player.js'

export class DataServiceFactory {
  generete() {
    const dataService = new DataService()
    dataService.player1 = new Player('Captain Jack')
    dataService.player2 = new Player('Blackbeard')
    return dataService
  }
}
