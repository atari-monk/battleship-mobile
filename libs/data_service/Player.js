export class Player {
  constructor(name) {
    this.name = name
    this.grid = Array(10)
      .fill()
      .map(() => Array(10).fill(0))
  }

  setFleetRandomly() {
    const ships = [5, 4, 3, 3, 2]
    const directions = ['horizontal', 'vertical']

    const isValidPlacement = (row, col, length, direction) => {
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

    const placeShip = (row, col, length, direction) => {
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

    for (const ship of ships) {
      let placed = false

      while (!placed) {
        const row = Math.floor(Math.random() * 10)
        const col = Math.floor(Math.random() * 10)
        const direction = directions[Math.floor(Math.random() * 2)]

        if (isValidPlacement(row, col, ship, direction)) {
          placeShip(row, col, ship, direction)
          placed = true
        }
      }
    }
  }
}
