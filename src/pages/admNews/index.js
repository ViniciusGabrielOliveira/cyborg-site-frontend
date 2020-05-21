import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.css'
import api from '../../services/api'
import { FaEdit, FaTrash } from "react-icons/fa";



export default function AdmNews(){
    
    const [noticias, setNoticias] = useState([]);
    const auth = {
        'username': 'cyborg',
        'password': 'cyborg2014'
    }
    
    useEffect(() =>{
        api.get('noticias').then(response => {
                setNoticias(response.data);
        })
    })

    async function DeleteNews(url) {
        try {
            await api.post('token-auth/', auth).then(response => {
                localStorage.setItem('token', response.data.token);
            }).then(api.delete(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('token')}`
                }
            }));
            
        }catch(err){
            console.log(err)
            alert("ERRO ao cadastrar, verifique os dados")
        }
    }

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


    return(
        <div className='cards-container-adm'>
            <ul>
                {noticias.map(noticia => (
                    <li key={noticia.url}>
                        <Link to='/noticia/edit'><FaEdit size={20} color="#D3D3D3" onClick={() => localStorage.setItem('url', noticia.url)} /></Link>
                        <FaTrash size={20} color="#D3D3D3" onClick={() => (window.confirm('Delete the item?')) ? DeleteNews(noticia.url) : null} />
                        <h1>{noticia.title}</h1>
                        <p>{StyleCyborg(noticia.text)}</p>
                    </li>
                ))}                    
            </ul>
        </div>
    )
};