// src/components/card.js
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

// Создаём карточку
const createCard = (data, onDelete, onClickImage, onLike) => {
  const cardElement = getCardTemplate();

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Обработчики событий
  cardImage.addEventListener("click", () => onClickImage(data.link, data.name));
  deleteButton.addEventListener("click", () => onDelete(cardElement));
  likeButton.addEventListener("click", () => onLike(likeButton));

  return cardElement;
};

// Обработчик удаления карточки
const handleDelete = (cardElement) => {
  cardElement.remove();
};

// Обработчик клика по кнопке лайка
const handleLikeClick = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

// Функция для клонирования шаблона карточки
function getCardTemplate() {
  return cardTemplate.cloneNode(true);
}

export { createCard, handleDelete, handleLikeClick, getCardTemplate };