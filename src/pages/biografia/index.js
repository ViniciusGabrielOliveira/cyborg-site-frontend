import React, { useState, useEffect } from 'react';

import './styles.css'
import Carousel from '../../components/carousel';
import Header from '../../components/header';

import './styles.css'
import './texto.txt'


export default function Biografia(){
    const text = "Rogério Cyborg da Matta Castro nasceu em Mogi das Cruzes em 18/09/1971, filho do ex-vereador e empresário Edison Cyborg Castro e da professora Neusa Maria Borges da Matta Castro.\n\nCyborg é formado em administração com especialização em Políticas Públicas e Cidadania, é casado a 25 anos com Juliana Cyborg e possui 2 filhos: Leonardo e Isabela.\n\nCyborg foi eleito em 2012 para seu primeiro mandato na Câmara Municipal de São José dos Campos e desde o início do mandato tem votado de forma coerente e de acordo com o que sempre defendeu na política, transparência e honestidade, mostrando ser possível fazer política de um jeito diferente, com novas idéias, novos projetos e muita disposição.\n\nNo biênio de 2012 a 2014 participou das Comissões Permanentes de: Justiça, Meio Ambiente, Cultura e Esporte, Habitação e Obras, Comissão Servidor Público e Legislação Participativa.\n\nNo biênio de 2015 a 2016 participou das Comissões Permanentes de: Transporte, Saúde, Justiça, Meio Ambiente, Serviços Públicos e Direitos Humanos.\n\nEm 2017 Cyborg iniciou seu segundo mandato como vereador, sempre trabalhando para melhorar a vida das pessoas.\n\nNo biênio de 2017 a 2018 participou das Comissões Permanentes como Primeiro Secretário da Mesa Diretora, Meio Ambiente e Saúde.\n\nCyborg, durante o mandato, tem atuado em favor do meio ambiente com projetos voltados para a melhoria da qualidade de vida da população. Como vereador Cyborg foca sua atenção nos idosos, na área da saúde, na área da educação e desenvolvimento social.\n\nCyborg tem visitado os bairros com seu gabinete itinerante e ouvido as sugestões e propostas dos moradores. Tem promovido a educação ambiental e a cidadania e dado incentivo e apoio ao esporte competitivo, amador e profissional. Tem atuado em ampliação do programa de coleta seletiva. Cyborg exerce seu mandato com Ética e Moral Cristã."

    return(
           
        <div className='home-container'>
            <Header/>           
            <Carousel/>
            <div className="biografia-container">
                <img className='img-card' src={'https://lh3.googleusercontent.com/pw/ACtC-3fJpP5Z88Ltj7867Chh0uPiKSyFBVwZF9x0uIIlkN2G4EATTB03nbMty3Em--9MpYyE6PA4Dys8oEfaHjgWynqpH6xXvr8egmRf0ssDgnAzNDeS1wjjWmxvsf6S2c8iyVYCLZOA9QS6auCCYsiwvX81-Q=w1144-h844-no?authuser=1'} alt="...carregando imagem..." />

                <h1>ROGÉRIO CYBORG</h1>
                
                <p>{text}</p>

            </div>
            
        </div>
    )
};

