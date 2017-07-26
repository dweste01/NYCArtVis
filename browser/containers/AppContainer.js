import React from 'react';
import axios from 'axios'


const permanentJsonUrl = 'https://www.nycgovparks.org//art-monuments-map/json'

export default class AppContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("helloooo")
		axios.get(permanentJsonUrl)
		.then(res => res.data)
		.then(result => {
			console.log(result);
		})
	}

	render() {	
		return (
			<div>hi</div>
		)
	}
}