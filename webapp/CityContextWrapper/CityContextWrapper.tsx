import React, {createContext, useReducer, useState } from 'react';
import { City, CityProviderDispatchType } from '../interface/interfaceList';


let city: City = {
    name: 'Shanghai',
    //id: 0,
};

export let cityStateContext = createContext(city);
export let cityDispatchContext = createContext({});


function reducer(state: City, action: any): City {
    return {
        name: action.name,
    };
}

export function CityContextWrapper (props: any) {
    let [ state, dispatch ] = useReducer(reducer, city);
    return (
        <cityStateContext.Provider value={state}>
            <cityDispatchContext.Provider value={{changeCityDispatch: dispatch}}>
                {props.children}
            </cityDispatchContext.Provider>
        </cityStateContext.Provider>
    );
}
