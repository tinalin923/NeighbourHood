import React from 'react';
import ReactDOM from 'react-dom';
import UploadForm from './components/upload.jsx';
import Btn from './components/addblock.jsx';
import Switch from './components/switch.jsx';
import UploadImage from './components/image.jsx';

import './styles/style.scss';

ReactDOM.render(<UploadImage />, document.getElementById('neighbour_cover'));
ReactDOM.render(<UploadForm />, document.getElementById('input_file_btn'));
ReactDOM.render(<Btn />, document.getElementById('add_block_button'));
ReactDOM.render(<Switch />, document.getElementById('toggle_preview'));
// ReactDOM.render(<App />, document.getElementsByTagName('h1')[0]);
