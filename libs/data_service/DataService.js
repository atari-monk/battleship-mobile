import { Turn } from './Turn.js'

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
    return player1 ? this.player2.grid : this.player1.grid
  }

  log(log) {
    this.config.log(log)
  }
}
