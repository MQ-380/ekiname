import React from 'react';
import Quiz from './Quiz/Quiz';
import './App.scss';
import { CityContextWrapper } from './CityContextWrapper/CityContextWrapper';

export default function App() {
    return (
        <div className='main'>
            <CityContextWrapper>
                <Quiz></Quiz>
            </CityContextWrapper>
        </div>
    )
}