import React from 'react';
// import { useHistory} from 'react-router-dom';
import utf8 from 'utf8';

import api from '../../services/api';
import Moment from 'moment';
import './styles.css'
import 'moment-timezone';
import 'moment/locale/pt-br';

import json from '../../services/banco.json'

Moment.tz.setDefault('UTC');
Moment.locale('pt-BR');


export default function DetailTarefa(){
    // const token = 'JWT ' + localStorage.getItem('token');
    // const history = useHistory();

    // async function PostClass(e){
    //     let res        

    //     await api.post("gestao/classificacao/", {
    //         "nome": e
    //     }, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': token
    //         }
    //     }).then(response => {
    //         res = response.data.id
    //     }, error => {    
    //         if (error.response.status === 401){
    //             history.push('/logon');
    //         }
    //     })
        
        
    //     return res
    // }

    
    // async function GetClassId(e){

    //     let resposta = 0
        
    //     let classifi = e.trim()
        

    //     await api.get("gestao/filterclass/?classificacao=" + classifi, {
    //         headers: {
    //             Authorization: token,
    //         }
    //     }).then(response => {
                        
    //         if (response.data.count > 0) {
    //             resposta = response.data.results[0].id;
    //         }else{
    //             resposta = PostClass(classifi);
    //         }
    //     }, error => {
    //         if (error.response.status === 401){
    //             history.push('/logon');
    //         }
    //     })

    //     return resposta;
        
    // }

    function TreatFones(fones){
        let fones3 = []
        const a = 'qwertyuiopasdfghjklçzxcvbnmáéíóúàèìòùâêîôû"!@#$·/_,:; '
        const b = '++++++++++++++++++++++++++++++++++++++++++++++++++++++'
        const p = new RegExp(a.split('').join('|'), 'g')
        let fones2 =  fones.toString().toLowerCase().trim()
          .replace(p, c => b.charAt(a.indexOf(c)))
          .replace('++++++','+')
          .replace('+++++','+')
          .replace('++++','+')
          .replace('+++','+')
          .replace('++', '+').split('+') 
        
        let y = ''
        fones2.map(x=> {
            
            if (x.length < 7) {
                y.length < 1 ? y = x : y = y + x
            } 
            else {
                fones3 = [...fones3, y + x];
                y = ''
            }
            //tive que colocar esse retorno para tirar o warning
            return []
        })

        return fones3
    }


    async function postMunicipe(municipedados, fones){
        let municipeId = 0;
        let dados = JSON.parse(JSON.stringify(municipedados));
        console.log(municipedados);
        await api.post('gestao/municipe/', dados, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        }).then(response => {
            if (response.data.id>0) {
                municipeId = response.data.id
            }
        }, error => {
        }).then(()=>{
            if (municipeId === 0){
                api.get('gestao/municipes/?nome1='+municipedados.nome, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('token')}`
                    }
                }).then(response => {
                    if(response.data.count > 0) {
                        municipeId = response.data.results[0].id
                    }                    
                })
            }
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
                    })
                ))
            }
        })
    }

    // async function GetClass(e){
    //     let classi = [];
            
    //     await e.map(async x => {
             
    //         classi.push(await GetClassId(x));

    //     })

    //     return classi
    // }    

    async function cadastrarJson(){
        

        json.map( async e => { 
            let data = {};
            let fones = [];

            if(e.IDENTIFICADOR
                 === "") return;

            data['nome']= (e.NOME);
            data['sexo']= e.SEXO;
            data['cadastradoPor']= 'gabinete';

            if (e.QUEM) {data['indicado_por']=e.QUEM}
            if (e.LOGRADOURO) {data['logradouro']=(e.LOGRADOURO)}
            if (e.NUMERO) {data['numero']=e.NUMERO}
            if (e.COMPLEMENTO) {data['complemento']=e.COMPLEMENTO}
            if (e.BAIRRO) {data['bairro']=e.BAIRRO}
            if (e.CIDADE) {data['cidade']=e.CIDADE}
            if (e.UF) {data['estado']=e.UF}
            if (e.DATA_ANIVERSARIO) {data['nascimento']=Moment(e.DATA_ANIVERSARIO)}
            data['obs']='codigo antigo: '+e.IDENTIFICADOR+' '+(e.OBS)+' - '+(e.OBS1)+' - '+e.FONE+' - '+e.CELULAR
            data['idantigo']=e.IDENTIFICADOR
            if (e.CEP) {data['cep']=parseInt(e.CEP)}

            
            
            if ((e.ORIGEM)) {data['origem']=(e.ORIGEM)};
            if ((e.CPF)) {data['cpf']=(e.CPF)};
            if (e.PROFISSAO) {data['profissao']=e.PROFISSAO};
            if (e.ZONA>0) {data['zona']=parseInt(e.ZONA.replace(/\D/g, ''))};
            if (e.SECAO>0) {data['secao']=parseInt(e.SECAO.replace(/\D/g, ''))};
            if (e.TITULO>0) {data['titulo']=e.TITULO};
            if (e.ESCOLA) {data['escola']=e.ESCOLA};

            fones = TreatFones(e.FONE+'+'+e.CELULAR);


            postMunicipe(data,fones);
            

            
        })
        
    }

    
    return(
        
        <div className="home-container">
            <button onClick={()=> cadastrarJson()}>cadastrar json</button> 
        </div>
    )
}