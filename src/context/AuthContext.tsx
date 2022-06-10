import Router from "next/router";
import { createContext, ReactNode, useState } from "react";
import { api } from "../../services/api";

type SignInCredenciais = {
  login: string;
  senha: string;
};

type AuthContextData = {
  signIn(credenciais: SignInCredenciais): Promise<void>;
  autenticado: boolean;
};

type Usuario = {
  login;
  roles;
  permissions;
};

type AuthProviderProps = { children: ReactNode };

export const AutenticadoContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario>();

  const autenticado = false;

  async function signIn({ login, senha }: SignInCredenciais) {
    try {
      const response = await api.post("/login/auth", { login, senha });

      const { permissions, roles } = response.data();

      setUsuario({ login, roles, permissions });

      Router.push("/home");
      console.warn(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AutenticadoContext.Provider value={{ signIn, autenticado }}>
      {children}
    </AutenticadoContext.Provider>
  );
}
