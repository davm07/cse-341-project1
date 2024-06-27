/* eslint-disable no-unused-vars */
const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const result = await mongodb.getDb().db('project1').collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid id' });
    return;
  }
  const result = await mongodb
    .getDb()
    .db('project1')
    .collection('contacts')
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!result) {
    res.status(404).json({ message: 'Invalid id' });
    return;
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const result = await mongodb.getDb().db('project1').collection('contacts').insertOne({
      firstName: firstName,
      lastName: lastName,
      email: email,
      favoriteColor: favoriteColor,
      birthday: birthday
    });

    const id = result.insertedId.toString();
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ _id: id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact' });
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid id' });
    return;
  }
  try {
    const id = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    // const contactData = Object.fromEntries(
    //   Object.entries({ firstName, lastName, email, favoriteColor, birthday }).filter(
    //     ([key, value]) => value !== undefined
    //   )
    // );
    const contactData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      favoriteColor: favoriteColor,
      birthday: birthday
    };

    const result = await mongodb
      .getDb()
      .db('project1')
      .collection('contacts')
      .findOneAndUpdate(
        { _id: id },
        { $set: contactData },
        { returnNewDocument: true, projection: { _id: 0 } }
      );

    if (!result) {
      res.status(404).json({ message: 'Invalid id' });
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact' });
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid id' });
    return;
  }
  try {
    const id = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('project1')
      .collection('contacts')
      .deleteOne({ _id: id });
    res.setHeader('Content-Type', 'application/json');

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
};
