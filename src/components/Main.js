import { Component } from "react";
import ProfilePhoto from "../images/profile-photo.png";

import { api } from "../utils/constants";
import { Card } from "./Card";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      userDescription: "",
      userAvatar: "",
      userId: "",
      cards: [],
    };
  }

  async getDataServer() {
    const [profile, cards] = await Promise.all([
      api.getProfileInfo(),
      api.getInitialCards(),
    ]);

    this.setState({
      ...this.state,
      cards,
      userName: profile.name,
      userDescription: profile.about,
      userAvatar: profile.avatar,
      userId: profile._id,
    });
  }

  async submitEditProfile(data) {
    api.setUserInfo(data)
  }

  componentDidMount() {
    this.getDataServer();
  }

  render() {
    return (
      <>
        <main className="content">
          <section className="profile">
            <div className="profile__container">
              <div className="profile__photo-container">
                <img
                  className="profile__photo"
                  src={this.state.userAvatar || ProfilePhoto}
                  alt="Фотография профиля"
                />
                <div
                  onClick={this.props.onEditAvatar}
                  className="profile__photo-edit"
                ></div>
              </div>
              <div className="profile__info">
                <div className="profile__heading-container">
                  <h1 className="profile__heading">
                    {this.state.userName || "Загрузка..."}
                  </h1>
                  <button
                    type="button"
                    className="profile__button button-icon button-icon_type_edit profile__button_action_edit"
                    onClick={this.props.onEditProfile}
                  ></button>
                </div>
                <p className="profile__desc">
                  {this.state.userDescription || "Загрузка..."}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="profile__button button-icon button-icon_type_add profile__button_action_add"
              onClick={this.props.onAddPlace}
            ></button>
          </section>

          <section className="elements">
            {this.state.cards.length > 0 ? this.state.cards.map((card) => (
              <Card
                key={card._id}
                data={card}
                profileId={this.state.userId}
                onCardClick={this.props.onCardClick}
              />
            )) : "Немного подождите, пока загрузятся данные..."}
          </section>
        </main>
      </>
    );
  }
}
