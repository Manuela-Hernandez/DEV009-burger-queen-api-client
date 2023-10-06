import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
// import * as React from "react";
// import * as ReactDOM from "react-dom/cliexnt";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './routes/login/login'
import Waiter from './routes/waiter/orders'
import Admin from './routes/admin/admin'
import DeniedAccess from './routes/deniedAccess/deniedAccess'
import {ProtectedRoute} from './components/loginForm/ProtectedRoute'
/* ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) */


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/waiter",
    element: 
    <ProtectedRoute requiredRole="waiter">
      <Waiter />,
    </ProtectedRoute> 
  },
  {
    path: "/admin",
    element: 
    <ProtectedRoute requiredRole="admin">
      <Admin />,
    </ProtectedRoute> 
  },
  {
    path: "/denied",
    element: <DeniedAccess/>, 
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
