import {
    popupWithImage
} from './../pages/index.js';
export default class Card {
    constructor(data, cardsTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._template = cardsTemplate;
        this.data = data;
    }
    _handleImageClick = () => {
        popupWithImage.open(this.data);
    }
    _handleButtonLike = () => {
        this._buttonLike.classList.toggle('card__button-like_active')
    }
    _handleButtonBin = () => {
        this._cardElement.remove();
    }
    _getTemplate() {
        return this._template.cloneNode(true);
    }
    _setEventListeners() {
        //Creating popup for each card
        this._cardImage.addEventListener('click', this._handleImageClick);
        //Hanging a button "Like" on a card
        this._buttonLike = this._cardElement.querySelector('.card__button-like');
        this._buttonLike.addEventListener('click', this._handleButtonLike);
        //Hanging a button "bin" on a card
        this._buttonBin = this._cardElement.querySelector('.card__button-delete');
        this._buttonBin.addEventListener('click', this._handleButtonBin);
    }
    // Creating a card
    createCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.card__image');
        this._cardElement.querySelector('.card__text').textContent = this._name;
        this._cardImage.alt = `Виды на ${this._name}`;
        this._cardImage.src = this._link;
        this._setEventListeners();
        return this._cardElement;
    };
}