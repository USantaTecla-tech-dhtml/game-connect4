import { Game } from '../../models/Game.js'
import { TurnView } from './TurnView.js'
import { BoardView } from './BoardView.js'
import { assert } from '../../utils/assert.js'

export class GameView {
  #game
  #boardView
  #turnView

  askPlayers() {
    let buttonsContainer = document.createElement('div')
    buttonsContainer.id = 'buttonsId'
    let buttons = []
    let x = this.#createNumOfPlayerButton(`Player VS Player`, 2)
    let y = this.#createNumOfPlayerButton(`Player VS Machine`, 1)
    let z = this.#createNumOfPlayerButton(`Machine VS Machine`, 0)
    buttonsContainer.append(x, y, z)
    document.getElementById('leftPanel').append(buttonsContainer)

        //   [
    //     `Machine VS Machine`, 
    //     `Player VS Machine`, 
    //     `Player VS Player`].forEach((text, index) => {
    //     buttonsContainer.append(this.#createNumOfPlayerButton(text, index))
    //   })
  }

  #createNumOfPlayerButton(buttonText, numOfUsersPlayer) {
    console.log(numOfUsersPlayer)
    let button = document.createElement('button')
    button.innerText = buttonText
    button.addEventListener('click', () => {
      document.getElementById('buttonsId').remove()
      this.#startNewGame(numOfUsersPlayer)
    })
    return button
  }

  #startNewGame(numOfUsersPlayer) {
    this.#game = new Game(numOfUsersPlayer)
    this.#turnView = new TurnView(this.#game.getTurn())
    this.#boardView = new BoardView(this.#game.getBoard())
    if (numOfUsersPlayer === 0) {
      this.#game.getActivePlayer().accept(this)
    } else {
      this.#boardView.setControlsCallback(this.#update.bind(this))
    }
  }

  #update(column) {
    assert(!this.#game.isWinner())
    this.#turnView.update(column)
    this.#boardView.update()

    if (this.#game.isFinished()) {
      this.#boardView.resultActions()
      this.#drawPlayAgainDialog()
    } else {
      this.#game.getActivePlayer().accept(this)
    }
  }

  visitMachinePlayer() {
    setTimeout(() => {
      this.#update()
    }, 300)
  }

  visitUserPlayer() {
  }

  #drawPlayAgainDialog() {
    let playAgainButton = document.createElement('button')
    playAgainButton.innerText = 'Play again!'
    let buttonsContainer = document.createElement('div')
    buttonsContainer.id = 'buttonsId'
    buttonsContainer.append(playAgainButton)
    document.getElementById('leftPanel').append(buttonsContainer)
    playAgainButton.addEventListener('click', () => {
      document.getElementById('buttonsId').remove()
      new GameView().askPlayers()
    })
  }
}

window.onload = () => {
  new GameView().askPlayers()
}
