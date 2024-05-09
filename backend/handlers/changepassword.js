const { ObjectId } = require("mongodb");
const database = require("../connector");

module.exports = async function (req, res) {
    const { sessionid, password } = req.body;

    var errorflag = false;

    try {

        const sessionCollection = database.collection('sessions');
        var documentId;

        const cursor = await sessionCollection.find({ _id: new ObjectId(sessionid) });
        session = await cursor.toArray();
        if (session.length == 1) {
            // Document ID
            documentId = session[0].user_id;
            console.log('User Found with User ID : ' + documentId);
        }
        else {
            //res.json({status : 'failed'})
            errorflag = true; //error occured
            console.log('Failed to find user')
        }

        


        // Select the collection
        const userCollection = database.collection('users');



        // Update the document
        const filter = { _id: new ObjectId(documentId) }; // Adjust the filter according to your document
        const update = {
            $set: {
                password: password
            }
        };

        await userCollection.updateOne(filter, update);

        if (errorflag == false) {
            res.json({ status: 'sucess' });
        }
        else if (errorflag == true) {
            res.json({ status: 'failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ status: 'failed' });
    }
}