import { Board } from './Board.js'

export class BoardPredictor {
  constructor(board, spaceCounter) {
    this.board = board
    this.spaceCounter = spaceCounter
    this.ships = [5, 4, 3, 3, 2]
    this.fleetPrediction = new Board(board.getDataCopy())
  }

  printBoard() {
    this.board.print('Board Data:')
  }

  printFleetPrediction() {
    this.fleetPrediction.print('Fleet Prediction:')
  }

  renderBoard() {
    this.board.render('board')
  }

  renderFleetPrediction() {
    this.fleetPrediction.render('fleetPrediction')
  }

  countSpace() {
    return this.spaceCounter.countSpace()
  }
}
