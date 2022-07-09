import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    sec: 25 * 60,
    isRunning: false,
    total: 25,
    reset: false,
  }

  startTheClock = () => {
    const {sec} = this.state
    if (sec === 0) {
      this.setState(() => ({isRunning: false, reset: false}))
    } else if (sec > 0) {
      this.setState(() => ({
        isRunning: true,
        reset: true,
      }))
      this.timerId = setInterval(() => {
        this.setState(
          prevState => ({sec: parseInt(prevState.sec) - 1}),
          this.stop(),
        )
      }, 1000)
    }
  }

  stop = () => {
    const {sec} = this.state
    if (sec <= 1) {
      this.setState(() => ({reset: false}))
      this.stopClock()
    }
  }

  stopClock = () => {
    this.setState(() => ({isRunning: false}))
    clearInterval(this.timerId)
  }

  reset = () => {
    this.setState(() => ({isRunning: false, reset: false}))
    clearInterval(this.timerId)
    this.setState(() => ({sec: 25 * 60}))
  }

  getMinutesAndSeconds = sec => {
    let min = Math.floor(sec / 60).toString()
    let seconds = sec % 60
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    if (min < 10) {
      min = `0${min}`
    }

    return {min, seconds}
  }

  decrement = () => {
    this.setState(
      prevState => ({total: prevState.total - 1}),
      this.setState(preState => ({sec: preState.sec - 60})),
    )
  }

  increment = () => {
    this.setState(
      prevState => ({total: prevState.total + 1}),
      this.setState(preState => ({sec: preState.sec + 60})),
    )
  }

  render() {
    const {sec, isRunning, reset, total} = this.state

    const {min, seconds} = this.getMinutesAndSeconds(sec)

    return (
      <div className="main-container">
        <h1 className="heading">Digital Timer</h1>
        <div>
          <div className="main-data">
            <div className="clock-container">
              <div className="clock">
                <h1 className="c-head">{`${min}:${seconds}`}</h1>
                <p className="c-para">{isRunning ? 'Running' : 'Paused'}</p>
              </div>
            </div>
            <div className="right">
              {isRunning ? (
                <button
                  type="button"
                  className="data1"
                  onClick={this.stopClock}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                  />
                  <p>Pause</p>
                </button>
              ) : (
                <button
                  className="data1"
                  type="button"
                  onClick={this.startTheClock}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                  />
                  <p>Start</p>
                </button>
              )}
              <button className="data2" type="button" onClick={this.reset}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p>Reset</p>
              </button>
              <div className="minusPlusCon">
                <p>Set Timer limit</p>
                <div className="data">
                  <button
                    disabled={reset}
                    type="button"
                    onClick={this.decrement}
                  >
                    -
                  </button>
                  <p className="data-p">{total}</p>
                  <button
                    disabled={reset}
                    type="button"
                    onClick={this.increment}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
