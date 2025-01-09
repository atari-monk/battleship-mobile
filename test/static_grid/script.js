function generateGridItems(isNr = false) {
  const container = document.querySelector('.static-grid__grid')
  for (let i = 1; i <= 100; i++) {
    const gridItem = document.createElement('div')
    gridItem.classList.add('static-grid__item')
    if (isNr) gridItem.textContent = i
    gridItem.addEventListener('click', () => handleClick(gridItem))
    container.appendChild(gridItem)
  }
}

function handleClick(cell) {
  const isHit = Math.random() < 0.5
  console.log(isHit)
  if (isHit) {
    cell.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'
  } else {
    cell.style.backgroundColor = 'rgba(128, 128, 128, 0.7)'
  }
}

generateGridItems()
