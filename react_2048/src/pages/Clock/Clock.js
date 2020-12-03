import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {withStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import Clock3 from "./Clock3";

let waitMinutes = 0;
let waitSeconds = 3;


class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            minutes: 0,
            time: '',
            isOver: true,
            open: false
        };
    }


    componentDidMount = () => {
        this.countDown();
    };


    countDown = () => {
        if (waitMinutes === 0 && waitSeconds === 0) {
            this.setState({
                isOver: true
            })
        } else if (waitSeconds === 0) {
            waitSeconds = 59;
            waitMinutes--;
            this.setState({
                seconds: waitSeconds,
                minutes: waitMinutes,
                isOver: false
            })
        } else {
            waitSeconds--;
            this.setState({
                seconds: waitSeconds,
                isOver: false
            })
        }
        setTimeout(() => {
            this.countDown();
        }, 1000);
    }

    render() {
        const {classes} = this.props;
        let {isOver} = this.state.isOver;
        let over = "";
        let value = "";
        if (this.state.isOver === true) {
            // over = "Time's up!\nGame Over";
            value = <Clock3 />;
        } else {
            // over = "";
            value = "";
        }

        return (<div>
                <p>{`${this.state.minutes
                    .toString()
                    .padStart(2, "0")}:${this.state.seconds.toString().padStart(2, "0")}`}
                </p>
                {/*<h4>{over}</h4>*/}
                <div>
                    {value}
                </div>
            </div>
        )

    }

}



export default (Clock);