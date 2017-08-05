import React from 'react';
import axios from 'axios';
import * as d3 from 'd3'
import Graph from '../components/Graph'


const permanentJsonUrl = 'https://data.cityofnewyork.us/resource/g77k-nifh.json'
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
			<div>
				<div>
				{
					this.state.permPOIs.map((poi, idx) => {
						return (<span key={idx}> {poi.name}</span>)
					})
				}
				</div>
				<svg id="visualization" width="1000" height="500"></svg>
				<Graph pois={this.state.permPOIs}/>
			</div>
		)
	}
}