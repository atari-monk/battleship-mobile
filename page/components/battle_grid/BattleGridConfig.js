export class BattleGridConfig {
  constructor() {
    this.color = { blue: 'blue', green: 'green', red: 'red' }
    this.cssClass = {
      fleetGrid: 'battle-grid',
      fleetGridGrid: 'battle-grid__grid',
      fleetGridCell: 'battle-grid__item',
    }
    this.html = { div: 'div' }
    this.message = {
      initMsg: 'battle grid',
    }
    this.event = {
      click: 'click',
      mousemove: 'mousemove',
      mouseenter: 'mouseenter',
      touchmove: 'touchmove',
      touchstart: 'touchstart',
      wheel: 'wheel',
    }
  }

  dot(text) {
    return `.${text}`
  }
}
