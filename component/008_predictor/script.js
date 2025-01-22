import { Board } from './lib/Board.js'
import { BoardPredictor } from './lib/BoardPredictor.js'
import { SimpleSpaceCounter } from './lib/SimpleSpaceCounter.js'
import { SpaceCounter } from './lib/SpaceCounter.js'

const data1 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 1, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 0, 0, 1, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
const data = [
  [0, 0, 0],
  [0, 1, 0],
  [2, 2, 2],
]

const config = {
  simpleCounter: true,
}
const board = new Board(data)
const predictor = new BoardPredictor(
  board,
  config.simpleCounter ? new SimpleSpaceCounter(board) : new SpaceCounter(board)
)

predictor.printBoard()
predictor.renderBoard()
predictor.printFleetPrediction()
predictor.renderFleetPrediction()

predictor.countSpace()
