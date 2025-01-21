export class FleetGuess {
  constructor(board) {
    this.board = board
    this._matrix = Array(10)
      .fill()
      .map(() => Array(10).fill(0))
  }

  get matrix() {
    return this._matrix
  }

  set matrix(newMatrix) {
    if (
      Array.isArray(newMatrix) &&
      newMatrix.length === 10 &&
      newMatrix.every((row) => Array.isArray(row) && row.length === 10)
    ) {
      this._matrix = newMatrix
    } else {
      throw new Error('Invalid matrix format')
    }
  }

  toString() {
    return `Fleet Guess:\n\t\t${this._matrix
      .map((row) => row.join(' '))
      .join('\n\t\t')}`
  }

  copyBoardMatrix() {
    this._matrix = this.board.matrix.map((row) => row.slice())
  }

  predictFleetPlacement() {
    this.copyBoardMatrix()
    const ships = [5, 4, 3, 3, 2]
    const directions = ['horizontal', 'vertical']
    const predictions = []

    for (const ship of ships) {
      let placed = false

      while (!placed) {
        const row = Math.floor(Math.random() * 10)
        const col = Math.floor(Math.random() * 10)
        const direction = directions[Math.floor(Math.random() * 2)]

        if (this.isValidPlacement(row, col, ship, direction)) {
          this.placeShip(row, col, ship, direction)
          predictions.push({ row, col, length: ship, direction })
          placed = true
        }
      }
    }

    return predictions
  }

  isValidPlacement(row, col, length, direction) {
    if (direction === 'horizontal') {
      if (col + length > 10) return false
      for (let i = 0; i < length; i++) {
        if (this._matrix[row][col + i] !== 0) return false
      }
    } else {
      if (row + length > 10) return false
      for (let i = 0; i < length; i++) {
        if (this._matrix[row + i][col] !== 0) return false
      }
    }
    return true
  }

  placeShip(row, col, length, direction) {
    if (direction === 'horizontal') {
      for (let i = 0; i < length; i++) {
        if (this._matrix[row][col + i] === 0) {
          this._matrix[row][col + i] = 3
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (this._matrix[row + i][col] === 0) {
          this._matrix[row + i][col] = 3
        }
      }
    }
  }

  getHitXY() {
    this.predictFleetPlacement()
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (this._matrix[row][col] === 3) {
          return [row, col]
        }
      }
    }

    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
  }
}
