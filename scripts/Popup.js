import {
    overlayActiveClass
} from "./index.js";
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
    _closeByClickingOutside(event) {
        const hasOverlayActiveClass = [...event.target.classList].includes(overlayActiveClass);
        if (hasOverlayActiveClass) {
            this.close()
        }
    };
    _setEventListeners() {
        this._closeBtn = this._popup.querySelector('.close-btn');
        this._closeBtn.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('click', (evt) => this._closeByClickingOutside(evt));
        document.addEventListener('keydown', (e) => this._handleEscClose(e));
    }
    _removeEventListeners() {
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    }
    open() {
        this._popup.classList.add(overlayActiveClass);
        this._setEventListeners();
    }
    close() {
        this._popup.classList.remove(overlayActiveClass);
        this._removeEventListeners();
    }
}