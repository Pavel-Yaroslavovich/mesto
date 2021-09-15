const popup = document.querySelector('.popup');
const popupOpenBtn = document.querySelector('.profile__rectangle');
const popupCloseBtn = popup.querySelector('.popup__close');

function popupToggle() {
  popup.classList.toggle('popup__opened');
}

popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);


let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');

function formSubmitHandler (evt) {
  evt.preventDefault();

  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__researcher').textContent = jobInput.value;
  popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);

