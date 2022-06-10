import "../styles/globals.scss";
// import '../styles/antd.less'

// import { Header } from "../components/Header";
// import { Menu } from "../components/Menu";

import styles from "../styles/app.module.scss";

import type { AppProps } from "next/app";
import { UsuarioContext } from "../context/UsuarioContext";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UsuarioContext.Provider value={"Léo Araújo"}>
        <div className={styles.wrapper}>
          {/* <Menu /> */}
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </UsuarioContext.Provider>
    </AuthProvider>
  );
}

export default MyApp;
