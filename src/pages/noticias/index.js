import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.css'
import api from '../../services/api'
import ImgAlt from '../../assets/01.jpg';


export default function Noticias(){
    
    const [noticias, setNoticias] = useState([]);

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
        <div className='cards-container'>
            <ul>
                {noticias.map(noticia => (
                    <li key={noticia.url}>
                        {noticia.text.length<300 ?
                            <Link className='link-noticia' to={`/noticias/${TreatTitle(noticia.title)}`}>
                                <div>  
                                    {noticia.image.length > 5 ? <img className='img-card' src={noticia.image} alt="...carregando imagem..." /> : <img className='img-card' src={ImgAlt} alt="...carregando imagem..." />}
                                </div>
                                <h1>{noticia.title}</h1>
                                <p>{StyleCyborg(noticia.text)}</p>
                            </Link>
                        :
                            <Link className='link-noticia' to={`/noticias/${TreatTitle(noticia.title)}`}>
                                <div>  
                                    {noticia.image.length > 5 ? <img className='img-card' src={noticia.image} alt="...carregando imagem..." /> : <img className='img-card' src={ImgAlt} alt="...carregando imagem..." />}
                                </div>
                                <h1>{noticia.title}</h1>                            
                                <p>{StyleCyborg(noticia.text.substr(0,250))}...
                                    <Link className='leia-mais' to={`/noticias/${TreatTitle(noticia.title)}`}>Leia mais</Link>
                                </p>
                            </Link>
                        }    
                    </li>
                ))}                    
            </ul>
        </div>
    )
};