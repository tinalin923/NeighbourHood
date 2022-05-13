import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Block = () => <div className="block" />;
class Btn extends Component {
  // eslint-disable-next-line class-methods-use-this
  addBlock() {
    const Box = document.createElement('div');
    const myComponent = <Block />;
    ReactDOM.render(myComponent, Box);
    document.getElementById('root').appendChild(Box);
  }

  render() {
    return (
      <button onClick={this.addBlock} className="addBlock_btn" type="button">
        點擊新增視窗
      </button>
    );
  }
}

export default Btn;
