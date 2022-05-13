import React, { Component } from 'react';

class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = { on: false };
  }

  handleBtn() {
    this.setState((currentState) => ({ on: !currentState.on }));
  }

  render() {
    let styleName = 'switch';
    const { on } = this.state;
    if (on) {
      styleName = 'switch_on';
    }
    return (
      <div className={styleName}>
        <button
          className="switch_btn"
          type="submit"
          onClick={this.handleBtn.bind(this)}
        />
      </div>
    );
  }
}
export default Switch;
