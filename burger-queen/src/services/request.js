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
export function addUser(token, userName, userEmail, userPassword, userRole) {
  return axios.post(baseUrl+ '/users', {
      'name': userName,
      'email': userEmail,
      'password': userPassword, 
      'role': userRole,
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  },)
}
export function editUser(token, userName, userEmail, userRole, userID) {
  return axios.patch(`${baseUrl}/users/${userID}`, {
      'name': userName,
      'email': userEmail,
      'role': userRole,
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

export function getAllUsers(token) {
  return axios.get(baseUrl + '/users', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function changeOrderStatus(token,orderId,newStatus) {
  return axios.patch(`${baseUrl}/orders/${orderId}`,{
    status: newStatus,
    dateProcessed: new Date(),
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function deleteUser(token, userID) {
  return axios.delete(`${baseUrl}/users/${userID}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function deleteProduct(token, productID) {
  return axios.delete(`${baseUrl}/products/${productID}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function addProduct(token, itemName, itemPrice, itemImg, itemType) {
  return axios.post(baseUrl+ '/products', {
    "name": itemName,
    "price": parseInt(itemPrice),
    "image": itemImg,
    "type": itemType,
    //dataEntry: new Date(),
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  },)
}

export function editProduct(token, itemName, itemPrice, itemImg, itemType, productID) {
  return axios.patch(`${baseUrl}/products/${productID}`, {
    "name": itemName,
    "price": parseInt(itemPrice),
    "image": itemImg,
    "type": itemType,
    //dataEntry: new Date(),
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  },)
}