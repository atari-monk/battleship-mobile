export class Turn {
  constructor(player1Name, player2Name) {
    this.nr = 0
    this.players = [player1Name, player2Name]
    this.currentPlayer = null
  }

  randomlySelectPlayer() {
    const randomIndex = Math.floor(Math.random() * this.players.length)
    this.currentPlayer = this.players[randomIndex]
    this.nr = 1
  }

  incrementTurn() {
    this.nr += 1
    const currentIndex = this.players.indexOf(this.currentPlayer)
    this.currentPlayer = this.players[(currentIndex + 1) % this.players.length]
  }

  resetTurn() {
    this.nr = 0
    this.currentPlayer = null
  }

  printTurnInfo() {
    console.debug(`5. Turn: ${this.nr}, Current Player: ${this.currentPlayer}`)
  }
}
