import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "../../../services/api";
import Footer from "../../components/Footer";
import styles from "./livros.module.scss";

import { Input, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

type Livro = {
  id: number;
  titulo: string;
  sub: string;
  descricao: string;
  dataCadastro: string;
  locado: string;
  url: string;
};

type LivroProps = {
  livro: Livro;
};

export default function Livro({ livro }: LivroProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Biblioteca Seap</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={styles.livro}>
        <h1>Detalhes do Livro</h1>
        <section className={styles.detalhes}>
          <Link href={`/`}>
            <Button type="primary">
              <LeftOutlined />
            </Button>

            {/* <button type="button">
              <img src="/seta.png" alt="" />
            </button> */}
          </Link>
          <Image
            src="/1.webp"
            alt="foto"
            width={700}
            height={160}
            layout="responsive"
            objectFit="cover"
            className={styles.img}
          />
          <header>
            <h1>
              {livro.titulo}: {livro.sub}
            </h1>
          </header>
          <div className={styles.descricao}>
            <span>{livro.descricao}</span>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id }: any = ctx.params;

  const { data } = await api.get(`/livros/${id}`);

  const livro = {
    id: data.id,
    titulo: data.titulo,
    sub: data.sub,
    descricao: data.descricao,
    dataCadastro: data.dataCadastro,
    locado: data.locado,
    url: data.file.url,
  };

  return {
    props: { livro },
    revalidate: 60 * 60 * 24, // 24 horas
  };
};
