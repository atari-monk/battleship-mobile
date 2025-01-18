export class FleetGridConfig {
  constructor() {
    this.component = { battleGrid: 'battle_grid' }
    this.color = { blue: 'blue', green: 'green', red: 'red' }
    this.cssClass = {
      fleetGrid: 'fleet-grid',
      fleetGridGrid: 'fleet-grid__grid',
      fleetGridCell: 'fleet-grid__item',
      toogle: 'toggle',
      battleGrid: 'battle-grid',
    }
    this.style = { hidden: 'hidden' }
    this.html = { div: 'div' }
    this.message = {
      initMsg: 'fleet grid',
      complete: 'fleet placement complete!',
      player1Grid: 'player1 grid array:',
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
