import React from 'react';
import Quiz from './Quiz/Quiz';
import CityChoose from './CityChoose/CityChoose';
import './App.scss';
import { CityContextWrapper } from './CityContextWrapper/CityContextWrapper';

export default function App() {
    return (
        <div className='main'>
            <CityContextWrapper>
                <CityChoose></CityChoose>
                <Quiz></Quiz>
            </CityContextWrapper>
        </div>
    )
}