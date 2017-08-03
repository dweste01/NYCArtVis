import React from 'react';
import axios from 'axios';
import assert from 'assert';


const permanentJsonUrl = 'https://www.nycgovparks.org//art-monuments-map/json'
const mongoUrl = 'mongodb://localhost:27017/publicArtVis';

export default class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			permPOIs: []
		}

	}

	componentDidMount() {
		axios.get(permanentJsonUrl)
		.then(res => {
			let r = res.data;
			console.log(r);
			this.setState({'permPOIs': r})
		})
		.catch(console.error)
	}

	render() {	
		return (
			<div>{this.state.permPOIs.map((poi, idx) => {
				return (<div key={idx}>{poi.name}</div>)
			})}</div>
		)
	}
}