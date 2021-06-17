import React from 'react';
import Loader from './Loader';
import { string, func, bool, node } from 'prop-types';

PopupWithForm.propTypes = {
  title: string.isRequired,
  name: string.isRequired,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  onSubmit: func.isRequired,
  children: node.isRequired,
  submitting: bool,
  disabled: bool,
  buttonText: string,
};

function PopupWithForm(props) {
  const {
    title,
    name,
    isOpen,
    onClose,
    onSubmit,
    children,
    submitting = false,
    disabled = false,
    buttonText = 'Сохранить',
  } = props;
  const popupClasses = `popup popup_type_${name} ${
    isOpen ? 'popup_opened' : ''
  }`;
  const buttonClasses = `form__save form__save_style_light ${
    disabled && 'form__save_disabled'
  }`;

  return (
    <div className={popupClasses}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close btn btn_type_close"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          name={`form-${name}`}
          className={`form form_type_${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            name="save"
            className={buttonClasses}
            disabled={disabled}
          >
            {submitting ? (
              <Loader size={30} count={15} speed={700} />
            ) : (
              buttonText
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
