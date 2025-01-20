import { Turn } from './Turn.js'
import { logger } from './../log_service/LogService.js'

export class DataService {
  constructor() {
    this.player1 = null
    this.player2 = null
    this.turn = null
    this.config = null
  }

  initializeTurn() {
    if (this.player1 && this.player2) {
      this.turn = new Turn(this.player1.name, this.player2.name)
      this.turn.randomlySelectPlayer()
    } else {
      console.error('Players must be initialized before starting turns.')
    }
  }

  getEnemyGrid() {
    const player1 = this.turn.currentPlayer === this.player1.name
    return player1 ? this.player2.board.matrix : this.player1.board.matrix
  }

  toString() {
    const { board: board1 } = this.player1
    const { board: board2 } = this.player2
    return [
      this.player1.toString(),
      board1.toString(),
      '\n\t',
      this.player2.toString(),
      board2.toString(),
    ].join('')
  }

  logPlayers() {
    logger.debug(`Load data: \n\t${this.toString()}`)
  }
}
