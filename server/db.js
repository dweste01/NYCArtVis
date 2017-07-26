'use strict';

const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  createCapped(db, function() {
    db.close();
  });
  
  insertDocuments(db, function() {
    db.close();
  })
});


const createCapped = function(db, callback) {
  db.createCollection("myCollection", { "capped": true, "size": 1000},
    function(err, results) {
      console.log("Collection created.");
      callback();
    }
  );
};

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([ {a : 1}, {a : 2}, {a : 3} ],
    function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
  });
}
