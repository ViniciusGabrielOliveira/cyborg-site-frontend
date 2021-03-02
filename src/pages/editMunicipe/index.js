import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FaPlusSquare, FaMinusSquare, FaSearch, FaPhoneSquare, FaEnvelopeSquare, FaCogs } from 'react-icons/fa';
import api from '../../services/api';
import apiCep from '../../services/apiCep';


import './styles.css'

import Moment from 'moment';
import 'moment-timezone';
import 'moment/locale/pt-br';

Moment.tz.setDefault('UTC');
Moment.locale('pt-BR');


export default function EditMunicipe(){
    const [nome, setNome] = useState("");
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [fone, setFone] = useState('');
    const [fones, setFones] = useState([]);
    const [fonesAntigos, setFonesAntigos] = useState([]);
    const [email, setEmail] = useState('');
    const [emails, setEmails] = useState([]);
    const [emailsAntigos, setEmailsAntigos] = useState([]);
    const [obs, setObs] = useState("");
    const [searchCep, setSearchCep] = useState(false)
    const [searchRuas, setSearchRuas] = useState([])
    const [classificacao, setClassificacao] = useState('');
    const [classificacoes, setClassificacoes] = useState([]);
    const [getClassificacoes, setGetClassificacoes] = useState([]);
    const [avatar_url, setAvatar_url] = useState("");
    const [sexo, setSexo] = useState("")
    const params = useParams();
    const [loadFones, setLoadFones] = useState(0)
    const [status, setStatus] = useState('')
    const [facebookUrl, setFacebookUrl] = useState('')
    const [instagramUrl, setInstagramUrl] = useState('')
    const [linkedinUrl, setLinkedinUrl] = useState('')
    const [cra, setCra] = useState('')


    const history = useHistory();
    

    const data = {nome, sexo}

    useEffect(() =>{
        const token = 'JWT ' + localStorage.getItem('token');
        const url = 'gestao/municipe/' + params.id;
        
        api.get(url, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setNome(response.data.nome);
            setBairro(response.data.bairro);
            setCep(response.data.cep);
            setCidade(response.data.cidade);
            setClassificacoes(response.data.classificacoes);
            setComplemento(response.data.complemento);
            setEmailsAntigos(response.data.emails);
            setEstado(response.data.estado);
            setFonesAntigos(response.data.fones);
            setLogradouro(response.data.logradouro);
            setNascimento(Moment(response.data.nascimento).format('YYYY-MM-DD'));
            setNumero(response.data.numero);
            setObs(response.data.obs);
            setSexo(response.data.sexo);
            setAvatar_url(response.data.avatar_url);
            setStatus(response.data.status);
            setFacebookUrl(response.data.facebookUrl);
            setInstagramUrl(response.data.instagramUrl);
            setLinkedinUrl(response.data.linkedinUrl);
            setCra(response.data.cra);

        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        })

    }, [history, params.id, loadFones])

    useEffect(() =>{

        const url = cep.length>9 ? cep.replace(/\D/g, '') + '/json/' : ''
        const urlRua = logradouro.length>3 ? 'SP/Sao Jose dos Campos/' + logradouro + '/json/' : ''
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
        
        if (url.length>1) {

            apiCep.get(url).then(response => {
                if (response.data.erro === true){
                    alert('cep invalido')
                }else {
                setLogradouro(response.data.logradouro);
                setBairro(response.data.bairro);
                setCidade(response.data.localidade);
                setEstado(response.data.uf);
                }                
            }, error => {
                if (error.response === 400){
                    alert('cep invalido')
                }
            })
        }

        if (urlRua.length>3) {

            apiCep.get(urlRua).then(response => {
                if (response.data.erro === true){
                    alert('cep invalido')
                }else {
                setSearchRuas(response.data);
                }                
            }, error => {
                if (error.response === 400){
                    alert('cep invalido')
                }
            })
        }

    }, [cep, logradouro, history])

    
    function deleteFone(e){
        api.delete('gestao/fones/'+e+'/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        })
    }

    function deleteEmail(e){
        api.delete('gestao/emails/'+e+'/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        })
    }

    
    function handleEditMunicipe(e){
        e.preventDefault();
        let municipeId = 0;

        if ((nome === '') || (sexo === '')) {
            alert("Nome e sexo precisam ser preenchidos!")
            return
        }

        if (logradouro) {data['logradouro']=logradouro}
        if (numero) {data['numero']=numero}
        if (complemento) {data['complemento']=complemento}
        if (bairro) {data['bairro']=bairro}
        if (cidade) {data['cidade']=cidade}
        if (estado) {data['estado']=estado}
        if (nascimento) {data['nascimento']=nascimento+"T00:00:00Z"}
        if (obs) {data['obs']=obs}
        if (cep) {data['cep']=parseInt(cep)}
        if (classificacoes) {data['classificacoes']=classificacoes}
        if (avatar_url) {data['avatar_url']=avatar_url}
        
        
        api.patch('gestao/municipe/'+params.id+'/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('token')}`
                    }
        }).then(response => {
            if (response.data.id>0) {municipeId = response.data.id}
        }, error => {  
            console.log(error.response.data)        
            if (error.response.status === 401){
                history.push('/logon');
            }
        }).then(()=>{
            if (fones.length>0){
                fones.map(fone => (
                    api.post('gestao/fones/', {
                        'numero': fone,
                        'municipe': municipeId
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `JWT ${localStorage.getItem('token')}`
                        }
                    }).then(response => {
                        
                    }, error => {                       
                        if (error.response.status === 401){
                            history.push('/logon');
                        }
                    })
                ))
            }
        }).then(()=>{
            if (emails.length>0){
                emails.map(email => (
                    api.post('gestao/emails/', {
                        'email': email,
                        'municipe': municipeId
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `JWT ${localStorage.getItem('token')}`
                        }
                    }).then(response => {
                        
                    }, error => {                        
                        if (error.response.status === 401){
                            history.push('/logon');
                        }
                    })
                ))
            }            
        }).then(history.goBack())
            
    }

    return(
        <div className="home-container">
            <div className="card">
                <section>
                    <h1>Editar Municipe</h1>

                    <div className="back-link">
                        <FiArrowLeft size={16} color="gray" onClick={()=> history.goBack()}/>
                        Voltar
                    </div>
                </section>
                <hr/>

                <form onSubmit={handleEditMunicipe}
                >
                    <p>Nome</p>                    
                    <input 
                        placeholder="Nome Completo"
                        value={nome}
                        onChange={e=> setNome(e.target.value)} 
                    />
                    <hr/>                    
                    <p>Sexo</p>
                        
                    <select onChange={e=> setSexo(e.target.value)}>
                        <option value={''}>
                            Sexo
                        </option>
                        <option value={'Masculino'}>
                            Masculino
                        </option>
                        <option value={'Feminino'}>
                            Feminino
                        </option>
                    </select>
                        
                    <hr/>                    
                    <p>CEP</p>
                    <input 
                        placeholder="CEP"
                        maxLength='10'
                        value={cep}
                        onChange={e=> setCep(e.target.value)} 
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
                                        setCep(rua.cep); 
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
                    <p>Número</p>
                    <input 
                        placeholder="Número"
                        value={numero}
                        onChange={e=> setNumero(e.target.value)} 
                    />
                    <hr/>                    
                    <p>Complemento</p>
                    <input 
                        placeholder="Complemento"
                        value={complemento}
                        onChange={e=> setComplemento(e.target.value)} 
                    />
                    <hr/>                    
                    <p>Bairro</p>
                    <input 
                        placeholder="Bairro"
                        value={bairro}
                        onChange={e=> setBairro(e.target.value)} 
                    />
                    <hr/>                    
                    <p>Cidade</p>
                    <input 
                        placeholder="Cidade"
                        value={cidade}
                        onChange={e=> setCidade(e.target.value)} 
                    />
                    <hr/>                    
                    <p>Estado</p>
                    <input 
                        placeholder="Estado"
                        value={estado}
                        onChange={e=> setEstado(e.target.value)} 
                    />
                    <hr/>
                    <p>Nascimento</p>
                    <input 
                        placeholder="Nascimento"
                        type="date"
                        value={nascimento}
                        onChange={e=> setNascimento(e.target.value)}
                    />
                    <hr/>
                    <div className= 'fone'>
                        <input 
                            placeholder="Fone"
                            value={fone}
                            onChange={e=> setFone(e.target.value)} 
                        />
                        <button type="button" className="mais" 
                            onClick={() => {
                                setFones([...fones, fone])
                                setFone('')
                            }}>
                            <FaPlusSquare  size={20} color="#a9a9a9" /> 
                        </button>
                    </div>
                    <div className="container-fones">
                        <ul>
                            {fonesAntigos && fonesAntigos.map(e => (
                                <li className='phone-li' key={e.id}>
                                    <FaPhoneSquare className='phoneIcon'/>
                                    <p>{e.numero}</p>
                                    {e && <button type="button" className="mais" onClick={() => {
                                        if(window.confirm('Deletar telefone?')) {
                                            deleteFone(e.id);
                                            setLoadFones(loadFones + 1)
                                        }}}>
                                    
                                    <FaMinusSquare  size={15} color="#a9a9a9" /> 
                                    </button>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <ul className="fones-container">
                        {fones.map((fon, index) => (
                            <div className= 'fones' key={index} >
                                {fon && <button type="button" className="mais" onClick={() => (setFones([...fones.slice(0,-1)]))}>
                                    <FaMinusSquare  size={15} color="#a9a9a9" /> 
                                </button>}
                                <div>{fon}</div>
                            </div>
                        ))}
                    </ul>
                    <hr/>
                    <div className= 'fone'>
                        <input 
                            placeholder="Email"
                            value={email}
                            onChange={e=> setEmail(e.target.value)} 
                        />
                        <button type="button" className="mais" 
                            onClick={() => {
                                setEmails([...emails, email])
                                setEmail('')
                            }}>
                            <FaPlusSquare  size={20} color="#a9a9a9" /> 
                        </button>
                    </div>
                    <div className="container-emails">
                        <ul>
                            {emailsAntigos && emailsAntigos.map(e => (
                                <li className='email-li' key={e.id}>
                                    <FaEnvelopeSquare className='emailIcon'/>
                                    <p>{e.email}</p>
                                    {e && <button type="button" className="mais" onClick={() => {
                                        if(window.confirm('Deletar email?')) {
                                            deleteEmail(e.id);
                                            setLoadFones(loadFones + 1)
                                        }}}>
                                    
                                    <FaMinusSquare  size={15} color="#a9a9a9" /> 
                                    </button>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <ul className="fones-container">
                        {emails.map((emai, index) => (
                            <div className= 'fones' key={index} >
                                {emai && <button type="button" className="mais" onClick={() => (setEmails([...emails.slice(0,-1)]))}>
                                    <FaMinusSquare  size={15} color="#a9a9a9" /> 
                                </button>}
                                <div>{emai}</div>
                            </div>
                        ))}
                    </ul>
                    <hr/>
                    <div className= 'descricao_campo'>
                        <p>Classificação</p>
                        <FaCogs  size={20} color="#a9a9a9" onClick={()=> history.push('/classificacoes')}/>
                    </div>
                    <div className= 'fone'>
                        
                        <select 
                            onChange={e=> setClassificacao(e.target.value)} 
                        >
                            <option value={''}>
                                Classificação
                            </option>
                            {getClassificacoes.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.nome}
                                </option>
                            ))}
                        </select>
                        <button type="button" className="mais" 
                            onClick={() => {
                                setClassificacoes([...classificacoes, classificacao])
                                setClassificacao('')
                            }}>
                            <FaPlusSquare  size={20} color="#a9a9a9" /> 
                        </button>
                    </div>
                    
                    <ul className="fones-container">
                        {classificacoes && classificacoes.map((classific, index) => (
                            <div className= 'fones' key={index} >
                                {classific && <button type="button" className="mais" onClick={() => (setClassificacoes([...classificacoes.slice(0,-1)]))}>
                                    <FaMinusSquare  size={15} color="#a9a9a9" /> 
                                </button>}
                                {getClassificacoes.map(option => (
                                    parseInt(classific) === option.id ? <div key={option.id}>{option.nome}</div> : null
                                ))}
                            </div>
                        ))}
                    </ul>
                    <hr/>
                    <p>Obs</p>
                    <textarea
                        placeholder="Observação"
                        value={obs}
                        onChange={e=> setObs(e.target.value)}
                    />
                    <hr/>
                    <p>Avatar</p>
                    <input 
                        placeholder="Avatar-URL"
                        value={avatar_url}
                        onChange={e=> setAvatar_url(e.target.value)} 
                    />

                    <hr/>
                    <p>Facebook - URL</p>
                    <input 
                        placeholder="Facebook-URL"
                        value={facebookUrl}
                        onChange={e=> setFacebookUrl(e.target.value)} 
                    />

                    
                    <hr/>
                    <p>Instagram - URL</p>
                    <input 
                        placeholder="Instagram-URL"
                        value={instagramUrl}
                        onChange={e=> setInstagramUrl(e.target.value)} 
                    />

                    <hr/>
                    <p>LinkedIn - URL</p>
                    <input 
                        placeholder="LinkedIn-URL"
                        value={linkedinUrl}
                        onChange={e=> setLinkedinUrl(e.target.value)} 
                    />

                    <hr/>
                    <p>Status</p>
                    <input 
                        placeholder="Status"
                        value={status}
                        onChange={e=> setStatus(e.target.value)} 
                    />

                    <hr/>
                    <p>CRA</p>
                    <input 
                        placeholder="CRA"
                        value={cra}
                        onChange={e=> setCra(e.target.value)} 
                    />

                    <button className="button" type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
};