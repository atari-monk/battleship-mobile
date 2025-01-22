export class SimpleSpaceCounter {
  constructor(board) {
    this.board = board
  }

  countSpaceUp(row, col) {
    let count = 0
    for (let i = row - 1; i >= 0; i--) {
      if (this.board.getCell(i, col) === 0) {
        count++
      } else {
        break
      }
    }
    return count
  }

  countSpaceDown(row, col) {
    let count = 0
    for (let i = row + 1; i < this.board.length(); i++) {
      if (this.board.getCell(i, col) === 0) {
        count++
      } else {
        break
      }
    }
    return count
  }

  countSpaceLeft(row, col) {
    let count = 0
    for (let i = col - 1; i >= 0; i--) {
      if (this.board.getCell(row, i) === 0) {
        count++
      } else {
        break
      }
    }
    return count
  }

  countSpaceRight(row, col) {
    let count = 0
    for (let i = col + 1; i < this.board.rowLength(row); i++) {
      if (this.board.getCell(row, i) === 0) {
        count++
      } else {
        break
      }
    }
    return count
  }

  countSpaceForPoint(row, col) {
    return [
      this.countSpaceLeft(row, col),
      this.countSpaceUp(row, col),
      this.countSpaceRight(row, col),
      this.countSpaceDown(row, col),
    ]
  }

  logSpace(row, col) {
    console.log(
      `Space for (${row}, ${col}): ${this.countSpaceForPoint(row, col).join(
        ', '
      )}`
    )
  }

  countSpace() {
    const counts = []

    for (let i = 0; i < this.board.length(); i++) {
      for (let j = 0; j < this.board.rowLength(i); j++) {
        if (this.board.getCell(i, j) === 1) {
          counts.push({
            position: [i, j],
            freeSpaces: this.countSpaceForPoint(i, j),
          })
        }
      }
    }

    let logString = counts
      .map(({ position, freeSpaces }) => {
        return `Position: [${position[0]}, ${position[1]}]\n  Left: ${freeSpaces[0]}\n  Up: ${freeSpaces[1]}\n  Right: ${freeSpaces[2]}\n  Down: ${freeSpaces[3]}\n-----------------------------`
      })
      .join('\n')

    console.log(logString)

    return counts
  }
}
