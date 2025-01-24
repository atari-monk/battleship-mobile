import { Board } from './lib/Board.js'

const fleet = new Board()
const shot = new Board()
const forecast = new Board()

const size = 10

function setBoards() {
  fleet.generateBoard(size, size)
  fleet.fillValueAt(0, 1, 1)
  fleet.fillValueAt(1, 1, 1)

  shot.generateBoard(size, size)

  forecast.generateBoard(size, size)
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
    { c: 'A1', v: 2 },
    { c: 'A2', v: 2 },
    { c: 'B1', v: 1 },
    { c: 'B2', v: 1 },
    0,
  ],
  [
    { c: 'A1', v: 2 },
    { c: 'A2', v: 2 },
    { c: 'B2', v: 1 },
    { c: 'B1', v: 1 },
    0,
  ],
  [{ c: 'A1', v: 2 }, { c: 'B1', v: 1 }, { c: 'B2', v: 1 }, 0],
  [{ c: 'A1', v: 2 }, { c: 'B2', v: 1 }, { c: 'B1', v: 1 }, 0],
  [
    { c: 'A2', v: 2 },
    { c: 'A1', v: 2 },
    { c: 'B1', v: 1 },
    { c: 'B2', v: 1 },
    0,
  ],
  [
    { c: 'A2', v: 2 },
    { c: 'A1', v: 2 },
    { c: 'B2', v: 1 },
    { c: 'B1', v: 1 },
    0,
  ],
  [
    { c: 'A2', v: 2 },
    { c: 'B1', v: 1 },
    { c: 'A1', v: 2 },
    { c: 'B2', v: 1 },
    0,
  ],
  [{ c: 'A2', v: 2 }, { c: 'B1', v: 1 }, { c: 'B2', v: 1 }, 0],
  [{ c: 'A2', v: 2 }, { c: 'B2', v: 1 }, { c: 'B1', v: 1 }, 0],
  [{ c: 'B1', v: 1 }, { c: 'A1', v: 2 }, { c: 'B2', v: 1 }, 0],
  [{ c: 'B1', v: 1 }, { c: 'B2', v: 1 }, 0],
  [{ c: 'B2', v: 1 }, { c: 'A2', v: 2 }, { c: 'B1', v: 1 }, 0],
  [{ c: 'B2', v: 1 }, { c: 'B1', v: 1 }, 0],
]

const isSelectGameActive = false
const selectGame = 0

let j = 0
let i = 0
if (isSelectGameActive) j = selectGame

setBoards()
show(j, i)

const button = document.getElementById('next')
button.addEventListener('click', () => {
  if (games[j][i] === 0) {
    i = 0
    if (!isSelectGameActive) j++
    if (!isSelectGameActive && j === games.length) j = 0
    setBoards()
    console.clear()
    show(j, i)
    return
  }
  const { c, v: vc } = games[j][i]
  const { x, y, v: vxy } = games[j][i]
  if (c) shot.fillCoordAt(c, vc)
  else shot.fillValueAt(x, y, vxy)

  forecast.setData(shot.getDataCopy())
  forecast.placeShipOrFillBoard(2)

  i++
  console.clear()
  show(j, i)
})
