import axios from 'axios';
const baseUrl = 'http://localhost:8080';

export function auth(email, password) {
  return axios.post(baseUrl + '/login', {
    email: email,
    password: password,
  })
}
export function getProducts(token) {
  return axios.get(baseUrl + '/products', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}