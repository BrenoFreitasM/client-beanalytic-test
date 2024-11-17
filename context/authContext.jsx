"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);  // Armazenar o ID do usuário

  const login = (userData) => {
    setUser(userData);  // Pode incluir o objeto completo do usuário ou partes dele
    setUserId(userData.id);  // Armazenar o ID após login
  };

  const logout = () => {
    setUser(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ user, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
