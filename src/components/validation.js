function validateName(inputElement) {
    const name = inputElement.value.trim();
    const errorMessageElement = document.querySelector('.error-message_name');
    if (name === "" || name.length < 2 || name.length > 40) {
        inputElement.setCustomValidity("Имя должно быть от 2 до 40 символов");
    } else {
        inputElement.setCustomValidity("");
    }
};


function validateDescription(inputElement) {

};

export {validateName, validateDescription};