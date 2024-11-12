// src/components/card.js
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

import { deleteCard, toggleLike } from "../scripts/api"; // импортируем функцию из api.js

// Создаём карточку
const createCard = (data, currentUserId, onDelete, onClickImage, onLike) => {
  const cardElement = getCardTemplate();

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count"); // элемент для счётчика лайков

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  likeCount.textContent = data.likes.length; // отображаем количество лайков из данных

  // Проверяем, есть ли лайк у текущего пользователя
  const isLiked = data.likes.some((like) => like._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active"); // закрашиваем кнопку, если лайк был
  }

  // Условие для отображения иконки удаления только на карточках текущего пользователя
  if (data.owner._id !== currentUserId) {
    deleteButton.style.display = "none"; // скрываем кнопку удаления, если карточка не наша
  }

  // Обработчики событий
  cardImage.addEventListener("click", () => onClickImage(data.link, data.name));
  deleteButton.addEventListener("click", () => onDelete(cardElement, data._id));
  likeButton.addEventListener("click", () => {
    onLike(likeButton, likeCount, data._id); // добавляем счетчик и данные карточки
  });

  return cardElement;
};

// Обработчик удаления карточки с сервера и из DOM
const handleDelete = (cardElement, cardId) => {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove(); // удаляем карточку из DOM после успешного запроса
    })
    .catch((err) => {
      console.log("Ошибка при удалении карточки:", err);
    });
};

// Обработчик клика по кнопке лайка
// const handleLikeClick = (likeButton) => {
//   likeButton.classList.toggle("card__like-button_is-active");

//   const isLiked = likeButton.classList.contains("card__like-button_is-active");

//   toggleLike(cardId, !isLiked) // отправляем на сервер, чтобы поставить или снять лайк
//     .then((updatedCard) => {
//       likeCount.textContent = updatedCard.likes.length; // обновляем количество лайков
//       likeButton.classList.toggle("card__like-button_is-active", !isLiked);
//     })
//     .catch((err) => {
//       console.log("Ошибка при обновлении лайка:", err);
//     });
// };

const handleLikeClick = (likeButton, likeCount, cardId) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  toggleLike(cardId, !isLiked) // отправляем на сервер, чтобы поставить или снять лайк
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active"); // изменяем состояние кнопки
      likeCount.textContent = updatedCard.likes.length; // обновляем количество лайков
    })
    .catch((err) => {
      console.log("Ошибка при обновлении лайка:", err);
    });
};

// Функция для клонирования шаблона карточки
function getCardTemplate() {
  return cardTemplate.cloneNode(true);
}

export { createCard, handleDelete, handleLikeClick, getCardTemplate };
