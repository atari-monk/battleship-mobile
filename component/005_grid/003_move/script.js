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
  for (let i = 0; i < 5; i++) {
    const currentIndex = startIndex + i * 10 // Move down by rows
    const currentRow = Math.floor((currentIndex - 1) / 10)

    if (currentRow !== startRow + i || currentIndex > 100) break // Stop if out of bounds
    gridItems[currentIndex - 1].style.backgroundColor = color // Update the color
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
}

initGridEvents()
