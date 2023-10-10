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

export function addOrder(token, customerName, order) {
  return axios.post(baseUrl+ '/orders', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    {
      userId: hola,
      client: customerName,
      products: order, 
      status: "pending",
      dataEntry: "2022-03-05 15:00",
    }
  }
  )
}