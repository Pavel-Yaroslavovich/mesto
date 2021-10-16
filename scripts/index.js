const profilePopup = document.querySelector(".popup_type_edit");
const popupOpenBtn = document.querySelector(".profile__edit-button");
const popupCloseBtn = profilePopup.querySelector(".popup__close");

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__researcher");

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_author_name");
const jobInput = formElement.querySelector(".popup__input_author_job");

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleClosePopupClick);
  document.addEventListener('keydown', closePopupKey);
  const btn = popup.querySelector('.popup__submit');
  const form = popup.querySelector('.popup__form');
  if (btn) {
    toggleButtonState(btn, form, validationConfig);
  }
}

function closePopup() {
  const activePopup = document.querySelector('.popup_opened');
  if (activePopup) {
    activePopup.classList.remove('popup_opened');
    activePopup.removeEventListener('click', handleClosePopupClick);
    document.removeEventListener('keydown', closePopupKey);
  }
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

popupOpenBtn.addEventListener("click", openProfilePopup);
popupCloseBtn.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);

const newPopupCard = document.querySelector(".popup_type_add");
const newPopupOpenBtn = document.querySelector(".profile__add-button");
const newPopupCloseBtn = newPopupCard.querySelector(".popup__close");

function newOpenPopup() {
  openPopup(newPopupCard);
}

newPopupOpenBtn.addEventListener("click", newOpenPopup);
newPopupCloseBtn.addEventListener("click", closePopup);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const elementLists = document.querySelector(".element-list");
const elementCard = document.querySelector("#card-template");
const newPopupCar = document.querySelector(".popup_type_add");

function createCard(element) {
  const newCard = elementCard.content.cloneNode(true);
  const newCardPhoto = newCard.querySelector(".list-card__photo");
  newCard.querySelector(".list-card__text").textContent = element.name;
  newCard.querySelector(".list-card__photo").setAttribute("src", element.link);
  newCardPhoto.setAttribute("alt", element.name);

  newCard.querySelector(".list-card__photo").addEventListener("click", function () {
    openPopupPicture(element);
  });

  newCard.querySelector(".list-card__heart").addEventListener("click", function (evt) {
    evt.target.classList.toggle("list-card__heart_active");
  });

  newCard.querySelector(".list-card__basket_delete").addEventListener("click", deleteCard);

  return newCard;
}

function renderElement(element) {
  const card = createCard(element);
  elementLists.prepend(card);
}

function addElement(event) {
  event.preventDefault();
  const newPopupTextName = event.currentTarget.querySelector(".popup__input_name").value;
  const newPopupUrlLink = event.currentTarget.querySelector(".popup__input_link").value;
  const obj = {
    name: newPopupTextName,
    link: newPopupUrlLink,
  };

  renderElement(obj);
  closePopup();
  event.target.reset();
}

function deleteCard(event) {
  const card = event.currentTarget.closest(".list-card");

  card.remove();
}

initialCards.map(renderElement);

newPopupCar.addEventListener("submit", addElement);

const popupPicture = document.querySelector(".popup_type_image");
const popupOpenPicture = popupPicture.querySelector(".popup__img");
const popupClosePicture = popupPicture.querySelector(".popup__close");

function openPopupPicture(elementPicture) {
  popupPicture.querySelector(".popup__img-title").textContent = elementPicture.name;
  popupOpenPicture.setAttribute("src", elementPicture.link);
  document.querySelector(".list-card__photo").setAttribute("alt", elementPicture.name);

  openPopup(popupPicture);
}

popupClosePicture.addEventListener("click", closePopup);

function closePopupKey(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function handleClosePopupClick(evt) {
  const target = evt.target;
  if (target.classList.contains('popup__close') || target.classList.contains('popup')) {
    closePopup();
  }
}
