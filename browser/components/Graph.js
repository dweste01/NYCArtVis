import React from 'react';
import * as d3 from 'd3'

export default (props) => {
	// const scale = d3.scaleLinear();
	// const yAxis = d3.axisLeft(scale);
	// const xAxis = d3.axisBottom(scale);

	// xAxis.ticks(10);
	// yAxis.ticks(10);

	// d3.select("#graph").append("svg")
	// .attr("width", 80)
	// .attr("height", 80)
	// .append("g")
	// .attr("transform", "translate(0,30)")
	// .call(yAxis);

	// d3.select("#graph").append("svg")
	// .attr("width", 80)
	// .attr("height", 80)
	// .append("g")
	// .attr("transform", "translate(0,30)")
	// .call(xAxis);

	const vis = d3.select("#visualisation");
    const graphWidth = 1000;
    const graphHeight = 500;
    const graphMargins = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    }

    const xScale = d3.scaleLinear().range([graphMargins.left, graphWidth - graphMargins.right]).domain([0,2017])
    const yScale = d3.scaleLinear().range([graphHeight - graphMargins.top, graphMargins.bottom]).domain([0,215])

    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    vis.append('svg:g')
    	.attr("transform", "translate(0," + (graphHeight - graphMargins.bottom) + ")")
    	.call(xAxis);

    vis.append('svg:g')
    	.attr("transform", "translate(" + (graphMargins.left) + ",0)")
    	.call(yAxis);


	return (
		<p>Graph!</p>
	)
}