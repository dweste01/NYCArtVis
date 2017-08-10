import React from 'react';
import axios from 'axios';
import * as d3 from 'd3';

export default class NYCMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'done': false
    }
  }

  componentDidMount () {
      const mapWidth = 1400;
      const mapHeight = 1400;
      const mapMargins = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 250
      }

      //make scales for each axis
      const xScale = d3.scaleLinear().range([mapMargins.left, mapWidth - mapMargins.right]).domain([-74.3, -73])
      const yScale = d3.scaleLinear().range([mapHeight - mapMargins.top, mapMargins.bottom]).domain([39.85, 40.95])

      const drawLine = d3.line()
                .x(d => (xScale(d.lng)))
                .y(d => (yScale(d.lat)))

    axios.get('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nybb/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson')
    .then(res => {
      res.data.features.forEach(boro => {
        console.log(boro)
        boro.geometry.coordinates.forEach(firstLevel => {
          firstLevel.forEach(secondLevel => {
            let boroCoords = [];
            secondLevel.forEach(thirdLevel => {
              let newCoord = {
                'lng': thirdLevel[0],
                'lat': thirdLevel[1]
              }
              boroCoords.push(newCoord);
            })
            d3.select('#nycmap').append('svg:path')
              .attr('d', drawLine(boroCoords))
              .attr('stroke', 'blue')
              .attr('class', boro.properties.BoroName)
              .attr('stroke-width', 1)
              .attr('fill', 'none')
          })
        })
      })
    }).then(() => {
      this.setState({"done": true})
    })
    .catch(console.error)
  }
  
  render() {
    return (
      <div>
      {
        (this.state.done) ? null 
        : <p>Drawing map...</p>
      }
      </div>
    )
  }
}