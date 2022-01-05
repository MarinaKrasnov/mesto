/* Variables */
const editIcon = document.querySelector('.profile__icon');
const closeBtn = document.querySelector('.popup__close-btn');
const overlay = document.querySelector('.overlay');
const overlayActiveClass = 'overlay_active';
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const popupTitle = document.querySelector('.popup__input_value_name');
const popupSubtitle = document.querySelector('.popup__input_value_profession');
const submitButton = document.querySelector('.popup__submit');
const form = document.querySelector('.popup');

/*Functions*/
function openPopup() {
    overlay.classList.add(overlayActiveClass);
    popupTitle.value = title.textContent;
    popupSubtitle.value = subtitle.textContent;
}

function closePopup() {
    overlay.classList.remove(overlayActiveClass);
};

function submit() {
    title.textContent = popupTitle.value;
    subtitle.textContent = popupSubtitle.value;
    closePopup();
}

/* Event Handlers */
editIcon.addEventListener('click', openPopup);

closeBtn.addEventListener('click', closePopup);
document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
        closePopup();
    }
    if (e.code === 'Enter') {
        submit();
    }
});

submitButton.addEventListener('click', submit);
form.addEventListener('submit', submit);
/*Button "Like" changes after click
let CardInfo = document.querySelectorAll('.card__info');
for (var i = 0; i < CardInfo.length; i++) {
    let ButtonLike = CardInfo[i].querySelector('.card__button-like');
    ButtonLike.addEventListener('click', function () {
        ButtonLike.classList.toggle('card__button-like_active');
    });
};
*/