import React, { useState, useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaPlusCircle, FaEnvelopeSquare, FaPhoneSquare, FaBirthdayCake, FaArrowLeft, FaPrint, FaFilePdf, FaUserGraduate, FaEye, FaEdit } from 'react-icons/fa';
import AvatarAlt from '../../assets/avatar.jpg';

import api from '../../services/api';
import './styles.css';

import Moment from 'moment';
import 'moment-timezone';
import 'moment/locale/pt-br';

Moment.tz.setDefault('UTC');
Moment.locale('pt-BR');

export default function DetailMunicipe(){
    const history = useHistory();
    const [municipe, setMunicipe] = useState([])
    const params = useParams();
    const [getClassificacoes, setGetClassificacoes] = useState([]);
    const [classificacao, setClassificacao] = useState('');
    const [classificacoes, setClassificacoes] = useState([]);
    const [addClassificacao, setAddClassificacao] = useState(false);


    
    useEffect(() =>{
        const token = 'JWT ' + localStorage.getItem('token');
        const url = 'gestao/municipe/' + params.id;
        const urlClassific = 'gestao/classificacao_list'

        api.get(urlClassific, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('token'),
            }
        }).then(response => {
            setGetClassificacoes(response.data.results);
        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        })

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
        })

    }, [classificacoes, history, params.id])

    function handleAddClassificacao(e){
        e.preventDefault();

        const url = 'gestao/municipe/' + params.id + '/';

        setClassificacoes([...municipe.classificacoes, parseInt(classificacao)])
        const dict = {'classificacoes': [...municipe.classificacoes, parseInt(classificacao)]}


        api.patch(url, dict, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        }).then(response => {
            
        }, error => {

        })
    }

    async function PostClass(e){
               

        await api.post("gestao/classificacao/", {
            "nome": e
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token'),
            }
        }).then(error => {    
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
                    <Link to="/">
                        <FaArrowLeft size={20} color="#fff" opacity="0.5" />
                    </Link>                    
                </div>
                <div>
                    <FaPrint className="icon" size={20} color="#fff" onClick={() => window.print()}/>
                    <FaFilePdf className="icon" size={20} color="#fff" />
                    <FaEdit className="icon" size={20} color="#fff" onClick={() => history.push('/editmunicipe/'+params.id)}/>
                </div>   
            </div>
            <div className='card'>
                <div className='avatar-container'>
                    <div className='avatar1'>
                        {municipe.avatar_url && municipe.avatar_url.length > 5 ? <img className='imgDetail-avatar' src={municipe.avatar_url} alt="...carregando imagem..." /> : <img className='img-avatar' src={AvatarAlt} alt="...carregando imagem..." />}                                 
                    </div>
                </div>

                

                <div>
                    <h1>{municipe.nome}</h1>
                    
                    <div className='birthdayGraduate'>
                        <FaBirthdayCake className='birthIcon'/>
                        <h4 className='birthDate'>{Moment(municipe.nascimento).format('DD/MM/YYYY')}</h4>
                        <FaUserGraduate className='graduateIcon'/>
                        <h4 className='graduate'>{municipe.profissao}</h4>
                    </div>
                    <div className='bairroSexo'>
                        <h4 className='bairro'>{municipe.bairro}</h4>
                        <h4 className='sexo'>{municipe.sexo && municipe.sexo[0]}</h4>
                    </div>
                </div>

                <div className='obs'>
                    <p><strong>Obs: </strong>{municipe.obs}</p>
                </div> 

                <div className="container"> 
                    <p><strong>End: </strong>{municipe.logradouro}, {municipe.numero}{municipe.complemento && <span> / {municipe.complemento}</span>}</p>
                    <p><strong>CEP: </strong>{municipe.cep}</p>
                    <p><strong>Cidade: </strong>{municipe.cidade} / {municipe.estado}</p>
                    
                    <div className="container-fones">
                        <ul>
                            {municipe.fones && municipe.fones.map(e => (
                                <li className='phone-li' key={e.id}>
                                    <FaPhoneSquare className='phoneIcon'/>
                                    <p>{e.numero}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="container-emails">
                        <ul>
                            {municipe.emails && municipe.emails.map(e => (
                                <li className='email-li' key={e.id}>
                                    <FaEnvelopeSquare className='emailIcon'/>
                                    <p>{e.email}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className= 'class-add'>
                        

                        {addClassificacao ? 
                            <>
                                <button type="button" className="mais" onClick={setAddClassificacao(false)}>
                                    <p>voltar</p>
                                </button>
                                <input 
                                    placeholder="Digite uma nova Classificação"
                                    value={classificacao}
                                    onChange={e=> setClassificacao(e.target.value)} 
                                />
                                <button type="button" className="mais" onClick={PostClass(classificacao)}>
                                    <FaPlusCircle className='class-add-icon'/>
                                </button>
                            </>
                        :   <>
                                <button type="button" className="mais" onClick={setAddClassificacao(true)}>
                                    <p>adicionar classificação nova</p>
                                </button>
                                <select 
                                    onChange={e=> setClassificacao(e.target.value)} 
                                >
                                    <option value={''}>
                                        Adicionar Classificação
                                    </option>
                                    {getClassificacoes.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {option.nome}
                                        </option>
                                    ))}
                                </select>
                                <button type="button" className="mais" onClick={handleAddClassificacao}>
                                    <FaPlusCircle className='class-add-icon'/>
                                </button>
                            </>
                        }
                    </div>
                    <div className="container-classificacoes">
                        <ul>
                            {municipe.classificacoes && municipe.classificacoes.map(e => 
                                getClassificacoes.map(option => (
                                    parseInt(e) === option.id ?
                                        <li key={option.id} className='class-li'>
                                            {option.nome}
                                        </li>
                                    : null                                
                                ))
                            )}
                        </ul>
                    </div>
                                        
                    <div className='solicitacoesContainer'>
                        <div className='solicitHeader'>
                            <p><strong>Solicitações: </strong></p>
                            <button type="button" onClick={()=> (history.push('/solicitacao/new/'+ municipe.id))}>
                                <FaPlusCircle className='class-add-icon'/> 
                            </button>
                        </div>
                            <div className='solicitacoesMunicipe'>
                                <ul>
                                    {municipe.solicitacoes ? 
                                        municipe.solicitacoes.map(e => (
                                            <li key={e.id}>
                                                <div className='solicitaTitle'>
                                                    <div className='solicitaDate'><p>{Moment(e.data).format('DD/MM/YYYY')}</p></div>
                                                    <div className='solicitaTipo'><p>{e.demanda.tipo}</p></div>
                                                    <div className='containerButtons'>
                                                        <div className='solicitaStatus' />
                                                        <button className='solicitaView' type="button" onClick={()=> (history.push('/solicitacao/'+ e.id))}>
                                                            <FaEye size={18}/> 
                                                        </button>
                                                        <button type="button" 
                                                            onClick={()=> {
                                                                history.push('/tarefa/new')
                                                                localStorage.setItem('municipeId', municipe.id)
                                                                localStorage.setItem('solicitacaoId', e.id)
                                                                localStorage.setItem('demandaId', 0)
                                                            }} className='solicitaAdd'>
                                                            <FaPlusCircle size={15} /> 
                                                        </button>
                                                    </div>
                                                </div>
                                                <ul>
                                                    {e.tarefas.map(e2 => (
                                                        <li key={e2.id} className='acaoContainer'>
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
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            
                                        ))                            
                                    :null}
                                </ul>
                            </div>
                            
                        
                    </div>
                    
                </div>
                                                                    
            </div>             
            
        </div>
    )

}