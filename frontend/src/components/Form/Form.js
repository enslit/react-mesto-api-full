import React, { useEffect, useState } from 'react';
import { func, object } from 'prop-types';

Form.propTypes = {
  initFormValues: object.isRequired,
  onSubmit: func.isRequired,
  children: func,
};

function Form({ initFormValues, onSubmit, children, ...props }) {
  const init = {};
  Object.keys(initFormValues).forEach((key) => {
    init[key] = {
      value: initFormValues[key]?.value ?? initFormValues[key],
      valid: initFormValues[key]?.valid ?? false,
    };
  });
  const [form, setForm] = useState(init);
  const [submitting, setSubmitting] = useState(false);
  const [valid, setValid] = useState(false);

  const handleInput = (value, name, valid) => {
    setForm({
      ...form,
      [name]: { value, valid },
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSubmitting(true);

    const values = {};
    Object.keys(form).forEach((field) => (values[field] = form[field].value));
    onSubmit(values, setSubmitting);
  };

  useEffect(() => {
    if (Object.keys(form).some((field) => form[field].valid === false)) {
      setValid(false);
    } else {
      setValid(true);
    }

    return () => null;
  }, [form]);

  const state = { submitting, valid };

  return (
    <form noValidate onSubmit={handleSubmit} {...props}>
      {children({ form, state, handleInput })}
    </form>
  );
}

export default Form;
