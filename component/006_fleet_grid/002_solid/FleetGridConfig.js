export class FleetGridConfig {
  constructor() {
    this.cssClass = {
      dot: {
        grid: '.fleet-grid__grid',
        cell: '.fleet-grid__item',
      },
      cell: 'fleet-grid__item',
    }
    this.colors = { blue: 'blue', green: 'green', red: 'red' }
    this.html = { div: 'div' }
    this.messages = {
      initMsg: 'fleet grid',
      complete: 'fleet placement complete!',
      player1Grid: 'player1 grid array:',
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
