const setting = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

const showInputError = (formEl, inputEl, errorMsg,config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl,config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl,setting) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage,setting);
  } else {
    hideInputError(formEl, inputEl,setting);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};


const toggleButtonState = (inputList, buttonEl,config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl,config);
  } else
  {buttonEl.disabled = false;
  buttonEl.classList.remove(config.inactiveButtonClass)};

};

function disableButton (buttonEl,config) {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
};


const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, config);
  });
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonEl, setting);

  inputList.forEach((inputEl, config) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config,setting);
      toggleButtonState(inputList, buttonEl, setting);
      formEl.addEventListener("reset", () => {
    toggleButtonState(inputList, buttonEl, setting)
  });
    });

  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(setting);
