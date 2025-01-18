export class MenuConfig {
  constructor() {
    this.service = {
      dataService: { name: 'data_service' },
    }
    this.component = {
      menu: {
        name: 'menu',
        cssClass: { component: 'game-menu' },
        id: { menuStartButton: 'gameMenuStartButton' },
        style: { hidden: 'game-menu--hidden' },
        msg: {
          initMsg: '7. Component:\n\tmenu',
        },
        event: { click: 'click' },
      },
      fleetGrid: {
        name: 'fleet_grid',
        cssClass: { component: 'fleet-grid' },
        scripts: [
          'EventHandler.js',
          'FleetGridConfig.js',
          'FleetGridConfig.js',
          'FleetService.js',
          'GridRenderer.js',
          'PlacementValidator.js',
          'ShipPreview.js',
          'PlacementHandler.js',
          'FleetGrid.js',
        ],
      },
      toggle: { name: 'toggle', cssClass: { component: 'toggle' } },
    }
  }

  dot(text) {
    return `.${text}`
  }
}
