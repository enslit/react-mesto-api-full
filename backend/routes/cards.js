const router = require('express').Router();
const { Joi, celebrate, Segments } = require('celebrate');
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      link: Joi.string().required().regex(
        /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+\.(png|jpg)/
      ),
    }),
  }),
  createCard
);

router.delete(
  '/:cardId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard
);

router.put(
  '/:cardId/likes',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  likeCard
);

router.delete(
  '/:cardId/likes',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  dislikeCard
);

module.exports = router;
