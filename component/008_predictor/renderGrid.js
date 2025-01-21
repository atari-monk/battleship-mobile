export function renderGrid(grid, tableId) {
  const table = document.getElementById(tableId)
  table.innerHTML = '' // Clear existing grid

  for (let i = 0; i < grid.length; i++) {
    const row = document.createElement('tr')
    for (let j = 0; j < grid[i].length; j++) {
      const cell = document.createElement('td')
      const value = grid[i][j]

      if (value === 1) {
        cell.classList.add('hit')
        cell.textContent = 'H'
      } else if (value === 2) {
        cell.classList.add('miss')
        cell.textContent = 'M'
      } else if (value === 3) {
        cell.classList.add('prediction')
        cell.textContent = 'P'
      } else {
        cell.classList.add('empty')
        cell.textContent = ''
      }
      row.appendChild(cell)
    }
    table.appendChild(row)
  }
}
