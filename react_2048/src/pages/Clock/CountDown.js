import React from "react";
function CountDown({ hours = 0, minutes = 0, seconds = 0 }) {
    const [over, isOver] = React.useState(false);
    const [time, setTime] = React.useState({
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: parseInt(seconds)
    });


    const tick = () => {
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0){
            isOver(true);
        }
        else if (time.minutes === 0 && time.seconds === 0)
            setTime({
                hours: time.hours - 1,
                minutes: 59,
                seconds: 59
            });
        else if (time.seconds === 0)
            setTime({
                hours: time.hours,
                minutes: time.minutes - 1,
                seconds: 59
            });
        else
            setTime({
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds - 1
            });
    };

    // 重置
    const reset = () => {
        setTime({
            hours: parseInt(hours),
            minutes: parseInt(minutes),
            seconds: parseInt(seconds)
        });
        isOver(false);
    };

    React.useEffect(() => {
        let timerID = setInterval(() => tick(), 1000);
        return () => {
            clearInterval(timerID);
        }
    });

    return (
        <div>
            <p>{`${time.hours
                .toString()
                .padStart(2, "0")}:${time.minutes
                .toString()
                .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}</p>
            <div>{over ? "Time's up!" : ""}</div>
            <div>{over ? "Game Over!":""} </div>
            {/*<button onClick={() => reset()}>Restart</button>*/}
        </div>
    );
}

export default function() {
    return <CountDown hours="0" minutes="0" seconds="5" />;
}
