// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// =================================================================================================
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");
// =================================================================================================
const createCard = (data, onDelete) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener("click", () => {
    onDelete(cardElement);
  });

  return cardElement;
};
// =================================================================================================
const handleDelete = (cardElement) => {
  cardElement.remove();
};
// =================================================================================================
const renderCard = (cardElement) => {
  const cardsContainer = document.querySelector(".places__list");
  cardsContainer.append(cardElement);
};
// =================================================================================================
initialCards.forEach((card) => {
  const cardElement = createCard(card, handleDelete);
  renderCard(cardElement);
});
