import {
    Popup
} from "./Popup.js";
export class PopupAUSure extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._idInput = this._popup.querySelector('[name="id"]');
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmit(this.card);
        });
    }
    setCard(card) {
        this.card = card
        this._idInput.value = card.id
    }
    pleaseWait() {
        this._btn.textContent = 'Сохранение...';
    }
    stopWait(text) {
        this._btn.textContent = text;
    }
}