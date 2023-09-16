import React, { ReactNode } from 'react';
import { ObjectName, EPermision, Role } from '../../constants'
import { useAuthToken } from '../../Hooks/UseAuthToken';

interface AuthorizationProps {
    requiredRole?: Role;
    requiredObjectName: ObjectName | null;
    requiredPermission: EPermision | null;
    children: ReactNode;
}

const AuthorizationDisplayWrapper: React.FC<AuthorizationProps> = ({
    requiredRole,
    requiredObjectName,
    requiredPermission,
    children,
}) => {
    const { getLoggedIn, isAuthenticated, hasPermission } = useAuthToken();

    if (!isAuthenticated()) {
        return null
    }

    if (getLoggedIn().role === 'ADMIN') {
        return <>{children}</>;
    }

    if ((getLoggedIn().role === requiredRole || requiredRole === undefined) && hasPermission(requiredObjectName!, requiredPermission!)) {
        return <>{children}</>;
    } else { return null; }
};

export default AuthorizationDisplayWrapper;
