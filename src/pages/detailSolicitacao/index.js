import React, { useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaEnvelopeSquare, FaPhoneSquare, FaArrowLeft, FaPrint, FaFilePdf, FaEye, FaPlusCircle } from 'react-icons/fa';
import AvatarAlt from '../../assets/avatar.jpg';

import api from '../../services/api';
import Moment from 'moment';
import './styles.css'
import 'moment-timezone';
import 'moment/locale/pt-br';

Moment.tz.setDefault('UTC');
Moment.locale('pt-BR');

export default function DetailSolicitacao(){
    const history = useHistory();
    const [municipe, setMunicipe] = useState([])
    const params = useParams();
    const [solicitacao, setSolicitacao] = useState([]);
    const [demanda, setDemanda] = useState([])
    
    
    useEffect(() =>{
        let token = 'JWT ' + localStorage.getItem('token');
        let url = 'gestao/municipe/';
        let urlSolicita = 'gestao/solicitacao/' + params.id
        let urlDemanda = 'gestao/demanda/'

        api.get(urlSolicita, {
            headers: {
                Authorization: token,
            }
        }).then(response => {            
            setSolicitacao(response.data);            
            api.get(url + response.data.municipe, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setMunicipe(response.data);
    
            });
            api.get(urlDemanda + response.data.demanda, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setDemanda(response.data);    
            });

        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        })
        
        

    }, [ history, params, solicitacao, demanda ])

    

    
    return(
        
        <div className="home-container">            
            <div className="options-container">
                <div>
                    <FaArrowLeft size={20} color="#fff" opacity="0.5" onClick={()=> history.goBack()} />                   
                </div>
                <div>
                    <FaPrint className="icon" size={20} color="#fff" />
                    <FaFilePdf className="icon" size={20} color="#fff" />
                </div>   
            </div>
            <div className='card'>
                <div className='avatar1-container'>
                    {municipe.avatar_url && municipe.avatar_url.length > 5 ? <img className='imgDetail-avatar' src={municipe.avatar_url} alt="...carregando imagem..." /> : <img className='img-avatar' src={AvatarAlt} alt="...carregando imagem..." />}                                 
                </div>
                <div>
                    <h1>{municipe.nome}</h1>
                    <div className='obs'>
                        <p><strong>Obs: </strong>{municipe.obs}</p>
                    </div>
                    
                </div>
                <div> 
                    <p><strong>End: </strong>{municipe.logradouro}, {municipe.numero}{municipe.complemento && <span> / {municipe.complemento}</span>} - {municipe.bairro}</p>
                    
                    <ul className='phone-ul'>
                        {municipe.fones && municipe.fones.map(e => (
                            <li className='phone-li' key={e.id}>
                                <FaPhoneSquare className='phoneIcon'/>
                                <p>{e.numero}</p>
                            </li>
                        ))}
                    </ul>
                    <ul className='email-ul'>
                        {municipe.emails && municipe.emails.map(e => (
                            <li className='email-li' key={e.id}>
                                <FaEnvelopeSquare className='emailIcon'/>
                                <p>{e.email}</p>
                            </li>
                        ))}
                    </ul>
                    <div className='solicitacoesContainer'>
                        {demanda && <div className='demanda-container'>
                            <div className='solicitHeader'>                            
                                <h3>{demanda.tipo}</h3>
                                <div className='containerButtons'>
                                    <div className='solicitaStatus' />                                    
                                </div>   
                            </div>
                            
                            <p className='dataDemanda'>Esta demanda foi cadastrada no dia {Moment(demanda.data).format('DD/MM/YY')}</p>
                            <p>{demanda.descricao}</p>
                        </div>}
                    </div>
                    
                    <div className='solicitacoesContainer'>

                        {solicitacao &&
                            <div className='solicitHeader'>                            
                                <h3>Solicitação no dia {Moment(solicitacao.data).format('DD/MM/YY')}</h3>
                                <div className='containerButtons'>
                                    <div className='solicitaStatus' />
                                    <button type="button" 
                                        onClick={()=> {
                                            history.push('/tarefa/new')
                                            localStorage.setItem('municipeId', municipe.id)
                                            localStorage.setItem('solicitacaoId', solicitacao.id)
                                            localStorage.setItem('demandaId', 0)
                                        }} className='solicitaAdd'>
                                        <FaPlusCircle size={15} /> 
                                    </button>
                                </div>                                   
                            </div>}
                            <ul>
                                {solicitacao.tarefas && solicitacao.tarefas.map(e2 => (
                                    <li key={e2.id} >
                                        <div className='acaoContainer'>
                                            <div className='acaoDate'><p>{Moment(e2.data).format('DD/MM/YYYY')}</p></div>
                                            <div className='acaoTipo'><p>{e2.tipo}</p></div>
                                            <div className='containerButtons'>
                                                <div className='acaoStatus' />
                                                <button className='acaoView' type="button" 
                                                    onClick={()=> {
                                                        history.push('/tarefa/'+ e2.id)
                                                    }}>
                                                    <FaEye size={15}/> 
                                                </button>
                                                
                                            </div>
                                        </div>
                                        {e2.descricao && <div className='acaoDescricao'>{e2.descricao}</div>} 
                                        {e2.observacao && <div className='acaoObservacao'>{e2.observacao}</div>}                                                                
                                        
                                    </li>
                                ))}
                            </ul>
                          
                        <hr/>
                        {demanda && <div className='demanda-container'>
                            <div className='solicitHeader'>                            
                                <h3>Tarefas da Demanda</h3>
                                <div className='containerButtons'>
                                    <div className='solicitaStatus' />
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
                        </div>}
                        
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
                    </div>                    
                </div>                                                                    
            </div>           
        </div>
    )
}