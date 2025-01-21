export class SimpleAI {
  constructor(board) {
    this.board = board
  }

  move() {
    const [x, y] = this.getHitXY()
    this.board.hit(x, y)
    return [x, y]
  }

  getHitXY() {
    let x, y
    do {
      x = Math.floor(Math.random() * 10)
      y = Math.floor(Math.random() * 10)
    } while (this.board.matrix[x][y] !== 0)

    return [x, y]
  }
}
