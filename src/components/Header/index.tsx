import { useContext } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import { Image, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

type Props = {
  login: boolean;
};

export function Header(props: Props) {
  const usuario = useContext(UsuarioContext);
  const dataAtual = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });

  return (
    <header className={styles.headerContainer}>
      {/* <img src="/logo.png" alt="logo" style={{ width: "10rem" }} /> */}
      {props.login === false ? (
        <>
          <span className={styles.data}>{dataAtual}</span>

          <div className={styles.usuario}>
            <p>Bem vindo, {usuario}</p>
            <Avatar
              style={{ backgroundColor: "#04d361" }}
              icon={<UserOutlined />}
            />
          </div>
        </>
      ) : (
        <>
          <span>Bem vindo ao Seap-Juris</span>

          <div className={styles.usuario}>
            <span className={styles.data}>{dataAtual}</span>
          </div>
        </>
      )}
    </header>
  );
}
