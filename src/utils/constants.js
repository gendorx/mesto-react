/** config for validation forms */

import Api from "./api";

export const validationConfig = {
  formInputSelector: ".form__input",
  formInputInvalidClass: "form__input_invalid",
  formSubmitSelector: ".popup__submit",
  formSubmitInactiveClass: "popup__submit_disabled",
  formErrorActiveClass: "form__input-error_show",
};

/** config for popups */

export const popupConfig = {
  popupContainerClass: "popup",
  popupCloseButtonClass: "popup__close",
  popupContainerActiveClass: "popup_opened",
  popupFormSelector: ".form",
  popupBigPictureSelector: ".popup__big-picture",
  popupBigAboutSelector: ".popup__picture-desc",
  inputSelector: ".form__input",
  submitSelector: ".popup__submit",
};

/** config for api */

const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "3c12d929-d321-40f7-9ea5-47a9cc856981",
    "Content-Type": "application/json",
  },
};

export const api = new Api(apiConfig)
