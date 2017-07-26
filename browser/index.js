import scss from '../index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios'
import AppContainer from './containers/AppContainer';

const permanentJsonUrl = 'https://www.nycgovparks.org//art-monuments-map/json'

const onAppEnter = function() {
	console.log("helloooo")
	axios.get(permanentJsonUrl)
	.then(res => res.data)
	.then(result => {
		console.log(result);
	})
}

ReactDOM.render(
  <AppContainer onEnter={onAppEnter} />,
  document.getElementById('app')
);