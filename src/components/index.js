import '../pages/index.css';

import {changeButtonState, checkInputValidity, enableValidation} from "./validation";
import {
    allPopups, cardPopup,
    close,
    closeOnEscape,
    closeOnOverlay,
    getPopupInput,
    open, profilePopup, submitPopupHandler
} from "./modal";

const page = document.querySelector('.page');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopupInputs = profilePopup.querySelectorAll('.popup__input');
const inputNameElem = getPopupInput(profilePopupInputs, 'firstFormInput');
const inputJobElem = getPopupInput(profilePopupInputs, 'secondFormInput');
const editButton = document.querySelector('.button__edit');
const closeButtons = document.querySelectorAll('.button__close');
const addButton = document.querySelector('.button__add');
const saveButton = document.querySelector('.button__save');

const validationSettings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.button',
    inactiveButtonClass: 'button_state_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

/*----------------------------------Event Handling--------------------------------------------*/
Array.from([profilePopup, cardPopup])
    .forEach(popup => {
        popup.addEventListener(
            'submit', evt => {
                submitPopupHandler(evt);
                close(popup);
            }
        );
    });

editButton.addEventListener('click', _ => {
    inputNameElem.value = profileTitle.textContent;
    inputJobElem.value = profileSubtitle.textContent;
    checkInputValidity(
        profilePopup,
        [inputNameElem, inputJobElem],
        validationSettings.inputErrorClass
    );
    changeButtonState(
        [inputNameElem, inputJobElem],
        saveButton,
        validationSettings.inactiveButtonClass
    );
    open(profilePopup)
});

closeButtons.forEach(button => {
   button.addEventListener('click',evt => {
       close(evt.target.closest('.popup'));
   });
});
addButton.addEventListener('click', _ => {
    open(cardPopup);
});
page.addEventListener('keydown', closeOnEscape)

allPopups.forEach(popup => {
    popup.addEventListener('click', evt => {
        closeOnOverlay(popup, evt);
    })
});

enableValidation(validationSettings);




