import "../styles/globals.scss";
// import '../styles/antd.less'

import { Header } from "../components/Header";
import { Menu } from "../components/Menu";

import styles from "../styles/app.module.scss";

import type { AppProps } from "next/app";
import { UsuarioContext } from "../context/UsuarioContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UsuarioContext.Provider value={"Léo Araújo"}>
      <div className={styles.wrapper}>
        {/* <Menu /> */}
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </UsuarioContext.Provider>
  );
}

export default MyApp;
