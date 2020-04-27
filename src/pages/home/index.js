// https://www.youtube.com/watch?v=35mFPbNE1iU


import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import api from '../../services/api'

import Carousel from '../../components/carousel';
import logoImg from '../../assets/logo.svg';
import ImgAlt from '../../assets/01.jpg';
// import DetailNoticia from '../detailNoticia';

import './styles.css'

export default function Home() {
    // const [detailView, setDetailView] = useState(false);
    // const [homeView, setHomeView] = useState(true);
    const [noticias, setNoticias] = useState([]);

    useEffect(() =>{
        api.get('noticias').then(response => {
            setNoticias(response.data);
        })
    })

    return(
        <div className='home-container'>
            <header className='header'>
                <img className='logo' src={logoImg} alt={'Vereador Cyborg'} />
                <div className='menu-tarja'>
                    <div className='itens-container'>
                        <Link className='menu-item' to='/'>Home</Link>
                        <Link className='menu-item' to='/biografia'>Biografia</Link>
                        <Link className='menu-item' to='/noticias'>Notícias</Link>
                        <Link className='menu-item' to='/contato'>Contato</Link>
                    </div>
                    <div className='icons-container'>
                        <a href='https://www.facebook.com/vereadorcyborg/'><FaFacebook size={20} color="#fff" /></a> 
                        <a href='https://www.instagram.com/rogeriocyborg/'><FaInstagram size={20} color="fff"/></a>
                        <a href="https://www.youtube.com/channel/UCkjSv03cwwdk-PgR6S1yyzA"><FaYoutube size={20} color="#fff"/></a>
                    </div>
                    
                </div>
               
            </header>
            <Carousel/>
            {true && <div className='cards-container'>
                <ul>
                    {noticias.map(noticia => (
                        <li key={noticia.url}>
                            <div>
                                
                                {noticia.image.length > 5 ? <img className='img-card' src={noticia.image} alt="...carregando imagem..." /> : <img className='img-card' src={ImgAlt} alt="...carregando imagem..." />}
                            </div>
                            <h1>{noticia.title}</h1>
                            <p>{noticia.text}</p>
                            <Link className='leia-mais' to='/'>Leia mais</Link>
                        </li>
                    ))}
                </ul>
            </div>}
            {/* {detailView && <div className='cards-container'>

            </div>}      */}
        </div>
    );
}