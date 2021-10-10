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
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeProfilePopup();
}

popupOpenBtn.addEventListener("click", openProfilePopup);
popupCloseBtn.addEventListener("click", closeProfilePopup);
formElement.addEventListener("submit", formSubmitHandler);

/*==========================================Proekt 5=================================================== */

const newPopupCard = document.querySelector(".popup_type_add");
const newPopupOpenBtn = document.querySelector(".profile__add-button");
const newPopupCloseBtn = newPopupCard.querySelector(".popup__close");

function newOpenPopup() {
  openPopup(newPopupCard);
}

function newClosePopup() {
  closePopup(newPopupCard);
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

function createCard(elementText) {
  const newCard = elementCard.content.cloneNode(true);
  newCard.querySelector(".list-card__text").textContent = elementText.name;
  newCard.querySelector(".list-card__photo").setAttribute("src", elementText.link);
  newCard.querySelector(".list-card__photo").setAttribute("alt", elementText.name);

  newCard.querySelector(".list-card__photo").addEventListener("click", function () {
    openPopupPicture(elementText);
  });

  newCard.querySelector(".list-card__heart").addEventListener("click", function (evt) {
    evt.target.classList.toggle("list-card__heart_active");
  });

  newCard.querySelector(".list-card__basket_delete").addEventListener("click", deleteCard);

  return newCard;
}


function renderElement(elementText) {
  const card = createCard(elementText);
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
  newClosePopup();
  event.target.reset();
}

function deleteCard(event) {
  const card = event.currentTarget.closest(".list-card");

  card.remove();
}

initialCards.map(renderElement);

newPopupCar.addEventListener("submit", addElement);
/*------------------------------------------------------ увеличения картинки */
const popupPicture = document.querySelector(".popup_type_image");
const popupOpenPicture = document.querySelector(".popup__img");
const popupClosePicture = popupPicture.querySelector(".popup__close");

function openPopupPicture(elementPicture) {
  popupPicture.querySelector(".popup__img-title").textContent = elementPicture.name;
  popupOpenPicture.setAttribute("src", elementPicture.link);

  openPopup(popupPicture);
}

function closePopupPicture() {
  closePopup(popupPicture);
}

popupClosePicture.addEventListener("click", closePopupPicture);

/*==========================================Proekt 6=================================================== */

const showError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};

const hideError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  const isInputNotValid = !inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (isInputNotValid) {
    showError(errorElement, inputElement, config);
  } else {
    hideError(errorElement, inputElement, config);
  }
};

const toggleButtonState = (button, isActive, config) => {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = "disabled";
  }
};

const setEventListers = (formElement, config) => {
  const inputsList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  Array.from(inputsList).forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      const isFormValid = formElement.checkValidity();
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(submitButton, isFormValid, config);
    });
  });

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
};

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  Array.from(forms).forEach((formElement) => {
    setEventListers(formElement, config);
  });
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
};

enableValidation(validationConfig);

/*------------------------------------ закрытия popup Esc, и вне popup */

document.addEventListener('keydown', function (e) {
  const key = e.key;
  if (key === "Escape") {
    closeProfilePopup();
    closePopupPicture();
    newClosePopup();
  }
});

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('popup')) {
    closeProfilePopup();
    closePopupPicture();
    newClosePopup();
  }
});


