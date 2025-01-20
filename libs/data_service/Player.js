export class Player {
  constructor(name) {
    this.name = name
    this.grid = Array(10)
      .fill()
      .map(() => Array(10).fill(0))
  }

  isValidPlacement(row, col, length, direction) {
    if (direction === 'horizontal') {
      if (col + length > 10) return false
      for (let i = 0; i < length; i++) {
        if (this.grid[row][col + i] !== 0) return false
      }
    } else {
      if (row + length > 10) return false
      for (let i = 0; i < length; i++) {
        if (this.grid[row + i][col] !== 0) return false
      }
    }
    return true
  }

  placeShip(row, col, length, direction) {
    if (direction === 'horizontal') {
      for (let i = 0; i < length; i++) {
        this.grid[row][col + i] = 1
      }
    } else {
      for (let i = 0; i < length; i++) {
        this.grid[row + i][col] = 1
      }
    }
  }

  setFleetRandomly() {
    const ships = [5, 4, 3, 3, 2]
    const directions = ['horizontal', 'vertical']

    for (const ship of ships) {
      let placed = false

      while (!placed) {
        const row = Math.floor(Math.random() * 10)
        const col = Math.floor(Math.random() * 10)
        const direction = directions[Math.floor(Math.random() * 2)]

        if (this.isValidPlacement(row, col, ship, direction)) {
          this.placeShip(row, col, ship, direction)
          placed = true
        }
      }
    }
  }

  setTestFleet(atEnd = true) {
    const length = 17
    let col = atEnd ? 9 : 0
    let row = atEnd ? 9 : 0
    const step = atEnd ? -1 : 1

    for (let i = 0; i < length; i++) {
      if (atEnd && col < 0) {
        row -= 1
        col = 9
      } else if (!atEnd && col > 9) {
        row += 1
        col = 0
      }
      this.grid[row][col] = 1
      col += step
    }
  }
}
