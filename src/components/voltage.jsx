import React, { Component } from 'react';
import './styles/voltage.css';
import { grabVoltage } from '../api';

class Voltage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // refV: 5,
      voltage: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    grabVoltage(result => {
      this.setState({
        voltage: result
      })
    });
  }

  handleChange(event) {
    this.setState({ refV: event.target.value || 5 });
    console.log(this.state.refV);
  }

  render() {
    const { refV, voltage } = this.state;
    return (
      <div className="main">
        <section className="container">
          <div className="item">
            <header id="header">
              VOLTAGE READER
                     </header>
          </div>
          <div className="item">
            <div id="max">Max Voltage</div>
            <input value={refV} onChange={this.handleChange} type="text" id="maxI" />
          </div>
          <div className="item">
            <div id="volt">Voltage</div>
            <div id="vRead">{voltage}</div>
          </div>
        </section>
      </div>
    )
  }
}

export default Voltage;
