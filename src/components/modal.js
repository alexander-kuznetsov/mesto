import {createPlace, placesElem} from "./card";
import {profileSubtitle, profileTitle} from "./index";

export const profilePopup = document.querySelector('.popup_type_profile');
export const imagePopup = document.querySelector('.popup_type_image');
export const cardPopup = document.querySelector('.popup_type_card');
export const allPopups = document.querySelectorAll('.popup');
const imagePopupElem = imagePopup.querySelector('.popup__image');
const imagePopupCaptionElem = imagePopup.querySelector('.popup__image-caption');


export function open(popup) {
    popup.classList.add('popup_opened');
}

export function close(popup) {
    popup.classList.remove('popup_opened');
}

export function findOpened(popupArray) {
    return Array.from(popupArray).find(popup => {
        return popup.classList.contains('popup_opened');
    });
}

export function setCardPopupContent(link, name) {
    imagePopupElem.src = link;
    imagePopupElem.alt = name;
    imagePopupCaptionElem.textContent = name;
}

export function closeOnEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = findOpened(allPopups);
        if (openedPopup !== null && openedPopup !== undefined) {
            close(openedPopup);
        }
    }
}

export function closeOnOverlay(popup, evt) {
    if (evt.target.classList.contains('popup')) {
        close(popup);
    }
}

export function submitPopupHandler(evt) {
    evt.preventDefault();
    const popup = evt.currentTarget;
    const inputs = evt.target.querySelectorAll('.popup__input');
    const firstInput = getPopupInput(inputs, 'firstFormInput');
    const secondInput = getPopupInput(inputs, 'secondFormInput');

    if (popup.classList.contains('popup_type_card')) {
        placesElem.prepend(createPlace(firstInput.value, secondInput.value));
    } else {
        profileTitle.textContent = firstInput.value;
        profileSubtitle.textContent = secondInput.value;
    }
}

export function getPopupInput(popupInputs, inputName) {
    return Array.from(popupInputs)
        .find(item => item.name === inputName);
}