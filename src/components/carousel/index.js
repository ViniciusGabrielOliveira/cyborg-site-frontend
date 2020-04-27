import React from 'react';
import Slider from '@farbenmeer/react-spring-slider';
import './styles.css'

import img01 from '../../assets/Carrocel-01.jpg'
import img02 from '../../assets/Carrocel-02.jpg'
import img03 from '../../assets/Carrocel-03.jpg'

export default function Carousel(){
	
	return (
    <div className={'carousel-container'}>
      <Slider hasBullets auto={7000}>
			  <div>
          <img className={'carousel-img'} src={ img01 } alt="CYBORG"/>
        </div>
			  <div>
          <img className={'carousel-img'} src={ img02 } alt="CYBORG"/>
        </div> 
			  <div> 
          <img className={'carousel-img'} src={ img03 } alt="CYBORG"/> 
        </div>
		  </Slider>
    </div>		
	);
}

