import {
    Popup
} from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector, popupImageSelector) {
        super(popupSelector);
        this._overlayImage = this._popup.querySelector(popupImageSelector.overlayImage);
        this._overlayImageCapture = this._popup.querySelector(popupImageSelector.overlayImageCapture);
    }
    open(data) {
        super.open();
        this._overlayImage.alt = `Виды на ${data.name}`;
        this._overlayImageCapture.textContent = data.name;
        this._overlayImage.src = data.link;
    }
}