const arkhyz = new URL('../images/initial-cards/arkhyz.jpg', import.meta.url);
const chelyabinsk = new URL('../images/initial-cards/chelyabinsk-oblast.jpg', import.meta.url) ;
const ivanovo = new URL('../images/initial-cards/ivanovo.jpg', import.meta.url) ;
const kamchatka = new URL('../images/initial-cards/kamchatka.jpg', import.meta.url) ;
const kholmogorsky = new URL('../images/initial-cards/kholmogorsky-rayon.jpg', import.meta.url) ;
const baikal = new URL('../images/initial-cards/baikal.jpg', import.meta.url);

export const initialCards = [
    {
        name: 'Архыз',
        link: arkhyz
    },
    {
        name: 'Челябинская область',
        link: chelyabinsk
    },
    {
        name: 'Иваново',
        link: ivanovo
    },
    {
        name: 'Камчатка',
        link: kamchatka
    },
    {
        name: 'Холмогорский район',
        link: kholmogorsky
    },
    {
        name: 'Байкал',
        link: baikal
    }
];