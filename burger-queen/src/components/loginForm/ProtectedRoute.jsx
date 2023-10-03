import { Navigate } from "react-router-dom"
import PropTypes from "prop-types"

export const ProtectedRoute = ({ children, requiredRole, redirecTo="/login"}) => {
    const role = localStorage.getItem('role');
    if (role !== requiredRole ) {
        return <Navigate to={redirecTo} />
    }
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    requiredRole: PropTypes.string.isRequired,
    redirecTo: PropTypes.string
}