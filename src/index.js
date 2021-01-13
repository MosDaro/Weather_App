import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Snowfall from 'react-snowfall'


ReactDOM.render(
  <React.StrictMode>
    <App />
    <div style={ { height: 400, width: 400, background: '#282c34' } }>
      <Snowfall />
    </div>
  </React.StrictMode>,

  document.getElementById('root')
);

