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

function paintCells(startIndex, color) {
  const gridItems = document.querySelectorAll('.static-grid__item')
  gridItems.forEach((item) => (item.style.backgroundColor = '')) // Clear all colors

  const startRow = Math.floor((startIndex - 1) / 10)

  if (isHorizontal) {
    // Draw horizontally
    for (let i = 0; i < 5; i++) {
      const currentIndex = startIndex + i // Move right by columns
      if (currentIndex % 10 === 0 || currentIndex > 100) break // Stop if out of bounds
      gridItems[currentIndex - 1].style.backgroundColor = color // Update the color
    }
  } else {
    // Draw vertically
    for (let i = 0; i < 5; i++) {
      const currentIndex = startIndex + i * 10 // Move down by rows
      const currentRow = Math.floor((currentIndex - 1) / 10)
      if (currentRow !== startRow + i || currentIndex > 100) break // Stop if out of bounds
      gridItems[currentIndex - 1].style.backgroundColor = color // Update the color
    }
  }
}

function initGridEvents() {
  const container = document.querySelector('.static-grid__grid')

  function paintOnHover(event) {
    const touch = event.touches ? event.touches[0] : event
    const index = getCellIndex(touch.clientX, touch.clientY)
    paintCells(index, 'red')
  }

  // Mouse events
  container.addEventListener('mousemove', paintOnHover)
  container.addEventListener('mouseenter', paintOnHover)

  // Touch events
  container.addEventListener('touchmove', paintOnHover)
  container.addEventListener('touchstart', paintOnHover) // To detect when user touches on the grid

  // Mouse Wheel event for switching orientation on PC
  container.addEventListener('wheel', (event) => {
    const currentIndex = getCellIndex(event.clientX, event.clientY)

    if (event.deltaY > 0 || event.deltaX > 0) {
      // Scroll down or right: Vertical orientation
      isHorizontal = false
    } else {
      // Scroll up or left: Horizontal orientation
      isHorizontal = true
    }

    // Repaint the cells to reflect the orientation change
    paintCells(currentIndex, 'red')
  })

  // Swipe event for switching orientation on mobile
  let touchStartX = 0
  let touchStartY = 0

  container.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX
    touchStartY = event.touches[0].clientY
  })

  container.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX
    const touchEndY = event.changedTouches[0].clientY

    const deltaX = touchEndX - touchStartX
    const deltaY = touchEndY - touchStartY

    const currentIndex = getCellIndex(touchEndX, touchEndY)

    // Detect swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      isHorizontal = deltaX > 0 // Right swipe: Horizontal
    } else {
      // Vertical swipe
      isHorizontal = deltaY > 0 // Down swipe: Vertical
    }

    // Repaint the cells to reflect the orientation change
    paintCells(currentIndex, 'red')
  })
}

// Initialize grid and events
initGridEvents()
