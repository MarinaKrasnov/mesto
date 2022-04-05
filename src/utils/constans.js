export const formsValidationConfig = {
    formSelector: '.overlay__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
export const popupImageConfig = {
    overlayImageCapture: '.overlay-image__capture',
    overlayImage: '.overlay-image__image'
}
//Buttons
export const editIcon = document.querySelector('.profile__icon');
export const addButton = document.querySelector('.profile__add-button');
export const avatar = document.querySelector('.profile__avatar');
//Card Template
export const cardsTemplate = document.querySelector('#card-template').content.querySelector('.card');