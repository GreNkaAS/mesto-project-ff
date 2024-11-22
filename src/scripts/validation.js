function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector); // Используем селектор из настроек

  forms.forEach((form) => {
    const inputs = form.querySelectorAll(settings.inputSelector); // Поля ввода
    const submitButton = form.querySelector(settings.submitButtonSelector); // Кнопка отправки

    // Начальная проверка состояния кнопки
    toggleButtonState(inputs, submitButton, settings);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, settings); // Проверка валидности
        toggleButtonState(inputs, submitButton, settings); // Обновление состояния кнопки
      });
    });
  });
}

function checkInputValidity(input, settings) {
  let errorMessage = ""; // Переменная для хранения сообщения об ошибке

  // Проверка на тип mismatch для паттерна
  if (input.validity.patternMismatch) {
    errorMessage = input.dataset.errorMessage || "Неверный формат данных."; // Используем data-error-message
  }
  // Проверка на минимальную длину поля
  else if (input.validity.tooShort) {
    errorMessage = `Минимальная длина: ${input.minLength}. Сейчас: ${input.value.length}.`;
  }
  // Проверка на максимальную длину поля
  else if (input.validity.tooLong) {
    errorMessage = `Максимальная длина: ${input.maxLength}. Сейчас: ${input.value.length}.`;
  }
  // Проверка на пустое поле
  else if (input.validity.valueMissing) {
    errorMessage = "Вы пропустили это поле.";
  }

  showInputError(input, errorMessage, settings); // Отображаем ошибку (если есть)
}

// Функция для отображения сообщения об ошибке
function showInputError(input, message, settings) {
  const errorElement = input
    .closest(settings.formSelector)
    .querySelector(`.error-message_${input.name}`); // Используем formSelector из настроек
  input.classList.toggle(settings.inputErrorClass, !!message);
  errorElement.textContent = message || "";
  errorElement.classList.toggle(settings.errorClass, !!message);
}

// Управление состоянием кнопки "Сохранить"
function toggleButtonState(inputs, button, settings) {
  // Проверяем, валидны ли все поля
  const isFormValid = Array.from(inputs).every((input) => input.validity.valid);

  button.classList.toggle(settings.inactiveButtonClass, !isFormValid); // Если форма не валидна, кнопка неактивна
  button.disabled = !isFormValid; // Делаем кнопку неактивной, если не все поля валидны
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

