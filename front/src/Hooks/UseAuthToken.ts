import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { EPermision, Employee, ObjectName, Role } from '../constants';

const TOKEN_KEY = 'auth_token';
const LOGGEDIN_KEY = 'auth_looged_in'

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));
  const [loggedIn, setLoggedIn] = useState<Employee>(JSON.parse(localStorage.getItem(LOGGEDIN_KEY) === null ? "{}" : localStorage.getItem(LOGGEDIN_KEY)!));


  useEffect(() => {
    // Update the token state when it changes in localStorage
    const handleStorageChange = (e: any) => {
      if (e.key === TOKEN_KEY) {
        setToken(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const saveToken = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const saveLoggedIn = (user: Employee) => {
    localStorage.setItem(LOGGEDIN_KEY, JSON.stringify(user))
    setLoggedIn(user)
  }

  const getLoggedIn = () => {
    return loggedIn
  }

  const getToken = () => {
    return token;
  };

  const logOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LOGGEDIN_KEY)
    setToken(null);
  };

  const getDecodedToken = () => {
    try {
      return jwtDecode(token!)
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return null;
  };

  const getUserEmail = () => {
    const decodedToken = getDecodedToken() as any;
    return decodedToken ? decodedToken.sub : null;
  };

  const getUserRole = () => {
    const decodedToken = getDecodedToken() as any;
    return decodedToken ? decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;
  };

  const isAuthenticated = () => {
    return token !== null;
  };

  const hasPermission = (requiredObjectName: ObjectName, requiredPermission: EPermision) => {
    if (loggedIn.role === Role.ADMIN) {
      return true;
    } else {
      return loggedIn.accessRights.some((accessRight) => {
        return (
          (accessRight.objectName === requiredObjectName || accessRight.objectName === ObjectName.ALL) &&
          accessRight.permissions.some((permission) => permission.type === requiredPermission)
        );
      });
    }
  };

  return {
    saveToken,
    getToken,
    logOut,
    getUserEmail,
    getUserRole,
    isAuthenticated,
    saveLoggedIn,
    getLoggedIn,
    hasPermission
  };
}
