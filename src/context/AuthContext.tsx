import { createContext, ReactNode } from "react";
import { api } from "../../services/api";

type SignInCredenciais = {
  login: string;
  senha: string;
};

type AuthContextData = {
  signIn(credenciais: SignInCredenciais): Promise<void>;
  autenticado: boolean;
};

type AuthProviderProps = { children: ReactNode };

export const AutenticadoContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const autenticado = false;

  async function signIn({ login, senha }: SignInCredenciais) {
    try {
      const response = await api.post("/login/auth", { login, senha });
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
