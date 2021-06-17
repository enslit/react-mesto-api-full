const router = require('express').Router();
const { Joi, celebrate, Segments } = require('celebrate');
const { getUserProfile } = require('../controllers/users');

const {
  getUsers,
  updateAvatar,
  updateProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserProfile);

router.patch(
  '/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      about: Joi.string().required(),
    }),
  }),
  updateProfile
);

router.patch(
  '/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .regex(
          /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+\.(png|jpg)/
        ),
    }),
  }),
  updateAvatar
);

module.exports = router;
