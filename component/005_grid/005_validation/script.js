function generateGridItems() {
  const container = document.querySelector('.static-grid__grid')
  for (let i = 1; i <= 100; i++) {
    const gridItem = document.createElement('div')
    gridItem.classList.add('static-grid__item')
    gridItem.textContent = i
    container.appendChild(gridItem)
  }
}

generateGridItems()

let isHorizontal = true // Start with the ship being horizontal

function getCellIndex(x, y) {
  const cellSize = document
    .querySelector('.static-grid__item')
    .getBoundingClientRect()
  const col = Math.floor(x / cellSize.width)
  const row = Math.floor(y / cellSize.height)
  return row * 10 + col + 1 // Convert to a 1-based index
}

function validatePlacement(startIndex) {
  const gridItems = document.querySelectorAll('.static-grid__item')
  const startRow = Math.floor((startIndex - 1) / 10)
  const startCol = (startIndex - 1) % 10
  const reserved = new Set() // Example: Reserved cells, replace with actual tracking logic if needed

  if (isHorizontal) {
    // Horizontal validation
    for (let i = 0; i < 5; i++) {
      const currentIndex = startIndex + i
      const currentCol = startCol + i
      if (
        currentCol >= 10 ||
        currentIndex > 100 ||
        reserved.has(currentIndex)
      ) {
        return false // Out of bounds or overlaps reserved
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
        reserved.has(currentIndex)
      ) {
        return false // Out of bounds or overlaps reserved
      }
    }
  }
  return true // Valid placement
}

function paintCells(startIndex, color) {
  const gridItems = document.querySelectorAll('.static-grid__item')
  gridItems.forEach((item) => (item.style.backgroundColor = '')) // Clear all colors

  const startRow = Math.floor((startIndex - 1) / 10)
  const startCol = (startIndex - 1) % 10

  if (isHorizontal) {
    // Draw horizontally
    for (let i = 0; i < 5; i++) {
      const currentIndex = startIndex + i // Move right by columns
      if (startCol + i >= 10 || currentIndex > 100) break // Stop if out of bounds
      gridItems[currentIndex - 1].style.backgroundColor = color // Update the color
    }
  } else {
    // Draw vertically
    for (let i = 0; i < 5; i++) {
      const currentIndex = startIndex + i * 10 // Move down by rows
      const currentRow = Math.floor((currentIndex - 1) / 10)
      if (currentRow !== startRow + i || currentIndex > 100 || startCol >= 10)
        break // Stop if out of bounds
      gridItems[currentIndex - 1].style.backgroundColor = color // Update the color
    }
  }
}

function paintOnHover(event) {
  const touch = event.touches ? event.touches[0] : event
  const index = getCellIndex(touch.clientX, touch.clientY)

  if (validatePlacement(index)) {
    paintCells(index, 'green') // Valid placement: green
  } else {
    paintCells(index, 'red') // Invalid placement: red
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

  // Double-tap event for switching orientation on mobile
  let lastTapTime = 0

  container.addEventListener('touchend', (event) => {
    const currentTime = new Date().getTime()
    const timeDiff = currentTime - lastTapTime

    const touchEndX = event.changedTouches[0].clientX
    const touchEndY = event.changedTouches[0].clientY
    const currentIndex = getCellIndex(touchEndX, touchEndY)

    if (timeDiff < 300 && timeDiff > 0) {
      // Double-tap detected
      isHorizontal = !isHorizontal // Toggle orientation
      paintOnHover(event) // Repaint with the new orientation
    }

    lastTapTime = currentTime
  })
}

// Initialize grid and events
initGridEvents()
