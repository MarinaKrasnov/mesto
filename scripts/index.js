import {
    FormValidator
} from "./FormValidator.js";
import {
    Card
} from './Card.js';
/* Variables */
export const formsValidationConfig = {
    formSelector: '.overlay__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
import {
    initialCards
} from "./initial_cards.js";
const editIcon = document.querySelector('.profile__icon');
const overlayActiveClass = 'overlay_active';
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const popupTitle = document.querySelector('.popup__input_value_name');
const popupSubtitle = document.querySelector('.popup__input_value_profession');
const formProfile = document.querySelector('[name="form-profile"]');
const overlayProfile = document.querySelector('.overlay-profile');
const overlayAdd = document.querySelector('.overlay-add');
export const overlayImageWrapper = document.querySelector('.overlay-image');
const closeBtnProfile = overlayProfile.querySelector('.close-btn');
const buttonCloseImage = overlayImageWrapper.querySelector('.close-btn');
const closeBtnAdd = overlayAdd.querySelector('.close-btn');
const addButton = document.querySelector('.profile__add-button');
const cards = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#card-template').content.querySelector('.card');
const formAddCards = document.querySelector('[name="new-place"]');
const inputPlaceName = document.querySelector('.popup__input_type_place-name');
const inputLink = document.querySelector('.popup__input_type_link');
export const overlayImage = document.querySelector('.overlay-image__image');
export const overlayImageCapture = overlayImageWrapper.querySelector('.overlay-image__capture');
const formProfileValidation = new FormValidator(formsValidationConfig, formProfile);
const formAddCardsValidation = new FormValidator(formsValidationConfig, formAddCards);
const inputs = [...document.querySelectorAll('.popup__input')];

/*Functions*/
export function openPopup(e) {
    e.classList.add(overlayActiveClass);
    document.addEventListener('keydown', closeByEscape);
    if (e === overlayProfile) {
        formProfileValidation.setSubmitButtonState();
        formProfileValidation.deleteErrorClass();
    }
    if (e === overlayAdd) {
        formAddCardsValidation.deleteErrorClass();
    }
}

function closePopup(e) {
    e.classList.remove(overlayActiveClass);
    document.removeEventListener('keydown', closeByEscape);

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
function addCard(card) {
    cards.prepend(card);
}
//Rendering a card using -=class Card=-
function renderCard(data, cardsTemplate) {
    const card = new Card({
        name: data.name,
        link: data.link
    }, cardsTemplate);
    const cardElement = card.createCard();
    return cardElement;
};
// Adding a card from the list
initialCards.forEach(item => {
    const nameElement = item.name;
    const linkElement = item.link;
    addCard(renderCard({
        name: nameElement,
        link: linkElement
    }, cardsTemplate));
});
// Adding a card from the form
const handleAddCard = (e) => {
    e.preventDefault();
    const nameCard = inputPlaceName.value;
    const linkCard = inputLink.value;
    addCard(renderCard({
        name: nameCard,
        link: linkCard
    }, cardsTemplate));
    inputPlaceName.value = "";
    inputLink.value = "";
    formAddCardsValidation.setSubmitButtonState();
    closePopup(overlayAdd);
};
formProfileValidation.enableValidation();
formAddCardsValidation.enableValidation();

formProfile.addEventListener('submit', submitProfileForm);
formAddCards.addEventListener('submit', handleAddCard);
addButton.addEventListener('click', () => {
    openPopup(overlayAdd)
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