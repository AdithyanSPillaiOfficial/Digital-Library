const { ObjectId } = require('mongodb');

async function verifyRole(req,res){
    const database = require('../connector')
    const collectionName = "sessions";
    const collection = database.collection(collectionName);


    var users = [];

    try {
        const cursor = await collection.find({'_id' : new ObjectId(req.body.sessionid) , 'role' : req.body.role});
        users = await cursor.toArray();
        if (users.length == 1) {
            

            res.json({ 'status': 'sucess'})
        }
        else {
            res.json({'status' : 'Verification Failed'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': error });
    }
}

module.exports = verifyRole;