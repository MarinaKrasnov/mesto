import {
    FormValidator
} from "./FormValidator.js";
import
Card
from './Card.js';
import {
    initialCards
} from "./initial_cards.js";
import Section from "./Section.js";
import {
    PopupWithForm
} from "./PopupWithForm.js";
import {
    PopupWithImage
} from "./PopupWithImage.js";
import {
    UserInfo
} from "./UserInfo.js";
/* Variables */
export const formsValidationConfig = {
    formSelector: '.overlay__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
export const editIcon = document.querySelector('.profile__icon');
export const overlayActiveClass = 'overlay_active';
export const title = document.querySelector('.profile__title');
export const subtitle = document.querySelector('.profile__subtitle');
export const popupTitle = document.querySelector('.popup__input_value_name');
export const popupSubtitle = document.querySelector('.popup__input_value_profession');
const formProfile = document.querySelector('[name="form-profile"]');
export const overlayImageWrapper = document.querySelector('.overlay-image');
const addButton = document.querySelector('.profile__add-button');
export const cardsTemplate = document.querySelector('#card-template').content.querySelector('.card');
const formAddCards = document.querySelector('[name="new-place"]');
const inputPlaceName = document.querySelector('.popup__input_type_place-name');
const inputLink = document.querySelector('.popup__input_type_link');
export const overlayImage = document.querySelector('.overlay-image__image');
export const overlayImageCapture = overlayImageWrapper.querySelector('.overlay-image__capture');

//Specify validator for each form using class -=FormValidator=-
const formProfileValidation = new FormValidator(formsValidationConfig, formProfile);
const formAddCardsValidation = new FormValidator(formsValidationConfig, formAddCards);
//Specify popup for each form using class -=PopupWithForm=- 
const popupWithFormAdd = new PopupWithForm('.overlay-add', (e) => {
    e.preventDefault();
    const itemForm = {
        name: inputPlaceName.value,
        link: inputLink.value
    };
    const cardElement = section._renderer(itemForm);
    section.addItem(cardElement);
    formAddCardsValidation.setSubmitButtonState();
    popupWithFormAdd.close();
});
const popupWithFormProfile = new PopupWithForm('.overlay-profile', (event) => {
    event.preventDefault();
    userInfo.setUserInfo();
    popupWithFormProfile.close();
});
//Filling profile form with a help of class -=UserInfo=-
const userInfo = new UserInfo(popupWithFormProfile._getInputValues());
//Specify popup using class -=PopupWithImage=-
export const popupWithImage = new PopupWithImage('.overlay-image');
//Adding a card from initial_cards.js using class -=Section=-
export const section = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card({
                name: item.name,
                link: item.link
            }, cardsTemplate);
            const cardElement = card.createCard();
            return cardElement;
        }
    },
    '.cards');
section.renderItems();
// Turning the validation on using -=class FormValidator=-
formProfileValidation.enableValidation();
formAddCardsValidation.enableValidation();
// Listeners for buttons
addButton.addEventListener('click', () => {
    formAddCardsValidation.deleteErrorClass();
    popupWithFormAdd.open();
});
editIcon.addEventListener('click', () => {
    formProfileValidation.setSubmitButtonState();
    formProfileValidation.deleteErrorClass();
    userInfo.getUserInfo();
    popupWithFormProfile.open();
});