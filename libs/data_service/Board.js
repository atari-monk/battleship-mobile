export class Board {
  constructor() {
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
    return `Board:\n\t\t${this._matrix
      .map((row) => row.join(' '))
      .join('\n\t\t')}`
  }

  move(fleet) {
    const [x, y] = this.getHitXY()
    this.hit(x, y, fleet)
    return [x, y]
  }

  hit(x, y, fleet) {
    if (fleet.hit(x, y)) {
      this._matrix[x][y] = 1
      return true
    } else {
      this._matrix[x][y] = -1
      return false
    }
  }
}
