import './index.css';
import {
    FormValidator
} from "./../components/FormValidator.js";
import
Card
from './../components/Card.js';
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
import {
    formsValidationConfig,
    popupImageConfig,
    popupInputsConfig,
    editIcon,
    addButton,
    avatar,
    cardsTemplate,
    formAddCards,
    formProfile,
    formChangeAvatar
} from '../utils/constans.js';
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
            myId: myId,
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
    return card.createCard()
};
//Filling profile form with a help of class -=UserInfo=-
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar', myId);
// Sending requests to a server with a help of class -=API=-
//Adding a card from server using class -=Section=-
const api = new API("https://mesto.nomoreparties.co/v1/cohort-38", {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=utf-8",
    'authorization': 'c5a7c514-ca8f-4b82-95f7-7b25ec57dd45'
});
let myId;
Promise.all([api.getProfileInfo(), api.getCards()])
    .then(([userData, cards]) => {
        myId = userData._id;
        userInfo.setUserInfo(userData);
        section = new Section({
            items: cards,
            renderer: (element) => {
                section.addItem(getCard(element));
            }
        }, '.cards');
        section.renderItems()
    })
    .catch(err => {
        console.err(`Request for data from server is failed.${err}`)
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
        }).catch((err) => alert(`Server can't save your profile data now. Try again later.${err.status}`))
        .finally(() => {
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
        }).catch((err) => alert(`Server can't change your profile image now. Try again later.${err.status}`))
        .finally(() => {
            popupWithFormAvatar.close();
            popupWithFormProfile.stopWait('Сохранить')
        })
});
//Specify popup using class -=PopupWithImage=-
const popupWithImage = new PopupWithImage('.overlay-image', popupImageConfig);
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
    popupInputsConfig.popupTitle.value = userData.user;
    popupInputsConfig.popupSubtitle.value = userData.profession;
    popupWithFormProfile.open();
});
avatar.addEventListener('click', () => {
    formChangeAvatarValidation.setSubmitButtonState();
    popupWithFormAvatar.open()
});