export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeBtn = this._popup.querySelector('.close-btn');
        this._btn = this._popup.querySelector('.popup__submit');
        this._overlayClassActive = 'overlay_active';
    }
    // Closing popup by clicking button Esc
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    };
    // Closing popup by clicking outside of the popup
    closeByClickingOutside(event) {
        const hasOverlayActiveClass = event.target.classList.contains(this._overlayClassActive);
        if (hasOverlayActiveClass) {
            this.close()
        }
    };
    setEventListeners() {
        this._closeBtn.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (evt) => this.closeByClickingOutside(evt));
    }
    open() {
        this._popup.classList.add(this._overlayClassActive);
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popup.classList.remove(this._overlayClassActive);
        document.removeEventListener('keydown', this._handleEscClose);
    }

}