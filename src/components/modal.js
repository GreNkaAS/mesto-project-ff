// Функция для открытия модального окна
function openPopup(popup) {
  popup.classList.add("popup_is-opened"); // Добавляем класс, чтобы отобразить окно
  document.addEventListener("keydown", closeByEscape); // Добавляем обработчик события для закрытия окна по клавише Escape
}

// Функция для закрытия модального окна
function closePopup(popup) {
  popup.classList.remove("popup_is-opened"); // Убираем класс, чтобы скрыть окно
  document.removeEventListener("keydown", closeByEscape); // Убираем обработчик события закрытия по Escape
}

// Функция для закрытия окна по клавише Esc
function closeByEscape(event) {
  if (event.key === "Escape") {
    // Проверяем, нажата ли клавиша Escape
    const openedPopup = document.querySelector(".popup_is-opened"); // Ищем открытое модальное окно
    if (openedPopup) {
      closePopup(openedPopup); // Если окно найдено, закрываем его
    }
  }
}

export { openPopup, closePopup }; // Экспортируем функции для использования в других файлах
