import React, { useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaPrint, FaFilePdf, FaEdit } from 'react-icons/fa';

import api from '../../services/api';
import Moment from 'moment';
import './styles.css'
import 'moment-timezone';
import 'moment/locale/pt-br';

Moment.tz.setDefault('UTC');
Moment.locale('pt-BR');

export default function DetailTarefa(){
    const history = useHistory();
    const params = useParams();
    const [tarefa, setTarefa] = useState([]);
    
    
    useEffect(() =>{
        let token = 'JWT ' + localStorage.getItem('token');
        let url = 'gestao/tarefa/'+ params.id;

        api.get(url, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setTarefa(response.data); 
        },error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        })       

    }, [ history, params ])

    

    
    return(
        
        <div className="home-container">
            <div className="options-container">
                <div>
                    <FaArrowLeft size={20} color="#fff" opacity="0.5" onClick={()=> history.goBack()} />                   
                </div>
                <div>
                    <FaPrint className="icon" size={20} color="#fff" />
                    <FaFilePdf className="icon" size={20} color="#fff" />
                    <FaEdit className="icon" size={20} color="#fff" onClick={() => history.push('/edittarefa/'+params.id)}/>
                </div>   
            </div>
            <div className='card'>
                <div>
                    <p><strong>{tarefa.data_criacao && Moment(tarefa.data_criacao).format('DD/MM/YY')}</strong></p>
                    <h1>{tarefa.tipo}</h1>
                    <p>{tarefa.descricao}</p>  
                    <p><strong>Data Limite: </strong>{tarefa.prazo_entrega && Moment(tarefa.prazo_entrega).format('DD/MM/YY')}</p>
                    <p><strong>Data Conclusao: </strong>{tarefa.data_conclusao && Moment(tarefa.data_conclusao).format('DD/MM/YY')}</p>
                    <p><strong>Obs: </strong>{tarefa.observacao}</p>
                    <p><strong>Secretaria: </strong>{tarefa.secretaria}</p>
                    <p><strong>Status: </strong>{tarefa.status}</p>
                    <p><strong>Prioridade: </strong>{tarefa.prioridade}</p>
                    <p><strong>Responsável: </strong>{tarefa.usuario}</p>
                    <p><strong>Solicitação: </strong>{tarefa.solicitacao}</p>
                    <p><strong>Demanda: </strong>{tarefa.demanda}</p>

                </div>                                                                                                    
            </div>           
        </div>
    )
}