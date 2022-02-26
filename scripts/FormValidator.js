export class FormValidator {
    constructor(data, form) {
        this._data = data;
        this._form = form;
        this._inputs = [...this._form.querySelectorAll(data.inputSelector)];
    }
    _addFormListeners() {
        this._form.addEventListener('submit', this._handleSubmit)
        this._form.addEventListener('input', () => this.setSubmitButtonState())
        this._inputs.forEach(input => input.addEventListener('input', () => {
            const {
                inputErrorClass,
                errorClass
            } = this._data;
            if (!input.validity.valid) {
                input.classList.add(inputErrorClass)
                const errorElement = this._form.querySelector(`#${input.id}-error`)
                errorElement.classList.add(errorClass)
                errorElement.textContent = input.validationMessage
            } else {
                input.classList.remove(inputErrorClass)
                const errorElement = this._form.querySelector(`#${input.id}-error`)
                errorElement.classList.remove(errorClass)
                errorElement.textContent = '';
            }
        }))

        this.setSubmitButtonState()
    }
    _handleSubmit(event) {
        event.preventDefault();
    }
    setSubmitButtonState() {
        const {
            inactiveButtonClass,
            submitButtonSelector
        } = this._data;
        this._button = this._form.querySelector(submitButtonSelector)
        this._button.disabled = !this._form.checkValidity()
        this._button.classList.toggle(inactiveButtonClass, !this._form.checkValidity())
    }
    _handleField(input) {
        if (!input.validity.valid) {
            this._showError(input)
        } else {
            this._hideError(input)
        }
    }
    _showError(input) {
        const {
            inputErrorClass,
            errorClass
        } = this._data;
        input.classList.add(inputErrorClass)
        const errorElement = this._form.querySelector(`#${input.id}-error`)
        errorElement.classList.add(errorClass)
        errorElement.textContent = input.validationMessage
    }
    _hideError(input) {
        const {
            inputErrorClass,
            errorClass
        } = this._data;
        input.classList.remove(inputErrorClass)
        const errorElement = this._form.querySelector(`#${input.id}-error`)
        errorElement.classList.remove(errorClass)
        errorElement.textContent = '';
    }
    enableValidation() {
        this._form.addEventListener('submit', this._handleSubmit);
        this._addFormListeners();
    }
}