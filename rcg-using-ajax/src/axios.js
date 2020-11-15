import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'token goes here';
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;