import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_VIACEP_URL });

export default api;
