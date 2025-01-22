export class SpaceCounter {
  constructor(board) {
    this.board = board
  }

  countSpace() {
    const directions = [
      [0, -1],
      [-1, 0],
      [0, 1],
      [1, 0],
    ]

    const counts = []

    for (let i = 0; i < this.board.length(); i++) {
      for (let j = 0; j < this.board.rowLength(i); j++) {
        if (this.board.getCell(i, j) === 1) {
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
              x < this.board.length() &&
              y >= 0 &&
              y < this.board.rowLength(0) &&
              this.board.getCell(x, y) === 0
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
