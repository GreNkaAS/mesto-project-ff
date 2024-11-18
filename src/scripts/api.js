const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/pwff-cohort-1", // Адрес сервера и идентификатор группы
  headers: {
    authorization: "18e33845-323e-4442-b707-086db8bdd7d8", // Токен авторизации
    "Content-Type": "application/json", // Тип контента
  },
};

// Функция для обработки ответа от сервера
const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`); // Если статус ответа не ок, отклоняем промис с ошибкой
  }
  return res.json(); // Возвращаем данные в формате JSON, если ответ успешный
};

// Функция для обработки ошибок
const handleError = (err, context) => {
  console.log(`Ошибка при ${context}:`, err); // Логируем ошибку с контекстом
  return Promise.reject(err); // Отклоняем промис с ошибкой
};

// Получение профиля пользователя
export const getUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(handleResponse) // Обрабатываем ответ
    .catch((err) => handleError(err, "получении данных профиля")); // Логируем ошибку с контекстом
};

// Обновление профиля
export const updateUserProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH", // Метод PATCH для обновления данных
    headers: config.headers,
    body: JSON.stringify({ name, about }), // Отправляем данные в теле запроса
  })
    .then(handleResponse) // Обрабатываем ответ
    .catch((err) => handleError(err, "обновлении профиля")); // Логируем ошибку с контекстом
};

// Получение карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then(handleResponse) // Обрабатываем ответ
    .catch((err) => handleError(err, "получении карточек")); // Логируем ошибку с контекстом
};

// Добавление новой карточки
export const addCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST", // Метод POST для добавления новой карточки
    headers: config.headers,
    body: JSON.stringify(cardData), // Отправляем данные карточки в теле запроса
  })
    .then(handleResponse) // Обрабатываем ответ
    .catch((err) => handleError(err, "добавлении карточки")); // Логируем ошибку с контекстом
};

// Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE", // Метод DELETE для удаления карточки
    headers: config.headers,
  })
    .then(handleResponse) // Обрабатываем ответ
    .catch((err) => handleError(err, "удалении карточки")); // Логируем ошибку с контекстом
};

// Лайк/отлайк карточки
export const toggleLike = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? "PUT" : "DELETE", // Если лайкнули, используем PUT, если отлайкнули — DELETE
    headers: config.headers,
  })
    .then(handleResponse) // Обрабатываем ответ
    .catch((err) => handleError(err, "обработке лайков карточки")); // Логируем ошибку с контекстом
};

// Обновление аватара пользователя
export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH", // Метод PATCH для обновления аватара
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }), // Отправляем ссылку на новый аватар
  })
    .then(handleResponse) // Обрабатываем ответ
    .catch((err) => handleError(err, "обновлении аватара")); // Логируем ошибку с контекстом
};
