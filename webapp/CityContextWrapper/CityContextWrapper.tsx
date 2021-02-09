import React, {createContext, useReducer, useState } from 'react';
import { City } from '../interface/interfaceList';


let city: City = {
    name: '',
    id: 0,
};

export let cityStateContext = createContext(city);
export let cityDispatchContext = createContext({});


function reducer(state: City, action: any): City {
    return action.payload;
}

export function CityContextWrapper (props: any) {
    let [ state, dispatch ] = useReducer(reducer, city);
    return (
        <cityStateContext.Provider value={state}>
            <cityDispatchContext.Provider value={dispatch}>
                {props.children}
            </cityDispatchContext.Provider>
        </cityStateContext.Provider>
    );
}
