import './index.css';
import {
    FormValidator
} from "./../components/FormValidator.js";
import
Card
from './../components/Card.js';
import {
    initialCards
} from "../utils/initial_cards.js";
import Section from "./../components/Section.js";
import {
    PopupWithForm
} from "./../components/PopupWithForm.js";
import {
    PopupWithImage
} from "./../components/PopupWithImage.js";
import {
    UserInfo
} from "./../components/UserInfo.js";
/* Variables */
export const formsValidationConfig = {
    formSelector: '.overlay__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
const editIcon = document.querySelector('.profile__icon');
export const overlayActiveClass = 'overlay_active';
const popupTitle = document.querySelector('.popup__input_value_name');
const popupSubtitle = document.querySelector('.popup__input_value_profession');
const formProfile = document.querySelector('[name="form-profile"]');
export const overlayImageWrapper = document.querySelector('.overlay-image');
const addButton = document.querySelector('.profile__add-button');
const cardsTemplate = document.querySelector('#card-template').content.querySelector('.card');
const formAddCards = document.querySelector('[name="new-place"]');
export const overlayImage = document.querySelector('.overlay-image__image');
export const overlayImageCapture = overlayImageWrapper.querySelector('.overlay-image__capture');
const overlayProfile = document.querySelector('.overlay-profile');
const overlayAdd = document.querySelector('.overlay-add');
const closeBtnProfile = overlayProfile.querySelector('.close-btn');
const buttonCloseImage = overlayImageWrapper.querySelector('.close-btn');
const closeBtnAdd = overlayAdd.querySelector('.close-btn');
// Funcions
function getCard(itemElement) {
    const card = new Card({
        name: itemElement.name,
        link: itemElement.link,
        handleImageClick: () => {
            popupWithImage.open(itemElement)
        }
    }, cardsTemplate);
    return card.createCard()
}
//Specify validator for each form using class -=FormValidator=-
const formProfileValidation = new FormValidator(formsValidationConfig, formProfile);
const formAddCardsValidation = new FormValidator(formsValidationConfig, formAddCards);
//Filling profile form with a help of class -=UserInfo=-
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');
//Specify popup for each form using class -=PopupWithForm=- 
const popupWithFormAdd = new PopupWithForm('.overlay-add', (cardData) => {
    section.addItem(getCard(cardData));
    formAddCardsValidation.setSubmitButtonState();
    popupWithFormAdd.close();
});
const popupWithFormProfile = new PopupWithForm('.overlay-profile', (userData) => {
    userInfo.setUserInfo(userData);
    popupWithFormProfile.close();
});
//Specify popup using class -=PopupWithImage=-
export const popupWithImage = new PopupWithImage('.overlay-image');
//Adding a card from initial_cards.js using class -=Section=-
export const section = new Section({
        items: initialCards,
        renderer: (element) => {
            return getCard(element);
        }
    },
    '.cards');
section.renderItems();
// Turning the validation on using -=class FormValidator=-
formProfileValidation.enableValidation();
formAddCardsValidation.enableValidation();
// Listeners for buttons
popupWithFormAdd.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();
addButton.addEventListener('click', () => {
    formAddCardsValidation.deleteErrorClass();
    formAddCardsValidation.setSubmitButtonState();
    popupWithFormAdd.open();
});
editIcon.addEventListener('click', () => {
    formProfileValidation.setSubmitButtonState();
    formProfileValidation.deleteErrorClass();
    const userData = userInfo.getUserInfo();
    popupTitle.value = userData.user;
    popupSubtitle.value = userData.profession;
    popupWithFormProfile.open();
});