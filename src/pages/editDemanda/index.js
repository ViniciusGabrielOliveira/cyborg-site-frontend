import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css'

import Moment from 'moment';
import 'moment-timezone';
import 'moment/locale/pt-br';

Moment.tz.setDefault('UTC');
Moment.locale('pt-BR');




export default function EditDemanda(){

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
        })   
        
        console.log(demanda)

    }, [ history, params ])

    
     
 
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

            <hr/>
            



            {demanda &&
                <form onSubmit={handleSubmit}>
                    <p>Nome</p>                    
                    <input 
                        placeholder="Nome Completo"
                        value={demanda.tipo}
                        onChange={e=> setNome(e.target.value)} 
                    />
                    <hr/>
                    

                    <button className="button" type ='submit'>Cadastrar</button>


                </form>
            }
        </div>
    )
};