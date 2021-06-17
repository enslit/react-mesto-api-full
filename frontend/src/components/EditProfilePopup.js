import React, { useContext, useEffect, useMemo, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import FormInput from './Form/FormInput';
import { func, bool } from 'prop-types';

EditProfilePopup.propTypes = {
  onClose: func.isRequired,
  onUpdateUser: func.isRequired,
  open: bool,
  submitting: bool,
};

function EditProfilePopup({
  onClose,
  onUpdateUser,
  open = false,
  submitting = false,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const defaultFormState = useMemo(
    () => ({
      name: {
        value: currentUser.name,
        valid: true,
      },
      about: {
        value: currentUser.about,
        valid: true,
      },
    }),
    [currentUser]
  );
  const [form, setForm] = useState(defaultFormState);
  const [formValid, setFormValid] = useState(true);

  const handleInput = (value, name, valid) => {
    setForm({
      ...form,
      [name]: { value, valid },
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name: form.name.value,
      about: form.about.value,
    });
  };

  useEffect(() => {
    if (form.name.valid && form.about.valid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [form]);

  useEffect(() => {
    setForm(defaultFormState);
  }, [currentUser, open, setForm, defaultFormState]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={open}
      disabled={!formValid}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitting={submitting}
    >
      <FormInput
        type="text"
        name="name"
        id="name-input"
        className="form__input form__input_type_name form__input_style_light"
        required
        minLength="2"
        maxLength="40"
        value={form.name.value}
        onChange={handleInput}
      />
      <FormInput
        type="text"
        name="about"
        id="about-input"
        className="form__input form__input_type_about form__input_style_light"
        required
        minLength="2"
        maxLength="200"
        value={form.about.value}
        onChange={handleInput}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
