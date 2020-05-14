import React from 'react';

import './styles.css'
import Carousel from '../../components/carousel';
import Header from '../../components/header';


export default function Contato(){
    

    return(
        <div className="home-container">
            <Header/>
            <Carousel/>
            <div className="contato-container">                
                <h1>Contatos</h1>
                <h3>Telefones: 12-39256625</h3>
            </div>
        </div>
    )
};