import React from 'react';
import { bool, func, number } from 'prop-types';

LikeButton.propTypes = {
  isLiked: bool,
  count: number,
  onClickLike: func.isRequired,
};

function LikeButton({ onClickLike, isLiked = false, count = 0 }) {
  const classes = `btn btn_type_like ${isLiked && 'btn_type_like-active'}`;

  return (
    <>
      <button
        type="button"
        aria-label="Нравится"
        className={classes}
        onClick={onClickLike}
      />
      <span className="card__like-cnt">{count}</span>
    </>
  );
}

export default LikeButton;
