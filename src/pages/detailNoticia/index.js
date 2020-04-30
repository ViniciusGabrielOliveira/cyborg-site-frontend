import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import './styles.css'

export default function DetailNoticia(){
    const [noticia, setNoticia] = useState();
    const urlNoticia = localStorage.getItem('urlNoticia');


    useEffect(() =>{

        api.get('noticias').then(response => {
            setNoticia(response.data);
        })
        
    }, [urlNoticia])

    function StyleCyborg(text) {
        const textArray = text.split("CYBORG");
        
        return (
                <span>
                    {textArray.map((item, index) => (
                        <>
                            {item}
                            {index !== textArray.length - 1 && (
                                <b className="textCyborg">CYBORG</b>
                            )}
                        </>
                    ))}
                </span>
            );
    }

    return(
        <div className='cards-container'>
            <div>  
                {noticia.image.length > 5 ? <img className='img-card' src={noticia.image} alt="...carregando imagem..." /> : <img className='img-card' src={ImgAlt} alt="...carregando imagem..." />}
            </div>
            <h1>{noticia.title}</h1>
            <p>{StyleCyborg(noticia.text)}</p>
        </div>
    );
}