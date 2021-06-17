import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import FormInput from './Form/FormInput';
import { func, bool } from 'prop-types';

AddPlacePopup.propTypes = {
  onClose: func.isRequired,
  onAddPlace: func.isRequired,
  open: bool,
  submitting: bool,
};

function AddPlacePopup({
  onClose,
  onAddPlace,
  submitting = false,
  open = false,
}) {
  const defaultFormState = {
    name: {
      value: '',
      valid: false,
    },
    link: {
      value: '',
      valid: false,
    },
  };
  const [form, setForm] = useState(defaultFormState);
  const [formValid, setFormValid] = useState(false);

  const handleClose = () => {
    setForm(defaultFormState);
    onClose();
  };

  const handleInput = (value, name, valid) => {
    setForm({
      ...form,
      [name]: { value, valid },
    });
  };

  const clearForm = () => {
    setForm(defaultFormState);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, link } = form;
    onAddPlace({ name: name.value, link: link.value }, clearForm);
  };

  useEffect(() => {
    if (form.name.valid && form.link.valid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [form]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={open}
      disabled={!formValid}
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitting={submitting}
    >
      <FormInput
        value={form.name.value}
        onChange={handleInput}
        type="text"
        name="name"
        id="place-input"
        placeholder="Название"
        className="form__input form__input_style_light form__input_type_card-name"
        required
        minLength="2"
        maxLength="30"
      />
      <FormInput
        value={form.link.value}
        onChange={handleInput}
        type="url"
        name="link"
        id="link-input"
        placeholder="Ссылка на картинку"
        className="form__input form__input_style_light form__input_type_link"
        required
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
