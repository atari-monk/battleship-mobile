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
  forecast.fillBoardWithShips()
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

function show(i = -1) {
  console.log(`Turn ${i + 1}:`)
  print()
  render()
}

setBoards()
show()

const shots = []
shots.push({ x: 0, y: 0, v: 2 })
shots.push({ x: 1, y: 0, v: 2 })
shots.push({ x: 0, y: 1, v: 1 })
shots.push({ x: 1, y: 1, v: 1 })
shots.push('restart')
let i = 0

const button = document.getElementById('next')
button.addEventListener('click', () => {
  if (shots[i] === 'restart') {
    i = 0
    setBoards()
    console.clear()
    show()
    return
  }
  const { x, y, v } = shots[i]
  shot.fillValueAt(x, y, v)

  forecast.setData(shot.getDataCopy())
  if (i === 0) {
    forecast.fillBoardWithShips()
  } else if (i === 1) {
    forecast.fillBoardWithShips()
  } else if (i === 2) {
    forecast.fillBoardWithShips()
  }

  console.clear()
  show(i)
  i++
})
