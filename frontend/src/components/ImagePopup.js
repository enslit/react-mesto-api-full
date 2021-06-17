import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';

ImagePopup.propTypes = {
  onClose: func.isRequired,
  card: shape({
    createdAt: string,
    likes: arrayOf(
      shape({
        about: string,
        avatar: string,
        cohort: string,
        name: string,
        _id: string,
      })
    ),
    link: string,
    name: string,
    owner: shape({
      about: string,
      avatar: string,
      cohort: string,
      name: string,
      _id: string,
    }),
    _id: string,
  }),
};

function ImagePopup({ card, onClose }) {
  const popupClasses = `popup popup_type_image ${card ? 'popup_opened' : ''}`;

  return (
    <div className={popupClasses}>
      <div className="popup__container popup__container_image">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close btn btn_type_close"
          onClick={onClose}
        />
        <img
          src={card && card.link}
          alt={card && card.name}
          className="popup__image"
        />
        <h2 className="popup__sign">{card && card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
