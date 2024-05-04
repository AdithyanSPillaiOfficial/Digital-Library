const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const auth = require('./handlers/auth');
const getbooks = require('./handlers/getbooks');
const path = require('path');
const uploadresource = require('./handlers/uploadresource');
const verifyRole = require('./utilities/roleverify');
const adduser = require('./handlers/adduser');
const markaccess = require('./handlers/markaccess');
const fs = require('fs').promises;
//const cors = require('cors');
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

//app.use(cors());

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

app.use('/thumbnail', express.static(path.join(__dirname, 'thumb')));
app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.post('/auth', auth)
app.post('/verifyrole', verifyRole)
app.post('/adduser',adduser)
app.post('/markaccess', markaccess);

app.post('/getbooks', getbooks)





var name = 'somename.pdf';


async function checkDir(directoryPath) {
    try {
        await fs.access(directoryPath, fs.constants.F_OK); // Check if directory exists
        console.log('Directory already exists:', directoryPath);
        return directoryPath;
    } catch (err) {
        try {
            await fs.mkdir(directoryPath, { recursive: true }); // Create directory
            console.log('Directory created successfully:', directoryPath);
            return directoryPath;
        } catch (err) {
            console.error('Error creating directory:', err);
            return null;
        }
    }
}

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const [department, semester, subject, filename] = file.originalname.split('-');

        const directoryPath = await checkDir(`resources/${department}/${semester}/${subject}/`);

        // Check if the directory exists
        console.log(directoryPath);


        cb(null, directoryPath)
    },
    filename: function (req, file, cb) {
        console.log(req.body);
        const [department, semester, subject, filename] = file.originalname.split('-');

        //const filename = `${name.replace(/\s/g, '_')}.pdf`;
        cb(null, filename)
    }
});

const upload = multer({ storage: storage });



//app.post('/uploadresource',upload.array('file',100),uploadresource);

app.post('/uploadresource', upload.array('pdfs', 100), uploadresource);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});