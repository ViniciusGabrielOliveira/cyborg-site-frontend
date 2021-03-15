import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://sergio-victor.ue.r.appspot.com/',
    baseURL: 'http://127.0.0.1:8000/',
})

export default api;

