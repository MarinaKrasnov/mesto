import {
    Popup
} from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        console.log(this._formValues);
        return this._formValues;
    }
    _setEventListeners() {
        super._setEventListeners();
        super._popup.addEventListener('submit', (event) => {
            console.log(event.target);
            event.preventDefault();
            this._handleSubmit(this._getInputValues())
        });
    }
    close() {
        super.close();
        const form = this._popup.querySelector('form');
        form.reset();
    }
}