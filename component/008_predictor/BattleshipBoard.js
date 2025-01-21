export class BattleshipBoard {
  constructor(inputGrid) {
    this.inputGrid = inputGrid // 10x10 grid
    this.ships = [5, 4, 3, 3, 2] // Ship sizes
    this.predictGrid = inputGrid.map((row) => [...row])
  }

  getPredictedGrid() {
    return this.predictGrid
  }
}
