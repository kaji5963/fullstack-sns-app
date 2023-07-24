import apiClient from "@/lib/apiClient";
import React, { ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: null | {
    id: number;
    email: string;
    username: string;
  };
  login: (token: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    username: string;
  }>(null);
  // headersにtokenを設定
  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      // tokenをheadersに追加してリクエストに含める
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      // ログインユーザーを取得する
      apiClient
        .get("/users/find")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  // tokenを引数で受け取りローカルストレージに保存
  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

    // ログイン時にもユーザー情報を取得する
    try {
      apiClient.get("/users/find").then((res) => {
        setUser(res.data.user);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // ローカルストレージに保存されているtokenを削除
  const logout = () => {
    localStorage.removeItem("auth_token");
    delete apiClient.defaults.headers["Authorization"];
    setUser(null);
  };

  // valueにまとめてlogin,logoutをreturnに含める
  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
