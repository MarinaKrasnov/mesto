/* Variables */
const editIcon = document.querySelector('.profile__icon');
const closeBtn = document.querySelector('.popup__close-btn');
const overlay = document.querySelector('.overlay');
const overlayActiveClass = 'overlay_active';
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const popupTitle = document.querySelector('.popup__input_value_name');
const popupSubtitle = document.querySelector('.popup__input_value_profession');
const submitButton = document.querySelector('.popup__submit');
const form = document.querySelector('form');

const overlayAdd = document.querySelector('.overlay-add');
const addButton = document.querySelector('.profile__add-button');

/*Functions*/
function openPopup(e) {
    e.classList.add(overlayActiveClass);
}

function closePopup(e) {
    e.classList.remove(overlayActiveClass);
};

function submit(event) {
    event.preventDefault();
    title.textContent = popupTitle.value;
    subtitle.textContent = popupSubtitle.value;
    closePopup(overlay);
}

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]

const cards = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#card-template').content.querySelector('.card');
const formAddCards = document.querySelector('[name="new-place"]');
const inputPlaceName = document.querySelector('.popup__input_type_place-name');
const inputLink = document.querySelector('.popup__input_type_link');
const card = document.querySelector('.card');
const overlayImageWrapper = document.querySelector('.overlay-image');
const overlayImage = document.querySelector('.overlay-image__image');
const closeBtnAdd = overlayAdd.querySelector('.popup__close-btn');
const renderCard = (item) => {

};

const handlerAddCard = (e) => {
    e.preventDefault();
    const cardElement = cardsTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').src = inputLink.value;
    cardElement.querySelector('.card__text').textContent = inputPlaceName.value;

    const handleImageClick = (e) => {
        openPopup(overlayImageWrapper);
        const img = e.target.src;
        overlayImageWrapper.querySelector('.overlay-image__image').src = img;
        const overlayImageCapture = overlayImageWrapper.querySelector('.overlay-image__capture');
        overlayImageCapture.textContent = cardElement.querySelector('.card__text').textContent;
        const buttonCloseImage = overlayImageWrapper.querySelector('.overlay-image__close-btn');
        buttonCloseImage.addEventListener('click', () => closePopup(overlayImageWrapper));
    }
    cardElement.querySelector('.card__image').addEventListener('click', handleImageClick);

    const buttonLike = cardElement.querySelector('.card__button-like');
    buttonLike.addEventListener('click', () => {
        buttonLike.classList.toggle('card__button-like_active')
    });
    const buttonBin = cardElement.querySelector('.card__button-delete');
    buttonBin.addEventListener('click', () => {
        cardElement.remove();
    });
    //Button to close popup
    const buttonCloseImage = overlayImageWrapper.querySelector('.popup__close-btn');
    buttonCloseImage.addEventListener('click', closePopup(overlayImageWrapper));

    cards.prepend(cardElement);
    closePopup(overlayAdd);
};
// Adding a card from the list
initialCards.forEach(item => {
    const cardElement = cardsTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__text').textContent = item.name;
    //Creating popup for each card
    const handleImageClick = (e) => {
        openPopup(overlayImageWrapper);
        const img = e.target.src;
        overlayImageWrapper.querySelector('.overlay-image__image').src = img;
        const overlayImageCapture = overlayImageWrapper.querySelector('.overlay-image__capture');
        overlayImageCapture.textContent = cardElement.querySelector('.card__text').textContent;
        //Button to close popup
        const buttonCloseImage = overlayImageWrapper.querySelector('.overlay-image__close-btn');
        buttonCloseImage.addEventListener('click', () => closePopup(overlayImageWrapper));
    }
    cardElement.querySelector('.card__image').addEventListener('click', handleImageClick);
    //Hanging button "Like" on a card
    const buttonLike = cardElement.querySelector('.card__button-like');
    buttonLike.addEventListener('click', () => {
        buttonLike.classList.toggle('card__button-like_active')
    });
    //Hanging a button "bin" on a card
    const buttonBin = cardElement.querySelector('.card__button-delete');
    buttonBin.addEventListener('click', () => {
        cardElement.remove();
    });
    //Adding a card to cards
    cards.prepend(cardElement);
});
form.addEventListener('submit', submit);
formAddCards.addEventListener('submit', handlerAddCard);
editIcon.addEventListener('click', (e) => {
    popupTitle.value = title.textContent;
    popupSubtitle.value = subtitle.textContent;
    openPopup(overlay);
});
closeBtn.addEventListener('click', () => closePopup(overlay));
closeBtnAdd.addEventListener('click', () => closePopup(overlayAdd));

addButton.addEventListener('click', () => openPopup(overlayAdd));

//Closing Popup with a help of escape button
const closeAll = () => {
    closePopup(overlay);
    closePopup(overlayAdd);
    closePopup(overlayImageWrapper);
};

document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
        closeAll();
    }
});