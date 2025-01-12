const messages = {
  initMsg: 'grid',
}

const shipSizes = [5, 4, 3, 3, 2] // Classic fleet sizes
let currentShipIndex = 0
let isHorizontal = true
const placedShips = new Set()

function generateGridItems(isNr = false) {
  const container = document.querySelector('.static-grid__grid')
  for (let i = 1; i <= 100; i++) {
    const gridItem = document.createElement('div')
    gridItem.classList.add('static-grid__item')
    if (isNr) gridItem.textContent = i
    gridItem.addEventListener('click', () => handleAtack(gridItem))
    container.appendChild(gridItem)
  }
}

function handleAtack(cell) {
  const isHit = Math.random() < 0.5
  if (isHit) {
    cell.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'
  } else {
    cell.style.backgroundColor = 'rgba(128, 128, 128, 0.7)'
  }
}

export function hitToggle() {
  isHorizontal = !isHorizontal
}

function getCellIndex(x, y) {
  const cellSize = document
    .querySelector('.static-grid__item')
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
  const gridItems = document.querySelectorAll('.static-grid__item')
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
  const gridItems = document.querySelectorAll('.static-grid__item')
  gridItems.forEach((item) => {
    if (item.style.backgroundColor === 'blue') {
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
    paintPreview(index, shipSize, 'green')
  } else {
    paintPreview(index, shipSize, 'red')
  }
}

function handleClick(event) {
  const touch = event.touches ? event.touches[0] : event
  const index = getCellIndex(touch.clientX, touch.clientY)
  const shipSize = shipSizes[currentShipIndex]

  if (validatePlacement(index, shipSize)) {
    paintPreview(index, shipSize, 'blue')

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
      console.log('Fleet placement complete!')
      document
        .querySelector('.static-grid__grid')
        .removeEventListener('click', handleClick)

      console.log('Player1 Grid Array:')
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
  console.log('setDataService', dataService, _dataService)
}

function initGridEvents() {
  const container = document.querySelector('.static-grid__grid')

  container.addEventListener('mousemove', paintOnHover)
  container.addEventListener('mouseenter', paintOnHover)

  container.addEventListener('touchmove', paintOnHover, { passive: true })
  container.addEventListener('touchstart', paintOnHover, { passive: true })
  container.addEventListener('click', handleClick)

  container.addEventListener(
    'wheel',
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
