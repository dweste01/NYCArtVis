import React from 'react';
import * as d3 from 'd3'

export default (props) => {

	//calculate POIs per year
	const dataSet = {'unknown': 0};

	props.pois.forEach(poi => {
		// undefined years
		if (!poi.dedicated) {
			dataSet.unknown++;
		} else {
			// clean date - find the first four digit number
			let year = poi.dedicated.match(/\d{4}/)
			if (year) {
				// insert or increment
				if (dataSet[year[0]]) {
					dataSet[year[0]]++;
				} else {
					dataSet[year[0]] = 1;
				}
			} else {
				dataSet['unknown']++;
			}
		}
	})

	const coordinates = [];
	for (let key in dataSet) {
		let newYearObj = {
			'year': key,
			'numPOIs': dataSet[key]
		}
		coordinates.push(newYearObj);
	}
	console.log(coordinates);

	// get element
	const vis = d3.select("#visualization");
	// set constants
    const graphWidth = 1000;
    const graphHeight = 500;
    const graphMargins = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    }

    //make scales for each axis
    const xScale = d3.scaleLinear().range([graphMargins.left, graphWidth - graphMargins.right]).domain([1760,2020])
    const yScale = d3.scaleLinear().range([graphHeight - graphMargins.top, graphMargins.bottom]).domain([0,45])

    //make each axis
    const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft().scale(yScale);

    // append each axis to #visualization elem
    vis.append('svg:g')
    	.attr("transform", "translate(0," + (graphHeight - graphMargins.bottom) + ")")
    	.call(xAxis);

    vis.append('svg:g')
    	.attr("transform", "translate(" + (graphMargins.left) + ",0)")
    	.call(yAxis);

    // draw line based on data
    const drawLine = d3.line()
    					.x(d => (xScale(d.year)))
    					.y(d => (yScale(d.numPOIs)))
    // append line ot #visualization elem
    vis.append('svg:path')
    	.attr('d', drawLine(coordinates))
    	.attr('stroke', 'blue')
    	.attr('stroke-width', 1)
    	.attr('fill', 'none')

	return (<div></div>)
}