// https://www.youtube.com/watch?v=35mFPbNE1iU
import React from 'react';
import Carousel from '../../components/carousel';
import Header from '../../components/header';
import Noticias from '../noticias';

import './styles.css'


export default function Home() {

    return(
        <div className='home-container'>
            <Header/>
            
            <Carousel/>
            
            <Noticias />

        </div>
    );
}