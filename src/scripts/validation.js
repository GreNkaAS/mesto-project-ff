// const saveButton = popupEdit.querySelector(".popup__button");

const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/; // Разрешены только буквы латинского и кириллического алфавита, дефис и пробелы
export function validateName(event) {
  const inputElement = event.target;
  const value = inputElement.value.trim();
  const errorMessage = document.querySelector(".error-message_name");

  // Проверка на пустое значение
  if (value === "") {
    errorMessage.textContent = "Вы пропустили это поле.";
    inputElement.classList.add("popup__input_error");
    return false;
  }

  // Проверка на количество символов
  if (value.length < 2) {
    errorMessage.textContent = `Минимальное количество символов: 2. Текущее количество символов ${value.length}.`;
    inputElement.classList.add("popup__input_error");
    return false;
  }

  if (value.length > 40) {
    errorMessage.textContent = `Максимальное количество символов: 40. Текущее количество символов ${value.length}.`;
    inputElement.classList.add("popup__input_error");
    return false;
  }

  if (!regex.test(value)) {
    errorMessage.textContent =
      "Имя может содержать только буквы латинского и кириллического алфавитов, дефисы и пробелы.";
    inputElement.classList.add("popup__input_error");
    return false;
  }

  errorMessage.textContent = ""; // Очистить сообщение об ошибке
  inputElement.classList.remove("popup__input_error");
  return true;
}

export function validateDescription(event) {
  const inputElement = event.target;
  const value = inputElement.value.trim();
  const errorMessage = document.querySelector(".error-message_description"); // Локальный элемент для описания

  // Проверка на пустое значение
  if (value === "") {
    errorMessage.textContent = "Вы пропустили это поле.";
    inputElement.classList.add("popup__input_error");
    return false;
  }

  if (value.length < 2) {
    errorMessage.textContent = `Минимальное количество символов: 2. Текущее количество символов ${value.length}.`;
    inputElement.classList.add("popup__input_error");
    return false;
  }

  if (value.length > 200) {
    errorMessage.textContent = `Максимальное количество символов: 200. Текущее количество символов ${value.length}.`;
    inputElement.classList.add("popup__input_error");
    return false;
  }

  if (!regex.test(value)) {
    errorMessage.textContent =
      "Описание может содержать только буквы латинского и кириллического алфавитов, дефисы и пробелы.";
    inputElement.classList.add("popup__input_error");
    return false;
  }

  errorMessage.textContent = ""; // Очистить сообщение об ошибке
  inputElement.classList.remove("popup__input_error");
  return true;
}
