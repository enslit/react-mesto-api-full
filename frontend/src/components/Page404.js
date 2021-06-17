import React from 'react';
import { Link } from 'react-router-dom';

function Page404() {
  return (
    <main className="container page-404">
      <h1 className="page-404__title">404</h1>
      <p className="page-404__text">Страница не найдена</p>
      <Link to="/" className="link">
        Перейти на главную
      </Link>
    </main>
  );
}

export default Page404;
