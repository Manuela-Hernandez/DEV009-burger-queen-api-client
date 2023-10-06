import axios from 'axios';
const baseUrl = 'http://localhost:8080';

export default function peticion(email, password) {
  return axios.post(baseUrl + '/login', {
    email: email,
    password: password,
  })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
}
export function getProducts(token) {
  return axios.get(baseUrl + '/products', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}