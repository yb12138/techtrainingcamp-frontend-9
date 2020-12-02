import React from 'react'

let waitMinutes = 0;
let waitSeconds = 30;

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            minutes: 0,
            time: '',
            isOver: true
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
        } else{
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
    handlePassValue(){
        this.props.passValue(this.state.isOver);
    }
    render() {
        console.log(this.state.isOver)
        let over = "";
        let value = "";
        if (this.state.isOver === true){
            over = "Time's up!\nGame Over";
            value = () => this.handlePassValue();
        }
        else{
            over = "";
            value = "";
        }

        return (<div>
                <p>{`${this.state.minutes
                    .toString()
                    .padStart(2, "0")}:${this.state.seconds.toString().padStart(2, "0")}`}</p>
                <div>{over}</div>
                <p>{value}</p>
            </div>
        )

    }
}

export default Clock;