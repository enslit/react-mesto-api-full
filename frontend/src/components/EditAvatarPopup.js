import React from 'react';
import PopupWithForm from './PopupWithForm';
import { func, bool } from 'prop-types';

EditAvatarPopup.propTypes = {
  onClose: func.isRequired,
  onUpdateAvatar: func.isRequired,
  open: bool,
  submitting: bool,
};

function EditAvatarPopup({
  onClose,
  onUpdateAvatar,
  open = false,
  submitting = false,
}) {
  const ref = React.useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value,
    });
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-profile"
      isOpen={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitting={submitting}
    >
      <label className="form__field">
        <input
          ref={ref}
          type="url"
          name="avatar"
          id="avatar-input"
          className="form__input form__input_type_link form__input_style_light"
          required
        />
        <span className="form__input-error avatar-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
