import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FaSearch, FaPlusCircle, FaWindowClose } from 'react-icons/fa';
import api from '../../services/api';

import './styles.css'

import Moment from 'moment';
import 'moment-timezone';
import 'moment/locale/pt-br';

Moment.tz.setDefault('UTC');
Moment.locale('pt-BR');




export default function NewSolicitacao(){
    const history = useHistory();
    const params = useParams();
    const [municipe, setMunicipe] = useState([]);
    const [tipo, setTipo] = useState('');
    const [tipos, setTipos] = useState([]);
    const [demandas, setDemandas] = useState([]);
    const [demanda, setDemanda] = useState([])
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [secretaria, setSecretaria] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [filterView, setFilterView] = useState(false);
    const [demandaView, setDemandaView] = useState(false);
    const [addDemandaView, setAddDemandaView] = useState(false);
    const [addTipoView, setAddTipoView] = useState(false);
    const [addTarefaView, setAddTarefaView] = useState(false);
    const [tarefaView, setTarefaView] =  useState(false);
    

    const [dmdTipo, setDmdTipo] = useState('');
    const [dmdDescricao, setDmdDescricao] = useState('');
    const [dmdUrl_fotos, setDmdUrl_fotos] = useState('');
    const [dmdSecretaria, setDmdSecretaria] = useState('');
    const [dmdSecretario, setDmdSecretario] = useState('');
    const [dmdLogradouro, setDmdLogradouro] = useState('');
    const [dmdNumero, setDmdNumero] = useState('');
    const [dmdComplemento, setDmdComplemento] = useState('');
    const [dmdBairro, setDmdBairro] = useState('');
    const [dmdCidade, setDmdCidade] = useState('');
    const [dmdPrioridade, setDmdPrioridade] = useState('');
    const [dmdId, setDmdId] = useState(0);
    const demanda2 = {};
    

    const [trfPrazo_entrega, setTrfPrazo_entrega] = useState();
    const [trfTipo, setTrfTipo] = useState('');
    const [trfDescricao, setTrfDescricao] = useState('');
    const [trfSecretaria, setTrfSecretaria] = useState('');
    const [trfObservacao, setTrfObservacao] = useState('');
    const [trfPrioridade, setTrfPrioridade] = useState('');
    
    const tarefa = {
        "data_criacao": Moment().format(),
        "tipo": trfTipo,
        "status": "PENDENTE",
        "usuario": localStorage.getItem('id')
    }
    
    const [tarefas, setTarefas] = useState([])

    const solicitacao = {
        "municipe": municipe.id,
        "usuario": localStorage.getItem('id'),
        "demanda": dmdId
    }

    useEffect(() =>{
        const token = 'JWT ' + localStorage.getItem('token');
        const url = 'gestao/municipe/' + params.id;
        const urlDemanda = 'gestao/demandas/?mes='+mes+'&ano='+ano+'&tipo='+tipo+'&status=pendente&secretaria='+secretaria+'&logradouro='+logradouro+'&bairro='+bairro
        const urlTipo = 'gestao/tipo/'
        
        api.get(urlTipo, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setTipos(response.data.results);

        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        });

        api.get(url, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setMunicipe(response.data);

        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        });

        api.get(urlDemanda, {
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

    }, [history, params, mes, ano, secretaria, logradouro, bairro, tipo])
   
    function TreatSearch(search){
        const a = '·/_,:;'
        const b = '++++++'
        const p = new RegExp(a.split('').join('|'), 'g')
        return search.toString().toLowerCase().trim()
          .replace(p, c => b.charAt(a.indexOf(c))) 
          .replace(/&/g, '+') 
          .replace(/[\s\W-]+/g, '+')
    }

    function handleSubmitAddDemanda(e){
        e.preventDefault();

        if(dmdTipo) {demanda2['tipo']=dmdTipo} else {alert("tipo de demanda é obrigatório!")}
        if(dmdDescricao) {demanda2['descricao']=dmdDescricao}
        if(dmdUrl_fotos) {demanda2['url_fotos']=dmdUrl_fotos}
        if(dmdSecretaria) {demanda2['secretaria']=dmdSecretaria}
        if(dmdSecretario) {demanda2['secretario']=dmdSecretario}
        if(dmdLogradouro) {demanda2['logradouro']=dmdLogradouro}
        if(dmdNumero) {demanda2['numero']=dmdNumero}
        if(dmdComplemento) {demanda2['complemento']=dmdComplemento}
        if(dmdBairro) {demanda2['bairro']=dmdBairro}
        if(dmdCidade) {demanda2['cidade']=dmdCidade}
        if(dmdPrioridade) {demanda2['prioridade']=dmdPrioridade}

        api.post('gestao/demanda/', demanda2, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        }).then(response => {
            if (response.data.id>0) {
                setDmdId(response.data.id);
                setDemanda(response.data);
                setDemandaView(true);
                setAddDemandaView(false);
                setTarefaView(true);
            }
        }, error => {
            console.data(error.data);  
            if (error.response.status === 401){
                history.push('/logon');
            }
        })

    }

    function handleNewTarefa(e){
        e.preventDefault();

        

        if (trfPrazo_entrega) {tarefa['prazo_entrega']=Moment(trfPrazo_entrega).format()}
        if (trfTipo) {tarefa['tipo']=trfTipo}
        if (trfDescricao) {tarefa['descricao']=trfDescricao}
        if (trfSecretaria) {tarefa['secretaria']=trfSecretaria}
        if (trfObservacao) {tarefa['observacao']=trfObservacao}
        if (trfPrioridade) {tarefa['prioridade']=trfPrioridade}

        setTarefas([...tarefas, tarefa])

        

        setAddTarefaView(false)
            
    }

    function setarTarefa(tarefa, id){
        let tarefa2 = tarefa
        tarefa2['solicitacao'] = id

        return tarefa2
    }

    function handleSubmitSolicitacao(e){
        e.preventDefault();
        
        

        if(dmdId<=0){
            alert("é preciso de uma demanda")
            return
        }

        api.post('gestao/solicitacao/', solicitacao, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        }).then(response => {
            if (response.data.id>0) {                
                if(tarefas.length>0){
                    tarefas.map(tare=>(
                        api.post('gestao/tarefa/', setarTarefa(tare, response.data.id), {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `JWT ${localStorage.getItem('token')}`
                            }
                        })
                    ))
                }
                history.push('/municipe/' + params.id)                            
            }
        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        })
    }


    return(
        <div className="new-solicitacao-container">
            <section>
                <h1>Nova Solicitação</h1>

                <div className="back-link">
                    <FiArrowLeft size={16} color="gray" onClick={()=> history.goBack()}/>
                    Voltar
                </div>
                
            </section>

            <hr/>
            <div>
                <h1>{municipe.nome}</h1>
                <p>Id: {municipe.id}</p>
                <p>Bairro: {municipe.bairro}</p>
                <p>Fones: {municipe.fones && municipe.fones.map(e => e.numero).join('; ')}</p>
                <p>Obs: {municipe.obs}</p>
            </div>




{/* .............................DEMANDAS.......................... */}



            <div className='demandaHeader'>
                <p><strong>Demanda: </strong></p>
                <button type="button"  
                    onClick={()=>{
                        setFilterView(filterView ? false : true) 
                        setAddDemandaView(false)
                    }}>
                    <FaSearch className='search-icon'/> 
                </button>
                <button type="button"  
                    onClick={()=>{
                        setFilterView(false) 
                        setAddDemandaView(addDemandaView ? false : true)
                        setTarefaView(true)
                    }}>
                    <FaPlusCircle className='class-add-icon'/> 
                </button>
            </div>
            {demandaView && demanda &&
                <div className='cardDemanda' >
                    <div className=''>
                        <h3>{Moment(demanda.data).format('DD/MM/YYYY')} - {demanda.tipo}</h3>
                        <p>{demanda.bairro}{demanda.logradouro && ' - ' + demanda.logradouro}</p>                                                                               
                    </div>
                                                                        
                </div>
            }


            {/* ................PESQUISAR DEMANDAS............................. */}



            {filterView && <div className='filter-container'>

                <select onChange={e=> setTipo(TreatSearch(e.target.value))}>
                    <option value={''}>
                        Selecione o Tipo
                    </option>
                    {tipos.map((e, index) =>(
                        <option value={e.tipo} key={index}>
                            {e.tipo}
                        </option>
                    ))}
                    
                </select>
                <input 
                    placeholder="Pesquise por Logradouro"
                    value={logradouro}
                    onChange={e=> setLogradouro(e.target.value)} 
                />
                <input 
                    placeholder="Pesquise por Bairro"
                    value={bairro}
                    onChange={e=> setBairro(e.target.value)} 
                />
                <input 
                    placeholder="Pesquise por Secretaria"
                    value={secretaria}
                    onChange={e=> setSecretaria(e.target.value)} 
                />
                <input 
                    placeholder="Pesquise por Mês"
                    value={mes}
                    onChange={e=> setMes(e.target.value)} 
                />
                <input 
                    placeholder="Pesquise por Ano"
                    value={ano}
                    onChange={e=> setAno(e.target.value)} 
                />
                <ul>
                    {demandas.map(demand => (
                        <li key={demand.id}>
                            <div className='cardDemanda' 
                                onClick={() => {
                                    setDemanda(demand);
                                    setDemandaView(true);
                                    setFilterView(false);
                                    setTarefaView(true);
                                    setDmdId(demand.id)
                                }}>
                                <div className=''>
                                    <h3>{Moment(demand.data).format('DD/MM/YYYY')} - {demand.tipo}</h3>
                                    <p>{demand.bairro}{demand.logradouro && ' - ' + demand.logradouro}</p>                                        
                                </div>
                                                                                    
                            </div>                        
                        </li>
                    ))}
                </ul>
            </div>}


            {/* ..................... ADICIONAR DEMANDAS..................... */}


            
            {addDemandaView && <div className='select-tipo-add'>
                
                {addTipoView ? 
                    <input 
                        placeholder="Digite um Novo Tipo"
                        value={dmdTipo}
                        onChange={e=> setDmdTipo(e.target.value)} 
                    />
                :   <select onChange={e=> setDmdTipo(e.target.value)}>
                        <option value={''}>
                            Selecione o Tipo
                        </option>
                        {tipos.map((e, index) =>(
                            <option value={e.tipo} key={index}>
                                {e.tipo}
                            </option>
                        ))}
                        
                    </select>
                }
                <button type="button" onClick={()=>setAddTipoView(addTipoView ? false : true)}>
                    {addTipoView ? <FaWindowClose className='class-add-icon' color='gray'/>
                    : <FaPlusCircle className='class-add-icon'/>}
                </button>

                <form className='select-tipo-add' onSubmit={handleSubmitAddDemanda}>
                    <input 
                        placeholder="Descrição"
                        value={dmdDescricao}
                        onChange={e=> setDmdDescricao(e.target.value)} 
                    />
                    <input 
                        placeholder="Secretaria"
                        value={dmdSecretaria}
                        onChange={e=> setDmdSecretaria(e.target.value)} 
                    />
                    <input 
                        placeholder="Secretária(o)"
                        value={dmdSecretario}
                        onChange={e=> setDmdSecretario(e.target.value)} 
                    />
                    <input 
                        placeholder="Logradouro"
                        value={dmdLogradouro}
                        onChange={e=> setDmdLogradouro(e.target.value)} 
                    />
                    <input 
                        placeholder="Número"
                        value={dmdNumero}
                        onChange={e=> setDmdNumero(e.target.value)} 
                    />
                    <input 
                        placeholder="Complemento"
                        value={dmdComplemento}
                        onChange={e=> setDmdComplemento(e.target.value)} 
                    />
                    <input 
                        placeholder="Bairro"
                        value={dmdBairro}
                        onChange={e=> setDmdBairro(e.target.value)} 
                    />
                    <input 
                        placeholder="Cidade"
                        value={dmdCidade}
                        onChange={e=> setDmdCidade(e.target.value)} 
                    />
                    <input 
                        placeholder="URL Fotos"
                        value={dmdUrl_fotos}
                        onChange={e=> setDmdUrl_fotos(e.target.value)} 
                    />
                    <input 
                        placeholder="Prioridade"
                        value={dmdPrioridade}
                        onChange={e=> setDmdPrioridade(e.target.value)} 
                        type="number"
                    />
                    <button className="button" type='submit'>Adicionar</button>
                </form>


            </div>
            }



{/* ........................TAREFAS.................. */}


            {tarefaView &&
                <> 
                    <div className='demandaHeader'>
                        <p><strong>Tarefa: </strong></p>
                        <button type="button" onClick={() => setAddTarefaView(addTarefaView ? false : true)} >
                            <FaPlusCircle className='class-add-icon'/> 
                        </button>
                    </div>
                    <ul className='tarefas-ul'>                        
                        {tarefas.map(e =>
                            <li key={e.data_criacao} className='class-li'>
                                {e.tipo}
                            </li>
                        )}
                    </ul>
                </>
            }
            
            {addTarefaView &&
                <form className='select-tipo-add' onSubmit={handleNewTarefa}>
                    <input 
                        placeholder="Tipo"
                        value={trfTipo}
                        onChange={e=> setTrfTipo(e.target.value)} 
                    />
                    <input 
                        placeholder="Descrição"
                        value={trfDescricao}
                        onChange={e=> setTrfDescricao(e.target.value)} 
                    />
                    <input 
                        placeholder="Secretaria"
                        value={trfSecretaria}
                        onChange={e=> setTrfSecretaria(e.target.value)} 
                    />
                    <input 
                        placeholder="Observação"
                        value={trfObservacao}
                        onChange={e=> setTrfObservacao(e.target.value)} 
                    />
                    <input 
                        placeholder="Prioridade"
                        value={trfPrioridade}
                        onChange={e=> setTrfPrioridade(e.target.value)} 
                        type = 'number'
                    />
                    <input 
                        placeholder="Prazo_entrega"
                        value={trfPrazo_entrega}
                        onChange={e=> setTrfPrazo_entrega(e.target.value)} 
                        type = 'datetime-local'
                    />
                    <button className="button" type='submit'>Adicionar</button>

                </form>
            }

            <button className="button" onClick={handleSubmitSolicitacao}>Cadastrar</button>

        </div>
    )
};