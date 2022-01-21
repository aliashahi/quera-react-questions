import React, { useState } from "react";

export const AuthContext = React.createContext({
  user: null,
  logout: () => {},
  setUser: (user) => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
