const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const auth = require('./handlers/auth');
const getbooks = require('./handlers/getbooks');
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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


app.get('/', async (req, res) => {
    res.json({ sucess: true, message: 'hello' });
});

app.get('/users', async (req, res) => {
    const collectionName = "users";
    const collection = database.collection(collectionName);

    var users = [];

    try {
        const cursor = await collection.find();
        users = await cursor.toArray();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': error });
    }


});


app.post('/auth',auth)


app.post('/getbooks',getbooks)



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});