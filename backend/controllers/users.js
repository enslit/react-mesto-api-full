const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError, ConflictError } = require('../utils/httpErrors');

module.exports.getUsers = (req, res, next) =>
  User.find({})
    .then((users) => res.json(users))
    .catch(next);

module.exports.getUserProfile = (req, res, next) =>
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }

      return res.json(user);
    })
    .catch(next);

module.exports.createUser = async (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  return User.findOne({ email })
    .exec()
    .then((user) => {
      if (user) {
        throw new ConflictError(
          'Пользователь с таким email уже зарегистрирован'
        );
      }
    })
    .then(() => bcrypt.hash(password, 10))
    .then((passwordHash) =>
      User.create({
        email,
        password: passwordHash,
        name,
        about,
        avatar,
      })
    )
    .then(() => res.status(201).json({ message: 'Пользователь создан' }))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user, { name, about })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new Error('Что-то пошло не так. Пользователь не обновлен');
      }

      return res.json(updatedUser);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) =>
  User.findByIdAndUpdate(req.user, { avatar: req.body.avatar })
    .then((updatedUser) => res.json(updatedUser))
    .catch(next);

module.exports.login = (req, res, next) =>
  User.findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      const { JWT_SECRET = 'dev-key' } = process.env;
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });

      return res.json({ message: 'Authorized' });
    })
    .catch(next);
