import React from 'react';
import ReactDOM from 'react-dom';
import UpLoadForm from './components/upload.jsx';
import Btn from './components/addblock.jsx';
import Switch from './components/switch.jsx';

import './styles/style.scss';

ReactDOM.render(<UpLoadForm />, document.getElementById('file_input_btn'));
ReactDOM.render(<Btn />, document.getElementById('button'));
ReactDOM.render(<Switch />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementsByTagName('h1')[0]);
