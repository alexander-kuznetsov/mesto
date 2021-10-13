const forms = Array.from(document.forms);

export function checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.valid) {
        hideError(formElement, inputElement);
    } else {
        showError(formElement, inputElement);
    }
}

function showError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_invalid');
    errorElement.textContent = inputElement.validationMessage;
}

function hideError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_invalid');
    errorElement.textContent = "";
}

export function changeButtonState(formInputs, buttonElement) {
    const isFormInvalid = formInputs.some(input => {
        return !input.validity.valid
    });
    if (isFormInvalid) {
        buttonElement.disabled = true;
        buttonElement.classList.add('button_state_inactive');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('button_state_inactive');
    }
}
function enableValidation() {
    forms.forEach(form => {
        const popupInputs = Array.from(form.querySelectorAll('.popup__input'));
        const button = form.querySelector('.button');
        changeButtonState(popupInputs, button);

        popupInputs.forEach(input => {
            input.addEventListener('input', _ => {
                checkInputValidity(form, input);
                changeButtonState(popupInputs, button);
            });
        });
    });
}
enableValidation();


