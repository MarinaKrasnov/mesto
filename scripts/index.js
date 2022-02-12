/* Variables */
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
const editIcon = document.querySelector('.profile__icon');
const overlayActiveClass = 'overlay_active';
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const popupTitle = document.querySelector('.popup__input_value_name');
const popupSubtitle = document.querySelector('.popup__input_value_profession');
const submitButton = document.querySelector('.popup__submit');
const formProfile = document.querySelector('[name="form-profile"]');
const overlayProfile = document.querySelector('.overlay-profile');
const overlayAdd = document.querySelector('.overlay-add');
const overlayImageWrapper = document.querySelector('.overlay-image');
const overlayActive = document.querySelector('.overlay_active');
const closeBtnProfile = overlayProfile.querySelector('.close-btn');
const buttonCloseImage = overlayImageWrapper.querySelector('.close-btn');
const closeBtnAdd = overlayAdd.querySelector('.close-btn');
const addButton = document.querySelector('.profile__add-button');
const cards = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#card-template').content.querySelector('.card');
const formAddCards = document.querySelector('[name="new-place"]');
const inputPlaceName = document.querySelector('.popup__input_type_place-name');
const inputLink = document.querySelector('.popup__input_type_link');
const overlayImage = document.querySelector('.overlay-image__image');
const overlayImageCapture = overlayImageWrapper.querySelector('.overlay-image__capture');

/*Functions*/
function openPopup(e) {
    e.classList.add(overlayActiveClass);
}

function closePopup(e) {
    e.classList.remove(overlayActiveClass);
}
// Closing popup by clicking outside of the popup
function closeByClickingOutside(event, overlay) {
    const hasOverlayActiveClass = [...event.target.classList].includes(overlayActiveClass);
    if (hasOverlayActiveClass) {
        closePopup(overlay)
    }
};
//Closing popup with a help of button 'Escape'
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const overlayActive = document.querySelector('.overlay_active');
        closePopup(overlayActive);
    }
};

function submitProfileForm(event) {
    event.preventDefault();
    title.textContent = popupTitle.value;
    subtitle.textContent = popupSubtitle.value;
    closePopup(overlayProfile);
}

// Adding new card to the cards
function renderCard(card) {
    cards.prepend(card);
};
// Creating a card
function createCard(name, link) {
    const cardElement = cardsTemplate.cloneNode(true);
    cardElement.querySelector('.card__text').textContent = name;
    cardElement.querySelector('.card__image').alt = `Виды на ${name}`;
    cardElement.querySelector('.card__image').src = link;
    //Creating popup for each card
    const handleImageClick = (e) => {
        openPopup(overlayImageWrapper);
        overlayImage.src = link;
        overlayImage.alt = `Виды на ${name}`;
        overlayImageCapture.textContent = name;
    }
    cardElement.querySelector('.card__image').addEventListener('click', handleImageClick);
    //Hanging a button "Like" on a card
    const buttonLike = cardElement.querySelector('.card__button-like');
    buttonLike.addEventListener('click', () => {
        buttonLike.classList.toggle('card__button-like_active')
    });
    //Hanging a button "bin" on a card
    const buttonBin = cardElement.querySelector('.card__button-delete');
    buttonBin.addEventListener('click', () => {
        cardElement.remove();
    });
    return cardElement;
};
// Adding a card from the list
initialCards.forEach(item => {
    const nameElement = item.name;
    const linkElement = item.link;
    const card = createCard(nameElement, linkElement);
    renderCard(card);
});

// Adding a card from the form
const handlerAddCard = (e) => {
    e.preventDefault();
    const nameCard = inputPlaceName.value;
    const linkCard = inputLink.value;
    const card = createCard(nameCard, linkCard);
    renderCard(card);
    inputPlaceName.value = "";
    inputLink.value = "";
    setSubmitButtonState(formAddCards, formsValidationConfig);
    closePopup(overlayAdd);
};
formProfile.addEventListener('submit', submitProfileForm);
formAddCards.addEventListener('submit', handlerAddCard);
addButton.addEventListener('click', () => {
    openPopup(overlayAdd)
    handleField(formAddCards, inputPlaceName, formsValidationConfig);
    handleField(formAddCards, inputLink, formsValidationConfig);
});
editIcon.addEventListener('click', (e) => {
    popupTitle.value = title.textContent;
    popupSubtitle.value = subtitle.textContent;
    openPopup(overlayProfile);
});
closeBtnProfile.addEventListener('click', () => {
    closePopup(overlayProfile);
});
closeBtnAdd.addEventListener('click', () => closePopup(overlayAdd));
buttonCloseImage.addEventListener('click', () => closePopup(overlayImageWrapper));

overlayProfile.addEventListener('click', (evt) => closeByClickingOutside(evt, overlayProfile));
overlayAdd.addEventListener('click', (e) => closeByClickingOutside(e, overlayAdd));
overlayImageWrapper.addEventListener('click', (ev) => closeByClickingOutside(ev, overlayImageWrapper));
document.addEventListener('keydown', closeByEscape);