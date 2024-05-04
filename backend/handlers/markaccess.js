const { ObjectId } = require("mongodb");
const database = require("../connector");

module.exports = async function (req, res) {
    const { sessionid, resloc } = req.body;

    console.log(`User ${sessionid} Accessed ${resloc}`);
    var documentId, bookId, users,session,book;

    var errorflag = false;

    try {

        const sessionCollection = database.collection('sessions')

        const cursor = await sessionCollection.find({ _id: new ObjectId(sessionid) });
        session = await cursor.toArray();
        if (session.length == 1) {
            // Document ID
            documentId = session[0].user_id;
            console.log('User Found with User ID : '+documentId);
        }
        else {
            //res.json({status : 'failed'})
            errorflag = true; //error occured
            console.log('Failed to find user')
        }

        const booksCollection = database.collection('books');
        const bookCursor = await booksCollection.find({ locations : resloc });
        book = await bookCursor.toArray();
        if (book.length == 1) {
            // Document ID
            bookId = book[0]._id;
            console.log('Book found with Book ID : '+bookId)
        }
        else {
            //res.json({status : 'failed'})
            errorflag = true; //error occured
            console.log('Failed to find user Find Book')
        }



        // Select the collection
        const userCollection = database.collection('users');



        // Update the document
        const result = await userCollection.updateOne(
            { _id: documentId },
            { $push: { recent: { $each: [bookId], $position: 0 } } }
        );

        if(errorflag==false){
            res.json({status : 'sucess'});
        }
        else if(errorflag==true) {
            res.json({status : 'failed'});
        }

    } catch (error) {
        console.log(error);
        res.json({status : 'failed'});
    }
}