export class Board {
  constructor() {
    this._data = []
  }

  generateBoard(rows, cols) {
    this._data = Array.from({ length: rows }, () => Array(cols).fill(0))
  }

  setData(data) {
    this._data = data
  }

  getDataCopy() {
    return this._data.map((row) => [...row])
  }

  fillValueAt(x, y, value) {
    if (x >= 0 && x < this._data.length && y >= 0 && y < this._data[0].length) {
      this._data[x][y] = value
    } else {
      console.log('Invalid coordinates')
    }
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

  placeShip(shipSize) {
    let shipsPlaced = 0

    // Loop until all ships are placed
    while (shipsPlaced < this._data.length * this._data[0].length) {
      let placed = false

      for (let i = 0; i < this._data.length; i++) {
        for (let j = 0; j < this._data[i].length; j++) {
          // Try placing the ship horizontally if possible
          if (j + shipSize <= this._data[i].length) {
            let canPlaceHorizontally = true
            for (let k = j; k < j + shipSize; k++) {
              if (this._data[i][k] !== 0) {
                canPlaceHorizontally = false
                break
              }
            }
            if (canPlaceHorizontally) {
              for (let k = j; k < j + shipSize; k++) {
                this.fillValueAt(i, k, 3) // Place ship
              }
              shipsPlaced++
              placed = true
              break // Ship placed, exit loop
            }
          }

          // Try placing the ship vertically if possible
          if (i + shipSize <= this._data.length) {
            let canPlaceVertically = true
            for (let k = i; k < i + shipSize; k++) {
              if (this._data[k][j] !== 0) {
                canPlaceVertically = false
                break
              }
            }
            if (canPlaceVertically) {
              for (let k = i; k < i + shipSize; k++) {
                this.fillValueAt(k, j, 3) // Place ship
              }
              shipsPlaced++
              placed = true
              break // Ship placed, exit loop
            }
          }
        }
        if (placed) break // Exit outer loop if ship has been placed
      }

      if (!placed) break // Stop if no more ships can be placed
    }
  }
}
