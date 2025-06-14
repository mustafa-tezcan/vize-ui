import React, { createContext, useState, useEffect } from "react";
import { getToken, saveToken, deleteToken } from "./AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (token) => {
    await saveToken(token);
    setUserToken(token);
  };

  const logout = async () => {
    await deleteToken();
    setUserToken(null);
  };

  const checkLogin = async () => {
    const token = await getToken();
    if (token) setUserToken(token);
    setLoading(false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
