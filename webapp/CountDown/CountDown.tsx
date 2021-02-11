import React, { useState, useEffect } from 'react';
import { CountDown } from '../interface/interfaceList';

export function CountDown(props) {
    let [minutes, setMinutes] = useState(-1);
    let [seconds, setSeconds] = useState(-1);
    let timeoutHandler = null;

    useEffect(() => {
        let  countDownInfo: CountDown = props.countDownInfo;
        let initMiuntes = countDownInfo.minutes || Math.floor(countDownInfo.second / 60);
        let initSeconds = countDownInfo.minutes ? countDownInfo.second : countDownInfo.second % 60;
        setMinutes(initMiuntes);
        setSeconds(initSeconds);
    }, []);

    useEffect(() => {
        setTimeout(countDownProcess, 1000);
    }, [seconds, minutes]);

    function countDownProcess() {
        if(seconds > 0) {
            setSeconds(e => e - 1);
        } else {
            if(minutes > 0) {
                setMinutes(e => e - 1);
                setSeconds(59);
            }
        }
        if(seconds === 0 && minutes === 0) {
            props.timeOut();
        }
    }  

    return(
        <div className='countdown_wrapper'>
            <div className='miuntes'>{minutes}</div>
            <div className='seconds'>{seconds}</div>
        </div>
    );
}