const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();
const { Joi, celebrate, Segments, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const errorLogger = require('./middlewares/errorLogger');
const clientErrorHandler = require('./middlewares/clientErrorHandler');
const { NotFountError } = require('./utils/httpErrors');
const { createUser, login } = require('./controllers/users');

const {
  SERVER_PORT = 5000,
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'mestodb',
} = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});

app.use(cors({ origin: 'http://localhost' }));
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(helmet());

app.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login
);

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      name: Joi.string(),
      about: Joi.string(),
      avatar: Joi.string().regex(
        /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+\.(png|jpg)/
      ),
    }),
  }),
  createUser
);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use(() => {
  throw new NotFountError('Запрашиваемый ресурс не найден');
});

app.use(errors());
app.use(errorLogger);
app.use(clientErrorHandler);

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Соединение с базой данных установлено');
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });

app.listen(SERVER_PORT, () => {
  console.log('Сервер был запущен на порту', SERVER_PORT);
});
