const { MongoClient } = require('mongodb');
require('dotenv').config();

//initialise database access and establish connection to database
const username = encodeURIComponent(process.env.DB_UNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const conuri = `mongodb+srv://${username}:${password}@cluster0.kf2qhwd.mongodb.net/?retryWrites=true&w=majority`;

var database;
try {
    const client = new MongoClient(conuri);
    client.connect();
    const dbName = "DigitalLibraryCCET";
    database = client.db(dbName);

} catch (error) {
    console.log("[-] Error - Unable to connect to the database" + error);
}

module.exports = database;