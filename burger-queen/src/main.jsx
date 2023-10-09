import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './routes/login/login'
import Waiter from './routes/waiter/NewOrder'
import Admin from './routes/admin/admin'
import DeniedAccess from './routes/deniedAccess/deniedAccess'
import { ProtectedRoute } from './components/loginForm/ProtectedRoute'

import { Provider } from 'react-redux'
import store from '../src/redux/store'

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
    element: <DeniedAccess />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>
);
