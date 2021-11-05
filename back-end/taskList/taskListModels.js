const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const connection = require('../connections/connection');

const app = express();
app.use(bodyParser.json());

const TABLE_NAME = 'taskList'; // Tabela do mongodb

const getAll = async () => {
  const db = await connection();
  const data = await db.collection(TABLE_NAME)
    .find({}).toArray();
  return data;
};

const getById = async (id) => {
  const db = await connection();
  return db.collection(TABLE_NAME)
    .findOne(ObjectId(id));
};

const create = async (obj) => {
  const db = await connection();
  await db.collection(TABLE_NAME)
    .insertOne(obj);
};

const remove = async (id) => {
  const db = await connection();
  await db.collection(TABLE_NAME)
    .deleteOne({ _id: ObjectId(id) });
};

const update = async (id, obj) => {
  const db = await connection();
  await db.collection(TABLE_NAME)
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: obj },
    );
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};

/*
db.taskList.insertOne({ 'status': 'progress', 'description': 'buy wine', 'initialDate': '2021-11-05T03:08:54.734Z', 'deadline': '2021-12-05T03:08:54.734Z' });
*/
