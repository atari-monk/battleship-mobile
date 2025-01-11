const messages = {
  initMsg: 'grid',
}

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

//--
let isHorizontal = true
const placedShips = new Set()

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

function validatePlacement(startIndex) {
  const gridItems = document.querySelectorAll('.static-grid__item')
  const startRow = Math.floor((startIndex - 1) / 10)
  const startCol = (startIndex - 1) % 10
  const reserved = new Set()

  if (isHorizontal) {
    for (let i = 0; i < 5; i++) {
      const currentIndex = startIndex + i
      const currentCol = startCol + i
      if (
        currentCol >= 10 ||
        currentIndex > 100 ||
        reserved.has(currentIndex) ||
        placedShips.has(currentIndex)
      ) {
        return false
      }
    }
  } else {
    // Vertical validation
    for (let i = 0; i < 5; i++) {
      const currentIndex = startIndex + i * 10
      const currentRow = Math.floor((currentIndex - 1) / 10)
      if (
        currentRow !== startRow + i ||
        currentIndex > 100 ||
        startCol >= 10 ||
        reserved.has(currentIndex) ||
        placedShips.has(currentIndex)
      ) {
        return false
      }
    }
  }
  return true
}

function paintPreview(startIndex, color) {
  const gridItems = document.querySelectorAll('.static-grid__item')

  const startRow = Math.floor((startIndex - 1) / 10)
  const startCol = (startIndex - 1) % 10

  if (isHorizontal) {
    for (let i = 0; i < 5; i++) {
      const currentIndex = startIndex + i
      if (startCol + i >= 10 || currentIndex > 100) break
      if (!placedShips.has(currentIndex)) {
        gridItems[currentIndex - 1].style.backgroundColor = color
      }
    }
  } else {
    for (let i = 0; i < 5; i++) {
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

export function paintOnHover(event) {
  const touch = event.touches ? event.touches[0] : event
  const index = getCellIndex(touch.clientX, touch.clientY)

  resetPreview()

  if (validatePlacement(index)) {
    paintPreview(index, 'green')
  } else {
    paintPreview(index, 'red')
  }
}

function handleClick(event) {
  const touch = event.touches ? event.touches[0] : event
  const index = getCellIndex(touch.clientX, touch.clientY)

  if (validatePlacement(index)) {
    // Paint the ship in blue and mark the cells as occupied
    paintPreview(index, 'blue')

    // Mark these cells as "occupied" by the placed ship
    if (isHorizontal) {
      for (let i = 0; i < 5; i++) {
        placedShips.add(index + i)
      }
    } else {
      for (let i = 0; i < 5; i++) {
        placedShips.add(index + i * 10)
      }
    }
  }
}

function initGridEvents() {
  const container = document.querySelector('.static-grid__grid')

  // Mouse events
  container.addEventListener('mousemove', paintOnHover)
  container.addEventListener('mouseenter', paintOnHover)

  // Touch events
  container.addEventListener('touchmove', paintOnHover, { passive: true }) // Mark as passive
  container.addEventListener('touchstart', paintOnHover, { passive: true }) // Mark as passive
  container.addEventListener('click', handleClick) // Add click event for permanent placement

  // Mouse Wheel event for switching orientation on PC
  container.addEventListener(
    'wheel',
    (event) => {
      const currentIndex = getCellIndex(event.clientX, event.clientY)

      if (event.deltaY > 0 || event.deltaX > 0) {
        // Scroll down or right: Vertical orientation
        isHorizontal = false
      } else {
        // Scroll up or left: Horizontal orientation
        isHorizontal = true
      }

      // Repaint the cells to reflect the orientation change
      paintOnHover(event)
    },
    { passive: true } // Mark as passive
  )
}

export function init() {
  generateGridItems()
  initGridEvents()
  console.log(messages.initMsg)
}
