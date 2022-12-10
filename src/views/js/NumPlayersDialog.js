import { ButtonsDialog } from './ButtonsDialog.js'

export class NumPlayersDialog extends ButtonsDialog {

    constructor(callback) {
        super()
        let buttons = this.getButtons()
        let texts = [
            `Machine VS Machine`,
            `Player VS Machine`,
            `Player VS Player`]
        texts.forEach((text, index) => {
            let button = document.createElement('button')
            buttons.append(button)
            button.innerText = text
            button.addEventListener('click', () => {
                this.deleteButtons()
                callback(index)
            })
        })
    }

}