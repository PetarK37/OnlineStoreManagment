import React, { ReactNode, useEffect } from 'react';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../constants';

interface AuthProps {
    requiredRoles: Role[];
    children: ReactNode;

}

const AuthorizationRedirectWrapper: React.FC<AuthProps> = ({ requiredRoles, children }) => {
    const { getLoggedIn, isAuthenticated } = useAuthToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/LogIn')
            return
        }

        if (!requiredRoles.some(r => r === getLoggedIn().role)) {
            navigate('/NotFound')
            return
        }
    }, [])
    return (
        <>{children}</>
    )

}

export default AuthorizationRedirectWrapper