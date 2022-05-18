import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import { Image } from "antd";
import styles from "./styles.module.scss";

export function Header() {
  const dataAtual = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.png" alt="logo" style={{ width: "7%" }} />

      <p>Bem vindo a Biblioteca SEAP</p>
      <span>{dataAtual}</span>
    </header>
  );
}
