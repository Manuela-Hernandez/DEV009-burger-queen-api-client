import { Navigate } from "react-router-dom"
import PropTypes from "prop-types"

export const ProtectedRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');
  const token = localStorage.getItem('token');
  if (!role || !name || !token) {
    return <Navigate to={"/login"} />
  } else if (role !== requiredRole) {
    return <Navigate to={"/denied"} />
  }
  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string.isRequired,
}