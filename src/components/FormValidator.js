export class FormValidator {
    constructor(data, form) {
        this._data = data;
        this._form = form;
        this._inputs = [...this._form.querySelectorAll(data.inputSelector)];
        this._button = this._form.querySelector(data.submitButtonSelector);
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
    }
    _addFormListeners() {
        this._form.addEventListener('input', () => this.setSubmitButtonState())
        this._inputs.forEach(input => input.addEventListener('input', () => {
            if (!input.validity.valid) {
                this._showError(input);
            } else {
                this._hideError(input);
            }
        }))
    }
    setSubmitButtonState() {
        const {
            inactiveButtonClass,
        } = this._data;
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
    deleteErrorClass() {
        this._inputs.forEach(input => {
            this._hideError(input)
        });
    }
    _showError(input) {
        input.classList.add(this._inputErrorClass)
        const errorElement = this._form.querySelector(`#${input.id}-error`)
        errorElement.classList.add(this._errorClass)
        errorElement.textContent = input.validationMessage
    }
    _hideError(input) {
        input.classList.remove(this._inputErrorClass)
        const errorElement = this._form.querySelector(`#${input.id}-error`)
        errorElement.classList.remove(this._errorClass)
        errorElement.textContent = '';
    }
    enableValidation() {
        this._addFormListeners();
        this.setSubmitButtonState()
    }
}