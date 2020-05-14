import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './styles.css'
import noticiasAlter from '../../assets/noticiasAlter.json'
import api from '../../services/api'
import ImgAlt from '../../assets/01.jpg';
import Header from '../../components/header';
import Carousel from '../../components/carousel';


export default function DetailNoticia(props){
    
    const [noticias, setNoticias] = useState(noticiasAlter);
    const params = useParams();

    useEffect(() =>{

        api.get('noticias').then(response => {
            setNoticias(response.data);
        })
        
    })
  

    function StyleCyborg(text) {
        const textArray = text.split("CYBORG");
        
        return (    
            textArray.map((item, index) => (
                <span key={index}>
                    {item}
                    {index !== textArray.length - 1 && (
                        <b className="textCyborg">CYBORG</b>
                    )}
                </span>
            ))        
        );
    }

    function TreatTitle(title){
        const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
        const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
        const p = new RegExp(a.split('').join('|'), 'g')
        return title.toString().toLowerCase().trim()
          .replace(p, c => b.charAt(a.indexOf(c))) 
          .replace(/&/g, '-and-') 
          .replace(/[\s\W-]+/g, '-') 
    }

    
    return(
        <div className='home-container'>
            <Header/>
            <Carousel/>
            <div className='detail-container'>
                
                <ul>
                    {noticias.map(noticia => (
                        TreatTitle(noticia.title) === params.title ?
                            <li key={noticia.url}>
                                <>
                                    <div>  
                                        {noticia.image.length > 5 ? <img className='img-card-detail' src={noticia.image} alt="...carregando imagem..." /> : <img className='img-card-detail' src={ImgAlt} alt="...carregando imagem..." />}
                                    </div>
                                    <h1>{noticia.title}</h1>
                                    <p>{StyleCyborg(noticia.text)}</p>
                                </>
                            </li>
                        :
                            <></>
                    ))}                    
                </ul>
            </div>
        </div>
    )
};