import React from 'react';
import '../App.css';

class Timer extends React.Component {

    constructor() {
        super();
        this.state = { time: {}, seconds: 300 };
        this.timer = 0;
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        if (hours.toString().length === 1) {
            hours = "0" + hours;
        }

        if (minutes.toString().length === 1) {
            minutes = "0" + minutes;
        }

        if (seconds.toString().length === 1) {
            seconds = "0" + seconds;
        }

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer()
    }

    startTimer = () => {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            alert('YOU HAVE FINISHED YOUR EXAM');
            this.props.timerEnd();
        }
    }

    render() {
        return (
            <div className='timer'>
                <i className="fa fa-clock"></i>{this.state.time.h} : {this.state.time.m} : {this.state.time.s}
            </div>
        );
    }

}

export default Timer;