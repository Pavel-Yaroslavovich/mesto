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
  document.addEventListener('keydown', closePopupByEsc);
}

profilePopup.addEventListener('click', handleClosePopupClick);

function closePopup() {
  const activePopup = document.querySelector('.popup_opened');
  activePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
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

newPopupCard.addEventListener('click', handleClosePopupClick);

function newOpenPopup() {
  openPopup(newPopupCard);
  const btn = newPopupCard.querySelector('.popup__submit');
  const form = newPopupCard.querySelector('.popup__form');
  toggleButtonState(btn, form, validationConfig);
}

newPopupOpenBtn.addEventListener("click", newOpenPopup);
newPopupCloseBtn.addEventListener("click", closePopup);

const initialCards = [
  {
    name: "??????????",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "?????????????????????? ??????????????",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "??????????????",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "????????????????",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "???????????????????????? ??????????",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "????????????",
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
  newCardPhoto.setAttribute("src", element.link);
  newCardPhoto.setAttribute("alt", element.name);

  newCardPhoto.addEventListener("click", function () {
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

popupPicture.addEventListener('click', handleClosePopupClick);

function openPopupPicture(elementPicture) {
  popupPicture.querySelector(".popup__img-title").textContent = elementPicture.name;
  popupOpenPicture.setAttribute("src", elementPicture.link);
  popupOpenPicture.setAttribute("alt", elementPicture.name);

  openPopup(popupPicture);
}

popupClosePicture.addEventListener("click", closePopup);

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function handleClosePopupClick(evt) {
  const target = evt.target;
  if (target.classList.contains('popup')) {
    closePopup();
  }
}
