import React from 'react';
import 'jquery-ui';

export default class AnnualPOIs extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount () {
	}
	
	render() {
		return (
			<div id={this.props.cardId} className='collapse' role='tabpanel' aria-labelledby={this.props.controlId}>
			{
				this.props.pois.map((poi, idx) => {
					return (
						<div key={idx} className='card card-block'>
							<h3>{poi.name}</h3>
							<h5>{poi.descrip}</h5>
						</div>
					)
				})
			}
			</div>
		)
	}
}