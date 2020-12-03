import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { FaHome, FaUserPlus, FaCheckSquare, FaList, FaPrint, FaFilePdf, FaListAlt } from 'react-icons/fa';

import api from '../../services/api';
import './styles.css'

import Moment from 'moment';
import 'moment-timezone';
import 'moment/locale/pt-br';

Moment.tz.setDefault('UTC');
Moment.locale('pt-BR');

export default function Tarefas(){
    const history = useHistory();
    const token = 'JWT ' + localStorage.getItem('token');
    const [pendentes, setPendentes] = useState([]);
    const [andamento, setAndamento] = useState([]);
    

    useEffect(() =>{


        let urlPendentes = 'gestao/tarefas/?status=PENDENTE';
        let urlAndamento = 'gestao/tarefas/?status=ANDAMENTO';
        
        api.get(urlPendentes, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setPendentes(response.data.results);
        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        })

        api.get(urlAndamento, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setAndamento(response.data.results);
        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        })

        

    }, [token, history])


    return (
        <div className="home-container">
            <div className="options-container">
                <h1>Tarefas</h1>
                <div>
                    <FaPrint className="icon" size={20} color="#fff" />
                    <FaFilePdf className="icon" size={20} color="#fff" />
                </div>                
            </div>

            <ul className='listaTarefas'>
                <div className='pendentes'>ANDAMENTO</div>
                {andamento.map(andament => (
                    <li key={andament.id}>
                        <div className='card' onClick={()=> history.push(`/tarefa/${andament.id}`)}>
                            <div className='nome-checkBox-container'>
                                <h1>{andament.tipo}</h1>                                
                            </div>
                            <div className='avatar-bairro-container'>
                                
                                <div>                                
                                    <p>Entrega: {Moment(andament.prazo_entrega).format('DD/MM/YYYY')}</p>            
                                </div>
                            </div>                                                    
                        </div>                        
                    </li>
                ))}
            </ul>
            <ul className='listaTarefas'>
                <div className='pendentes'>PENDENTES</div>
                {pendentes.map(pendente => (
                    <li key={pendente.id}>
                        <div className='card' onClick={()=> history.push(`/tarefa/${pendente.id}`)}>
                            <div className='nome-checkBox-container'>
                                <h1>{pendente.tipo}</h1>                                
                            </div>
                            <div className='avatar-bairro-container'>
                                
                                <div>                                
                                    <p>Entrega: {Moment(pendente.prazo_entrega).format('DD/MM/YYYY')}</p>            
                                </div>
                            </div>                                                    
                        </div>                        
                    </li>
                ))}
            </ul>

            
            
            <div className="footer-container">
                <button type="button" 
                    onClick={()=> {
                        history.push('/')
                    }}>
                    <FaHome size={20} color="#a9a9a9" /> 
                </button>
                <button type="button" onClick={() => history.push('/municipe/new')}>
                    <FaUserPlus size={20} color="#a9a9a9" /> 
                </button>
                <button type="button"
                    onClick={()=> {
                        history.push('/tarefa/new/')
                        localStorage.setItem('municipeId', 0)
                        localStorage.setItem('solicitacaoId', 0)
                        localStorage.setItem('demandaId', 0)
                    }}>
                    <FaCheckSquare  size={20} color="#a9a9a9" /> 
                </button>
                <button type="button"
                    onClick={()=> {
                        history.push('/tarefas')
                        localStorage.setItem('municipeId', 0)
                        localStorage.setItem('solicitacaoId', 0)
                        localStorage.setItem('demandaId', 0)
                    }}>
                    <FaList  size={20} color="#a9a9a9" /> 
                </button>
                <button type="button"
                    onClick={()=> {
                        history.push('/demandas')
                        localStorage.setItem('municipeId', 0)
                        localStorage.setItem('solicitacaoId', 0)
                        localStorage.setItem('demandaId', 0)
                    }}>
                    <FaListAlt  size={20} color="#a9a9a9" /> 
                </button>
            </div>
        </div>
    );
}
