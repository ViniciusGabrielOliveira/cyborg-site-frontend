import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FaPlusSquare, FaMinusSquare, FaSearch } from 'react-icons/fa';
import api from '../../services/api';
import apiCep from '../../services/apiCep';


import './styles.css'


export default function NewMunicipe(){
    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [fone, setFone] = useState('');
    const [fones, setFones] = useState([]);
    const [email, setEmail] = useState('');
    const [emails, setEmails] = useState([]);
    const [obs, setObs] = useState('');
    const [searchCep, setSearchCep] = useState(false)
    const [searchRuas, setSearchRuas] = useState([])
    const [classificacao, setClassificacao] = useState('');
    const [classificacoes, setClassificacoes] = useState([]);
    const [getClassificacoes, setGetClassificacoes] = useState([]);
    const [avatar_url, setAvatar_url] = useState('');
    const [sexo, setSexo] = useState('')


    const history = useHistory();
    const cadastrado_por = localStorage.getItem('username')

    const data = {nome, sexo, cadastrado_por}

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

    

    function cepMask(value){
        return value
          .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
          .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{3})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }

    function handleNewMunicipe(e){
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
        if (cep) {data['cep']=parseInt(cep.replace(/\D/g, ''))}
        if (classificacoes) {data['classificacoes']=classificacoes}
        if (avatar_url) {data['avatar_url']=avatar_url}
        
        
        api.post('gestao/municipe/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('token')}`
                    }
        }).then(response => {
            if (response.data.id>0) {municipeId = response.data.id}
        }, error => {

            const x = Object.values(error.response.data)[0][0]

            if("municipe with this nome already exists." === x){
                alert("Municipe já existe!")
            }
            
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
        }).then(history.push('/'))
            
    }

    return(
        <div className="new-municipe-container">
            <div className="content">
                <section>
                    <h1>Cadastrar Municipe</h1>

                    <div className="back-link">
                        <FiArrowLeft size={16} color="gray" onClick={()=> history.goBack()}/>
                        Voltar
                    </div>
                </section>
                <hr/>

                <form onSubmit={handleNewMunicipe}
                >
                    <input 
                        placeholder="Nome Completo"
                        value={nome}
                        onChange={e=> setNome(e.target.value)} 
                    />
                    
                        
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
                        
                    
                    <input 
                        placeholder="CEP"
                        maxLength='10'
                        value={cep}
                        onChange={e=> setCep(cepMask(e.target.value))} 
                    />
                    
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
                                <Link className= 'fones' key={index}  onClick={() => {setCep(cepMask(rua.cep)); setSearchCep(!searchCep)}} mou>
                                    <div>{rua.logradouro}</div>
                                    <div>{rua.bairro}</div>
                                </Link>
                            ))}             
                        </div>
                    }
                    <input 
                        placeholder="Número"
                        value={numero}
                        onChange={e=> setNumero(e.target.value)} 
                    />
                    <input 
                        placeholder="Complemento"
                        value={complemento}
                        onChange={e=> setComplemento(e.target.value)} 
                    />
                    <input 
                        placeholder="Bairro"
                        value={bairro}
                        onChange={e=> setBairro(e.target.value)} 
                    />
                    <input 
                        placeholder="Cidade"
                        value={cidade}
                        onChange={e=> setCidade(e.target.value)} 
                    />
                    <input 
                        placeholder="Estado"
                        value={estado}
                        onChange={e=> setEstado(e.target.value)} 
                    />
                    
                    <input 
                        placeholder="Nascimento"
                        type="date"
                        value={nascimento}
                        onChange={e=> setNascimento(e.target.value)} 
                    />
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
                        {classificacoes.map((classific, index) => (
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
                    <textarea
                        placeholder="Observação"
                        value={obs}
                        onChange={e=> setObs(e.target.value)}
                    />
                    <input 
                        placeholder="Avatar-URL"
                        value={avatar_url}
                        onChange={e=> setAvatar_url(e.target.value)} 
                    />
                    

                    <button className="button" type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
};