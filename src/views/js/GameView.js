import { Game } from '../../models/Game.js'
import { TurnView } from './TurnView.js'
import { BoardView } from './BoardView.js'
import { assert } from '../../utils/assert.js'
import { NumPlayersDialog } from './NumPlayersDialog.js'
import { ResumeDialog } from './ResumeDialog.js'

export class GameView {
  #game
  #boardView
  #turnView

  constructor(){
    this.#init()
  }

  #init() {
    new NumPlayersDialog((numOfUsersPlayer) => {
      this.#game = new Game(numOfUsersPlayer)
      this.#turnView = new TurnView(this.#game.getTurn())
      this.#boardView = new BoardView(this.#game.getBoard())
      if (numOfUsersPlayer === 0) {
        this.#game.getActivePlayer().accept(this)
      } else {
        this.#boardView.setControlsCallback(this.#update.bind(this))
      }
    });
  }

  visitMachinePlayer() {
    setTimeout(() => {
      this.#update()
    }, 300)
  }

  visitUserPlayer() {
  }


  #update(column) {
    assert(!this.#game.isWinner())

    this.#turnView.next(column)
    this.#boardView.update()
    if (this.#game.isFinished()) {
      this.#boardView.updateResults()
      new ResumeDialog(() => {
        this.#init()
      })
    } else {
      this.#game.getActivePlayer().accept(this)
    }
  }

}

window.onload = () => {
  new GameView()
}
