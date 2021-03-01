import React from 'react';
import { CountDown } from '../interface/interfaceList';

export function CountDown(props: any) {
    // Because the countdown should be inited after changing city
    // so the countDown function moves to the father function 
    // this component only to show the time
    let countDownInfo: CountDown = props.countDownInfo;
    let minutes = countDownInfo.minutes || Math.floor(countDownInfo.second / 60);
    let seconds = countDownInfo.minutes ? countDownInfo.second : countDownInfo.second % 60;
    return(
        <div className='countdown_wrapper'>
            <div className='miuntes'>{minutes}</div>
            <div className='seconds'>{seconds}</div>
        </div>
    );
}