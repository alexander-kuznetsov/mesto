const forms = Array.from(document.forms);

export function checkInputValidity(formElement, inputElements, inputErrorClass) {
    inputElements.forEach(inputElement => {
        if (inputElement.validity.valid) {
            hideError(formElement, inputElement, inputErrorClass);
        } else {
            showError(formElement, inputElement, inputErrorClass);
        }
    })
}

function showError(formElement, inputElement, inputErrorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideError(formElement, inputElement, inputErrorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
}

export function changeButtonState(formInputs, buttonElement, inactiveButtonClass) {
    const isFormInvalid = formInputs.some(input => {
        return !input.validity.valid
    });
    if (isFormInvalid) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
}
export function enableValidation(settings) {
    forms.forEach(form => {
        const popupInputs = Array.from(form.querySelectorAll(settings.inputSelector));
        const button = form.querySelector(settings.submitButtonSelector);
        changeButtonState(popupInputs, button, settings.inactiveButtonClass);

        popupInputs.forEach(input => {
            input.addEventListener('input', _ => {
                checkInputValidity(form, [input], settings.inputErrorClass);
                changeButtonState(popupInputs, button, settings.inactiveButtonClass);
            });
        });
    });
}


