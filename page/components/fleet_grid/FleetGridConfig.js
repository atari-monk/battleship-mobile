export class FleetGridConfig {
  constructor() {
    this.cssClass = {
      dot: {
        root: '.fleet-grid',
        grid: '.fleet-grid__grid',
        cell: '.fleet-grid__item',
        toogle: '.toggle',
      },
      cell: 'fleet-grid__item',
    }
    this.styles = { hidden: 'hidden' }
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
