import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2411'
})

export default api;