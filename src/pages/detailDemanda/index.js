import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaEdit, FaArrowLeft, FaPrint, FaFilePdf, FaEye, FaPlusCircle, FaCamera } from 'react-icons/fa';

import api from '../../services/api';
import Moment from 'moment';
import './styles.css'
import 'moment-timezone';
import 'moment/locale/pt-br';

Moment.tz.setDefault('UTC');
Moment.locale('pt-BR');

export default function DetailSolicitacao(){
    const history = useHistory();
    const params = useParams();
    const [demanda, setDemanda] = useState([])
    
    
    useEffect(() =>{
        let token = 'JWT ' + localStorage.getItem('token');
        
        let urlDemanda = 'gestao/demanda/' + params.id

        api.get(urlDemanda, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setDemanda(response.data);
        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
            alert(error.response.data);
        })        

    }, [ history, params ])

    async function getMunicipe(id){
        let token = 'JWT ' + localStorage.getItem('token');

        await api.get('gestao/municipe/'+id, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            console.log(response.data);
            return <p>{response.data.nome}</p>
        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
            alert(error.response.data);

        })
    }

     

    
    return(
        
        <div className="home-container">
            <div className="options-container">
                <div>
                    <FaArrowLeft size={20} color="#fff" opacity="0.5" onClick={()=> history.goBack()} />                   
                </div>
                <div>
                    <FaPrint className="icon" size={20} color="#fff" />
                    <FaFilePdf className="icon" size={20} color="#fff" />
                    <FaEdit className="icon" size={20} color="#fff" onClick={() => history.push('/editdemanda/'+params.id)}/>
                </div>   
            </div>
            <div className='card'>
                              

                <div> 
                    
                    <div className='demanda-container'>
                        <div className='solicitHeader'>                            
                            <h1>{demanda.tipo}</h1>
                            <div className='containerButtons'>
                                <div className='solicitaStatus' />
                                {demanda.url_fotos && 
                                    <a href={demanda.url_fotos} target="_blank" rel="noopener noreferrer">
                                        <FaCamera className="icon" size={20} color="cinza" />
                                    </a>                                
                                }
                            </div>
                        </div>
                        
                        <p className='dataDemanda'>Esta demanda foi cadastrada no dia {Moment(demanda.data).format('DD/MM/YY')}</p>
                        <p>{demanda.descricao}</p>
                        <hr/>
                        <p><strong>End: </strong>{demanda.logradouro}, {demanda.numero}{demanda.complemento && <span> / {demanda.complemento}</span>} - {demanda.bairro}</p>
                        <p><strong>Secretaria: </strong>{demanda.secretaria}</p>
                        <p><strong>Prioridade: </strong>{demanda.prioridade}</p>
                        <hr/>
                    </div>
                    <div className='solicitHeader'>                            
                        <h3>Tarefas </h3>
                        <div className='containerButtons'>
                            <button type="button" 
                                onClick={()=> {
                                    history.push('/tarefa/new')
                                    localStorage.setItem('municipeId', 0)
                                    localStorage.setItem('solicitacaoId', 0)
                                    localStorage.setItem('demandaId', demanda.id)
                                }} className='solicitaAdd'>
                                <FaPlusCircle size={15} /> 
                            </button>
                        </div>   
                    </div>
                    <ul>
                        
                        {demanda.tarefas && demanda.tarefas.map(e3 => (
                            <li key={e3.id} >
                                <div className='acaoContainer'>
                                    <div className='acaoDate'><p>{Moment(e3.data).format('DD/MM/YYYY')}</p></div>
                                    <div className='acaoTipo'><p>{e3.tipo}</p></div>
                                    <div className='containerButtons'>
                                        <div className='acaoStatus' />
                                        <button className='acaoView' type="button" 
                                            onClick={()=> {
                                                history.push('/tarefa/'+ e3.id)
                                            }}>
                                            <FaEye size={15}/> 
                                        </button>
                                    </div>
                                </div>
                                {e3.descricao && <div className='acaoDescricao'>{e3.descricao}</div>} 
                                {e3.observacao && <div className='acaoObservacao'>{e3.observacao}</div>}                                   
                            </li>
                        ))}
                    </ul>   
                    <div className='solicitHeader'>                            
                        <h3>Solicitações </h3>
                        <div className='containerButtons'>
                            <button type="button" 
                                onClick={()=> {
                                    history.push(null)
                                    localStorage.setItem('municipeId', 0)
                                    localStorage.setItem('solicitacaoId', 0)
                                    localStorage.setItem('demandaId', demanda.id)
                                }} className='solicitaAdd'>
                                <FaPlusCircle size={15} /> 
                            </button>
                        </div>   
                    </div> 
                    <ul>                        
                        {demanda.demandaSolicitacoes && demanda.demandaSolicitacoes.map(e4 => (
                            <li key={e4.id} >
                                <div className='acaoContainer'>
                                    <div className='acaoDate'><p>{Moment(e4.data).format('DD/MM/YYYY')}</p></div>
                                    <div className='acaoTipo'>{() => getMunicipe(e4.municipe)}</div>
                                    <div className='containerButtons'>
                                        <div className='acaoStatus' />
                                        <button className='acaoView' type="button" 
                                            onClick={()=> {
                                                history.push('/solicitacao/'+ e4.id)
                                            }}>
                                            <FaEye size={15}/> 
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>                                            
                                       
                </div>                                                                    
            </div>           
        </div>
    )
}