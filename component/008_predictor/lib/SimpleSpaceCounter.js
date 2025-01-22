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
    this.board.log(1, 1)
    this.board.log(2, 3)
    this.board.log(5, 6)

    this.logSpace(1, 1)
    this.logSpace(2, 3)
    this.logSpace(5, 6)
  }
}
