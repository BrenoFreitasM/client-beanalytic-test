import { createContext, useState, useContext } from "react";

// Criando o contexto
const AuthContext = createContext();

// Criando o provedor do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// Custom hook para consumir o contexto
export const useAuth = () => {
  return useContext(AuthContext);
  
}
