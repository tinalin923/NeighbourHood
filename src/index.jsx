import React from 'react';
import ReactDOM from 'react-dom';
import Btn from './App.jsx';
import Switch from './switch.jsx';
import './styles/main.scss';

ReactDOM.render(<Btn />, document.getElementById('button'));
ReactDOM.render(<Switch />, document.getElementById('root'));
// eslint-disable-next-line no-console
console.log('hello world');
