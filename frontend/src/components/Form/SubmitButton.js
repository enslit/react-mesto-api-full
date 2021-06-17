import React from 'react';
import Loader from '../Loader';
import { bool, oneOf, string } from 'prop-types';

SubmitButton.propTypes = {
  title: string.isRequired,
  isFetching: bool,
  disabled: bool,
  style: oneOf(['dark', 'light']),
};

function SubmitButton({
  title,
  style = 'dark',
  isFetching = false,
  disabled = false,
}) {
  return (
    <button
      type="submit"
      name="save"
      className={`form__save form__save_style_${style} ${
        disabled ? 'form__save_disabled' : ''
      }`}
      disabled={disabled || isFetching}
    >
      {isFetching ? (
        <Loader size={30} color={style === 'dark' ? '#000' : '#fff'} />
      ) : (
        title
      )}
    </button>
  );
}

export default SubmitButton;
