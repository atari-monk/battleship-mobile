import { Board } from './Board.js'

export class Player {
  constructor(role, name) {
    this.role = role
    this.name = name
    this.board = new Board()
  }

  toString() {
    return `${this.role} - '${this.name}'\n\t`
  }
}
