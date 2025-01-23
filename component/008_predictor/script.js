import { Board } from './lib/Board.js'

const fleet = new Board()
const shot = new Board()
const forecast = new Board()

function setBoards() {
  fleet.generateBoard(2, 2)
  fleet.fillValueAt(0, 1, 1)
  fleet.fillValueAt(1, 1, 1)

  shot.generateBoard(2, 2)

  forecast.generateBoard(2, 2)
  forecast.fillBoardWithShipsRandomly()
}

function print() {
  fleet.print('Fleet:')
  shot.print('Shot:')
  forecast.print('Forecast:')
}

function render() {
  fleet.render('fleet')
  shot.render('shot')
  forecast.render('forecast')
}

function show(j, i) {
  console.log(`Game ${j}:`)
  console.log(`Turn ${i}:`)
  print()
  render()
}

const games = [
  [
    { x: 0, y: 0, v: 2 },
    { x: 1, y: 0, v: 2 },
    { x: 0, y: 1, v: 1 },
    { x: 1, y: 1, v: 1 },
    0,
  ],
  [
    { x: 1, y: 0, v: 2 },
    { x: 0, y: 0, v: 2 },
    { x: 0, y: 1, v: 1 },
    { x: 1, y: 1, v: 1 },
    0,
  ],
  [{ x: 0, y: 1, v: 1 }, { x: 0, y: 0, v: 2 }, 0],
]

let j = 2
let i = 0

setBoards()
show(j, i)

const button = document.getElementById('next')
button.addEventListener('click', () => {
  if (games[j][i] === 0) {
    i = 0
    j++
    if (j === games.length) j = 0
    setBoards()
    console.clear()
    show(j, i)
    return
  }
  const { x, y, v } = games[j][i]
  shot.fillValueAt(x, y, v)

  forecast.setData(shot.getDataCopy())
  forecast.placeShipOrFillBoard(2)

  i++
  console.clear()
  show(j, i)
})
