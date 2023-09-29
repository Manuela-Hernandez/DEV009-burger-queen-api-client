import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './routes/login/login'
import Waiter from './routes/waiter/orders'
/* ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) */


const router = createBrowserRouter([
  {
    path: "/",
    element: <Waiter />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/waiter",
    element: <Waiter />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
