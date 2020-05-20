import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css'


export default function EditNews(){
      
    const [noticia, setNoticia] = useState([]);
    const auth = {
        'username': 'cyborg',
        'password': 'cyborg2014'
    }
    const [title, setTitle] = useState('');
    const [reference_date, setReference_date] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');
    const [classification, setClassification] = useState('');

    const history = useHistory();

    useEffect(() =>{
        api.post('token-auth/', auth).then(response => {
            localStorage.setItem('token', response.data.token);
        }).then(api.get(localStorage.getItem('url'), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }}).then(response => {
                setNoticia(response.data);
                if (title==''){            
                    setTitle(noticia.title)
                    setReference_date(noticia.reference_date)
                    setText(noticia.text)
                    setTags(noticia.tags)
                    setImage(noticia.image)
                    setClassification(noticia.classification)
                }
        }))
        


    })

    function montNews(){
        setTitle(noticia.title)
        setReference_date(noticia.reference_date)
        setText(noticia.text)
        setTags(noticia.tags)
        setImage(noticia.image)
        setClassification(noticia.classification)
    }
    

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

        try {
            await api.post('token-auth/', auth).then(response => {
                localStorage.setItem('token', response.data.token);
            }).then(api.patch(localStorage.getItem('url'), data, {
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

    return(
        
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Editar Notícia</h1>
                    <Link className="back-link" to="/admNews">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Adm
                    </Link>
                </section>

                <form  onSubmit={handleNewIncident}
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

                    <button className="button" type='submit'>Salvar</button>
                </form>
            </div>
        </div>
    )
};