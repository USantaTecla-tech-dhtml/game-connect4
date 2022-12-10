import { ButtonsDialog } from './ButtonsDialog.js'

export class ResumeDialog extends ButtonsDialog {

    constructor(callback) {
        super()
        let buttons = this.getButtons()
        let button = document.createElement('button')
        buttons.append(button)
        button.innerText = 'Play again!'
        button.addEventListener('click', () => {
            this.deleteButtons()
            callback()
        })
    }
}