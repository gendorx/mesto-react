import { Component } from "react";
import { api } from "../utils/constants";

export class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardRemoved: false,
      likesCount: this.props.data.likes.length,
      isLiked: this.props.data.likes.some(
        (a) => a._id === this.props.profileId
      ),
    };

    this.deleteCard = this.deleteCard.bind(this);
    this.cardClick = this.cardClick.bind(this);
    this.toogleLike = this.toogleLike.bind(this);
  }

  deleteCard() {
    this.setState({
      ...this.state,
      cardRemoved: true,
    });
  }

  async toogleLike() {
    const { data } = this.props;
    let response;

    if (this.state.isLiked) {
      response = await api.removeLikeCard(data._id);
    } else {
      response = await api.addLikeCard(data._id);
    }

    this.setState({
      ...this.state,
      likesCount: response.likes.length,
      isLiked: !this.state.isLiked,
    });
  }

  cardClick() {
    this.props.onCardClick(this.props.data);
  }

  render() {
    if (this.state.cardRemoved) return;

    const { data } = this.props;
    const classNamesLikeButton = ["element__like"];

    if (this.state.isLiked) classNamesLikeButton.push("element__like_active");

    return (
      <article className="element">
        {data.owner._id === this.props.profileId && (
          <button
            onClick={this.deleteCard}
            className="element__delete button-icon button-icon_type_delete"
          ></button>
        )}
        <img
          src={data.link}
          alt={data.name}
          className="element__image"
          onClick={this.cardClick}
        />
        <div className="element__group">
          <h2 className="element__title">{data.name}</h2>
          <div className="element__like-group">
            <button
              type="button"
              className={classNamesLikeButton.join(" ")}
              onClick={this.toogleLike}
            ></button>
            <span className="element__likes-count">
              {this.state.likesCount}
            </span>
          </div>
        </div>
      </article>
    );
  }
}
