const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item"); // Находим шаблон карточки

import { deleteCard, toggleLike } from "../scripts/api"; // импортируем функции для работы с API

// Создаём карточку
const createCard = (data, currentUserId, onDelete, onClickImage, onLike) => {
  const cardElement = getCardTemplate(); // Клонируем шаблон карточки

  const cardImage = cardElement.querySelector(".card__image"); // Получаем элемент изображения
  const cardTitle = cardElement.querySelector(".card__title"); // Получаем элемент заголовка
  const deleteButton = cardElement.querySelector(".card__delete-button"); // Получаем кнопку удаления
  const likeButton = cardElement.querySelector(".card__like-button"); // Получаем кнопку лайка
  const likeCount = cardElement.querySelector(".card__like-count"); // Получаем элемент для отображения количества лайков

  cardImage.src = data.link; // Устанавливаем ссылку на изображение
  cardImage.alt = data.name; // Устанавливаем описание изображения
  cardTitle.textContent = data.name; // Устанавливаем название карточки
  likeCount.textContent = data.likes.length; // Отображаем количество лайков

  // Проверяем, поставил ли лайк текущий пользователь
  const isLiked = data.likes.some((like) => like._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active"); // Закрашиваем кнопку лайка, если текущий пользователь лайкнул
  }

  // Условие для отображения кнопки удаления только на карточках текущего пользователя
  if (data.owner._id !== currentUserId) {
    deleteButton.style.display = "none"; // Скрываем кнопку удаления, если карточка не наша
  }

  // Обработчики событий
  cardImage.addEventListener("click", () => onClickImage(data.link, data.name)); // При клике на изображение вызываем функцию для отображения увеличенного изображения
  deleteButton.addEventListener("click", () => onDelete(cardElement, data._id)); // При клике на кнопку удаления вызываем функцию для удаления карточки
  likeButton.addEventListener("click", () => {
    onLike(likeButton, likeCount, data._id); // При клике на кнопку лайка вызываем функцию для изменения лайка
  });

  return cardElement; // Возвращаем созданную карточку
};

// Обработчик удаления карточки с сервера и из DOM
const handleDelete = (cardElement, cardId) => {
  deleteCard(cardId) // Отправляем запрос на сервер для удаления карточки
    .then(() => {
      cardElement.remove(); // Удаляем карточку из DOM после успешного запроса
    })
    .catch((err) => {
      console.log("Ошибка при удалении карточки:", err); // Логируем ошибку
    });
};

// Обработчик клика по кнопке лайка
const handleLikeClick = (likeButton, likeCount, cardId) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active"); // Проверяем, был ли поставлен лайк

  toggleLike(cardId, !isLiked) // Отправляем запрос на сервер для установки или снятия лайка
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active"); // Переключаем состояние кнопки лайка
      likeCount.textContent = updatedCard.likes.length; // Обновляем количество лайков
    })
    .catch((err) => {
      console.log("Ошибка при обновлении лайка:", err); // Логируем ошибку
    });
};

// Функция для клонирования шаблона карточки
function getCardTemplate() {
  return cardTemplate.cloneNode(true); // Клонируем шаблон карточки
}

export { createCard, handleDelete, handleLikeClick, getCardTemplate }; // Экспортируем необходимые функции
