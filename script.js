/*-------------------Variables--------------------*/
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_card');
const profilePopupInputs = profilePopup.querySelectorAll('.popup__input');
const cardPopupInputs = cardPopup.querySelectorAll('.popup__input');
const popupImageBlock = document.querySelector('.popup_image');
const popupImageElem = popupImageBlock.querySelector('.popup__image');
const popupImageCaptionElem = popupImageBlock.querySelector('.popup__image-caption');
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

function profilePopupSubmitHandler(evt) {
    evt.preventDefault();
    console.log(evt);
    const firstInputValue = getPopupInputValue(profilePopupInputs, 'firstFormInput');
    const secondInputValue = getPopupInputValue(profilePopupInputs, 'secondFormInput');

    if (firstInputValue !== '') {
        profileTitle.textContent = firstInputValue;
        profileSubtitle.textContent = secondInputValue !== ''? secondInputValue : 'Профессия не указана';
    }
    closePopup(profilePopup);
}

function cardPopupSubmitHandler(evt) {
    evt.preventDefault();
    console.log(evt);
    const firstInputValue = getPopupInputValue(cardPopupInputs, 'firstFormInput');
    const secondInputValue = getPopupInputValue(cardPopupInputs, 'secondFormInput');

    if (firstInputValue !== '' && secondInputValue.startsWith('https://')) {
        addPlace(
            createPlace(firstInputValue, secondInputValue)
        );
    }
    closePopup(cardPopup);
}

function getPopupInputValue(popupInputs, inputName) {
    return Array.from(popupInputs)
        .find(item => item.name === inputName).value;
}

function renderImagePopup(imageInfo) {
    popupImageElem.src = imageInfo.imageElem.src;
    popupImageElem.alt = imageInfo.imageElem.alt;

    popupImageCaptionElem.textContent = imageInfo.caption;

    return popupImageBlock;
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
    cardFigure.addEventListener('click', evt => {
        const imageElem = evt.target.closest('.place__image');
        const placeTitle = evt.target.closest('.place__title');
        const popupImageElem = renderImagePopup({
            imageElem: imageElem,
            caption: placeTitle
        });
        openPopup(popupImageElem);
    });
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
        profilePopupSubmitHandler
    );
cardPopup
    .querySelector('.popup__form')
    .addEventListener(
        'submit',
        cardPopupSubmitHandler
    );

editButton.addEventListener('click', _ => {
    profilePopupInputs.forEach(input => {
        switch (input.name) {
            case 'firstFormInput': input.value = profileTitle.textContent;
                break;
            case 'secondFormInput': input.value = profileSubtitle.textContent;
                break;
        }
    })

    openPopup(profilePopup);
});

closeButtons.forEach(button => {
   button.addEventListener('click',evt => {
       closePopup(evt.target.closest('.popup'))
   });
});

addButton.addEventListener('click', _ => {
    openPopup(cardPopup);
});
/*----------------------------------Rendering--------------------------------------------*/
initialCards.forEach(item => {
    addPlace(
        createPlace(item.name, item.link)
    );
});
