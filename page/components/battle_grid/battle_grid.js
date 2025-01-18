import { BattleGridConfig } from './BattleGridConfig.js'
import { BattleGrid } from './BattleGrid.js'
import { GridRenderer } from './GridRenderer.js'

const config = new BattleGridConfig()
const battleGrid = new BattleGrid(config, new GridRenderer(config))

export default battleGrid
