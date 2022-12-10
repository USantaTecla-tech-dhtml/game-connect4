export class TurnView {

  #turn

  constructor(turn) {
    this.#turn = turn
    this.#update()
  }

  #update() {
    let color = this.#turn.getActivePlayer().getColor().toString()
    document.getElementById('redTurn').style.opacity = color === 'Red' ? 1 : 0.2
    document.getElementById('yellowTurn').style.opacity = color === 'Yellow' ? 1 : 0.2
    document.querySelectorAll('th').forEach((th) => {
      th.style.setProperty(
        `--th-background-image`,
        `url("../images/${color.toLowerCase()}-token.png")`
      )
    })
  }

  next(column) {
    this.column = column
    this.#turn.getActivePlayer().accept(this)
    delete this.column
    this.#turn.next()
    this.#update()
  }

  visitUserPlayer(userPlayer) {
    userPlayer.dropToken(this.column)
  }

  visitMachinePlayer(machinePlayer) {
    machinePlayer.dropToken(machinePlayer.getColumn())
  }
}
