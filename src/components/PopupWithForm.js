import {
    Popup
} from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._form = this._popup.querySelector('form');
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
    renderLoading(isLoading, text) {
        isLoading ? this._btn.textContent = 'Сохранение...' : this._btn.textContent = text;
    }
    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }
}