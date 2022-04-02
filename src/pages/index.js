import './index.css';
import {
    FormValidator
} from "./../components/FormValidator.js";
import
Card
from './../components/Card.js';
/* import {
    initialCards
} from "../utils/initial_cards.js"; */
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
import {
    API
} from "./../components/API.js";
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
const formChangeAvatar = document.querySelector('[name="avatar-form"]');
export const overlayImage = document.querySelector('.overlay-image__image');
export const overlayImageCapture = overlayImageWrapper.querySelector('.overlay-image__capture');
const overlayAUSure = document.querySelector('.overlay-ausure');
const avatar = document.querySelector('.profile__avatar');
let section;
let card;
// Funcions
function getCard(itemElement) {
    const card = new Card({
        name: itemElement.name,
        link: itemElement.link,
        id: itemElement._id,
        owner: itemElement.owner,
        likes: itemElement.likes,
        handleImageClick: () => {
            popupWithImage.open(itemElement)
        },
        handleDeleteClick: () => {
            popupWithFormAUSure.open()
        },

    }, cardsTemplate);
    return card.createCard()
}
//Adding a card from server using class -=Section=-
export const api = new API("http://localhost:3000", {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=utf-8"
});
export const apiOut = new API("https://mesto.nomoreparties.co/v1/cohort-38", {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=utf-8",
    'authorization': 'c5a7c514-ca8f-4b82-95f7-7b25ec57dd45'
});
apiOut.getCards().then((cards) => {
    section = new Section({
        items: cards,
        renderer: (element) => {
            section.addItem(getCard(element));
        }
    }, '.cards');
    section.renderItems()
});
//Filling profile form with a help of class -=UserInfo=-
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');
export let myId;
apiOut.getProfileInfo().then((res) => {
    myId = res._id;
    userInfo.setUserInfo(res);
});
//Specify validator for each form using class -=FormValidator=-
const formProfileValidation = new FormValidator(formsValidationConfig, formProfile);
const formAddCardsValidation = new FormValidator(formsValidationConfig, formAddCards);
const formChangeAvatarValidation = new FormValidator(formsValidationConfig, formChangeAvatar);
//Specify popup for each form using class -=PopupWithForm=- 
const popupWithFormAdd = new PopupWithForm('.overlay-add', (cardData) => {
    apiOut.postCard(cardData).then(card => {
        section.addItem(getCard(card))
        formAddCardsValidation.setSubmitButtonState();
        popupWithFormAdd.close();
    }).catch((err) => alert(`Server can't save your card now. Try again later.${err.status}`))
});
const popupWithFormProfile = new PopupWithForm('.overlay-profile', (userData) => {
    apiOut.editProfileInfo(userData).then((res) => {
        userInfo.setUserInfo(res);
        popupWithFormProfile.close();
    })
});
//Specify popup for each form using class -=PopupWithForm=- 
const popupWithFormAUSure = new PopupWithForm('.overlay-ausure', () => {
    card.handleButtonBin();
    popupWithFormAUSure.close();
});
const popupWithFormAvatar = new PopupWithForm('.overlay-avatar', (linkAvatar) => {
    apiOut.changeAvatar(linkAvatar.avatar).then((res) => {
        userInfo.setUserInfo(res);
        popupWithFormAvatar.close();
    })
})
//Specify popup using class -=PopupWithImage=-
export const popupWithImage = new PopupWithImage('.overlay-image');
// Turning the validation on using -=class FormValidator=-
formProfileValidation.enableValidation();
formAddCardsValidation.enableValidation();
formChangeAvatarValidation.enableValidation();
// Listeners for buttons
popupWithFormAdd.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormAUSure.setEventListeners();
popupWithFormAvatar.setEventListeners();
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
avatar.addEventListener('click', () => {
    popupWithFormAvatar.open()
});