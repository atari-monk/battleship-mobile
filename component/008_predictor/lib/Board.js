export class Board {
  constructor(data) {
    this._data = data
  }

  getDataCopy() {
    return this._data.map((row) => [...row])
  }

  getCell(x, y) {
    return this._data[x][y]
  }

  length() {
    return this._data.length
  }

  rowLength(x) {
    return this._data[x].length
  }

  log(x, y) {
    console.log(`board[${x}][${y}]: ${this._data[x][y]}`)
  }

  print(title = '') {
    const columnLabels =
      '   ' +
      this._data[0].map((_, index) => String.fromCharCode(65 + index)).join(' ')
    const boardString = this._data
      .map((row, rowIndex) => {
        const rowLabel =
          rowIndex + 1 < 10 ? ` ${rowIndex + 1}` : `${rowIndex + 1}`
        return `${rowLabel} ${row.join(' ')}`
      })
      .join('\n')
    title.length > 0 && console.log(title)
    console.log(`${columnLabels}\n${boardString}`)
  }

  render(tableId) {
    const table = document.getElementById(tableId)
    table.innerHTML = ''

    for (let i = 0; i < this._data.length; i++) {
      const row = document.createElement('tr')
      for (let j = 0; j < this._data[i].length; j++) {
        const cell = document.createElement('td')
        const value = this._data[i][j]

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
}
