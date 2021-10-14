import { imagePopup, open, setCardPopupContent } from "./modal";
import {initialCards} from "./initial-сards";

const cardTemplate = document.querySelector('#place-card').content;
export const placesElem = document.querySelector('.places');

export function createPlace(name, link) {
    const nextCard = cardTemplate.cloneNode(true);
    setCardContent(nextCard, link, name);
    //Добавляем обработчик лайков
    nextCard.querySelector('.button__like')
        .addEventListener('click', evt => {
            evt.target.classList.toggle('button__like_active');
        });
    //Добавляем обработчик для кнопки удаления карточки
    nextCard.querySelector('.button__remove')
        .addEventListener('click', evt => {
            evt.target.closest('.place').remove();
        }
    );
    const cardImage = nextCard.querySelector('.place__image-link');

    cardImage.addEventListener('click', _ => {
            setCardPopupContent(link, name)
            open(imagePopup)
        }
    );
    return nextCard;
}

function setCardContent(nextCard, link, name) {
    const placeImage = nextCard.querySelector('.place__image');
    placeImage.src = link;
    placeImage.alt = name;
    nextCard.querySelector('.place__title').textContent = name;
}

/*----------------------------------Rendering--------------------------------------------*/
initialCards.forEach(item => {
    placesElem.prepend(
        createPlace(item.name, item.link)
    );
});