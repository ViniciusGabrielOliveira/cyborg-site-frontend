import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.css'
import api from '../../services/api'
import { FaEdit } from "react-icons/fa";

import ImgAlt from '../../assets/01.jpg';


export default function AdmNews(){
    
    const [noticias, setNoticias] = useState([]);
    const auth = {
        'username': 'cyborg',
        'password': 'cyborg2014'
    }
    
    useEffect(() =>{
        api.post('token-auth/', auth).then(response => {
            localStorage.setItem('token', response.data.token);
        }).then(api.get('noticias', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }}).then(response => {
                setNoticias(response.data);
        }))
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
        <div className='cards-container-adm'>
            <ul>
                {noticias.map(noticia => (
                    <li key={noticia.url}>
                        <Link to='/noticia/edit'><FaEdit size={20} color="#D3D3D3" onClick={() => localStorage.setItem('url', noticia.url)} /></Link>
                        <h1>{noticia.title}</h1>
                        <p>{StyleCyborg(noticia.text)}</p>
                    </li>
                ))}                    
            </ul>
        </div>
    )
};