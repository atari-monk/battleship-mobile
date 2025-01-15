import { FleetGridConfig } from './FleetGridConfig.js'
// import { DataService } from './../../../shared_library/DataService.js'
// import { Player } from './../../../shared_library/Player.js'
import { FleetGrid } from './FleetGrid.js'

let dataService = null

//const dataService = new DataService()
//dataService.player1 = new Player()
const fleetGrid = new FleetGrid(null, new FleetGridConfig())
fleetGrid.init()
