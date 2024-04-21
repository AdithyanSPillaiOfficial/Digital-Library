module.exports = async function (req, res) {
    const database = require('../conector')
    const collectionName = "users";
    const collection = database.collection(collectionName);

    const sessionCollectionName = 'sessions';
    const sessionCollection = database.collection(sessionCollectionName);

    var users = [];

    try {
        const cursor = await collection.find({uname:req.body.uname , password:req.body.password});
        users = await cursor.toArray();
        if (users.length == 1) {
            const currentISOTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            const currentYear = new Date().getFullYear();
            const insertResult = await sessionCollection.insertOne({
                'user_id': users[0]._id,
                'name': users[0].name,
                'uname': users[0].uname,
                'role': users[0].role,
                'login_time': currentISOTime
            });

            const userdetails = {
                'user_id': users[0]._id,
                'name': users[0].name,
                'uname': users[0].uname,
                'role': users[0].role,
                'login_time': currentISOTime,
                'department': users[0].dept,
                'year': currentYear-(users[0].acc_year.split('-')[0]),
                'accyear': users[0].acc_year,
                'sessionid': insertResult.insertedId,
                'profilepic': users[0].profilepic,
            }

            res.json({ 'status': 'sucess', 'sessionid':insertResult.insertedId, 'userdetails':userdetails})
        }
        else {
            res.json({'status' : 'Authentication Failed'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': error });
    }
}