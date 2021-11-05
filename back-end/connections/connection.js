const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const DB_URL = process.env.DB_URL_LOCAL; // mongodb local
const DB_URL = process.env.DB_UR_ONLINE // moongodb online: atlas
const DB_NAME = process.env.DB_NAME;

const connection = async () => {
  try {
    const connectionMongodb = await MongoClient.connect(DB_URL, OPTIONS);
    global.db = await connectionMongodb.db(DB_NAME);
    console.log(`Connection to mongodb - database ${DB_NAME}`);
    return global.db;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = connection;
