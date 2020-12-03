import React, { useState } from 'react';


import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css'

import Moment from 'moment';
import 'moment-timezone';
import 'moment/locale/pt-br';

Moment.tz.setDefault('UTC');
Moment.locale('pt-BR');




export default function NewTarefa(){

    const solicitacaoId = localStorage.getItem('solicitacaoId');
    const demandaId = localStorage.getItem('demandaId');

    const history = useHistory();
    

    const [prazo_entrega, setPrazo_entrega] = useState(Moment().format());
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [secretaria, setSecretaria] = useState('');
    const [obs, setObs] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [status, setStatus] = useState('');

    let optionsStatus = ['PENDENTE', 'ANDAMENTO', 'CONCLUIDO']
    
 
    function handleSubmit(e){
        e.preventDefault();

        
        let prazo = Moment(prazo_entrega).format()
        

        if(Moment(prazo).format('DD/MM/AAAA') < Moment().format('DD/MM/AAAA')) {
            alert('Prazo de entrega inválido!');
            return
        }

        if(!tipo){
            alert('Tipo é um campo obrigatório!')
            return
        }

        

        let tarefa = {
                        
            "prazo_entrega": prazo, //requerido!
            "usuario": localStorage.getItem('id'),
            "tipo": tipo
        }
        
        
        if(status==='CONCLUIDO') tarefa["data_conclusao"] = Moment().format();
        if(descricao) tarefa["descricao"] = descricao;
        if(secretaria) tarefa["secretaria"] = secretaria;
        status ? tarefa["status"] = status : tarefa["status"] = "PENDENTE";
        if(obs) tarefa["observacao"] = obs;
        if(prioridade) tarefa["prioridade"] = prioridade;
        if(solicitacaoId>0) tarefa["solicitacao"] = solicitacaoId;
        if(demandaId>0) tarefa["demanda"] = demandaId;
        
        api.post('gestao/tarefa/', tarefa, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        })

        history.goBack()
    }

    



// ............................................ FRONT END...................



    return(
        <div className="new-solicitacao-container">
            <section>
                <h1>Nova Tarefa</h1>

                <div className="back-link" >
                    <FiArrowLeft size={16} color="gray" onClick={()=> history.goBack()} />
                    Voltar
                </div>
            </section>

            <hr/>
            



            
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Tipo"
                    value={tipo}
                    onChange={e=> setTipo(e.target.value)} 
                />
                <textarea 
                    placeholder="Descrição"
                    value={descricao}
                    onChange={e=> setDescricao(e.target.value)} 
                />
                <select onChange={e=> setStatus(e.target.value)}>
                    
                    {optionsStatus.map((value, index) =>(
                        <option value={value} key={index}>
                            {value}
                        </option>
                    ))}
                    
                </select>
                <input 
                    placeholder="Secretaria"
                    value={secretaria}
                    onChange={e=> setSecretaria(e.target.value)} 
                />
                <textarea
                    placeholder="Observação"
                    value={obs}
                    onChange={e=> setObs(e.target.value)}
                />
                <input 
                    placeholder="Prioridade"
                    value={prioridade}
                    onChange={e=> setPrioridade(e.target.value)} 
                    type = 'number'
                />
                <input 
                    placeholder="Prazo_entrega"
                    value={prazo_entrega}
                    onChange={e=> setPrazo_entrega(e.target.value)} 
                    type = 'datetime-local'
                />

                <button className="button" type ='submit'>Cadastrar</button>


            </form>
            


        </div>
    )
};