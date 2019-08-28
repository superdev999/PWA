import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0
    };
  }

  tick() {
    const tickHandler = this.props.tickHandler;

    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));

    tickHandler();
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const preText = this.props.preText;

    const minutesToShow = Math.floor(this.props.secondsToShow / 60);
    const secondsToShow = this.props.secondsToShow % 60;
    return (
      <div>{preText + minutesToShow+':'+secondsToShow}</div>
    );
  }
}

export default Timer;
