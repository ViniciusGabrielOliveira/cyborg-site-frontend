import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { FaPrint, FaTrash, FaPlusSquare, FaArrowLeft } from 'react-icons/fa';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';


import api from '../../services/api';
import './styles.css'

export default function Classificacoes(){
    const history = useHistory();
    const token = 'JWT ' + localStorage.getItem('token');
    const [classificacoes, setClassificacoes] = useState([]);
    const [searchValue, setSearchValue] = useState("")  
    const [open, setOpen] = React.useState(false); 
    let urlClassificacoes = '/gestao/classificacao_list/';


    useEffect(() =>{    

        api.get(urlClassificacoes + '?ordering=nome', {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setClassificacoes(response.data.results);
        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        })        

    }, [token, history, searchValue, open, urlClassificacoes])

    async function addClassificacao(nome){
               

        await api.post("gestao/classificacao/", {
            "nome": nome
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token'),
            }
        }).then(response =>{}, error => {   
            if (error.response.status === 401){
                history.push('/logon');
            }
            alert(error.response.data.nome);
        }).then(setSearchValue(""))
    }


    async function deleteClassificacao(id){
        await api.delete(urlClassificacoes+id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(response => {
            setOpen(false)
        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
            alert(error.response.data.nome);
            setOpen(false)
        })
    }

    



    return (
        <div className="home-container">
            <div className="options-container">
                <div>
                    <FaArrowLeft size={20} color="#fff" opacity="0.5" onClick={()=> history.goBack()} />
                </div>
                <h1>Classificações</h1>
                <div>
                    <FaPrint className="icon" size={20} color="#fff" />
                </div>                
            </div>

            <div className='class-filters-container'>
                <input 
                    placeholder="Nova Classificação"
                    value={searchValue}
                    onChange={e=> setSearchValue(e.target.value)}
                    onKeyDown={(e)=>{if(e.key === 'Enter') addClassificacao(searchValue)}} 
                />
                <button type="button" className="mais" 
                    onClick={()=>(addClassificacao(searchValue))}>
                    <FaPlusSquare  size={20} color="#a9a9a9" /> 
                </button>
            </div>

            
            <ul>
                {classificacoes.map(classificacao => (
                    <li key={classificacao.id}>
                        <div className='card' >
                            <div className='nome-checkBox-container'>
                                <h1>{classificacao.nome}</h1>
                                <FaTrash className="icon" size={20} color="rgba(0, 0, 0, 0.15)" onClick={()=> setOpen(true)} />
                                <Dialog
                                    open={open}
                                    onClose={()=> setOpen(false)}
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Tem certeza que deseja deletar {classificacao.nome} ?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => deleteClassificacao(classificacao.id)} color="primary">
                                            Sim
                                        </Button>
                                        <Button onClick={()=> setOpen(false)} color="primary" autoFocus>
                                            Não
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>                                                                             
                        </div>                        
                    </li>
                ))}
            </ul>
        </div>
    );
}
