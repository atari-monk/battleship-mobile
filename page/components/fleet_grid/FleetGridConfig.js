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
      initMsg: '5. Load component: fleet_grid',
      complete: '7. Load data: Fleet placement',
      player1Data: (output) =>
        `9. Load data:\n\tPlayer 1\n\tFleet:\n\t\t${output}`,
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
