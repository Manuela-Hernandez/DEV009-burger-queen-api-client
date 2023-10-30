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

export function addOrder(token, customerName, order, employeeId) {
  return axios.post(baseUrl+ '/orders', {
      userId: employeeId,
      client: customerName,
      products: order, 
      status: "pending",
      dataEntry: new Date(),
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  },)
}

export function getAllOrders(token) {
  return axios.get(baseUrl + '/orders', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


export function changeOrderStatus(token,orderId,newStatus) {
  return axios.patch(`${baseUrl}/orders/${orderId}`,{
    status: newStatus,
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}