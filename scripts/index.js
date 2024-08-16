// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;

const container = document.querySelector(".places__list");

initialCards.forEach((cardData) => {
  const clone = cardTemplate.cloneNode(true);

  const cardImage = clone.querySelector(".card__image");
  const cardTitle = clone.querySelector(".card__title");
  const deleteButton = clone.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", function (event) {
    const cardItem = event.target.closest(".places__item");
    cardItem.remove();
  });

  container.append(clone);
});
