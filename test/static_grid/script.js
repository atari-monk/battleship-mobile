function generateGridItems() {
  const container = document.querySelector('.grid-container')
  for (let i = 1; i <= 100; i++) {
    const gridItem = document.createElement('div')
    gridItem.classList.add('grid-item')
    gridItem.textContent = i
    container.appendChild(gridItem)
  }
}

generateGridItems()
