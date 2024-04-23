module.exports = async function (req, res) {
    const database = require('../conector')
    const { sessionid, prompt } = req.body;
    const collectionName = 'books';
    const booksCollection = database.collection(collectionName);
    try {
        // Aggregation pipeline to match, count matches, and sort by count
        const pipeline = [
            {
                $match: {
                    $or: [
                        { name: { $in: prompt.split(/\s+/i) } }, // Case-insensitive regex match for name
                        { subject: { $regex: prompt, $options: 'i' } }, // Case-insensitive regex match for subject
                        { subtopics: { $elemMatch: { $regex: prompt, $options: 'i' } } }, // Case-insensitive regex match for subtopics
                        { tags: { $in: prompt.split(/\s+/i) } } // Match any of the elements in the tags array individually
                    ]
                }
            },
            {
                $addFields: {
                    // Count the number of matches for each book
                    matchCount: {
                        $add: [
                            { $size: { $ifNull: ["$subtopics", []] } }, // Count subtopics
                            { $size: { $filter: { input: "$subtopics", as: "subtopic", cond: { $regexMatch: { input: "$$subtopic", regex: prompt, options: "i" } } } } }, // Count matched subtopics
                            { $cond: { if: { $regexMatch: { input: "$subject", regex: prompt, options: "i" } }, then: 1, else: 0 } }, // Count subject match
                            { $cond: { if: { $regexMatch: { input: "$name", regex: prompt, options: "i" } }, then: 1, else: 0 } }, // Count name match
                            { $size: { $ifNull: ["$tags", []] } }, // Count all tags
                            { $size: { $filter: { input: "$tags", as: "tag", cond: { $regexMatch: { input: "$$tag", regex: prompt, options: "i" } } } } } // Count matched tags
                        ]
                    }
                }
            },
            { $sort: { matchCount: -1 } } // Sort by match count in descending order
        ];

        const books = await booksCollection.aggregate(pipeline).toArray();


        console.log("Books matching the prompt:", books);
        res.json({ status: 'sucess', rescount: books.length, results: books });
    } catch (error) {
        console.error("Error querying MongoDB:", error);
        res.status(500).json({ status: 'failed' });
    }
}