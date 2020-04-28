import axios from 'axios';

const api = axios.create({
    baseURL: 'https://64.225.126.128/',
})

export default api;