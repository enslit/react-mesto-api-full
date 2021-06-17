import React from 'react';
import { func } from 'prop-types';

DeleteButton.propTypes = {
  onClickDelete: func.isRequired,
};

function DeleteButton({ onClickDelete }) {
  return (
    <button
      type="button"
      aria-label="Удалить"
      className="card__delete btn btn_type_delete"
      onClick={onClickDelete}
    />
  );
}

export default DeleteButton;
