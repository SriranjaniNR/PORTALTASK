const express = require('express');
const app = express();
var mongoose = require('mongoose');
require('dotenv').config()

app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);


mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true});
const db =mongoose.connection;
db.on('error',(error) =>console.error(error))
db.once('open',() =>console.log("welcome"))



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const username =require('./app/username')
app.use('/username',username)
app.listen(3030, () => {
    console.log("port is 3030");
})