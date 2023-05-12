const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'users';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req,res){
    var spawn = require("child_process").spawn;
    var process = spawn('python', ['./build_file.py', JSON.stringify(req.body)]);
    res.sendFile(__dirname+"/public/download.html");

    client.connect(err => {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        console.log('Connected to MongoDB Atlas...');
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.insertOne(req.body, function(err, result) {
            if (err) {
                console.log('Error occurred while inserting data into MongoDB...\n',err);
            }
            console.log('Data inserted into MongoDB...');
            client.close();
        });
    });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, function(){
    console.log("Server is active");
});
