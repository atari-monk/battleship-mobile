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
      initMsg: '3. Component:\n\tfleet grid',
      complete: '4. Fleet placement complete!',
      player1Data: (output) =>
        `6. Setting Player 1 data...\n\tFleet:\n\t\t${output}`,
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
