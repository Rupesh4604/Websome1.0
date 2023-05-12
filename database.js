const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'users';

MongoClient.connect(url, { auth: { user: 'username', password: 'password' } }, function(err, client) {
    if (err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    console.log('Connected to MongoDB Atlas...');
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.find({}).toArray(function(err, docs) {
        if (err) {
            console.log('Error occurred while fetching data from MongoDB...\n',err);
        }
        console.log('Data fetched from MongoDB...\n',docs);
        client.close();
    });
});
