import { Board } from './lib/Board.js'
import { BoardPredictor } from './lib/BoardPredictor.js'
import { SimpleSpaceCounter } from './lib/SimpleSpaceCounter.js'
import { SpaceCounter } from './lib/SpaceCounter.js'

const config = {
  simpleCounter: true,
}

const board = new Board()
board.generateBoard(2, 2)
const predictor = new BoardPredictor(
  board,
  config.simpleCounter
    ? new SimpleSpaceCounter(board)
    : new SpaceCounter(board),
  [5, 4, 3, 3, 2]
)

//predictor.predictShipPositions()

predictor.printBoard()
predictor.renderBoard()
predictor.printFleetPrediction()
predictor.renderFleetPrediction()
