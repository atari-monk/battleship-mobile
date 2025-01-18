export class BattleGridConfig {
  constructor() {
    this.color = { blue: 'blue', green: 'green', red: 'red' }
    this.cssClass = {
      battleGrid: 'battle-grid',
      battleGridGrid: 'battle-grid__grid',
      battleGridCell: 'battle-grid__item',
    }
    this.html = { div: 'div' }
    this.message = {
      initMsg: '7. Component:\n\tbattle grid',
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
