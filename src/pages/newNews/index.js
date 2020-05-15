import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css'


export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [reference_date, setReference_date] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');
    const [classification, setClassification] = useState('');
    

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            reference_date,
            text,
            tags,
            image,
            classification
        };

        const auth = {
            'username': 'cyborg',
            'password': 'cyborg2014'
        }

        try {
            await api.post('token-auth/', auth).then(response => {
                localStorage.setItem('token', response.data.token);
            }).then(api.post('noticias/', data, {
                headers: {
                  Authorization: `JWT ${localStorage.getItem('token')}`
                }
            }));
        }catch(err){
            console.log(err)
        }

    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Cadastrar Notícia</h1>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}
                >
                    <input 
                        placeholder="Título da Notícia"
                        value={title}
                        onChange={e=> setTitle(e.target.value)} 
                    />
                    <input
                        placeholder="Data de Referencia"
                        type="date"
                        value={reference_date}
                        onChange={e=> setReference_date(e.target.value)}
                    />
                    <textarea 
                        placeholder="texto"
                        value={text}
                        onChange={e=> setText(e.target.value)} 
                    />
                    <input
                        placeholder="tags (separadas por virgula)"
                        value={tags}
                        onChange={e=> setTags(e.target.value)}
                    />
                    <input
                        placeholder="Endereço da Imagem"
                        value={image}
                        onChange={e=> setImage(e.target.value)}
                    />
                    <input
                        placeholder="Classificação"
                        type="number"
                        value={classification}
                        onChange={e=> setClassification(e.target.value)}
                    />

                    <button className="button" type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
};