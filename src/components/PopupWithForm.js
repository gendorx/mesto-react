import React from "react";

export default class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleEscClose = this.handleEscClose.bind(this);
  }

  handleEscClose(evt) {
    if (evt.key === "Escape") return this.props.onClose();
  }

  render() {
    const classesNames = ["popup", `popup_type_${this.props.name}`];

    if (this.props.isOpen) classesNames.push("popup_opened");

    return (
      <div className={classesNames.join(" ")}>
        <div className="popup__container">
          <button
            className="popup__close button-icon button-icon_type_close"
            onClick={this.props.onClose}
          ></button>
          <h2 className="popup__title">{this.props.title}</h2>
          <form
            className="form"
            name={`form_${this.props.name}`}
            noValidate
          >
            {this.props.children}
          </form>
        </div>
      </div>
    );
  }
}
