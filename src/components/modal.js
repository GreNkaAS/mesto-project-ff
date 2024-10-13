// src/components/modal.js

// Функция для открытия модального окна
function openPopup(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeByEscape);
  }
  
  // Функция для закрытия модального окна
  function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeByEscape);
  }
  
  // Функция для закрытия окна по клавише Esc
  function closeByEscape(event) {
    if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }
  
  export { openPopup, closePopup };
  