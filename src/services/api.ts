import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.etherscan.io/api',
});

export default instance;