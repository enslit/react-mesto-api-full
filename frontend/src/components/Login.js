import React from 'react';
import { func, bool } from 'prop-types';
import FormInput from './Form/FormInput';
import Form from './Form/Form';
import SubmitButton from './Form/SubmitButton';

Login.propTypes = {
  onLogin: func,
  fetching: bool,
};

function Login({ onLogin }) {
  return (
    <main className="content">
      <Form
        name="sign-in"
        className="form form_type_auth"
        initFormValues={{
          email: '',
          password: '',
        }}
        onSubmit={onLogin}
      >
        {({ form, state, handleInput }) => (
          <>
            <div className="form__body">
              <h1 className="form__title">Вход</h1>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                id="username-input"
                className="form__input form__input_type_email form__input_style_dark"
                required
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
                onChange={handleInput}
                value={form.password.value}
              />
            </div>
            <div className="form__actions">
              <SubmitButton
                title="Войти"
                disabled={!state.valid}
                isFetching={state.submitting}
                style="dark"
              />
            </div>
          </>
        )}
      </Form>
    </main>
  );
}

export default Login;
