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

//-----------------
// Select the toggle button
const toggleButton = document.getElementById('toggle-button')

// Toggle functionality
let isToggled = false

toggleButton.addEventListener('click', () => {
  isToggled = !isToggled

  if (isToggled) {
    console.log('Toggled ON')
    toggleButton.classList.add('toggle__button--toggled-on')
    toggleButton.classList.remove('toggle__button--toggled-off')
  } else {
    console.log('Toggled OFF')
    toggleButton.classList.add('toggle__button--toggled-off')
    toggleButton.classList.remove('toggle__button--toggled-on')
  }
})

// Initialize default state
toggleButton.classList.add('toggle__button--toggled-off')

//-----------------

let isHorizontal = true // Start with the ship being horizontal
const placedShips = new Set() // To track the placed ships' cell indices

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
        reserved.has(currentIndex) ||
        placedShips.has(currentIndex) // Prevent placing over an already placed ship
      ) {
        return false // Out of bounds or overlaps reserved or placed ships
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
        placedShips.has(currentIndex) // Prevent placing over an already placed ship
      ) {
        return false // Out of bounds or overlaps reserved or placed ships
      }
    }
  }
  return true // Valid placement
}

function paintPreview(startIndex, color) {
  const gridItems = document.querySelectorAll('.static-grid__item')

  // Only paint the preview (green/red) for the ship's cells
  const startRow = Math.floor((startIndex - 1) / 10)
  const startCol = (startIndex - 1) % 10

  if (isHorizontal) {
    // Draw horizontally
    for (let i = 0; i < 5; i++) {
      const currentIndex = startIndex + i // Move right by columns
      if (startCol + i >= 10 || currentIndex > 100) break // Stop if out of bounds
      if (!placedShips.has(currentIndex)) {
        gridItems[currentIndex - 1].style.backgroundColor = color // Update the color (green or red)
      }
    }
  } else {
    // Draw vertically
    for (let i = 0; i < 5; i++) {
      const currentIndex = startIndex + i * 10 // Move down by rows
      const currentRow = Math.floor((currentIndex - 1) / 10)
      if (currentRow !== startRow + i || currentIndex > 100 || startCol >= 10)
        break // Stop if out of bounds
      if (!placedShips.has(currentIndex)) {
        gridItems[currentIndex - 1].style.backgroundColor = color // Update the color (green or red)
      }
    }
  }
}

function resetPreview() {
  // Reset only the cells that are highlighted, without clearing the entire grid
  const gridItems = document.querySelectorAll('.static-grid__item')
  gridItems.forEach((item) => {
    if (item.style.backgroundColor === 'blue') {
      return // Skip blue cells (already placed ships)
    }
    if (item.style.backgroundColor) {
      item.style.backgroundColor = '' // Clear only the preview
    }
  })
}

function paintOnHover(event) {
  const touch = event.touches ? event.touches[0] : event
  const index = getCellIndex(touch.clientX, touch.clientY)

  resetPreview() // Reset the preview before applying the new one

  if (validatePlacement(index)) {
    paintPreview(index, 'green') // Valid placement: green
  } else {
    paintPreview(index, 'red') // Invalid placement: red
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
