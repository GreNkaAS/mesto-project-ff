const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "error-message_visible",
};

// Регулярные выражения для проверки допустимых символов
const nameBioRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/; // Разрешены только буквы, дефисы и пробелы
const placeNameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/; // Название от 2 до 30 символов
const urlRegex = /^(https?:\/\/[^\s]+)/; // Проверка на валидный URL

// Основная функция включения валидации
function enableValidation(settings) {
  const forms = document.querySelectorAll(".popup__form");
  forms.forEach((form) => {
    const inputs = form.querySelectorAll(settings.inputSelector);
    const submitButton = form.querySelector(settings.submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, settings);
        toggleButtonState(inputs, submitButton, settings);
      });

      // Начальная проверка состояния кнопки
      toggleButtonState(inputs, submitButton, settings);
    });
  });
}

// Проверка валидности конкретного поля
function checkInputValidity(input, settings) {
  let errorMessage = "";

  // Проверка поля "Название"
  if (input.name === "place-name") {
    if (input.value.trim() === "") {
      errorMessage = "Вы пропустили это поле.";
    } else if (!placeNameRegex.test(input.value)) {
      errorMessage =
        "Название должно содержать от 2 до 30 символов и включать только буквы, дефисы и пробелы.";
    }
  }

  // Проверка поля "Ссылка на картинку"
  if (input.name === "link") {
    if (input.value.trim() === "") {
      errorMessage = "Вы пропустили это поле.";
    } else if (!urlRegex.test(input.value)) {
      errorMessage = "Введите корректный URL.";
    }
  }

  showInputError(input, errorMessage, settings);
}

// Функция для отображения сообщения об ошибке
function showInputError(input, message, settings) {
  const errorElement = document.querySelector(`.error-message_${input.name}`);
  input.classList.toggle(settings.inputErrorClass, !!message);
  errorElement.textContent = message || "";
  errorElement.classList.toggle(settings.errorClass, !!message);
}

// Управление состоянием кнопки "Сохранить"
function toggleButtonState(inputs, button, settings) {
  const isPlaceNameValid = Array.from(inputs).some(
    (input) => input.name === "place-name" && placeNameRegex.test(input.value)
  );
  const isLinkValid = Array.from(inputs).some(
    (input) => input.name === "link" && urlRegex.test(input.value)
  );

  button.classList.toggle(
    settings.inactiveButtonClass,
    !(isPlaceNameValid && isLinkValid)
  );
  button.disabled = !(isPlaceNameValid && isLinkValid);
}

// Очистка ошибок при открытии формы
function clearValidation(form, settings) {
  const inputs = form.querySelectorAll(settings.inputSelector);
  inputs.forEach((input) => showInputError(input, "", settings));
  toggleButtonState(
    inputs,
    form.querySelector(settings.submitButtonSelector),
    settings
  );
}

export { enableValidation, clearValidation, validationSettings };
