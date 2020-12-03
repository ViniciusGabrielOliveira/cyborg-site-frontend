import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

import api from '../../services/api';

import './styles.css'

export default function Logon(){
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('token-auth/', {username, password})
            localStorage.setItem('username', username);
            localStorage.setItem('id', response.data.user.id);
            localStorage.setItem('token', response.data.token);
            history.push('/');
        } catch(err) {
            alert('Falha no login, tente novamente.')
        };
    }

    return (
        <div className="logon-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input 
                        placeholder="Nome do Usuário"
                        value = {username}
                        onChange = {e => setUsername(e.target.value)}
                    />
                    <input 
                        placeholder="Password"
                        type="password"
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                </form>        
            </section>
        </div>
    );
}