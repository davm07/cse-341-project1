const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res, next) => { 
    const result = await mongodb.getDb().db('project1').collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    })
}

const getContact = async (req, res, next) => {
    const result = await mongodb.getDb().db('project1').collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
}

module.exports = {
    getAllContacts,
    getContact
}
