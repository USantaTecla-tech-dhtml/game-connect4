export class ButtonsDialog {
    
    #BUTTONS_ID = 'buttonsId'

    getButtons() {
        let buttons = document.createElement('div')
        buttons.id = this.#BUTTONS_ID
        document.getElementById('leftPanel').append(buttons)
        return buttons;
    }

    deleteButtons() {
        document.getElementById(this.#BUTTONS_ID).remove()
    }
}