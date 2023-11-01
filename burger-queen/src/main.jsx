import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/login';
import Waiter from './pages/waiter/NewOrder';
import Admin from './pages/admin/admin'
import Chef from './pages/chef/chef'
import DeniedAccess from './pages/deniedAccess/deniedAccess';
import AllActiveOrders from './pages/waiter/AllActiveOrders/AllActiveOrders';
import Users from './pages/admin/users/Users';
import App from './pages/waiter/App';
import { ProtectedRoute } from './components/loginForm/ProtectedRoute'


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
        <App />
      </ProtectedRoute>,
    children: [
      {
        path: "",
        element:
          <ProtectedRoute requiredRole="waiter">
            <Waiter />
          </ProtectedRoute>,

      },
      {
        path: "allOrders",
        element:
          <ProtectedRoute requiredRole="waiter">
            <AllActiveOrders />
          </ProtectedRoute>,

      },
    ]
  },
  {
    path: "/admin",
    element:
      <ProtectedRoute requiredRole="admin">
        <Admin />
      </ProtectedRoute>,
    children: [
      {
        path: "",
        element:
          <ProtectedRoute requiredRole="admin">
            <Users />
          </ProtectedRoute>,
      },
      // {
      //   path: "allOrders",
      //   element:
      //     <ProtectedRoute requiredRole="waiter">
      //       <AllActiveOrders />
      //     </ProtectedRoute>,

      // },
    ]
  },
  {
    path: "/chef",
    element:
      <ProtectedRoute requiredRole="chef">
        <Chef />
      </ProtectedRoute>
  },
  {
    path: "/denied",
    element: <DeniedAccess />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
