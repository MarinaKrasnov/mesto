import {
    PopupWithForm
} from "./PopupWithForm.js";
export class PopupAUSure extends PopupWithForm {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector, handleSubmit);
        this._idInput = this._popup.querySelector('[name="id"]');
    }
    setEventListeners() {
        console.log(this._idInput.value);
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmit(this._idInput.value);
        });
    }
    open(item) {
        super.open();
        console.log(this._idInput.value);
        this._idInput.value = item._id;
    }
}