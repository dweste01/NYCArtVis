import React from 'react';
import axios from 'axios';
import * as d3 from 'd3';

export default class NYCMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'boros': []
    }
  }

  componentDidMount () {
    axios.get('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nybb/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson')
    .then(res => {
      let boroArray = [];
      res.data.features.forEach(boro => {
        let boroCoords = [];
        // flatten array of arrays; get coordinates for each boro
        boro.geometry.coordinates.forEach(firstLevel => {
          firstLevel.forEach(secondLevel => {
            secondLevel.forEach(thirdLevel => {
              let newCoord = {
                'lng': thirdLevel[0],
                'lat': thirdLevel[1]
              }
              boroCoords.push(newCoord);
            })
          })
        })
        let boroObj = {
          'coords': boroCoords,
          'boroname': boro.properties.BoroName
        }
        console.log(boroObj)
        boroArray.push(boroObj);
      })

      const mapWidth = 1200;
      const mapHeight = 1200;
      const mapMargins = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
      }

      //make scales for each axis
      const xScale = d3.scaleLinear().range([mapMargins.left, mapWidth - mapMargins.right]).domain([-74.3, -73])
      const yScale = d3.scaleLinear().range([mapHeight - mapMargins.top, mapMargins.bottom]).domain([39.85, 40.95])

      const drawLine = d3.line()
                .x(d => (xScale(d.lng)))
                .y(d => (yScale(d.lat)))

      boroArray.forEach(b => {
        d3.select('#nycmap').append('svg:path')
          .attr('d', drawLine(b.coords))
          .attr('stroke', 'blue')
          .attr('stroke-width', 1)
          .attr('fill', 'none')
      })

    }).catch(console.error)
  }
  
  render() {
    let name;
    console.log('this.state.boros: ', this.state.boros)
    return (
      <div>
      {
        // (this.state.boros.length) ?
        // this.state.boros.map((boro, idx) => {
        //  name = boro.properties.BoroName;
        //  return (boro.geometry.coordinates.map((coord, idx) => {
        //    return (
        //      <p>{coord}</p>
        //    )
        //  })
        //  // <p key={idx}>{boro.properties.BoroName}</p>
        //  )
        // })
        // :
        <p>Drawing map...</p>
      }
      </div>
    )
  }
}