import React, { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.get("/auth/me")
      .then((responseData) => {
        setUser(responseData.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = (loginData) => {
    localStorage.setItem("accessToken", loginData.accessToken);
    localStorage.setItem("refreshToken", loginData.refreshToken);
    setUser({
      userId: loginData.userId,
      userNm: loginData.userNm,
      userAuth: loginData.userAuth,
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
