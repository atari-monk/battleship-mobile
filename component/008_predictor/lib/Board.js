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

  placeShipHorizontallyLeftToRight(startX, startY, length, mark = 3) {
    if (
      startX < 0 ||
      startX >= this._data.length ||
      startY < 0 ||
      startY + length > this._data[0].length
    ) {
      return false
    }

    for (let i = 0; i < length; i++) {
      if (
        this._data[startX][startY + i] !== 0 &&
        this._data[startX][startY + i] !== 3 &&
        this._data[startX][startY + i] !== 1
      ) {
        return false
      }
    }

    for (let i = 0; i < length; i++) {
      if (this._data[startX][startY + i] !== 1) {
        this._data[startX][startY + i] = mark
      }
    }

    return true
  }

  placeShipHorizontallyRightToLeft(startX, startY, length, mark = 3) {
    if (
      startX < 0 ||
      startX >= this._data.length ||
      startY < 0 ||
      startY - (length - 1) < 0
    ) {
      return false
    }

    for (let i = 0; i < length; i++) {
      if (
        this._data[startX][startY - i] !== 0 &&
        this._data[startX][startY - i] !== 3 &&
        this._data[startX][startY - i] !== 1
      ) {
        return false
      }
    }

    for (let i = 0; i < length; i++) {
      if (this._data[startX][startY - i] !== 1) {
        this._data[startX][startY - i] = mark
      }
    }

    return true
  }

  placeShipHorizontally(startX, startY, length, mark = 3) {
    return (
      this.placeShipHorizontallyLeftToRight(startX, startY, length, mark) ||
      this.placeShipHorizontallyRightToLeft(startX, startY, length, mark)
    )
  }

  placeShipVerticallyTopToBottom(startX, startY, length, mark = 3) {
    if (
      startX < 0 ||
      startX + length > this._data.length ||
      startY < 0 ||
      startY >= this._data[0].length
    ) {
      return false
    }

    for (let i = 0; i < length; i++) {
      if (
        this._data[startX + i][startY] !== 0 &&
        this._data[startX + i][startY] !== 3 &&
        this._data[startX + i][startY] !== 1
      ) {
        return false
      }
    }

    for (let i = 0; i < length; i++) {
      if (this._data[startX + i][startY] !== 1) {
        this._data[startX + i][startY] = mark
      }
    }

    return true
  }

  placeShipVerticallyBottomToTop(startX, startY, length, mark = 3) {
    if (
      startX < 0 ||
      startX - length < 0 ||
      startY < 0 ||
      startY >= this._data[0].length
    ) {
      return false
    }

    for (let i = 0; i < length; i++) {
      if (
        this._data[startX - i][startY] !== 0 &&
        this._data[startX - i][startY] !== 3 &&
        this._data[startX - i][startY] !== 1
      ) {
        return false
      }
    }

    for (let i = 0; i < length; i++) {
      if (this._data[startX - i][startY] !== 1) {
        this._data[startX - i][startY] = mark
      }
    }

    return true
  }

  placeShipVertically(startX, startY, length, mark = 3) {
    return (
      this.placeShipVerticallyTopToBottom(startX, startY, length, mark) ||
      this.placeShipVerticallyBottomToTop(startX, startY, length, mark)
    )
  }

  fillBoardWithShipsRandomly() {
    const maxAttempts = 1000
    const shipLengths = [2]
    let attempts = 0

    while (attempts < maxAttempts) {
      const startX = Math.floor(Math.random() * this._data.length)
      const startY = Math.floor(Math.random() * this._data[0].length)
      const length = shipLengths[Math.floor(Math.random() * shipLengths.length)]
      const isHorizontal = Math.random() < 0.5

      const placed = isHorizontal
        ? this.placeShipHorizontallyLeftToRight(startX, startY, length)
        : this.placeShipVertically(startX, startY, length)

      if (placed) {
        if (this.isBoardFull()) {
          return true
        }
      }

      attempts++
    }

    console.log('Unable to fill the board completely within the attempt limit')
    return false
  }

  isBoardFull() {
    for (let row of this._data) {
      if (row.includes(0)) {
        return false
      }
    }
    return true
  }

  placeShipAtHitPoint(x, y, length) {
    let result = false
    if (this.placeShipHorizontally(x, y, length)) {
      result = true
    }
    if (this.placeShipVertically(x, y, length)) {
      result = true
    }
    return result
  }

  placeShipOrFillBoard(length) {
    const hitPoints = this.findHitPoints()

    for (const { x, y } of hitPoints) {
      const placed = this.placeShipAtHitPoint(x, y, length)
      if (placed) {
        return true
      }
    }

    return this.fillBoardWithShipsRandomly()
  }

  findHitPoints() {
    const hitPoints = []

    for (let x = 0; x < this._data.length; x++) {
      for (let y = 0; y < this._data[0].length; y++) {
        if (this._data[x][y] === 1) {
          hitPoints.push({ x, y })
        }
      }
    }

    return hitPoints
  }
}
