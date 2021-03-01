import React, { ContextType, useContext } from 'react';
import { cityList } from '../data/cityList';
import { cityDispatchContext } from '../CityContextWrapper/CityContextWrapper';
import { City, CityProviderDispatchType } from '../interface/interfaceList';

export default function CityChoose(props: any) {
    let { changeCityDispatch } = useContext(cityDispatchContext) as CityProviderDispatchType;
    return (
        <div className='choose_wrapper'>
            {cityList.map((ele, i) => (
                <div className='city_item' onClick={(e) => chooseCity(e, ele)} key={i}>
                    {ele}
                </div>
            ))}
        </div>
    )



    function chooseCity(e: any, ele: String) {
        changeCityDispatch({name: ele});
    }
}
