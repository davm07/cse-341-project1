const router = require('express').Router();
const validator = require('../middleware/validate');

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContact);

router.post(
  '/',
  validator.contactRules(),
  validator.validateContact,
  contactsController.createContact
);
router.put(
  '/:id',
  validator.contactRules(),
  validator.validateContact,
  contactsController.updateContact
);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
