import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Forms} from "./forms"

ReactDOM.render(<Forms />, document.getElementById('root'));
registerServiceWorker();
