import React from 'react';
import FormInput from './Form/FormInput';
import { Link } from 'react-router-dom';
import { bool, func } from 'prop-types';
import SubmitButton from './Form/SubmitButton';
import Form from './Form/Form';

Register.propTypes = {
  onSignUp: func,
  fetching: bool,
};

function Register({ onSignUp }) {
  return (
    <main className="content">
      <Form
        name="sign-up"
        className="form form_type_auth"
        initFormValues={{
          email: '',
          password: '',
        }}
        onSubmit={onSignUp}
      >
        {({ form, state, handleInput }) => (
          <>
            <div className="form__body">
              <h1 className="form__title">Регистрация</h1>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                id="username-input"
                className="form__input form__input_type_email form__input_style_dark"
                required
                minLength="2"
                maxLength="40"
                onChange={handleInput}
                value={form.email.value}
              />
              <FormInput
                type="password"
                name="password"
                placeholder="Пароль"
                id="password-input"
                className="form__input form__input_type_password form__input_style_dark"
                required
                minLength="6"
                maxLength="40"
                onChange={handleInput}
                value={form.password.value}
              />
            </div>
            <div className="form__actions">
              <SubmitButton
                title="Зарегистрироваться"
                disabled={!state.valid}
                isFetching={state.submitting}
                style="dark"
              />
              <div className="form__after-save">
                Уже зарегистрированы?{' '}
                <Link to="/sign-in" className="link form__link">
                  Войти
                </Link>
              </div>
            </div>
          </>
        )}
      </Form>
    </main>
  );
}

export default Register;
