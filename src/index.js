import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Snowfall from 'react-snowfall'


ReactDOM.render(
    <React.StrictMode>
        <App />
        { /* snow in the background */ }
        <div style={ { "height": "100%", "width": "100%", "background": '#282c34' } }>
            <Snowfall />
        </div>
    </React.StrictMode>,

    document.getElementById('root')
);

