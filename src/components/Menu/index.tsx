import Link from "next/link";
import styles from "./styles.module.scss";

import { Layout } from "antd";

const { Sider } = Layout;

import {
  HomeOutlined,
  DownOutlined,
  UpOutlined,
  LeftOutlined,
  VerticalAlignTopOutlined,
  UpCircleOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

export function MenuList() {
  const [fechado, setFechado] = useState(false);
  const [styleMenu, setStyleMenu] = useState({
    width: "16rem",
    opacity: 1,
    scale: "scale(1)",
  });

  const mudaMenu = () => {
    setFechado(!fechado);
    console.log(fechado);
    fechado === false
      ? setStyleMenu({ width: "16rem", opacity: 1, scale: "scale(1)" })
      : setStyleMenu({ width: "5rem", opacity: 0, scale: "scale(0)" });
  };

  // useEffect(() => {
  //   fechado === true ? setWidthMenu({ width: "5rem" }) : { width: "16rem" };
  // }, [fechado]);

  return (
    <div
      className={styles.menuContainer}
      style={{ width: `${styleMenu.width}`, transition: "width 0.5s" }}
    >
      {/* aula 2 - 53min */}

      <div>
        <Link href={`/home`}>
          <a className={styles.link}>
            <HomeOutlined className={styles.icon} />
            <h3
              style={{
                opacity: `${styleMenu.opacity}`,
                transition: "opacity 0.8s",
              }}
            >
              Início
            </h3>
          </a>
        </Link>
        <br />
        <Link href={`/locacoes`}>
          <a className={styles.link}>
            <UpCircleOutlined className={styles.icon} />
            <h3
              style={{
                opacity: `${styleMenu.opacity}`,
                transition: "opacity 0.8s",
              }}
            >
              Locações
            </h3>
          </a>
        </Link>
        <br />
        <Link href={`/cadastro`}>
          <a className={styles.link}>
            <MenuUnfoldOutlined className={styles.icon} />
            <h3
              style={{
                opacity: `${styleMenu.opacity}`,
                transition: "opacity 0.8s",
                // transform: `${styleMenu.scale}`,
              }}
            >
              Cadastrar Livro
            </h3>
          </a>
        </Link>
        <br />

        <Link href={`/login`}>
          <a className={styles.link}>
            <LoginOutlined className={styles.icon} />
            <h3
              style={{
                opacity: `${styleMenu.opacity}`,
                transition: "opacity 0.8s",
              }}
            >
              Login
            </h3>
          </a>
        </Link>
      </div>
      <a
        className={styles.link}
        onClick={() => {
          mudaMenu();
        }}
      >
        {fechado === true ? (
          <LeftOutlined className={styles.icon} />
        ) : (
          <RightOutlined className={styles.icon} />
        )}
        <h3
          style={{
            opacity: `${styleMenu.opacity}`,
            transition: "opacity 0.8s",
          }}
        >
          Fechar
        </h3>
      </a>
    </div>
  );
}
