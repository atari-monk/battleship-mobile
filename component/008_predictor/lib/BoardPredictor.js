import { Board } from './Board.js'

export class BoardPredictor {
  constructor(board, spaceCounter, shipData) {
    this.board = board
    this.spaceCounter = spaceCounter
    this.ships = shipData
    this.fleetPrediction = new Board()
    this.fleetPrediction.setData(this.board.getDataCopy())
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
