import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { FaHome, FaUserPlus, FaCheckSquare, FaList, FaSearch, FaFilter, FaPrint, FaFilePdf, FaListAlt } from 'react-icons/fa';

import api from '../../services/api';
import './styles.css'

export default function Demandas(){
    const history = useHistory();
    const token = 'JWT ' + localStorage.getItem('token');
    const [demandas, setDemandas] = useState([]);
    const [mes, setMes] = useState('')
    const [ano, setAno] = useState('')
    const [tipo, setTipo] = useState('')
    const [status, setStatus] = useState('PENDENTE')
    const [secretaria, setSecretaria] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [prioridade, setPrioridade] = useState('')

    const [filterView, setFilterView] = useState(false)


    useEffect(() =>{
        
        
        const urlDemandas = '/gestao/demandas/?mes='+mes+'&ano='+ano+'&tipo='+tipo+'&status='+status+'&secretaria='+secretaria+'&logradouro='+logradouro+'&prioridade='+prioridade+'&bairro='+bairro;

        api.get(urlDemandas, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setDemandas(response.data.results);
        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        })

        

    }, [token, history, mes, ano, tipo, status, secretaria, logradouro, bairro, prioridade])

    



    return (
        <div className="home-container">
            <div className="options-container">
                <h1>Demandas</h1>
                <div>
                    <FaPrint className="icon" size={20} color="#fff" />
                    <FaFilePdf className="icon" size={20} color="#fff" />
                </div>                
            </div>
            
            <div className='filterLine-container'>
                <div className='line'/>
                <FaFilter  size={15} color="#a9a9a9" onClick={()=>{setFilterView(filterView ? false : true)}} />
            </div>
            {filterView && <div className='filters-container'>
                <div className='search-container'>
                    <FaSearch className='faSearch' />
                    <input type="text" 
                        className="searchBar" 
                        placeholder="Pesquise por TIPO"
                        value={tipo}
                        onChange={e=> setTipo(e.target.value)}
                    />
                </div>
                <div className='search-container'>
                    <FaSearch className='faSearch' />
                    <input type="text" 
                        className="searchBar" 
                        placeholder="Pesquise por bairro"
                        value={bairro}
                        onChange={e=> setBairro(e.target.value)}
                    />
                </div>
                <div className='search-container'>
                    <FaSearch className='faSearch' />
                    <input type="text" 
                        className="searchBar" 
                        placeholder="Pesquise por Logradouro"
                        value={logradouro}
                        onChange={e=> setLogradouro(e.target.value)}
                    />
                </div>
                <div className='search-container'>
                    <FaSearch className='faSearch' />
                    <input type="text" 
                        className="searchBar" 
                        placeholder="Pesquise por Secretaria"
                        value={secretaria}
                        onChange={e=> setSecretaria(e.target.value)}
                    />
                </div>
                <div className='search-container'>
                    <FaSearch className='faSearch' />
                    <input type="text" 
                        className="searchBar" 
                        placeholder="Pesquise por Mes"
                        value={mes}
                        onChange={e=> setMes(e.target.value)}
                    />
                </div>
                <div className='search-container'>
                    <FaSearch className='faSearch' />
                    <input type="text" 
                        className="searchBar" 
                        placeholder="Pesquise por Ano"
                        value={ano}
                        onChange={e=> setAno(e.target.value)}
                    />
                </div>
                <div className='search-container'>
                    <FaSearch className='faSearch' />
                    <input type="text" 
                        className="searchBar" 
                        placeholder="Pesquise por Status"
                        value={status}
                        onChange={e=> setStatus(e.target.value)}
                    />
                </div>
                <div className='search-container'>
                    <FaSearch className='faSearch' />
                    <input type="number" 
                        className="searchBar" 
                        placeholder="Prioridade"
                        value={prioridade}
                        onChange={e=> setPrioridade(isNaN(e.target.value)? '': e.target.value )}
                    />
                </div>
            </div>}
            <ul>
                {demandas.map(demanda => (
                    <li key={demanda.id}>
                        <div className='card' onClick={()=> history.push(`/demanda/${demanda.id}`)}>
                            <div className='nome-checkBox-container'>
                                <h1>{demanda.id} - {demanda.tipo}</h1>
                                
                            </div>
                            <div className='avatar-bairro-container'>
                                <div>                                
                                    <p><strong>{demanda.bairro}</strong></p>
                                    <p>{demanda.descricao}</p>                            
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
