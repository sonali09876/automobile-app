// services/httpClient.js
import axios from 'axios';

// export let url = 'http://192.168.0.232:7225/';
export let url = 'https://carpart-backend.onrender.com/api/';
// export let url = 'http://localhost:5000/api/';
// export let url = 'https://daily4you.in/api/';
// baseURL: 'http://192.168.43.246:7225/',

const httpClient = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;
