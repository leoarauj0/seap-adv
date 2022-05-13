import "../styles/globals.scss";

import { Header } from "../components/Header";
import { Menu } from "../components/Menu";

import styles from "../styles/app.module.scss";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Menu />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;
