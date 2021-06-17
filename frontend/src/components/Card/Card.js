import React, { useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';
import Loader from '../Loader';
import { string, func, arrayOf, shape } from 'prop-types';

Card.propTypes = {
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
  onCardClick: func.isRequired,
  onCardLike: func.isRequired,
  onCardDelete: func.isRequired,
};

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const [isLikeFetching, setIsLikeFetching] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const { _id: userId } = currentUser;

  const isOwner = card.owner._id === userId;
  const isLiked = card.likes.some((user) => user._id === userId);

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card, setIsLikeFetching);
  };

  const handleDeleteClick = () => {
    onCardDelete(card._id);
  };

  return (
    <li className="cards__list-item">
      <article className="card">
        {isOwner && <DeleteButton onClickDelete={handleDeleteClick} />}
        <img
          src={card.link}
          alt={card.name}
          className="card__image"
          onClick={handleCardClick}
        />
        <div className="card__description">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like">
            {isLikeFetching ? (
              <Loader size={30} color="black" />
            ) : (
              <LikeButton
                onClickLike={handleLikeClick}
                isLiked={isLiked}
                count={card.likes.length}
              />
            )}
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;
