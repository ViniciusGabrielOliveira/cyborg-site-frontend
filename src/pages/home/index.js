// https://www.youtube.com/watch?v=35mFPbNE1iU


import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import api from '../../services/api'

import Carousel from '../../components/carousel';
import logoImg from '../../assets/logo.svg';
import ImgAlt from '../../assets/01.jpg';
import Biografia from '../biografia';
import Contato from '../contato';


import './styles.css'

export default function Home() {
    const [biografiaView, setBiografiaView] = useState(false);
    const [homeView, setHomeView] = useState(true);
    const [noticias, setNoticias] = useState([]);
    const [contatoView, setContatoView] = useState(false);


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
                        <Link className='menu-item' to='/' onClick={() => {setHomeView(true); setBiografiaView(false); setContatoView(false)}}>Home</Link>
                        <Link className='menu-item' to='/' onClick={() => {setHomeView(false); setBiografiaView(true); setContatoView(false)}} >Biografia</Link>
                        <Link className='menu-item' to='/' onClick={() => {setHomeView(false); setBiografiaView(false); setContatoView(true)}} >Contato</Link>
                    </div>
                    <div className='icons-container'>
                        <a href='https://www.facebook.com/vereadorcyborg/'><FaFacebook size={20} color="#fff" /></a> 
                        <a href='https://www.instagram.com/rogeriocyborg/'><FaInstagram size={20} color="fff"/></a>
                        <a href="https://www.youtube.com/channel/UCkjSv03cwwdk-PgR6S1yyzA"><FaYoutube size={20} color="#fff"/></a>
                    </div>
                    
                </div>
               
            </header>
            <Carousel/>
            {homeView && <div className='cards-container'>
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
            {biografiaView && <Biografia/>} 
            {contatoView && <Contato/>}     
        </div>
    );
}