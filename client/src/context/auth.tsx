import React, { ReactNode, useContext } from "react";

type AuthContextType = {
  login: (token: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = React.createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // tokenを引数で受け取りローカルストレージに保存
  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
  };
  // ローカルストレージに保存されているtokenを削除
  const logout = () => {
    localStorage.removeItem("auth_token");
  };

  // valueにまとめてlogin,logoutをreturnに含める
  const value = {
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
