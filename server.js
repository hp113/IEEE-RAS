const express = require('express');
const path = require('path');
const bodyparser=require("body-parser");
const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/hack', {useNewUrlParser: true});
    
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }

var registerSchema = new mongoose.Schema({
    name: String,
    email: String
});

var registered = mongoose.model('registered', registerSchema);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname));
// sendFile will go here
app.get('/', function(req, res) {
    // app.use(express.static(path.join(__dirname,'css')));
    console.log(__dirname);
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.post('/',(req, res)=>{
    var myData = new registered(req.body);
    console.log(myData);
    myData.save().then(()=>{
        res.send("Item saved")
    }).catch(()=>{
        res.status(400).send("Item  not saved")
    });
});

app.listen(port);
console.log('Server started at http://localhost:' + port);