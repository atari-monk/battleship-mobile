import { DataService } from './DataService.js'
import { Player } from './Player.js'

export class DataServiceFactory {
  generete() {
    const dataService = new DataService()

    dataService.player1 = new Player('Captain Jack')
    dataService.player2 = new Player('Blackbeard')

    dataService.player2.setFleetRandomly()

    const { name: name1 } = dataService.player1
    const { name: name2, grid: grid2 } = dataService.player2

    const output = grid2.map((row) => row.join(' ')).join('\n\t\t')
    console.debug(
      `1. Setting data... \n\tPlayer 1 - '${name1}'\n\tPlayer 2 - '${name2}'\n\tFleet:\n\t\t${output}`
    )

    return dataService
  }
}
