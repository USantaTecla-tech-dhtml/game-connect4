import { Coordinate } from '../../types/Coordinate.js'

export class BoardView {
  #board

  constructor(board) {
    this.#board = board
    document.getElementById('messageId').innerHTML = ''
    const section = document.getElementById('boardId');
    section.innerHTML = ''
    section.append(this.#createTable())
  }

  #createTable() {
    let table = document.createElement('table');
    table.append(this.#createRowH(0));
    for (let row = Coordinate.NUMBER_ROWS; row > 0; row--) {
      table.append(this.#createRow(row));
    }
    return table;
  }

  #createRowH(row) {
    let tr = document.createElement('tr')
    tr.id = 'controls'
    for (let column = 0; column < Coordinate.NUMBER_COLUMNS; column++) {
      let th = document.createElement('th')
      th.id = `Column-${column}-Control`
      tr.append(th)
    }
    return tr
  }

  #createRow(row) {
    let tr = document.createElement('tr')
    tr.id = `${row - 1}`
    for (let column = 0; column < Coordinate.NUMBER_COLUMNS; column++) {
      let td = document.createElement('td')
      td.id = `${row - 1}-${column}`
      tr.append(td)
    }
    return tr
  }

  setControlsCallback(callback) {
    document.querySelectorAll('th').forEach((headElement, key) => {
      headElement.addEventListener('click', () => {
        callback(key)
      })
    })
  }

  update() {
    let lastToken = this.#board.getLastDrop()
    let color = this.#board
      .getColor(new Coordinate(lastToken.getRow(), lastToken.getColumn()))
      .toString()
    document.getElementById(
      `${lastToken.getRow()}-${lastToken.getColumn()}`
    ).style.backgroundImage = `url("../views/images/${color.toLowerCase()}-token.png")`
  }

  resultActions() {
    document.getElementById('controls').replaceWith(this.#createRowH())
    let message = 'Tied!'
    if (this.#board.isWinner()) {
      let color = this.#board.getColor(this.#board.getLastDrop())
      message = `<b style='color: ${color}'>${color}</b> Has won the game!`
    }
    document.getElementById('messageId').innerHTML = message;
  }

}
