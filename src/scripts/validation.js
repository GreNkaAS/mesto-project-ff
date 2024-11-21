// Регулярные выражения для проверки допустимых символов
const nameBioRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/; // Разрешены только буквы, дефисы и пробелы
const placeNameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
// Проверка на валидность название
const urlRegex = /^(https?:\/\/[^\s]+)/; // Проверка на валидный URL

// Основная функция включения валидации для всех форм
function enableValidation(settings) {
  const forms = document.querySelectorAll(".popup__form"); // Находим все формы
  forms.forEach((form) => {
    const inputs = form.querySelectorAll(settings.inputSelector); // Находим все поля ввода в форме
    const submitButton = form.querySelector(settings.submitButtonSelector); // Находим кнопку отправки

    inputs.forEach((input) => {
      // Добавляем обработчик на ввод текста в поля
      input.addEventListener("input", () => {
        checkInputValidity(input, settings); // Проверка валидности поля
        toggleButtonState(inputs, submitButton, settings); // Управление состоянием кнопки
      });

      // Начальная проверка состояния кнопки при загрузке страницы
      toggleButtonState(inputs, submitButton, settings);
    });
  });
}

// Проверка валидности конкретного поля
function checkInputValidity(input, settings) {
  let errorMessage = ""; // Переменная для хранения сообщения об ошибке

  // Проверка поля "Название"
  if (input.name === "place-name") {
    if (input.value.trim() === "") {
      errorMessage = "Вы пропустили это поле."; // Если поле пустое
    } else if (input.value.length < 2 || input.value.length > 30) {
      errorMessage = `Название должно содержать от 2 до 30 символов. Текущее количество: ${input.value.length}`; // Проверка длины
    } else if (!placeNameRegex.test(input.value)) {
      errorMessage =
        "Название должно содержать только буквы, дефисы и пробелы."; // Если значение не соответствует шаблону
    }
  }

  // Проверка поля "Ссылка на картинку"
  if (input.name === "link") {
    if (input.value.trim() === "") {
      errorMessage = "Вы пропустили это поле."; // Если поле пустое
    } else if (!urlRegex.test(input.value)) {
      errorMessage = "Введите корректный URL."; // Если URL некорректный
    }
  }

  // Проверка поля "Название"
  if (input.name === "name") {
    if (input.value.trim() === "") {
      errorMessage = "Вы пропустили это поле."; // Если поле пустое
    } else if (input.value.length < 2 || input.value.length > 40) {
      errorMessage = `Название должно содержать от 2 до 40 символов. Текущее количество: ${input.value.length}`; // Проверка длины
    } else if (!placeNameRegex.test(input.value)) {
      errorMessage =
        "Название должно содержать только буквы, дефисы и пробелы."; // Если значение не соответствует шаблону
    }
  }

  // Проверка других полей, если нужно
  if (input.name === "description") {
    if (input.value.trim() === "") {
      errorMessage = "Вы пропустили это поле."; // Если поле пустое
    } else if (input.value.length < 2 || input.value.length > 200) {
      errorMessage = `Описание должно содержать от 2 до 200 символов. Текущее количество: ${input.value.length}`; // Проверка длины
    } else if (!nameBioRegex.test(input.value)) {
      errorMessage = "Допустимы только буквы, дефисы и пробелы."; // Если введены недопустимые символы
    }
  }

  // Проверка поля "Ссылка на картинку" (аватар)
  if (input.name === "avatar") {
    if (input.value.trim() === "") {
      errorMessage = "Вы пропустили это поле."; // Если поле пустое
    } else if (!urlRegex.test(input.value)) {
      errorMessage = "Введите корректный URL."; // Если URL некорректный
    }
  }

  showInputError(input, errorMessage, settings); // Отображаем ошибку (если есть)
}

// Функция для отображения сообщения об ошибке
function showInputError(input, message, settings) {
  const errorElement = document.querySelector(`.error-message_${input.name}`); // Находим элемент для отображения ошибки
  input.classList.toggle(settings.inputErrorClass, !!message); // Добавляем/удаляем класс ошибки
  errorElement.textContent = message || ""; // Если есть ошибка, отображаем её
  errorElement.classList.toggle(settings.errorClass, !!message); // Добавляем/удаляем класс видимости ошибки
}

// Управление состоянием кнопки "Сохранить"
function toggleButtonState(inputs, button, settings) {
  // Проверка валидности каждого поля
  const isPlaceNameValid = Array.from(inputs).every(
    (input) => input.name !== "place-name" || placeNameRegex.test(input.value) // Проверка поля "Название"
  );
  const isLinkValid = Array.from(inputs).every(
    (input) => input.name !== "link" || urlRegex.test(input.value) // Проверка поля "Ссылка"
  );
  const isNameValid = Array.from(inputs).every(
    (input) => input.name !== "name" || nameBioRegex.test(input.value) // Проверка поля "Имя"
  );
  const isDescriptionValid = Array.from(inputs).every(
    (input) =>
      input.name !== "description" ||
      (input.value.length >= 2 &&
        input.value.length <= 200 &&
        nameBioRegex.test(input.value)) // Проверка поля "Описание"
  );

  const isAvatarValid = Array.from(inputs).every(
    (input) => input.name !== "avatar" || urlRegex.test(input.value) // Проверка поля "Аватар"
  );

  // Если все поля валидны, кнопка активируется
  button.classList.toggle(
    settings.inactiveButtonClass,
    !(
      isPlaceNameValid &&
      isLinkValid &&
      isDescriptionValid &&
      isAvatarValid &&
      isNameValid
    ) // Если хотя бы одно поле не валидно, кнопка не активна
  );
  button.disabled = !(
    isPlaceNameValid &&
    isLinkValid &&
    isDescriptionValid &&
    isAvatarValid &&
    isNameValid
  ); // Делаем кнопку неактивной, если не все поля валидны
}

// Очистка ошибок при открытии формы
function clearValidation(form, settings) {
  const inputs = form.querySelectorAll(settings.inputSelector); // Находим все поля формы
  inputs.forEach((input) => showInputError(input, "", settings)); // Очищаем сообщения об ошибках
  toggleButtonState(
    inputs,
    form.querySelector(settings.submitButtonSelector),
    settings
  ); // Перепроверяем состояние кнопки
}

export { enableValidation, clearValidation };
