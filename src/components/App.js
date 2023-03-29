import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import { api } from "../utils/constants";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isImagePopupOpened: false,
      selectedCard: {},
    };

    this.handleEditAvatarClick = this.handleEditAvatarClick.bind(this);
    this.handleAddPlaceClick = this.handleAddPlaceClick.bind(this);
    this.handleEditProfileClick = this.handleEditProfileClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);

    this.submitEditProfile = this.submitEditProfile.bind(this)

    this.closeAllPopups = this.closeAllPopups.bind(this);
  }

  handleEditAvatarClick() {
    this.setState({ ...this.state, isEditAvatarPopupOpen: true });
  }

  handleEditProfileClick() {
    this.setState({ ...this.state, isEditProfilePopupOpen: true });
  }

  handleAddPlaceClick() {
    this.setState({ ...this.state, isAddPlacePopupOpen: true });
  }

  handleCardClick(card) {
    this.setState({
      ...this.state,
      isImagePopupOpened: true,
      selectedCard: card,
    });
  }

  onSubmitForm(data) {
    api.setUserInfo(data)
  }

  closeAllPopups() {
    this.setState({
      ...this.state,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isImagePopupOpened: false,
    });
  }

  render() {
    return (
      <>
        <Header />
        <Main
          onEditProfile={this.handleEditProfileClick}
          onAddPlace={this.handleAddPlaceClick}
          onEditAvatar={this.handleEditAvatarClick}
          onCardClick={this.handleCardClick}
        />
        <Footer />

        <PopupWithForm
          title="Редактировать профиль"
          name="editor-profile"
          isOpen={this.state.isEditProfilePopupOpen}
          onClose={this.closeAllPopups}
          onSubmit={this.submitEditProfile}
        >
          <label className="form__field" htmlFor="editProfile-name">
            <input
              id="editProfile-name"
              name="name"
              className="form__input form__input_type_name"
              type="text"
              required
              placeholder="Имя"
              minLength="2"
              maxLength="40"
            />

            <span className="editProfile-name-error form__input-error"></span>
          </label>

          <label className="form__field" htmlFor="editProfile-about">
            <input
              id="editProfile-about"
              name="about"
              className="form__input form__input_type_desc"
              type="text"
              required
              placeholder="О себе"
              minLength="2"
              maxLength="200"
            />

            <span className="editProfile-about-error form__input-error"></span>
          </label>

          <button className="popup__submit" type="submit">
            Сохранить
          </button>
        </PopupWithForm>

        <PopupWithForm
          title="Новое место"
          name="add-element"
          isOpen={this.state.isAddPlacePopupOpen}
          onClose={this.closeAllPopups}
        >
          <label className="form__field" htmlFor="addPlace-name">
            <input
              id="addPlace-name"
              name="name"
              className="form__input form__input_type_title-place"
              type="text"
              required
              placeholder="Название"
              minLength="2"
              maxLength="30"
            />

            <span className="addPlace-name-error form__input-error"></span>
          </label>

          <label className="form__field" htmlFor="addPlace-link">
            <input
              id="addPlace-link"
              name="link"
              className="form__input form__input_type_url-place"
              type="url"
              required
              placeholder="Ссылка на картинку"
            />

            <span className="addPlace-link-error form__input-error"></span>
          </label>

          <button className="popup__submit" type="submit">
            Создать
          </button>
        </PopupWithForm>

        <PopupWithForm
          title="Обновить аватар"
          name="edit-photo"
          isOpen={this.state.isEditAvatarPopupOpen}
          onClose={this.closeAllPopups}
        >
          <label className="form__field" htmlFor="editPhotoProfile-avatar">
            <input
              id="editProfile-avatar"
              name="avatar"
              className="form__input form__input_type_url"
              type="url"
              required
              placeholder="Ссылка на фотографию"
            />

            <span className="editProfile-avatar-error form__input-error"></span>
          </label>

          <button className="popup__submit" type="submit">
            Сохранить
          </button>
        </PopupWithForm>

        <PopupWithForm title="Вы уверены?" name="confirm">
          <input type="hidden" name="cardId" id="formConfirm_id" />
          <button className="popup__submit" type="submit">
            Да
          </button>
        </PopupWithForm>

        <ImagePopup
          isOpen={this.state.isImagePopupOpened}
          onClose={this.closeAllPopups}
          card={this.state.selectedCard}
        />
      </>
    );
  }
}
