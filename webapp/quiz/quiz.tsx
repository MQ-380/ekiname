import React, { useContext, useEffect, useReducer, useState, useRef } from 'react';
import { StationName } from '../interface/interfaceList';
import { cityStateContext } from '../CityContextWrapper/CityContextWrapper';
import { CountDown } from '../CountDown/CountDown';

export default function Quiz(props:any){
    let city = useContext(cityStateContext);
    let [ nowAnswer, setNowAnswer ] = useState('');
    let [ allStationInfo, setAllStationInfo ] = useState([]);
    let [ answeredNumber, setAnsweredNumber ] = useState(0); 
    let [ leftTime, setLeftTime ] = useState(120);
    let [ renewCountDown, setRenewCountDown ] = useState(true);
    let timeInterval = useRef(null);

    useEffect(() => {
        getStationInfo(city.name).then((res) => {
            setAllStationInfo(res);
            setAnsweredNumber(0);
            //clearInterval(timeInterval.current);
            setLeftTime(120);
        });
    }, [city]);

    useEffect(()=>{
        clearTimeout(timeInterval.current);
        timeInterval.current = leftTime > 0 ? setTimeout(()=> {

        console.log(leftTime);
            setLeftTime(e => e - 1) 
        }, 1000) :  null;
    }, [leftTime])

    useEffect(() => {
        if(!nowAnswer) return;
        let tempInfo = Array.from(allStationInfo);
        let keyIndex = allStationInfo.findIndex((e: StationName) => e.stationName === nowAnswer && !e.hasChecked);
        if(keyIndex === -1 || allStationInfo[keyIndex].hasChecked) return;
        else {
            tempInfo[keyIndex].hasChecked = true;
            setNowAnswer('');
            setAnsweredNumber(e => e+1);
            setAllStationInfo(tempInfo);
            setRenewCountDown(true);
        }
    }, [nowAnswer]);

    return (
    <div className='full_wrapper'>
        <div className='put_in_wrapper'>
            <input onChange={(e) => setNowAnswer(e.target.value)} value={nowAnswer} disabled={leftTime===0}></input>
            <div className='confirm'></div>
        </div>
        <div className='result'>
            {`${answeredNumber} / ${allStationInfo.length}`}
            {/*CountDown*/}
        </div>
        <div className='count_down'>
            <CountDown countDownInfo={{second: leftTime}} setRenewCountDown={setRenewCountDown} renewCountDown={renewCountDown}/>
        </div>
        <div className='answer_wrapper'>
            {allStationInfo.map((item, index) => (
                <div className={`station_name_item ${item.hasChecked ? 'checked' : ''}`} key={index}>
                    {item.hasChecked ? item.stationName : ''}
                </div>
            ))}
        </div>
    </div>);
}


async function getStationInfo(cityName: String) : Promise<any> {
    let allStationInfo: Array<StationName> = [];
    const res = await fetch(`../${cityName}.json`);
    try {
        return res.json().then((data: Array<String>) => {
            return data.map((item) => ({
                stationName: item,
                hasChecked: false,
            }));
        }).catch(e => console.error(e));
    } catch (e_1) {
        console.error(e_1);
    }
}

