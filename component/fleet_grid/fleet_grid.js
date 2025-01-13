const messages = {
  initMsg: 'fleet grid',
  colmpete: 'Fleet placement complete!',
  player1Grid: 'Player1 Grid Array:',
}

const cssClass = {
  dot: {
    grid: '.fleet-grid__grid',
    cell: '.fleet-grid__item',
  },
  cell: 'fleet-grid__item',
}

const html = { div: 'div' }

const colors = { blue: 'blue', green: 'green', red: 'red' }

const events = {
  click: 'click',
  mousemove: 'mousemove',
  mouseenter: 'mouseenter',
  touchmove: 'touchmove',
  touchstart: 'touchstart',
  wheel: 'wheel',
}

const shipSizes = [5, 4, 3, 3, 2]
let currentShipIndex = 0
let isHorizontal = true
const placedShips = new Set()

function generateGridItems() {
  const container = document.querySelector(cssClass.dot.grid)
  for (let i = 1; i <= 100; i++) {
    const gridItem = document.createElement(html.div)
    gridItem.classList.add(cssClass.cell)
    container.appendChild(gridItem)
  }
}

export function hitToggle() {
  isHorizontal = !isHorizontal
}

function getCellIndex(x, y) {
  const cellSize = document
    .querySelector(cssClass.dot.cell)
    .getBoundingClientRect()
  const col = Math.floor(x / cellSize.width)
  const row = Math.floor(y / cellSize.height)
  return row * 10 + col + 1
}

function validatePlacement(startIndex, shipSize) {
  const startRow = Math.floor((startIndex - 1) / 10)
  const startCol = (startIndex - 1) % 10

  if (isHorizontal) {
    for (let i = 0; i < shipSize; i++) {
      const currentIndex = startIndex + i
      const currentCol = startCol + i
      if (
        currentCol >= 10 ||
        currentIndex > 100 ||
        placedShips.has(currentIndex)
      ) {
        return false
      }
    }
  } else {
    for (let i = 0; i < shipSize; i++) {
      const currentIndex = startIndex + i * 10
      const currentRow = Math.floor((currentIndex - 1) / 10)
      if (
        currentRow !== startRow + i ||
        currentIndex > 100 ||
        placedShips.has(currentIndex)
      ) {
        return false
      }
    }
  }
  return true
}

function paintPreview(startIndex, shipSize, color) {
  const gridItems = document.querySelectorAll(cssClass.dot.cell)
  const startRow = Math.floor((startIndex - 1) / 10)
  const startCol = (startIndex - 1) % 10

  if (isHorizontal) {
    for (let i = 0; i < shipSize; i++) {
      const currentIndex = startIndex + i
      if (startCol + i >= 10 || currentIndex > 100) break
      if (!placedShips.has(currentIndex)) {
        gridItems[currentIndex - 1].style.backgroundColor = color
      }
    }
  } else {
    for (let i = 0; i < shipSize; i++) {
      const currentIndex = startIndex + i * 10
      const currentRow = Math.floor((currentIndex - 1) / 10)
      if (currentRow !== startRow + i || currentIndex > 100 || startCol >= 10)
        break
      if (!placedShips.has(currentIndex)) {
        gridItems[currentIndex - 1].style.backgroundColor = color
      }
    }
  }
}

function resetPreview() {
  const gridItems = document.querySelectorAll(cssClass.dot.cell)
  gridItems.forEach((item) => {
    if (item.style.backgroundColor === colors.blue) {
      return
    }
    if (item.style.backgroundColor) {
      item.style.backgroundColor = ''
    }
  })
}

export let currentHoverPosition = null

export function paintOnHover(event) {
  const touch = event.touches ? event.touches[0] : event
  const index = getCellIndex(touch.clientX, touch.clientY)
  const shipSize = shipSizes[currentShipIndex]

  currentHoverPosition = {
    clientX: touch.clientX,
    clientY: touch.clientY,
    touches: event.touches,
  }

  resetPreview()

  if (validatePlacement(index, shipSize)) {
    paintPreview(index, shipSize, colors.green)
  } else {
    paintPreview(index, shipSize, colors.red)
  }
}

function handleClick(event) {
  const touch = event.touches ? event.touches[0] : event
  const index = getCellIndex(touch.clientX, touch.clientY)
  const shipSize = shipSizes[currentShipIndex]

  if (validatePlacement(index, shipSize)) {
    paintPreview(index, shipSize, colors.blue)

    if (isHorizontal) {
      for (let i = 0; i < shipSize; i++) {
        placedShips.add(index + i)
      }
    } else {
      for (let i = 0; i < shipSize; i++) {
        placedShips.add(index + i * 10)
      }
    }

    updateGridArray(index, shipSize)
    currentShipIndex++

    if (currentShipIndex >= shipSizes.length) {
      console.log(messages.colmpete)
      document
        .querySelector(cssClass.dot.grid)
        .removeEventListener(events.click, handleClick)

      console.log(messages.player1Grid)
      _dataService.player1.grid = gridArray
      console.table(_dataService.player1.grid)
    }
  }
}

const gridArray = Array.from({ length: 10 }, () => Array(10).fill(0))

function updateGridArray(startIndex, shipSize) {
  const startRow = Math.floor((startIndex - 1) / 10)
  const startCol = (startIndex - 1) % 10

  if (isHorizontal) {
    for (let i = 0; i < shipSize; i++) {
      gridArray[startRow][startCol + i] = 1
    }
  } else {
    for (let i = 0; i < shipSize; i++) {
      gridArray[startRow + i][startCol] = 1
    }
  }
}

let _dataService = null

export function setDataService(dataService) {
  _dataService = dataService
}

function initGridEvents() {
  const container = document.querySelector(cssClass.dot.grid)

  container.addEventListener(events.mousemove, paintOnHover)
  container.addEventListener(events.mouseenter, paintOnHover)

  container.addEventListener(events.touchmove, paintOnHover, { passive: true })
  container.addEventListener(events.touchstart, paintOnHover, { passive: true })
  container.addEventListener(events.click, handleClick)

  container.addEventListener(
    events.wheel,
    (event) => {
      if (event.deltaY > 0 || event.deltaX > 0) {
        isHorizontal = false
      } else {
        isHorizontal = true
      }

      paintOnHover(event)
    },
    { passive: true }
  )
}

export function init() {
  generateGridItems()
  initGridEvents()
  console.log(messages.initMsg)
}

init()
