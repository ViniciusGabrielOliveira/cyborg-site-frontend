import React from 'react';
import { useHistory} from 'react-router-dom';
import utf8 from 'utf8';

import api from '../../services/api';
import Moment from 'moment';
import './styles.css'
import 'moment-timezone';
import 'moment/locale/pt-br';

import json from '../../services/banco1.json'
import { useState } from 'react';

Moment.tz.setDefault('UTC');
Moment.locale('pt-BR');


export default function DetailTarefa(){
    const token = 'JWT ' + localStorage.getItem('token');
    const history = useHistory();
    const [teste, setTeste] = useState(0);

    async function PostClass(e){
        let res        

        await api.post("gestao/classificacao/", {
            "nome": e
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(response => {
            res = response.data.id
        }, error => {    
            if (error.response.status === 401){
                history.push('/logon');
            }
        })
        
        
        return res
    }

    
    async function GetClassId(e){

        let resposta = 0
        
        let classifi = e.trim()
        

        await api.get("gestao/filterclass/?classificacao=" + classifi, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
                        
            if (response.data.count > 0) {
                resposta = response.data.results[0].id;
            }else{
                resposta = PostClass(classifi);
            }
        }, error => {
            if (error.response.status === 401){
                history.push('/logon');
            }
        })

        return resposta;
        
    }

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


    async function postMunicipe(municipedados, fones, emails){
        let municipeId = 0;
        let dados = JSON.parse(JSON.stringify(municipedados));
        console.log(municipedados);
        // await api.post('gestao/municipe/', dados, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `JWT ${localStorage.getItem('token')}`
        //     }
        // }).then(response => {
        //     console.log(response)
        //     if (response.data.id>0) {
        //         municipeId = response.data.id
        //     }
        // }, error => {
        // }).then(()=>{
        //     if (municipeId === 0){
        //         api.get('gestao/municipes/?nome1='+municipedados.nome, {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `JWT ${localStorage.getItem('token')}`
        //             }
        //         }).then(response => {
        //             if(response.data.count > 0) {
        //                 municipeId = response.data.results[0].id
        //             }                    
        //         })
        //     }
        //     if (fones.length>0){                
        //         fones.map(fone => (
        //             api.post('gestao/fones/', {
        //                 'numero': fone,
        //                 'municipe': municipeId
        //             }, {
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'Authorization': `JWT ${localStorage.getItem('token')}`
        //                 }
        //             }).then(response => {
                        
        //             }, error => {
            
                        
        //                 if (error.response.status === 401){
        //                     history.push('/logon');
        //                 }
        //             })
        //         ))
        //     }
        // }).then(()=>{
        //     if (emails.length>0){
        //         emails.map(email => (
        //             api.post('gestao/emails/', {
        //                 'email': email,
        //                 'municipe': municipeId
        //             }, {
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'Authorization': `JWT ${localStorage.getItem('token')}`
        //                 }
        //             }).then(response => {
                        
        //             }, error => {
            
        //                 if (error.response.status === 401){
        //                     history.push('/logon');
        //                 }
        //             })
        //         ))
        //     }            
        // })
    }

    async function GetClass(e){
        let classi = [];
            
        await e.map(async x => {
             
            classi.push(await GetClassId(x));

        })

        return classi
    }    
    async function cadastrarJson(){
        

        json.map( async e => { 
            let data = {};
            let fones = [];
            let emails = [];
            let classificacoes = {};

            if(e.codigo === "") return;

            data['nome']= utf8.decode(e.nome);
            data['sexo']= e.sexo[0];
            data['cadastradoPor']= 'gabinete';

            if (e.quem) {data['indicado_por']=e.quem}
            if (e.logradouro) {data['logradouro']=utf8.decode(e.logradouro)}
            if (e.numero) {data['numero']=e.numero}
            if (e.complemento) {data['complemento']=e.complemento}
            if (e.bairro) {data['bairro']=e.bairro}
            if (e.cidade) {data['cidade']=e.cidade}
            if (e.estado) {data['estado']=e.estado}
            if (e.dataaniversario) {data['nascimento']=Moment(e.dataaniversario.substring(3,6)+e.dataaniversario.substring(0,3)+e.dataaniversario.substring(6,10)).format()}
            data['obs']='codigo antigo: '+e.codigo+' '+utf8.decode(e.obs)+' - '+utf8.decode(e.obs1)+' - '+e.foneres+' - '+e.celulares
            if (e.cep) {data['cep']=parseInt(e.cep.replace(/\D/g, ''))}

            

            if (e.classificacao) classificacoes[0] = await GetClass(e.classificacao);
            
            data['classificacoes'] = JSON.stringify(classificacoes);
            
            if (utf8.decode(e.origem[0])) {data['origem']=utf8.decode(e.origem[0])};
            if (utf8.decode(e.cpf)) {data['cpf']=utf8.decode(e.cpf)};
            if (e.profissao) {data['profissao']=e.profissao};
            if (e.zona>0) {data['zona']=parseInt(e.zona.replace(/\D/g, ''))};
            if (e.secao>0) {data['secao']=parseInt(e.secao.replace(/\D/g, ''))};
            if (e.titulo>0) {data['titulo']=e.titulo};
            if (e.escola) {data['escola']=e.escola};

            fones = TreatFones(e.foneres+'+'+e.celulares);
            emails = e.email

            // console.log(data)

            postMunicipe(data,fones,emails);
            

            
        })
        
    }

    
    return(
        
        <div className="home-container">
            <button onClick={()=> cadastrarJson()}>cadastrar json</button> 
        </div>
    )
}