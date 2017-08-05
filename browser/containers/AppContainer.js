import React from 'react';
import axios from 'axios';
import * as d3 from 'd3'
import Graph from '../components/Graph'


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
			this.setState({'permPOIs': r})
		})
		.catch(console.error)
	}

	render() {
		// const scale = d3.scaleLinear();
		// const yAxis = d3.axisLeft(scale);
		// // d3.selectAll("div").style("color", "red");
		// // d3.axisBottom();
		// // d3.axisLeft();
		// d3.select("graph").append("svg")
	 //    .attr("width", 1440)
	 //    .attr("height", 30)
	 //  	.append("g")
	 //    .attr("transform", "translate(0,30)")
	 //    .call(yAxis);
		return (
			<div>
				<div>
				{
					this.state.permPOIs.map((poi, idx) => {
						return (<span key={idx}> {poi.name}</span>)
					})
				}
				</div>
				<svg id="visualisation" width="1000" height="500"></svg>
				<Graph pois={this.state.permPOIs}/>
			</div>
		)
	}
}