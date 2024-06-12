const express = require('express');
const router = require('express').Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContact);

module.exports = router;
