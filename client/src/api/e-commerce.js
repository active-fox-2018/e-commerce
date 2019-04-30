import axios from 'axios';

export default axios.create({
  baseURL: 'http://35.247.172.214',
  timeout: 10000,
  withCredentials: false,
});
