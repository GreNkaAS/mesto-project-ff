// Импорт необходимых модулей и стилей
import "../pages/index.css";
import { createCard, handleDelete, handleLikeClick } from "../components/card";
import { updateUserProfile } from "./api";
import { updateAvatar } from "./api";
import { openPopup, closePopup } from "../components/modal";
import { enableValidation, clearValidation } from "./validation";
import { getInitialCards, getUserProfile, addCard } from "./api";

// === Объявление глобальных констант и переменных ===
// Селекторы DOM-элементов для попапов, форм, кнопок и других элементов интерфейса
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
const saveButtons = document.querySelectorAll(".popup__button");
const avatarElement = document.querySelector(".profile__avatar");
const popupAvatar = document.querySelector(".popup_type_avatar");
const avatarUrlInput = popupAvatar.querySelector(
  ".popup__input_type_avatar-url"
);
const formAvatar = popupAvatar.querySelector(".popup__form");

// Объект с настройками для валидации
const validationSettings = {
  formSelector: ".popup__form", // Селектор для форм
  inputSelector: ".popup__input", // С\електор для полей ввода
  submitButtonSelector: ".popup__button", // Селектор для кнопки отправки
  inactiveButtonClass: "popup__button_disabled", // Класс для неактивной кнопки
  inputErrorClass: "popup__input_error", // Класс для поля с ошибкой
  errorClass: "error-message_visible", // Класс для отображения ошибки
};

// === Функция смены аватара ===
avatarElement.addEventListener("click", () => {
  openPopup(popupAvatar); // Открывает попап смены аватара
  avatarUrlInput.value = ""; // Очищает поле ввода
  clearValidation(popupAvatar, validationSettings); // Убирает ошибки валидации
});

// === Обработчик отправки формы смены аватара ===
formAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true);

  const avatarUrl = avatarUrlInput.value;

  updateAvatar(avatarUrl)
    .then((data) => {
      document.querySelector(".profile__image").src = data.avatar; // Обновляет аватар на странице
      closePopup(popupAvatar); // Закрывает попап после обновления
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      renderLoading(false);
    });
});

// === Функция для отображения изображения карточки ===
function handleCardClick(imageSrc, imageAlt) {
  imagePopupImage.src = imageSrc; // Устанавливает источник изображения
  imagePopupImage.alt = imageAlt; // Устанавливает описание изображения
  imagePopupCaption.textContent = imageAlt; // Устанавливает подпись изображения
  openPopup(popupImage); // Открывает попап с изображением
}

// === Загрузка данных пользователя и карточек с сервера ===
let currentUserId; // Хранит ID текущего пользователя

// Загрузка данных пользователя
getUserProfile()
  .then((userData) => {
    currentUserId = userData._id; // Сохраняет ID пользователя
    document.querySelector(".profile__image").src = userData.avatar; // Устанавливает аватар
    profileTitle.textContent = userData.name; // Устанавливает имя пользователя
    profileDescription.textContent = userData.about; // Устанавливает описание профиля
    return getInitialCards(); // Загружает карточки
  })
  .then((cards) => {
    // Отображает загруженные карточки
    cards.forEach((card) => {
      const cardElement = createCard(
        card,
        currentUserId,
        (element) => handleDelete(element, card._id),
        handleCardClick,
        handleLikeClick
      );
      cardsContainer.append(cardElement); // Добавляет карточку на страницу
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных пользователя или карточек:", err);
  });

// === Обработчик открытия попапа редактирования профиля ===
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  inputName.value = profileTitle.textContent; // Заполняет поле имени
  inputDescription.value = profileDescription.textContent; // Заполняет поле описания
  clearValidation(popupEdit, validationSettings); // Сбрасывает ошибки валидации
});

// === Обработчик открытия попапа добавления карточки ===
addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
  clearValidation(popupNewCard, validationSettings); // Сбрасывает ошибки валидации
});

// === Закрытие попапов по клику на крестик или оверлей ===
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

// === Обработчик отправки формы редактирования профиля ===
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true);

  const name = inputName.value; // Получает имя из формы
  const about = inputDescription.value; // Получает описание из формы

  updateUserProfile(name, about)
    .then((data) => {
      profileTitle.textContent = data.name; // Обновляет имя на странице
      profileDescription.textContent = data.about; // Обновляет описание на странице
      closePopup(popupEdit); // Закрывает попап
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
      renderLoading(false);
    });
});

// === Обработчик отправки формы добавления новой карточки ===
formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true);

  if (!currentUserId) {
    console.error("Ошибка: currentUserId не определен");
    return;
  }

  const newCardData = {
    name: placeName.value,
    link: placeLink.value,
    owner: { _id: currentUserId },
  };

  addCard(newCardData)
    .then((savedCard) => {
      const newCardElement = createCard(
        savedCard,
        currentUserId,
        handleDelete,
        handleCardClick,
        handleLikeClick
      );
      cardsContainer.prepend(newCardElement); // Добавляет карточку в начало списка
      formAddCard.reset(); // Сбрасывает форму
      closePopup(popupNewCard); // Закрывает попап
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки на сервер:", err);
    })
    .finally(() => {
      renderLoading(false);
    });
});

// === Функция отображения состояния загрузки ===
function renderLoading(isLoading, button, loadingText = "Сохранение...") {
  if (isLoading) {
    saveButtons.forEach((btn) => {
      btn.textContent = loadingText; // Устанавливает текст "Сохранение..."
      btn.disabled = true; // Деактивирует кнопку
    });
  } else {
    saveButtons.forEach((btn) => {
      btn.textContent = btn.dataset.originalText || "Сохранить"; // Возвращает оригинальный текст
      btn.disabled = false; // Активирует кнопку
    });
  }
}

// === Включение валидации форм ===
enableValidation(validationSettings);
