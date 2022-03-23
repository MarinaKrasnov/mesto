import {
    overlayActiveClass
} from "./../pages/index.js";
export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeBtn = this._popup.querySelector('.close-btn');
    }
    // Closing popup by clicking button Esc
    _handleEscClose = (evt) => {
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
        this._closeBtn.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (evt) => this.closeByClickingOutside(evt));
    }
    open() {
        this._popup.classList.add(overlayActiveClass);
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popup.classList.remove(overlayActiveClass);
        document.removeEventListener('keydown', this._handleEscClose);
    }
}