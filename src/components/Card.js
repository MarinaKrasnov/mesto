export default class Card {
    constructor(data, cardsTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._template = cardsTemplate;
        this._id = data.id;
        this._owner = data.owner._id;
        this._likes = data.likes;
        this._handleImageClick = data.handleImageClick;
        this._handleButtonBin = data.handleButtonBin;
        this._handleLike = data.handleLike;
        this._handleUnLike = data.handleUnLike;
        this._myId = data.myId;
    }
    _handleButtonLike = () => {
        if (this._buttonLike.classList.contains('card__button-like_active')) {
            this._handleUnLike(this._id)
        } else {
            this._handleLike(this._id)
        }
    }
    updateLikes = (number) => {
        this._numberLikes.textContent = number;
        this._buttonLike.classList.toggle('card__button-like_active');
    }
    _renderLikes() {
        if (this._likes.some((like) => like._id === this._myId)) {
            this._cardElement.querySelector('.card__button-like').classList.add('card__button-like_active')
        }
    }
    deleteCard() {
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
        if (this._myId === this._owner) {
            this._buttonBin.addEventListener('click', () => {
                this._handleButtonBin(this)
            });
        } else {
            this._buttonBin.remove()
        }
    }
    // Creating a card
    createCard = () => {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.card__image');
        this._cardElement.querySelector('.card__text').textContent = this._name;
        this._cardImage.alt = `Виды на ${this._name}`;
        this._cardImage.src = this._link;
        this._numberLikes = this._cardElement.querySelector('.card__number-likes');
        this._numberLikes.textContent = this._likes.length;
        this._renderLikes();
        this._idInput = this._cardElement.querySelector('[name="id"]');
        this._idInput.value = this._id;
        this._setEventListeners();
        return this._cardElement;
    };
}