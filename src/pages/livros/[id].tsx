import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { api } from "../../../services/api";

type Livro = {
  id: number;
  titulo: string;
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
    <h1>
      Livro {livro.titulo}: {livro.descricao}
    </h1>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params;

  const { data } = await api.get(`/livros/${id}`);

  const livro = {
    id: data.id,
    titulo: data.titulo,
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
