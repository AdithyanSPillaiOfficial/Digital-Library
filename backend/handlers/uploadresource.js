const database = require("../connector");

module.exports = async function (req,res) {
    const {sessionid,file,name,author,publisher,edition,year,department,semester,subject,type,subtopics,tags,thumbnail} = req.body;
    console.log("[+] Resource Upload Request Received \n --- Book Name : "+name);
    const collection = database.collection('books')
    const filename = `${name.replace(/\s/g, '_')}.pdf`;


    const insertBook = {
        name : name,
        author : author,
        publisher : publisher,
        edition : edition,
        year : year,
        department : department,
        semester : semester,
        subject : subject,
        subtopics : subtopics.split(','),
        type : type,
        tags : tags.split(','),
        locations : `/resources/${department}/${semester}/${subject.replace(/\s/g, '_')}/${filename}`,
        thumbnail : `/thumbnail/index.jpg`,
    }

    try {
        const result = await collection.insertOne(insertBook);
        console.log(`[f] : File : ${file}`)
        console.log(`[+] ---> Book ${filename} added with document ID ${result.insertedId}`);
        res.json({"status" : 'sucess'});
    } catch (error) {
        console.log(`[-] Error : ${error}`);
        res.json({status: 'false', error : error});
    }
}