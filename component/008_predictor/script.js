import { BattleshipBoard } from './BattleshipBoard.js'
import { printGrid } from './printGrid.js'
import { renderGrid } from './renderGrid.js'

const inputGrid = [
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

const board = new BattleshipBoard(inputGrid)
const predictedGrid = board.getPredictedGrid()

console.log('Input Grid:')
printGrid(inputGrid)

console.log('\nPredicted Grid:')
printGrid(predictedGrid)

console.log(`inputGrid[1][1]: ${inputGrid[1][1]}`)
console.log(`inputGrid[2][3]: ${inputGrid[2][3]}`)
console.log(`inputGrid[5][6]: ${inputGrid[5][6]}`)
board.logFreeSpaces(1, 1)
board.logFreeSpaces(2, 3)
board.logFreeSpaces(5, 6)
board.countSpace()

renderGrid(inputGrid, 'inputGrid')
renderGrid(predictedGrid, 'predictedGrid')
