import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css'
import { FaFacebook, FaInstagram, FaYoutube, FaBars, FaWhatsapp } from "react-icons/fa";
import logoImg from '../../assets/logo.svg';


export default function Header(){
  const [menuMobile, setMenuMobile] = useState(false);
	
	return (
    <header className='header'>
      <div className='header-container'>
          <img className='logo' src={logoImg} alt={'Vereador Cyborg'} />
          <div className='menu-tarja'>
              <div className='itens-container'>
                  <Link className='menu-item' to='/' >Home</Link>
                  <Link className='menu-item' to='/biografia' >Biografia</Link>
                  <Link className='menu-item' to='/contato' >Contato</Link>
              </div>
              <div className='icons-container'>
                  <a href='https://www.facebook.com/vereadorcyborg/'><FaFacebook size={20} color="#fff" /></a> 
                  <a href='https://www.instagram.com/rogeriocyborg/'><FaInstagram size={20} color="fff"/></a>
                  <a href="https://www.youtube.com/channel/UCkjSv03cwwdk-PgR6S1yyzA"><FaYoutube size={20} color="#fff"/></a>
                  <a href="whatsapp://send?text=Olá Vereador Cyborg&phone=+5512996843123"><FaWhatsapp size={20} color="#fff"/></a>

              </div>
              <FaBars className='iconMenu' onClick={() => {menuMobile ? setMenuMobile(false) : setMenuMobile(true)}}/>
              
          </div>
      </div>
      {menuMobile && <div className='menu-mb'>
          <Link className='menu-mb-item' to='/' >Home</Link>
          <Link className='menu-mb-item' to='/biografia' >Biografia</Link>
          <Link className='menu-mb-item' to='/contato' >Contato</Link>
      </div>}              
    </header>	
	);
}

