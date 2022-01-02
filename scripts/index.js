/* Popup opens and closes */
const EditIcon = document.querySelector('.profile__icon');
const CloseBtn = document.querySelector('.popup__close-btn');
const Overlay = document.querySelector('.overlay');
const OverlayActiveClass = 'overlay_active';
EditIcon.addEventListener('click', function (event) {
    event.preventDefault();
    openPopup();
});

function openPopup() {
    Overlay.classList.add(OverlayActiveClass);
}

function closePopup() {
    Overlay.classList.remove(OverlayActiveClass);
};

CloseBtn.addEventListener('click', function () {
    closePopup();
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape') {
        closePopup();
    }
});

/*Button "Like" changes after click*/
let ElementInfo = document.querySelectorAll('.element__info');

for (var i = 0; i < ElementInfo.length; i++) {
    let ButtonLike = ElementInfo[i].querySelector('.element__button-like');
    ButtonLike.addEventListener('click', function () {
        ButtonLike.classList.toggle('element__button-like_active');
    });
};

/*Button "Submit"*/
const SubmitButton = document.querySelector('.popup__submit');
const Title = document.querySelector('.profile__title');
const Subtitle = document.querySelector('.profile__subtitle');
const Popuptitle = document.querySelector('.popup__title');
const Popupsubtitle = document.querySelector('.popup__subtitle');

function Submit(event) {
    event.preventDefault();
    Title.textContent = Popuptitle.value;
    Subtitle.textContent = Popupsubtitle.value;
    closePopup();
}
SubmitButton.addEventListener('click', function (event) {
    Submit(event);
})

document.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        Submit(event);
    }
});