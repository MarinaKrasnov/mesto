import {
    Popup
} from "./Popup.js";
export class PopupAUSure extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._idInput = this._popup.querySelector('[name="id"]');
        this._form = this._popup.querySelector('form');
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmit(this.card);
        });
    }
    setCard(card) {
        this.card = card
        this._idInput.value = card.id
    }
}