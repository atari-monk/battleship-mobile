export class Turn {
  constructor(player1Name, player2Name) {
    this.nr = 0
    this.players = [player1Name, player2Name]
    this.currentPlayer = null
    this.counter = 10
  }

  randomlySelectPlayer() {
    const randomIndex = Math.floor(Math.random() * this.players.length)
    this.currentPlayer = this.players[randomIndex]
    this.nr = 1
  }

  incrementTurn() {
    this.nr += 1
    this.counter++
    const currentIndex = this.players.indexOf(this.currentPlayer)
    this.currentPlayer = this.players[(currentIndex + 1) % this.players.length]
  }

  resetTurn() {
    this.nr = 0
    this.currentPlayer = null
  }

  printTurnInfo() {
    const currentIndex = this.players.indexOf(this.currentPlayer)

    console.debug(
      `${this.counter}. Turn: ${this.nr}, ${
        currentIndex === 0 ? 'Player 1' : 'Player 2'
      } - '${this.currentPlayer}'`
    )
  }
}
