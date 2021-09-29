const popup = document.querySelector(".popup_type_edit");
const popupOpenBtn = document.querySelector(".profile__edit-button");
const popupCloseBtn = popup.querySelector(".popup__close");

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__researcher");

let formElement = document.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__input_author_name");
let jobInput = formElement.querySelector(".popup__input_author_job");

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose();
}

popupOpenBtn.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", popupClose);
formElement.addEventListener("submit", formSubmitHandler);

/*==========================================Proekt 5=================================================== */

const newPopupCard = document.querySelector(".popup_type_add");
const newPopupOpenBtn = document.querySelector(".profile__add-button");
const newPopupCloseBtn = newPopupCard.querySelector(".popup__close");

function newOpenPopup() {
  newPopupCard.classList.add("popup_opened");
}

function newClosePopup() {
  newPopupCard.classList.remove("popup_opened");
}

newPopupOpenBtn.addEventListener("click", newOpenPopup);
newPopupCloseBtn.addEventListener("click", newClosePopup);

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

function renderElement(elementText) {
  const newCard = elementCard.content.cloneNode(true);
  newCard.querySelector(".list-card__text").textContent = elementText.name;
  newCard.querySelector(".list-card__photo").setAttribute("src", elementText.link);

  newCard.querySelector(".list-card__photo").addEventListener("click", function () {
    OpenPopupPicture(elementText);
  });

  newCard.querySelector(".list-card__heart").addEventListener("click", function (evt) {
    evt.target.classList.toggle("list-card__heart_active");
  });

  setListenerCard(newCard);
  elementLists.prepend(newCard);
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
  newClosePopup();
}

function deleteCard(event) {
  const card = event.currentTarget.closest(".list-card");

  card.remove();
}

function setListenerCard(card) {
  card.querySelector(".list-card__basket_delete").addEventListener("click", deleteCard);
}

initialCards.map(renderElement);

newPopupCar.addEventListener("submit", addElement);
/*------------------------------------------------------ увеличение картинки */
const popupPicture = document.querySelector(".popup_type_image");
const popupOpenPicture = document.querySelector(".popup__img");
const popupClosePicture = popupPicture.querySelector(".popup__close");

function OpenPopupPicture(elementPicture) {
  popupPicture.querySelector(".popup__img-title").textContent = elementPicture.name;
  popupOpenPicture.setAttribute("src", elementPicture.link);

  popupPicture.classList.add("popup_opened");
}

function ClosePopupPicture() {
  popupPicture.classList.remove("popup_opened");
}

popupClosePicture.addEventListener("click", ClosePopupPicture);
