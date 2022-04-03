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
import {
    PopupAUSure
} from '../components/PopupAUSure.js';
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
// Funcions
function deleteCard(card) {
    api.deleteCard(card._id).then(() => {
        card.deleteCard();
        popupAUSure.close();
    }).catch((err) => alert(`Server can't delete this card.Try again later. Object ${err.status}`))

};

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
            handleButtonBin: (card) => {
                popupAUSure.open();
                popupAUSure.setCard(card)
            },
            handleLike: (id) => {
                api.putLike(id)
                    .then((res) => {
                        card.updateLikes(res.likes.length)
                    })
                    .catch((err) => {
                        alert(`Error.${err} We didnt succeed to like this :)`)
                    });
            },
            handleUnLike: (id) => {
                api.deleteLike(id).then((res) => card.updateLikes(res.likes.length))
                    .catch((err) => {
                        alert(`Error.${err} We didnt succeed to like this :)`)
                    })
            },
        },
        cardsTemplate);
    const cardElement = card.createCard();
    return cardElement;
};
//Adding a card from server using class -=Section=- and class -=API=-
export const api = new API("https://mesto.nomoreparties.co/v1/cohort-38", {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=utf-8",
    'authorization': 'c5a7c514-ca8f-4b82-95f7-7b25ec57dd45'
});
api.getCards().then((cards) => {
    section = new Section({
        items: cards,
        renderer: (element) => {
            section.addItem(getCard(element));
        }
    }, '.cards');
    section.renderItems()
});
export let myId;
//Filling profile form with a help of class -=UserInfo=-
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar', myId);
api.getProfileInfo().then((res) => {
    myId = res._id;
    userInfo.setUserInfo(res);
});
//Specify validator for each form using class -=FormValidator=-
const formProfileValidation = new FormValidator(formsValidationConfig, formProfile);
const formAddCardsValidation = new FormValidator(formsValidationConfig, formAddCards);
const formChangeAvatarValidation = new FormValidator(formsValidationConfig, formChangeAvatar);
//Specify popup for each form using class -=PopupWithForm=- 
const popupWithFormAdd = new PopupWithForm('.overlay-add', (cardData) => {
    popupWithFormAdd.pleaseWait();
    api.postCard(cardData).then(card => {
            section.addItem(getCard(card));
            formAddCardsValidation.setSubmitButtonState();
        }).catch((err) => alert(`Server can't save your card now. Try again later.${err.status}`))
        .finally(() => {
            popupWithFormAdd.close();
            popupWithFormAdd.stopWait('Создать')
        })
});
const popupWithFormProfile = new PopupWithForm('.overlay-profile', (userData) => {
    popupWithFormProfile.pleaseWait();
    api.editProfileInfo(userData).then((res) => {
        userInfo.setUserInfo(res);
    }).finally(() => {
        popupWithFormProfile.close();
        popupWithFormProfile.stopWait('Сохранить')
    })
});
//Specify popup using class -=PopupAUSure=-
const popupAUSure = new PopupAUSure('.overlay-ausure', (card) => {
    deleteCard(card)
});
const popupWithFormAvatar = new PopupWithForm('.overlay-avatar', (linkAvatar) => {
    popupAUSure.pleaseWait();
    api.changeAvatar(linkAvatar.avatar).then((res) => {
        userInfo.setUserInfo(res);
    }).finally(() => {
        popupWithFormAvatar.close();
        popupWithFormProfile.stopWait('Сохранить')
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
popupAUSure.setEventListeners();
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