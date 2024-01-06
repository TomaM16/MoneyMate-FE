import axios from 'axios';

export default axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:8080',
    headers: {
        'Content-type': 'application/json'
    },
});