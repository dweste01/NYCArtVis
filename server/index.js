'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

// bundle needs this line
app.use('/files', express.static(path.join(__dirname, '../public')));

app.use(express.static(path.join(__dirname, '../node_modules')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../browser/index.html'))
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(process.env.PORT || 3000, function () {
  console.log("listening on port 3000");
})


const permanentJsonUrl = 'https://www.nycgovparks.org//art-monuments-map/json'
const mongoUrl = 'mongodb://localhost:27017/publicArtVis';

let mc = new MongoClient();
// let db = new mc.db();

axios.get(permanentJsonUrl)
.then(res => res.data)
.then(result => {
  mc.connect(mongoUrl, {}, function(err, db) {
    assert.equal(null, err);

    const col = db.collection('insertPOIs');
    col.insertMany(result, function(err, item) {
      console.log("err: ", err, "Item: ", item)
    });
    // db.insertMany(result);
  })
}).catch(console.error)

module.exports = app;