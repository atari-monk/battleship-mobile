export class BattleGridConfig {
  constructor() {
    this.cssClass = {
      dot: {
        grid: '.battle-grid__grid',
        cell: '.battle-grid__item',
      },
      cell: 'battle-grid__item',
    }
    this.colors = { blue: 'blue', green: 'green', red: 'red' }
    this.html = { div: 'div' }
    this.messages = {
      initMsg: 'battle grid',
    }
    this.events = {
      click: 'click',
      mousemove: 'mousemove',
      mouseenter: 'mouseenter',
      touchmove: 'touchmove',
      touchstart: 'touchstart',
      wheel: 'wheel',
    }
  }
}
