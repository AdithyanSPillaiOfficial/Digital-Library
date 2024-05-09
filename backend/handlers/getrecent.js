const { ObjectId } = require("mongodb");
const database = require("../connector");

module.exports = async function (req,res) {
    const {userid} = req.body;
    const collection = database.collection('users')
    var savedbookObj = [];
    try {
        const cursor = await collection.find({_id : new ObjectId(userid)});
        users = await cursor.toArray();
        if (users.length == 1) {

            const saved = users[0].recent;
            

            // Use Promise.all to wait for all asynchronous operations
            await Promise.all(saved.map(async (element) => {
                const bookCollection = database.collection('books');
                const bookcursor = await bookCollection.find({ _id: new ObjectId(element) });
                const books = await bookcursor.toArray();
                savedbookObj.push(books[0]); // Push the book object directly
            }));
            
            res.json({ 'status': 'sucess', 'recent' : savedbookObj});
        }
        else {
            res.json({'status' : 'Authentication Failed'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': error });
    }
}