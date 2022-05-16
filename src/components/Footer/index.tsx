import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

import styles from "./styles.module.scss";

export default function Footer() {
  // const dataAtual = format(new Date(), "EEEEEE, d MMMM", {
  //   locale: ptBR,
  // });

  return (
    <footer className={styles.footer}>
      {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        > */}
      Secretaria de Administração Penitenciária - SEAP
      {/* <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span> */}
      {/* </a> */}
    </footer>
  );
}
