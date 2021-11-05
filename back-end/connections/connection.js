const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// mongodb local
// const DB_URL = process.env.DB_URL;

// moongodb online: atlas
const DB_URL = 'mongodb+srv://lmuffato:NCj@Xud-QfrTt7E@cluster0.xnggi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
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
