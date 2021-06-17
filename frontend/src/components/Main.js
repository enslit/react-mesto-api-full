import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card/Card';
import Loader from './Loader';
import { arrayOf, shape, func, bool, string } from 'prop-types';

Main.propTypes = {
  cards: arrayOf(
    shape({
      card: shape({
        createdAt: string,
        likes: arrayOf(
          shape({
            bout: string,
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
    })
  ),
  onCardLike: func.isRequired,
  onCardDelete: func.isRequired,
  onAddPlace: func.isRequired,
  onEditAvatar: func.isRequired,
  onEditProfile: func.isRequired,
  onCardClick: func.isRequired,
  loading: bool,
};

function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;
  const {
    cards,
    onCardLike,
    onCardDelete,
    onAddPlace,
    onEditAvatar,
    onEditProfile,
    onCardClick,
    loading = false,
  } = props;

  const buildCardList = (cardList) => {
    return (
      <ul className="cards__list">
        {cardList.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    );
  };

  return (
    <main className="content container">
      <section className="profile">
        <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
          <img src={avatar} alt="Аватар" className="profile__avatar" />
        </div>
        <div className="profile__details">
          <div className="profile__text">
            <h1 className="profile__name">{name}</h1>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="btn btn_type_edit-profile"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__about">{about}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить новую карточку"
          className="btn btn_type_add-card"
          onClick={onAddPlace}
        />
      </section>

      <section className="cards">
        {loading ? <Loader /> : buildCardList(cards)}
      </section>
    </main>
  );
}

export default Main;
