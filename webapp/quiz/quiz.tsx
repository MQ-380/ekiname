import React, { useContext, useEffect, useState } from 'react';
import { City, StationName } from '../interface/interfaceList';
import { cityStateContext } from '../CityContextWrapper/CityContextWrapper';
import { cityList } from '../data/cityList';
import { CountDown } from '../CountDown/CountDown';

export default function Quiz(props:any){
    let city = useContext(cityStateContext);
    let [ nowAnswer, setNowAnswer ] = useState('');
    let [ allStationInfo, setAllStationInfo ] = useState([]);
    let [ answeredNumber, setAnsweredNumber ] = useState(0); 
    let [ isTimeOut, setIsTimeOut ] = useState(false);
    let countDownTimeout = function() {
        setIsTimeOut(true);
    }

    useEffect(() => {
        getStationInfo(cityList[city.id]).then((res) => {
            setAllStationInfo(res);
        });
    }, []);

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
        }
    }, [nowAnswer]);
    console.log(isTimeOut);
    return (
    <div className='full_wrapper'>
        <div className='put_in_wrapper'>
            <input onChange={(e) => setNowAnswer(e.target.value)} value={nowAnswer} disabled={isTimeOut}></input>
            <div className='confirm'></div>
        </div>
        <div className='result'>
            {`${answeredNumber} / ${allStationInfo.length}`}
            {/*CountDown*/}
        </div>
        <div className='count_down'>
            <CountDown countDownInfo={{second: 10}} timeOut={countDownTimeout}/>
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


function getStationInfo(cityName: String) : Promise<any> {
    let allStationInfo: Array<StationName> = [];
    return fetch(`../${cityName}.json`).then((res)=>{
        try{
            return res.json().then((data: Array<String>) => {
                return data.map((item) => ({
                    stationName: item,
                    hasChecked: false,
                }));
            }).catch(e => console.error(e));
        } catch (e) {
            console.error(e);
        }
    });
}

