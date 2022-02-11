const formsValidationConfig = {
    formSelector: '.overlay__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function enableValidation(data) {
    const forms = [...document.querySelectorAll(data.formSelector)];
    forms.forEach(form => addFormListeners(form, data))
}

function addFormListeners(form, config) {
    form.addEventListener('submit', handleSubmit)
    form.addEventListener('input', () => setSubmitButtonState(form, config))
    const inputs = [...form.querySelectorAll(config.inputSelector)]
    inputs.forEach(input => input.addEventListener('input', () => handleField(form, input, config)))
    setSubmitButtonState(form, config)
}

function handleSubmit(event) {
    event.preventDefault();
}

function handleField(form, input, config) {
    console.log(input.validity.valid)
    if (!input.validity.valid) {
        showError(form, input, config)
    } else {
        hideError(form, input, config)
    }
}

function showError(form, input, config) {
    input.classList.add(config.inputErrorClass)
    const errorElement = form.querySelector(`#${input.id}-error`)
    errorElement.classList.add(config.errorClass)
    errorElement.textContent = input.validationMessage
}

function hideError(form, input, config) {
    input.classList.remove(config.inputErrorClass)
    const errorElement = form.querySelector(`#${input.id}-error`)
    errorElement.classList.remove(config.errorClass)
    errorElement.textContent = '';
}


function setSubmitButtonState(form, config) {

    const button = form.querySelector(config.submitButtonSelector)
    button.disabled = !form.checkValidity()
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity())
}

enableValidation(formsValidationConfig);