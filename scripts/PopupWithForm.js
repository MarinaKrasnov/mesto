import {
    Popup
} from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
    }
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    _setEventListeners() {
        super._setEventListeners();
        this._popup.addEventListener('submit', (event) => this._handleSubmit(event));
    }
    close() {
        super.close();
        if (this._popup !== document.querySelector('.overlay-profile')) {
            const form = this._popup.querySelector('form');
            form.reset();
        }
    }
}