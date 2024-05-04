const database = require("../connector");

module.exports = async function (req,res) {
    const {sessionid,name,email,admno,accyear,department,role,username,password} = req.body;

    console.log(`[+] Add User Request Received \n --> Name : ${name}`);

    const userObj = {
        name : name,
        email : email,
        adm_no : admno,
        dept : department,
        acc_year : accyear,
        role : role,
        uname : username,
        password : password,
        saved : [],
        recent : [],
        profilepic : "https://img.lovepik.com/free-png/20210923/lovepik-cartoon-creative-boy-reading-book-by-books-png-image_401272853_wh1200.png",
    }

    const collection = database.collection('users');
    try {
        const result = await collection.insertOne(userObj);
        console.log(`[✔]---> User Added User ID : ${result.insertedId}`);
        res.json({status:'sucess'});
    } catch (error) {
        console.error(error);
        res.json({status:'failed',error: 'Internal Server Error'});
    }


    
}