import {
    overlayActiveClass
} from "./../pages/index.js";
export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    };
    // Closing popup by clicking outside of the popup
    closeByClickingOutside(event) {
        const hasOverlayActiveClass = event.target.classList.contains(overlayActiveClass);
        if (hasOverlayActiveClass) {
            this.close()
        }
    };
    _setEventListeners() {
        document.addEventListener('keydown', (e) => this._handleEscClose(e));
    }
    open() {
        this._popup.classList.add(overlayActiveClass);
        this._setEventListeners();
    }
    close() {
        this._popup.classList.remove(overlayActiveClass);
        document.removeEventListener('keydown', (e) => this._handleEscClose(e));
    }
}