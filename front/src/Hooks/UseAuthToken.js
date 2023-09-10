import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'auth_token';

export function useAuthToken() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    // Update the token state when it changes in localStorage
    const handleStorageChange = (e) => {
      if (e.key === TOKEN_KEY) {
        setToken(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const saveToken = (newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const getToken = () => {
    return token;
  };

  const deleteToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const getDecodedToken = () => {
    try {
        console.log(jwtDecode(token))
      return jwtDecode(token)
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return null;
  };

  const getUserEmail = () => {
    const decodedToken = getDecodedToken();
    return decodedToken ? decodedToken.sub : null;
  };

  const getUserRole = () => {
    const decodedToken = getDecodedToken();
    return decodedToken ? decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;
  };

  const isAuthenticated = () => {
    return !!token;
  };

  return {
    saveToken,
    getToken,
    deleteToken,
    getUserEmail,
    getUserRole,
    isAuthenticated,
  };
}
