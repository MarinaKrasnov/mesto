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
    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }
    open() {
        this._popup.classList.add(overlayActiveClass);
    }
    close() {
        this._popup.classList.remove(overlayActiveClass);
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }
}