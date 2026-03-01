import axios from 'axios';

const api = axios.create({
  baseURL: (globalThis as any).process?.env?.REACT_APP_API_URL || 'http://localhost:4000',
  timeout: 10000,
})

export default api;
