import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sergio-victor.ue.r.appspot.com/'
})

export default api;

