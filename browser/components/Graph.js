import React from 'react';
import * as d3 from 'd3';
import ByYear from './POIsByYear'

export default (props) => {

	//calculate POIs per year
	const dataSet = {
		'Unknown Date': []
	};

	props.pois.forEach(poi => {
		// undefined years
		if (!poi.dedicated) {
			dataSet['Unknown Date'].push(poi);
		} else {
			// clean date - find the first four digit number
			let year = poi.dedicated.match(/\d{4}/)
			if (year) {
				// insert or increment
				if (dataSet[year[0]]) {
					dataSet[year[0]].push(poi);
				} else {
					dataSet[year[0]] = [poi];
				}
			} else {
				dataSet['Unknown Date'].push(poi);
			}
		}
	})

	const coordinates = [];
	for (let key in dataSet) {
		let newYearObj = {
			'year': key,
			'numPOIs': dataSet[key].length
		}
		coordinates.push(newYearObj);
	}

	// get element
	const vis = d3.select('#visualization');
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
    const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format('d'));
    const yAxis = d3.axisLeft().scale(yScale);

    // append each axis to #visualization elem in correct place
    vis.append('svg:g')
    	.attr('transform', 'translate(0,' + (graphHeight - graphMargins.bottom) + ')')
    	.call(xAxis);

    vis.append('svg:g')
    	.attr('transform', 'translate(' + (graphMargins.left) + ',0)')
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

    // add title
    vis.append('text')
        .attr('x', (graphWidth / 2))
        .attr('y', 0 - (graphMargins.top / 2))
        .attr('text-anchor', 'middle')
        .text('NYC Parks Monuments by Dedication Year');

	return (
		<div className='row justify-content-md-center'>
			<ByYear byYear={dataSet} />
		</div>
	)
}