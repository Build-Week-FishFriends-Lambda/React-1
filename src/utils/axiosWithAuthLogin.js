import axios from 'axios';

export default function axiosWithAuthLogin() {
    const token = localStorage.getItem('token');
    return axios.create({
      baseURL: 'https://fishfriends.herokuapp.com/',
      headers: {
        Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
  }
  