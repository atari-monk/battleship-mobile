import { BattleshipBoard } from './BattleshipBoard.js'
import { printGrid } from './printGrid.js'
import { renderGrid } from './renderGrid.js'

// Example Input Grid
const inputGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

// Initialize the board and get the predicted grid
const board = new BattleshipBoard(inputGrid)
const predictedGrid = board.getPredictedGrid()

// Output the grids to the console
console.log('Input Grid:')
printGrid(inputGrid)

console.log('\nPredicted Grid:')
printGrid(predictedGrid)

// Render the grids on the web page
renderGrid(inputGrid, 'inputGrid')
renderGrid(predictedGrid, 'predictedGrid')
