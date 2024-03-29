import React, { useState, useEffect, useRef } from 'react';
import {useHistory} from 'react-router-dom';
import { FaHome, FaUserPlus, FaCheckSquare, FaList, FaSearch, FaFilter, FaPrint, FaFilePdf, FaTag, FaListAlt, FaPowerOff, FaArrowLeft, FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';


import api from '../../services/api';
import './styles.css'
import { Etiquetas } from "./styleTags"
import AvatarAlt from '../../assets/avatar.jpg';

export default function HomeSite(){
    const history = useHistory();
    const token = 'JWT ' + localStorage.getItem('token');
    const [municipes, setMunicipes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchObsValue, setSearchObsValue] = useState('');
    const [bairroValue, setBairroValue] = useState('');
    const [foneValue, setFoneValue] = useState('');
    const [sexoValue, setSexoValue] = useState('');
    const [classificacao1Value, setClassificacao1Value] = useState('');
    const [classificacao2Value, setClassificacao2Value] = useState('');
    const [classificacao3Value, setClassificacao3Value] = useState('');
    const [profissaoValue, setProfissaoValue] = useState('');
    const [filterView, setFilterView] = useState(false);
    const [mesNascimento, setMesNascimento] = useState('');
    const [cidade, setCidade] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const scrollObserver = useRef();
    const [scrollRadio, setScrollRadio] = useState(null);
    const [outView, setOutView] = useState(1);
    const [getClassificacoes, setGetClassificacoes] = useState([]);
    const [url2, setUrl2] = useState('');
    const [cont, setCont] = useState(0);


    useEffect(() =>{

        let nomes = searchValue.split(' ')
        let nome1 = nomes[0] ? nomes[0] : '';
        let nome2 = nomes[1] ? nomes[1] : '';
        let nome3 = nomes[2] ? nomes[2] : '';
        let nome4 = nomes[3] ? nomes[3] : '';
        let mes = mesNascimento;
        let url = 'gestao/municipes/?nome1='+nome1+'&nome2='+nome2+'&nome3='+nome3+'&nome4='+nome4+'&obs='+searchObsValue+'&mesNascimento='+mes+'&bairro='+bairroValue+'&fone='+foneValue+'&sexo='+sexoValue+'&cidade='+cidade+'&classificacao1='+classificacao1Value+'&classificacao2='+classificacao2Value+'&classificacao3='+classificacao3Value+'&profissao='+profissaoValue+'&page='+page
        const urlClassific = 'gestao/classificacao_list'
        setCont(0);
        setUrl2(url);

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
        

        if (loading){
            return;
        }


        if (total > 0 && municipes.length === total) {
            return;
        }


        if(scrollRadio > 0) {
            setLoading(true);
            const novapagina = page + 1;
            setPage(novapagina);

            api.get(url, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                const novosMunicipes = [...municipes]
                novosMunicipes.push(...response.data.results)
                setMunicipes(novosMunicipes);
                setTotal(response.data.count);            
            }, error => {
                
                if (error.response.status === 401){
                    history.push('/logon');
                }
            })

            setLoading(false);
        }

                

    }, [outView, scrollRadio, token, history, searchValue, bairroValue, cidade, classificacao1Value, classificacao2Value, classificacao3Value, foneValue, mesNascimento, searchObsValue, sexoValue, profissaoValue])

    useEffect(()=> {
        
        if(outView === 2 && cont > 0) {
           
            api.get(url2, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                const novosMunicipes = [...municipes];
                novosMunicipes.push(...response.data.results);
                setUrl2(response.data.next);
                console.log(response.data.next);
                console.log(municipes.length);
                setCont(cont + 1);                 
                setMunicipes(novosMunicipes);
                setTotal(response.data.count);            
            })
        }
        setLoading(false)
        
    }, [outView, cont])
    
    function zerar(){
        setTotal(0);
        setPage(1);
        setMunicipes([]);
    }

    function handleLogOut(){
        
        localStorage.clear();

        history.push('/logon');

    }
    
    const intersectionObserver = new IntersectionObserver((entries) => {
        const radio = entries[0].intersectionRatio;
        setScrollRadio(radio);
    })

    useEffect(()=> {
        intersectionObserver.observe(scrollObserver.current);

        return () => {
            intersectionObserver.disconnect();
        };

    })

    
    if (loading === true)
        return(
            <>
                <h1>LOADING...</h1>
                <div ref={scrollObserver}></div>
            </>

        )

    if (outView === 1 && loading === false) 
        return (
            <div className="home-container">
            
                <div className="options-container">
                    <h1>{total} - Municipes</h1>
                    <div>
                        <FaPrint className="icon" size={20} color="#fff" onClick={() => window.print()}/>
                        <FaFilePdf className="icon" size={20} color="#fff" />
                        <FaTag className="icon" size={20} color="#fff" onClick={async() => {
                            // setLoading(true);
                            setOutView(2);
                            setCont(cont + 1);
                            
                        }} />
                        <FaPowerOff className="icon" size={20} color="#fff" onClick={()=> handleLogOut()}/>
                        
                    </div>                
                </div>
                <div className='search-container'>
                    <FaSearch className='faSearch' />
                    <input type="text" 
                        className="searchBar" 
                        placeholder="Pesquise por nome"
                        value={searchValue}
                        onChange={e=> {
                            setSearchValue(e.target.value);
                            zerar();
                        }}
                    />
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
                            placeholder="Pesquise por obs"
                            value={searchObsValue}
                            onChange={e=> {
                                setSearchObsValue(e.target.value);
                                zerar();
                            }}                        
                        />
                    </div>
                    <div className='search-container'>
                        <FaSearch className='faSearch' />
                        <input type="text" 
                            className="searchBar" 
                            placeholder="Pesquise por bairro"
                            value={bairroValue}
                            onChange={e=> {
                                setBairroValue(e.target.value);
                                zerar();
                            }}
                        />
                    </div>
                    <div className='search-container'>
                        <FaSearch className='faSearch' />
                        <input type="text" 
                            className="searchBar" 
                            placeholder="Pesquise por fone"
                            value={foneValue}
                            onChange={e=> {
                                setFoneValue(e.target.value);
                                zerar();
                            }}                        
                        />
                    </div>
                    <div className='search-container'>
                        <FaSearch className='faSearch' />
                        <input type="text" 
                            className="searchBar" 
                            placeholder="Pesquise por sexo"
                            value={sexoValue}
                            onChange={e=> {
                                setSexoValue(e.target.value);
                                zerar();
                            }}
                        />
                    </div>
                    <div className='search-container'>
                        <div className= 'class-add'>
                            <select 
                                onChange={e=> {                                    
                                    setClassificacao1Value(e.target.value);
                                    zerar();
                                }} 
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
                        </div>                        
                    </div>
                    <div className='search-container'>
                        <div className= 'class-add'>
                            <select 
                                onChange={e=> {                                    
                                    setClassificacao2Value(e.target.value);
                                    zerar();
                                }} 
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
                        </div> 
                    </div>
                    <div className='search-container'>
                        <div className= 'class-add'>
                            <select 
                                onChange={e=> {                                    
                                    setClassificacao3Value(e.target.value);
                                    zerar();
                                }} 
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
                        </div> 
                    </div>
                    <div className='search-container'>
                        <FaSearch className='faSearch' />
                        <input type="text" 
                            className="searchBar" 
                            placeholder="Profissão"
                            value={profissaoValue}
                            onChange={e=> {
                                setProfissaoValue(e.target.value);
                                zerar();
                            }}
                        />
                    </div>
                    <div className='search-container'>
                        <FaSearch className='faSearch' />
                        <input type="text" 
                            className="searchBar" 
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e=> {
                                setCidade(e.target.value);
                                zerar();
                            }}
                        />
                    </div>
                    <div className='search-container'>
                        <FaSearch className='faSearch' />
                        <input type="text" 
                            className="searchBar" 
                            placeholder="Mes do aniversario '00"
                            value={mesNascimento}
                            onChange={e=> {
                                setMesNascimento(e.target.value);
                                zerar();
                            }}
                        />
                    </div>
                </div>}
                <ul >
                    {municipes.map(municipe => (
                        
                        <li key={municipe.id}>
                            <div className='card'>
                                <div className='nome-checkBox-container'>
                                    <h1 onClick={()=> history.push(`/municipe/${municipe.id}`)}>{municipe.nome}</h1>
                                    <div>
                                        {municipe.facebook_url && 
                                            <a href={municipe.facebook_url} target="_blank" rel="noopener noreferrer">
                                                <FaFacebook size={18} color={"#425070"} />
                                            </a> 
                                        }
                                        {municipe.instagram_url && 
                                            <a href={municipe.instagram_url} target="_blank" rel="noopener noreferrer">
                                                <FaInstagram size={18} color={"#425070"} />
                                            </a>
                                        }                                        
                                        {municipe.linkedin_url &&
                                            <a href={municipe.linkedin_url} target="_blank" rel="noopener noreferrer">
                                                <FaLinkedin size={18} color={"#425070"} />
                                            </a>
                                        }
                                    </div>
                                </div>
                                <div className='avatar-bairro-container' >
                                    <div className='avatar-container' onClick={()=> history.push(`/municipe/${municipe.id}`)} >
                                        {municipe.avatar_url.length > 5 ? <img className='img-avatar' src={municipe.avatar_url} alt="...carregando imagem..." /> : <img className='img-avatar' src={AvatarAlt} alt="...carregando imagem..." />}                                 
                                    </div>  
                                    <div>                                
                                        <p onClick={()=> history.push(`/municipe/${municipe.id}`)} >Bairro: {municipe.bairro}</p>
                                        <div className='home-fones-container'>
                                            <div>
                                                {municipe.fones.map(e => (
                                                    <a 
                                                        href={"https://api.whatsapp.com/send?phone=phone=+55"+ e.numero+"&text=Olá%20"+ municipe.nome} 
                                                        key={e.id}
                                                        target="_blank" rel="noopener noreferrer"
                                                    >
                                                        {e.numero}
                                                        <FaWhatsapp size={18} color={"#425070"} />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <p onClick={()=> history.push(`/municipe/${municipe.id}`)} >Obs: {municipe.obs}</p>                            
                                    </div>
                                </div>                                                    
                            </div>                        
                        </li>
                    ))}
                    
                </ul>

                <div ref={scrollObserver}></div>
                
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
    
    if (outView === 2 && loading === false)
        return (
            <Etiquetas>
                <div className="options-container">
                    <FaArrowLeft className="icon" size={20} color="#fff" onClick={() => setOutView(1)} />                                    
                </div>
                <ul className="ul-etiqueta">
                    {municipes.map(municipe => (
                        
                        <li key={municipe.id}>
                            <div className='card' onClick={()=> history.push(`/municipe/${municipe.id}`)}>
                                <div className='nome-checkBox-container'>
                                    <h1>{municipe.nome}</h1>                                    
                                </div>
                                <div className='avatar-bairro-container'>                                     
                                    <div>                                
                                        <p>{municipe.logradouro}, {municipe.numero}{municipe.complemento ? " - " + municipe.complemento :null } </p> 
                                        
                                        <p>{municipe.bairro + " - " + municipe.cidade + " - " + municipe.estado}</p>

                                        <p>{"CEP: " + municipe.cep}</p>                           
                                    </div>
                                </div>                                                    
                            </div>                        
                        </li>
                    ))}
                    
                </ul>
                <div ref={scrollObserver}></div>
            </Etiquetas>
        );
}
