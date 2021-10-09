/*-------------------Variables--------------------*/
const page = document.querySelector('.page');
const popups = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_card');

const profilePopupInputs = profilePopup.querySelectorAll('.popup__input');
const inputNameElem = getPopupInput(profilePopupInputs, 'firstFormInput');
const inputJobElem = getPopupInput(profilePopupInputs, 'secondFormInput');

const cardPopupInputs = cardPopup.querySelectorAll('.popup__input');
const inputPlace = getPopupInput(cardPopupInputs, 'firstFormInput');
const inputLink = getPopupInput(cardPopupInputs, 'secondFormInput');

const imagePopup = document.querySelector('.popup_type_image');
const popupImageElem = imagePopup.querySelector('.popup__image');
const popupImageCaptionElem = imagePopup.querySelector('.popup__image-caption');
const editButton = document.querySelector('.button__edit');
const closeButtons = document.querySelectorAll('.button__close');
const addButton = document.querySelector('.button__add');
const cardTemplate = document.querySelector('#place-card').content;
const placesElem = document.querySelector('.places');

/*------------------------------------Functions--------------------------------------------*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function findOpened() {
    return Array.from(popups).find(popup => {
        return popup.classList.contains('popup_opened');
    });
}

function submitProfilePopupHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputNameElem.value;
    profileSubtitle.textContent = inputJobElem.value;

    closePopup(profilePopup);
}

function submitCardPopupHandler(evt) {
    evt.preventDefault();
    if (inputPlace.value !== '' && inputLink.value.startsWith('https://')) {
        addPlace(
            createPlace(inputPlace.value, inputLink.value)
        );
    }
    closePopup(cardPopup);
}

function getPopupInput(popupInputs, inputName) {
    return Array.from(popupInputs)
        .find(item => item.name === inputName);
}

function openProfilePopup() {
    inputNameElem.value = profileTitle.textContent;
    inputJobElem.value = profileSubtitle.textContent;

    openPopup(profilePopup);
}

function openImagePopup(name, link) {
    popupImageElem.src = link;
    popupImageElem.alt = name;
    popupImageCaptionElem.textContent = name;

    openPopup(imagePopup);
}

function createPlace(name, link) {
    const nextCard = cardTemplate.cloneNode(true);

    const placeImage = nextCard.querySelector('.place__image');
    placeImage.src = link;
    placeImage.alt = name;

    nextCard.querySelector('.place__title')
        .textContent = name;
    //Добавляем обработчик лайков
    const likeButton = nextCard.querySelector('.button__like');
    likeButton.addEventListener('click', evt => {
        evt.target.classList.toggle('button__like_active');
    });

    const removeButton = nextCard.querySelector('.button__remove');
    removeButton.addEventListener('click', evt => {
            evt.target.closest('.place').remove();
        }
    );
    const cardFigure = nextCard.querySelector('.place__image-link');
    cardFigure.addEventListener('click', _ => openImagePopup(name, link));
    return nextCard;
}

function addPlace(place) {
    placesElem.prepend(place);
}

/*----------------------------------Event Handling--------------------------------------------*/
profilePopup
    .querySelector('.popup__form')
    .addEventListener(
        'submit',
        submitProfilePopupHandler
    );
cardPopup
    .querySelector('.popup__form')
    .addEventListener(
        'submit',
        submitCardPopupHandler
    );

editButton.addEventListener('click', openProfilePopup);

closeButtons.forEach(button => {
   button.addEventListener('click',evt => {
       closePopup(evt.target.closest('.popup'))
   });
});
addButton.addEventListener('click', _ => {
    openPopup(cardPopup);
});
page.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        const openedPopup = findOpened();
        if (openedPopup !== null && openedPopup !== undefined) {
            closePopup(openedPopup);
        }
    }
})

popups.forEach(popup => {
    popup.addEventListener('click', evt => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    })
});

/*----------------------------------Rendering--------------------------------------------*/
initialCards.forEach(item => {
    addPlace(
        createPlace(item.name, item.link)
    );
});
