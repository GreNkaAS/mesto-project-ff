import "../pages/index.css"; // Импорт стилей
import { createCard, handleDelete, handleLikeClick } from "../components/card";
import { updateUserProfile } from "./api";
import { openPopup, closePopup } from "../components/modal";
import logoPath from "../images/logo.svg"; // Импорт изображения логотипа
import avatarPath from "../images/avatar.jpg"; // Импорт изображения аватара
import {
  enableValidation,
  clearValidation,
  validationSettings,
} from "./validation";

import { getInitialCards, getUserProfile, addCard } from "./api";

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

// Функция для открытия окна просмотра изображения карточки
function handleCardClick(imageSrc, imageAlt) {
  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = imageAlt;
  imagePopupCaption.textContent = imageAlt;

  openPopup(popupImage);
}

// Загрузка и отображение карточек с сервера
let currentUserId; // переменная для хранения ID текущего пользователя

getUserProfile()
  .then((userData) => {
    currentUserId = userData._id; // сохраняем ID текущего пользователя

    // Подставляем данные в элементы страницы
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    // Загружаем карточки после получения ID пользователя
    return getInitialCards();
  })
  .then((cards) => {
    cards.forEach((card) => {
      const cardElement = createCard(
        card,
        currentUserId, // передаем currentUserId
        (element) => handleDelete(element, card._id), // передаём card._id
        handleCardClick,
        handleLikeClick
      );
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.log("Ошибка при получении данных:", err);
  });

enableValidation(validationSettings);

// Обработчики событий для открытия и закрытия попапов
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;

  // Очистка сообщений об ошибках перед открытием
  clearValidation(popupEdit, validationSettings);
});

addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
  clearValidation(popupNewCard, validationSettings); // Очистка валидации при открытии формы
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

formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // Получаем значения из полей формы
  const name = inputName.value;
  const about = inputDescription.value;

  // Отправка данных на сервер для обновления профиля
  updateUserProfile(name, about)
    .then((data) => {
      // Если обновление прошло успешно, обновляем информацию на странице
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;

      // Закрытие попапа редактирования профиля
      closePopup(popupEdit);
    })
    .catch((err) => {
      // Если произошла ошибка при отправке данных, показываем ошибку в консоли
      console.log("Ошибка при обновлении профиля:", err);
    });
});

// Обработчик отправки формы добавления новой карточки
formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // Проверяем, что currentUserId определен
  if (!currentUserId) {
    console.log("Ошибка: currentUserId не определен");
    return;
  }

  const newCardData = {
    name: placeName.value,
    link: placeLink.value,
    owner: { _id: currentUserId },
  };

  // Сохраняем карточку на сервере
  addCard(newCardData)
    .then((savedCard) => {
      // После успешного сохранения на сервере создаем карточку на странице
      const newCardElement = createCard(
        savedCard, // Используем данные с сервера, включая сгенерированный ID
        currentUserId, // Передаем ID текущего пользователя
        handleDelete,
        handleCardClick,
        handleLikeClick
      );
      cardsContainer.prepend(newCardElement); // Добавляем карточку на страницу

      formAddCard.reset(); // Сброс формы
      closePopup(popupNewCard); // Закрытие попапа
    })
    .catch((err) => {
      console.log("Ошибка при добавлении карточки на сервер:", err);
    });
});

enableValidation(validationSettings);
