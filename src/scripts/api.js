// api.js
const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/pwff-cohort-1", // Адрес сервера и идентификатор группы
  headers: {
    authorization: "18e33845-323e-4442-b707-086db8bdd7d8",
    "Content-Type": "application/json",
  },
};

// Функция для получения карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // обрабатываем ошибку
    });
};

// api.js
export const getUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log('Ошибка при получении данных профиля:', err);
    });
};
