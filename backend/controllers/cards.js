const Cards = require('../models/card');
const NotFountError = require('../utils/httpErrors/NotFountError');
const ForbiddenError = require('../utils/httpErrors/ForbiddenError');

module.exports.getCards = (req, res, next) =>
  Cards.find({})
    .then((cards) => res.json(cards))
    .catch(next);

module.exports.deleteCard = (req, res, next) =>
  Cards.findById(req.params.cardId)
    .exec()
    .then((card) => {
      if (!card) {
        throw new NotFountError(
          `Карточка с ID: ${req.params.cardId} не найдена`
        );
      }

      if (String(card.owner) !== req.user) {
        throw new ForbiddenError('Нарушение доступа');
      }

      return Cards.findByIdAndDelete(req.params.cardId);
    })
    .then((card) => res.json(card))
    .catch(next);

module.exports.createCard = (req, res, next) =>
  Cards.create({ name: req.body.name, link: req.body.link, owner: req.user })
    .then((card) => res.status(201).json(card))
    .catch(next);

module.exports.likeCard = (req, res, next) =>
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user } },
    { new: true }
  )
    .exec()
    .then((card) => {
      if (!card) {
        throw new NotFountError(
          `Карточка с ID: ${req.params.cardId} не найдена`
        );
      }

      return res.json(card);
    })
    .catch(next);

module.exports.dislikeCard = (req, res, next) =>
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user } },
    { new: true }
  )
    .exec()
    .then((card) => {
      if (!card) {
        throw new NotFountError(
          `Карточка с ID: ${req.params.cardId} не найдена`
        );
      }
      return res.json(card);
    })
    .catch(next);
