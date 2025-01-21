export class AIBoard {
  constructor() {
    this._matrix = Array(10)
      .fill()
      .map(() => Array(10).fill(0))
    this._hits = [] // To track successful hits for targeting
    this._targetStack = [] // Stack for precise targeting based on orientation
    this._destroyedShips = [] // Tracks destroyed ships
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
    const [x, y] = this.getHitXY(fleet)
    this.hit(x, y, fleet)
    return [x, y]
  }

  hit(x, y, fleet) {
    if (fleet.hit(x, y)) {
      this._matrix[x][y] = 1
      this._hits.push([x, y]) // Add successful hits for targeting
      this._updateTargetStack(x, y, fleet) // Update targeting stack
      if (fleet.isShipDestroyed(x, y)) {
        this._markShipAsDestroyed(x, y, fleet)
      }
      return true
    } else {
      this._matrix[x][y] = -1
      return false
    }
  }

  getHitXY(fleet) {
    if (this._targetStack.length > 0) {
      const [x, y] = this._targetStack.pop()
      return [x, y]
    }

    // Analyze empty fields and prioritize large spaces
    const emptyAreas = this._findEmptyAreas()
    emptyAreas.sort((a, b) => b.size - a.size) // Sort by size, descending

    for (const area of emptyAreas) {
      if (area.size >= fleet.smallestShipSize) {
        const [x, y] = this._divideAndPick(area)
        if (this._matrix[x][y] === 0) {
          return [x, y]
        }
      }
    }

    // Default fallback: random search
    let x, y
    do {
      x = Math.floor(Math.random() * 10)
      y = Math.floor(Math.random() * 10)
    } while (this._matrix[x][y] !== 0)

    return [x, y]
  }

  _updateTargetStack(x, y, fleet) {
    if (fleet.isShipDestroyed(x, y)) {
      this._targetStack = []
      return
    }

    const potentialTargets = [
      [x - 1, y], // Up
      [x + 1, y], // Down
      [x, y - 1], // Left
      [x, y + 1], // Right
    ]

    for (const [tx, ty] of potentialTargets) {
      if (
        tx >= 0 &&
        tx < 10 &&
        ty >= 0 &&
        ty < 10 &&
        this._matrix[tx][ty] === 0
      ) {
        this._targetStack.push([tx, ty])
      }
    }
  }

  _markShipAsDestroyed(x, y, fleet) {
    const ship = fleet.getShipAt(x, y)
    if (!this._destroyedShips.includes(ship)) {
      this._destroyedShips.push(ship)
    }

    this._hits = this._hits.filter(
      ([hx, hy]) => !fleet.isPartOfShip(hx, hy, ship)
    )
  }

  _findEmptyAreas() {
    const visited = Array(10)
      .fill()
      .map(() => Array(10).fill(false))
    const emptyAreas = []

    const dfs = (x, y, area) => {
      if (
        x < 0 ||
        x >= 10 ||
        y < 0 ||
        y >= 10 ||
        visited[x][y] ||
        this._matrix[x][y] !== 0
      ) {
        return
      }

      visited[x][y] = true
      area.cells.push([x, y])
      area.size++

      dfs(x - 1, y, area)
      dfs(x + 1, y, area)
      dfs(x, y - 1, area)
      dfs(x, y + 1, area)
    }

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (!visited[x][y] && this._matrix[x][y] === 0) {
          const area = { cells: [], size: 0 }
          dfs(x, y, area)
          emptyAreas.push(area)
        }
      }
    }

    return emptyAreas
  }

  _divideAndPick(area) {
    const { cells } = area
    const midIndex = Math.floor(cells.length / 2)
    return cells[midIndex]
  }
}
