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
    editIcon,
    addButton,
    avatar,
    cardsTemplate,
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
let myId;
//Filling profile form with a help of class -=UserInfo=-
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar', myId);
// Sending requests to a server with a help of class -=API=-
//Adding a card from server using class -=Section=-
const api = new API("https://mesto.nomoreparties.co/v1/cohort-38", {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=utf-8",
    'authorization': 'c5a7c514-ca8f-4b82-95f7-7b25ec57dd45'
});
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
        console.log(`Request for data from server is failed.${err}`)
    });
//Specify popup for each form using class -=PopupWithForm=- 
const popupWithFormAdd = new PopupWithForm('.overlay-add', (cardData) => {
    popupWithFormAdd.renderLoading(true);
    api.postCard(cardData).then(card => {
            section.addItem(getCard(card));
        })
        .then(() => {
            popupWithFormAdd.close();
        })
        .catch((err) => alert(`Server can't save your card now. Try again later.${err.status}`))
        .finally(() => {
            popupWithFormAdd.renderLoading(false, 'Создать')
        })
});
const popupWithFormProfile = new PopupWithForm('.overlay-profile', (userData) => {
    popupWithFormProfile.renderLoading(true);
    api.editProfileInfo(userData).then((res) => {
            userInfo.setUserInfo(res);
        }).then(() => {
            popupWithFormProfile.close()
        }).catch((err) =>
            alert(`Server can't save your profile data now. Try again later.${err.status}`))
        .finally(() => {
            popupWithFormProfile.renderLoading(false, 'Сохранить')
        })
});
//Specify popup using class -=PopupAUSure=-
const popupAUSure = new PopupAUSure('.overlay-ausure', (card) => {
    deleteCard(card)
});
const popupWithFormAvatar = new PopupWithForm('.overlay-avatar', (linkAvatar) => {
    popupWithFormAvatar.renderLoading(true);
    api.changeAvatar(linkAvatar.avatar).then((res) => {
            userInfo.setUserInfo(res);
        }).catch((err) => alert(`Server can't change your profile image now. Try again later.${err.status}`))
        .then(() => {
            popupWithFormAvatar.close();
        })
        .finally(() => {
            popupWithFormAvatar.renderLoading(false, 'Сохранить')
        })
});
//Specify popup using class -=PopupWithImage=-
const popupWithImage = new PopupWithImage('.overlay-image', popupImageConfig);
// Turning the validation on using -=class FormValidator=-
const formValidators = {}
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};
enableValidation(formsValidationConfig);
// Listeners for buttons
popupWithFormAdd.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();
popupAUSure.setEventListeners();
popupWithFormAvatar.setEventListeners();
addButton.addEventListener('click', () => {
    formValidators['new-place'].setSubmitButtonState();
    formValidators['new-place'].deleteErrorClass();
    popupWithFormAdd.open();
});
editIcon.addEventListener('click', () => {
    formValidators['form-profile'].setSubmitButtonState();
    formValidators['form-profile'].deleteErrorClass();
    popupWithFormProfile.setInputValues(userInfo.getUserInfo());
    popupWithFormProfile.open();
});
avatar.addEventListener('click', () => {
    formValidators['avatar-form'].setSubmitButtonState();
    formValidators['avatar-form'].deleteErrorClass();
    popupWithFormAvatar.open()
});