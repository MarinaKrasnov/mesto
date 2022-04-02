import {
    myId,
} from "./../pages/index.js";
export default class Card {
    constructor(data, cardsTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._template = cardsTemplate;
        this._id = data.id;
        this._owner = data.owner._id;
        this._likes = data.likes;
        this._handleImageClick = data.handleImageClick;
        this._handleDeleteClick = data.handleDeleteClick;
        this._handleButtonBin = data.handleButtonBin;
        this._liked = false;
    }
    _handleButtonLike = () => {
        console.log(this._numberLikes);
        /*         this._liked = (this.likes.contains(myId) ? () => {
                        this._buttonLike.classList.add('card__button-like_active')
                    } : () => {
                        this._buttonLike.classList.remove('card__button-like_active')
                    };  */
        console.log(this._liked);
        return this._liked;
    }
    /* 
    if (this._liked) {
        this._liked = true;
        this._buttonLike.classList.add('card__button-like_active')
        apiOut.putLike(this._id).then((res) => {
            this._numberLikes.textContent = this._likes.length;
            console.log(res);
                })
            } */
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
        if (myId === this._owner) {
            this._buttonBin.addEventListener('click', this._handleDeleteClick);
        } else {
            this._buttonBin.remove()
        }
    }
    // Creating a card
    createCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.card__image');
        this._cardElement.querySelector('.card__text').textContent = this._name;
        this._cardImage.alt = `Виды на ${this._name}`;
        this._cardImage.src = this._link;
        this._numberLikes = this._cardElement.querySelector('.card__number-likes');
        this._numberLikes.textContent = this._likes.length;
        this._idInput = this._cardElement.querySelector('[name="id"]');
        this._idInput.value = this._id;
        this._setEventListeners();
        return this._cardElement;
    };
}