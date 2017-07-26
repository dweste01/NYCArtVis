import scss from '../index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios'
import AppContainer from './containers/AppContainer';

ReactDOM.render(
  <AppContainer />,
  document.getElementById('app')
);