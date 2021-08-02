/*-------------------Common--------------------*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

/* ---------------------------------FORM POPUP----------------------------------------*/
const formPopup = document.querySelector('.popup_form');
const formPopupTitle = formPopup.querySelector('.popup__title');
const formPopupInputs = formPopup.querySelectorAll('.popup__input');
const formPopupSaveButton = formPopup.querySelector('.button__save');

function renderFormPopup(popupInfo) {
    formPopupTitle.textContent = popupInfo.title;
    formPopupInputs.forEach(input => {
        switch (input.name) {
            case 'firstFormInput': input.placeholder = popupInfo.firstInputPlaceHolder;
                input.value = '';
                break;
            case 'secondFormInput': input.placeholder = popupInfo.secondInputPlaceHolder;
                input.value = '';
                break;
        }
    });
    formPopupSaveButton.textContent = popupInfo.buttonText;
}

function formPopupSubmitHandler(evt) {
    evt.preventDefault();
    console.log(evt);
    const buttonText = evt.target.querySelector('.button__save').innerText;
    const firstInputValue = getPopupInputValue('firstFormInput');
    const secondInputValue = getPopupInputValue('secondFormInput');

    if (buttonText === 'Сохранить') {
        if (firstInputValue !== '') {
            profileTitle.textContent = firstInputValue;
            profileSubtitle.textContent = secondInputValue !== ''? secondInputValue : 'Профессия не указана';
        }

    } else if (buttonText === 'Создать') {
        if (firstInputValue !== '' && secondInputValue.startsWith('https://')) {
            addPlace(
                createPlace(firstInputValue, secondInputValue)
            );
        }
    }
    closePopup(formPopup);
}
function getPopupInputValue(inputName) {
    return Array.from(formPopupInputs)
        .find(item => item.name === inputName).value;
}

formPopup
    .querySelector('.popup__form')
    .addEventListener(
        'submit',
        formPopupSubmitHandler
    );

/* -----------------------------IMAGE POPUP-------------------------------------*/
const popupImageBlock = document.querySelector('.popup_image');
const popupImageElem = popupImageBlock.querySelector('.popup__image');

function renderImagePopup(imageInfo) {
    popupImageElem.src = imageInfo.imageElem.src;
    popupImageElem.alt = imageInfo.imageElem.alt;

    popupImageBlock.querySelector('.popup__image-caption').textContent = imageInfo.caption;

    return popupImageBlock;
}

/* -----------------------------EDIT BUTTON-------------------------------------*/
const editButton = document.querySelector('.button__edit');
editButton.addEventListener('click', _ => {
    const profilePopupInfo = {
        title: 'Редактировать профиль',
        firstInputPlaceHolder: 'Полное имя',
        secondInputPlaceHolder: 'Профессия',
        buttonText: 'Сохранить'
    };

    renderFormPopup(profilePopupInfo);

    formPopupInputs.forEach(input => {
        switch (input.name) {
            case 'firstFormInput': input.value = profileTitle.textContent;
                break;
            case 'secondFormInput': input.value = profileSubtitle.textContent;
                break;
        }
    })

    openPopup(formPopup);
});

/*----------------------------CLOSE BUTTON-----------------------------------------*/
const closeButtons = document.querySelectorAll('.button__close');
closeButtons.forEach(button => {
   button.addEventListener('click',evt => {
       closePopup(evt.target.closest('.popup'))
   });
});

/* -----------------------------ADD BUTTON-------------------------------------*/
const addButton = document.querySelector('.button__add');
addButton.addEventListener('click', _ => {
    const placePopupInfo = {
        title: 'Новое место',
        firstInputPlaceHolder: 'Название',
        secondInputPlaceHolder: 'Ссылка на карточку',
        buttonText: 'Создать'
    };
    renderFormPopup(placePopupInfo);
    openPopup(formPopup);
});

/*---------------------------------------PLACES INIT-----------------------------------------*/
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardTemplate = document.querySelector('#place-card').content;

initialCards.forEach(item => {
    addPlace(
        createPlace(item.name, item.link)
    );
});
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
    const places = document.querySelector('.places');
    places.prepend(place);
}