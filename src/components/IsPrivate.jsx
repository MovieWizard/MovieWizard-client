import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom'

function IsPrivate( { children }) {

    const { isLoggedIn, isLoggedOut } = useContext(AuthContext);

    if (isLoggedOut) return <p>You need to Login to have access</p>;

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
}

export default IsPrivate;