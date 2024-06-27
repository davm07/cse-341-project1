const { body, validationResult } = require('express-validator');
const validator = {};

validator.contactRules = () => {
  return [
    body('firstName').isLength({ min: 5 }),
    body('lastName').isLength({ min: 5 }),
    body('email').trim().isEmail().normalizeEmail(),
    body('favoriteColor').isLength({ min: 2 }),
    body('birthday').isDate()
  ];
};

validator.validateContact = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = validator;
