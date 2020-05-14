import React from 'react';

import './styles.css'
import Carousel from '../../components/carousel';
import Header from '../../components/header';

import './styles.css'


export default function Biografia(){
    
    return(
           
        <div className='home-container'>
            <Header/>           
            <Carousel/>
            <div className="biografia-container">
                <h1>Biografia</h1>
                <h3>Escrever Biografia</h3>
            </div>
            
        </div>
    )
};

