import { Board } from './lib/Board.js'
import { SimpleSpaceCounter } from './lib/SimpleSpaceCounter.js'
import { SpaceCounter } from './lib/SpaceCounter.js'

const config = {
  spaceCounter: { isOn: false, simpleCounter: true },
}

const fleet = new Board()
const shot = new Board()
const forecast = new Board()

function setBoards() {
  fleet.generateBoard(2, 2)
  fleet.fillValueAt(0, 1, 1)
  fleet.fillValueAt(1, 1, 1)

  shot.generateBoard(2, 2)

  forecast.generateBoard(2, 2)
  forecast.placeShipHorizontally(0, 0, 2)
  forecast.placeShipHorizontally(1, 0, 2)
}

function print() {
  shot.print('Shot:')
  forecast.print('Forecast:')
}

function render() {
  shot.render('shot')
  forecast.render('forecast')
}

function show(i = -1) {
  if (i >= 0) console.log(`Boards at shot ${i + 1}:`)
  print()
  render()
}

setBoards()
console.log('Initial boards:')
fleet.print('Fleet:')
fleet.render('fleet')
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
    console.log('Initial boards:')
    fleet.print('Fleet:')
    fleet.render('fleet')
    show(i)
    return
  }
  const { x, y, v } = shots[i]
  shot.fillValueAt(x, y, v)

  forecast.setData(shot.getDataCopy())
  if (i === 0) {
    forecast.placeShipHorizontally(1, 0, 2)
    forecast.placeShipVertically(0, 1, 2)
  } else if (i === 1) {
    forecast.placeShipVertically(0, 1, 2)
  } else if (i === 2) {
    forecast.placeShipVertically(0, 1, 2)
  }

  show(i)
  i++
})

if (config.spaceCounter.isOn) {
  const spaceCounter = config.spaceCounter.simpleCounter
    ? new SimpleSpaceCounter(shot)
    : new SpaceCounter(shot)
  spaceCounter.countSpace()
}
