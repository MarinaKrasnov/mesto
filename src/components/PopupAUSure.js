import {
    Popup
} from "./Popup.js";
export class PopupAUSure extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        /*     this._handleSubmit = handleSubmit; */
        this._idInput = this._popup.querySelector('[name="id"]');
    }
    sendHandleSubmit(meth) {
        this._handleSubmit = meth;
    };
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log(this._idInput.value);
            this._handleSubmit;
        });
    }
    /*     open(item) {
            super.open();
            this._idInput.value = item._id;
            console.log(this._idInput.value);
        } */
}