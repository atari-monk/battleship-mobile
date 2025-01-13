const messages = {
  initMsg: 'battle grid',
}

function generateGridItems(isNr = false) {
  const container = document.querySelector('.battle-grid__grid')
  for (let i = 1; i <= 100; i++) {
    const gridItem = document.createElement('div')
    gridItem.classList.add('battle-grid__item')
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

export function init() {
  generateGridItems()
  console.log(messages.initMsg)
}

init()
