import "../pages/index.css"; // Импорт стилей
import { initialCards } from "./cards"; // Импорт массива с начальными карточками
import { createCard, handleDelete, handleLikeClick } from "../components/card";
import { openPopup, closePopup } from "../components/modal";
import logoPath from "../images/logo.svg"; // Импорт изображения логотипа
import avatarPath from "../images/avatar.jpg"; // Импорт изображения аватара
import { validateName, validateDescription } from "./validation";

// Установка изображений логотипа и аватара
document.querySelector(".header__logo").src = logoPath;
document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatarPath})`;

// Объявление глобальных констант и переменных
const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputName = popupEdit.querySelector(".popup__input_type_name");
const inputDescription = popupEdit.querySelector(
  ".popup__input_type_description"
);
const formEditProfile = document.querySelector(".popup_type_edit .popup__form");
const formAddCard = document.querySelector(".popup_type_new-card .popup__form");
const placeName = popupNewCard.querySelector("input[name='place-name']");
const placeLink = popupNewCard.querySelector("input[name='link']");
const popupImage = document.querySelector(".popup_type_image");
const imagePopupImage = popupImage.querySelector(".popup__image");
const imagePopupCaption = popupImage.querySelector(".popup__caption");
const saveButton = popupEdit.querySelector(".popup__button");

// Функция для открытия окна просмотра изображения карточки
function handleCardClick(imageSrc, imageAlt) {
  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = imageAlt;
  imagePopupCaption.textContent = imageAlt;

  openPopup(popupImage);
}

// Отображение начальных карточек
initialCards.forEach((card) => {
  const cardElement = createCard(
    card,
    handleDelete,
    handleCardClick,
    handleLikeClick
  );
  cardsContainer.append(cardElement);
});

// Обработчики событий для открытия и закрытия попапов
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;

  // Очистка сообщений об ошибках
  const errorMessages = popupEdit.querySelectorAll(".error-message");
  errorMessages.forEach((message) => (message.textContent = ""));

  // Удаление классов ошибок у полей ввода
  const inputElements = popupEdit.querySelectorAll(".popup__input");
  inputElements.forEach((input) =>
    input.classList.remove("popup__input_error")
  );
    // Проверка состояния кнопки "Сохранить"
    toggleSaveButton();
});

addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

// Обработчик отправки формы редактирования профиля
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const isNameValid = validateName({ target: inputName });
  const isDescriptionValid = validateDescription({ target: inputDescription });

  if (isNameValid && isDescriptionValid) {
    profileTitle.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popupEdit);
  }  
});

// Обработчик отправки формы добавления новой карточки
formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = createCard(
    { name: placeName.value, link: placeLink.value },
    handleDelete,
    handleCardClick,
    handleLikeClick
  );
  cardsContainer.prepend(newCard);
  formAddCard.reset();
  closePopup(popupNewCard);
});

// Валидация при вводе данных
inputName.addEventListener("input", validateName);
inputDescription.addEventListener("input", validateDescription);

function toggleSaveButton() {
  const isValid = validateName({ target: inputName }) && validateDescription({ target: inputDescription });
  saveButton.disabled = !isValid; // Дизаблить кнопку, если поля не валидны
  
  if (isValid) {
    saveButton.classList.remove("popup__button_disabled");
  } else {
    saveButton.classList.add("popup__button_disabled");
  }
}

// Пример обработчиков событий для валидации
inputName.addEventListener("input", () => {
  validateName({ target: inputName });
  toggleSaveButton(); // Проверка состояния кнопки
});

inputDescription.addEventListener("input", () => {
  validateDescription({ target: inputDescription });
  toggleSaveButton(); // Проверка состояния кнопки
});