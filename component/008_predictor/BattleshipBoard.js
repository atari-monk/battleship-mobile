export class BattleshipBoard {
  constructor(inputGrid) {
    this.inputGrid = inputGrid
    this.ships = [5, 4, 3, 3, 2]
    this.predictGrid = inputGrid.map((row) => [...row])
  }

  getPredictedGrid() {
    return this.predictGrid
  }

  countFreeSpacesUp(row, col) {
    let count = 0

    for (let i = row - 1; i >= 0; i--) {
      if (this.inputGrid[i][col] === 0) {
        count++
      } else {
        break
      }
    }

    return count
  }

  countFreeSpacesDown(row, col) {
    let count = 0

    for (let i = row + 1; i < this.inputGrid.length; i++) {
      if (this.inputGrid[i][col] === 0) {
        count++
      } else {
        break
      }
    }

    return count
  }

  countFreeSpacesLeft(row, col) {
    let count = 0

    for (let i = col - 1; i >= 0; i--) {
      if (this.inputGrid[row][i] === 0) {
        count++
      } else {
        break
      }
    }

    return count
  }

  countFreeSpacesRight(row, col) {
    let count = 0

    for (let i = col + 1; i < this.inputGrid[row].length; i++) {
      if (this.inputGrid[row][i] === 0) {
        count++
      } else {
        break
      }
    }

    return count
  }

  countFreeSpaces(row, col) {
    return [
      this.countFreeSpacesLeft(row, col),
      this.countFreeSpacesUp(row, col),
      this.countFreeSpacesRight(row, col),
      this.countFreeSpacesDown(row, col),
    ]
  }

  logFreeSpaces(row, col) {
    console.log(
      `Free spaces for (${row}, ${col}): ${this.countFreeSpaces(row, col).join(
        ', '
      )}`
    )
  }

  countSpace() {
    const directions = [
      [0, -1], // Left
      [-1, 0], // Up
      [0, 1], // Right
      [1, 0], // Down
    ]

    const counts = []

    for (let i = 0; i < this.inputGrid.length; i++) {
      for (let j = 0; j < this.inputGrid[i].length; j++) {
        if (this.inputGrid[i][j] === 1) {
          const freeSpaces = {
            left: 0,
            up: 0,
            right: 0,
            down: 0,
          }

          directions.forEach(([dx, dy], index) => {
            let x = i + dx
            let y = j + dy
            let directionKey = Object.keys(freeSpaces)[index]

            while (
              x >= 0 &&
              x < this.inputGrid.length &&
              y >= 0 &&
              y < this.inputGrid[0].length &&
              this.inputGrid[x][y] === 0
            ) {
              freeSpaces[directionKey]++
              x += dx
              y += dy
            }
          })

          counts.push({ position: [i, j], freeSpaces })
        }
      }
    }

    let logString = counts
      .map(({ position, freeSpaces }) => {
        return `Position: [${position[0]}, ${position[1]}]\n  Left: ${freeSpaces.left}\n  Up: ${freeSpaces.up}\n  Right: ${freeSpaces.right}\n  Down: ${freeSpaces.down}\n-----------------------------`
      })
      .join('\n')

    console.log(logString)

    return counts
  }
}
