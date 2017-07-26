import React from 'react';
import axios from 'axios';
import mongodb, { MongoClient } from 'mongodb'
import assert from 'assert';


const permanentJsonUrl = 'https://www.nycgovparks.org//art-monuments-map/json'
const mongoUrl = 'mongodb://localhost:27017/publicArtVis';

export default class AppContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// let mc = new MongoClient();
		// console.log(mc);
		// axios.get(permanentJsonUrl)
		// .then(res => res.data)
		// .then(result => {
		// 	console.log(result);
		// 	mc.connect(mongoUrl, {}, function(err, db) {
		// 		console.log("err: ", err)
		// 	  assert.equal(null, err);
			  
		// 	  this.insertDocuments(db, function() {
		// 	    db.close();
		// 	  })
		// 	});

		// }).catch(console.error)
	}

	insertDocuments(db, callback) {
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

	render() {	
		return (
			<div>hi</div>
		)
	}
}