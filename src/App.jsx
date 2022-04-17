import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/App.scss';

const Block = () => <div className="block" />;

class Btn extends Component {
  addBlock() {
    const Box = document.createElement('div');
    const myComponent = <Block />;
    ReactDOM.render(myComponent, Box);
    document.getElementById('container').appendChild(Box);
    console.log(this);
  }

  render() {
    return (
      <button onClick={this.addBlock} className="btn" type="button">
        點擊新增視窗
      </button>
    );
  }
}

export default Btn;
