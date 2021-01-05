import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import apiCep from '../../services/apiCep';

import './styles.css'

import Moment from 'moment';
import 'moment-timezone';
import 'moment/locale/pt-br';

Moment.tz.setDefault('UTC');
Moment.locale('pt-BR');




export default function EditDemanda(){

    const history = useHistory();
    const params = useParams();
    const [demanda, setDemanda] = useState([]);
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [complemento, setComplemento] = useState('');
    const [descricao, setDescricao] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [secretaria, setSecretaria] = useState('');
    const [status, setStatus] = useState('');
    const [tipo, setTipo] = useState('');
    const [url_fotos, setUrl_fotos] = useState('');
    const [searchCep, setSearchCep] = useState(false)
    const [searchRuas, setSearchRuas] = useState([])
    
    
    useEffect(() =>{
        let token = 'JWT ' + localStorage.getItem('token');        
        let urlDemanda = 'gestao/demanda/' + params.id

        api.get(urlDemanda, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setBairro(response.data.bairro);
            setCidade(response.data.cidade);
            setComplemento(response.data.complemento);
            setDescricao(response.data.descricao);
            setLogradouro(response.data.logradouro);
            setNumero(response.data.numero);
            setPrioridade(response.data.prioridade);
            setSecretaria(response.data.secretaria);
            setStatus(response.data.status);
            setTipo(response.data.tipo);
            setUrl_fotos(response.data.url_fotos);            
        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        })   
        
        

    }, [ history, params ])

    
    useEffect(() =>{

        const urlRua = logradouro.length>3 ? 'SP/Sao Jose dos Campos/' + logradouro + '/json/' : ''
        
        if (urlRua.length>3) {

            apiCep.get(urlRua).then(response => {
                if (response.data.erro === true){
                    alert('rua não encontrada')
                }else {
                setSearchRuas(response.data);
                }                
            }, error => {
                if (error.response === 400){
                    alert('rua não encontrada')
                }
            })
        }

    }, [logradouro])
 
    function handleSubmit(e){
        // e.preventDefault();

        
        // let prazo = Moment(prazo_entrega).format()
        

        // if(Moment(prazo).format('DD/MM/AAAA') < Moment().format('DD/MM/AAAA')) {
        //     alert('Prazo de entrega inválido!');
        //     return
        // }

        // if(!tipo){
        //     alert('Tipo é um campo obrigatório!')
        //     return
        // }

        

        // let tarefa = {
                        
        //     "prazo_entrega": prazo, //requerido!
        //     "usuario": localStorage.getItem('id'),
        //     "tipo": tipo
        // }
        
        
        // if(status==='CONCLUIDO') tarefa["data_conclusao"] = Moment().format();
        // if(descricao) tarefa["descricao"] = descricao;
        // if(secretaria) tarefa["secretaria"] = secretaria;
        // status ? tarefa["status"] = status : tarefa["status"] = "PENDENTE";
        // if(observacao) tarefa["observacao"] = observacao;
        // if(prioridade) tarefa["prioridade"] = prioridade;
        // if(solicitacaoId>0) tarefa["solicitacao"] = solicitacaoId;
        // if(demandaId>0) tarefa["demanda"] = demandaId;
        
        // api.patch('gestao/tarefa/'+ params.id + '/', tarefa, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `JWT ${localStorage.getItem('token')}`
        //     }
        // })

        // history.goBack()
    }

    



// ............................................ FRONT END...................



    return(
        <div className="new-solicitacao-container">
            <section>
                <h1>Editar Demanda</h1>

                <div className="back-link" >
                    <FiArrowLeft size={16} color="gray" onClick={()=> history.goBack()} />
                    Voltar
                </div>
            </section>

            {demanda &&
                <form onSubmit={handleSubmit}>
                    
                    <hr/>
                    <p>Tipo</p>                    
                    <input
                        value={tipo}
                        onChange={e=> setTipo(e.target.value)} 
                    />
                    
                    <hr/>
                    <p>Descrição</p>                    
                    <textarea
                        value={descricao}
                        onChange={e=> setDescricao(e.target.value)} 
                    />
                    
                    <hr/>
                    <p>Status</p>                        
                    <select onChange={e=> setStatus(e.target.value)}>
                        <option value={status}>
                            {status}
                        </option>
                        <option value={'PENDENTE'}>
                            PENDENTE
                        </option>
                        <option value={'CONCLUIDO'}>
                            CONCLUÍDO
                        </option>
                    </select>
                    
                    <hr/>
                    <p>Secretaria</p>                    
                    <input
                        value={secretaria}
                        onChange={e=> setSecretaria(e.target.value)} 
                    />

                    <hr/>
                    <p>URL Fotos</p>                    
                    <input
                        value={url_fotos}
                        onChange={e=> setUrl_fotos(e.target.value)} 
                    />

                    <hr/>
                    <p>Prioridade</p>
                    <input 
                        placeholder="Prioridade"
                        value={prioridade}
                        onChange={e=> setPrioridade(e.target.value)} 
                        type = 'number'
                    />

                    <hr/>                    
                    <p>Rua</p>
                    <div className= 'fone'>
                        <input 
                            placeholder="Procurar Rua"
                            value={logradouro}
                            onChange={e=> setLogradouro(e.target.value)} 
                        />
                        <button type="button" className="mais" onClick={() => (setSearchCep(!searchCep))}>
                            <FaSearch  size={20} color="#a9a9a9" /> 
                        </button>
                    </div>
                    {searchCep && 
                        <div>
                            {searchRuas.map((rua, index) => (
                                <Link className= 'fones' key={index}  
                                    onClick={() => { 
                                        setSearchCep(!searchCep);
                                        setBairro(rua.bairro);
                                        setCidade(rua.cidade)
                                        setLogradouro(rua.logradouro)}}>
                                    <div>{rua.logradouro} - </div>
                                    <div>{rua.bairro}</div>
                                </Link>
                            ))}             
                        </div>
                    }
                    
                    <hr/>
                    <p>Numero</p>                    
                    <input
                        value={numero}
                        onChange={e=> setNumero(e.target.value)} 
                    />

                    <hr/>
                    <p>Complemento</p>                    
                    <input
                        value={complemento}
                        onChange={e=> setComplemento(e.target.value)} 
                    />

                    <hr/>
                    <p>Bairro</p>                    
                    <input
                        value={bairro}
                        onChange={e=> setBairro(e.target.value)} 
                    />

                    <hr/>
                    <p>Cidade</p>                    
                    <input
                        value={cidade}
                        onChange={e=> setCidade(e.target.value)} 
                    />

                    <button className="button" type ='submit'>Cadastrar</button>
                </form>
            }
        </div>
    )
};