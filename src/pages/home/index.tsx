/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Header } from "../../components/Header";
import styles from "../../styles/Home.module.scss";
import Footer from "../../components/Footer";

import { Menu } from "../../components/Menu";

import {
  Input,
  Button,
  Tooltip,
  Modal,
  Form,
  Radio,
  Spin,
  Popconfirm,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import {
  PicLeftOutlined,
  DownOutlined,
  UpOutlined,
  LoadingOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
// import "../styles/antd.scss";

import onNotification from "../../components/Notificacao/Notificacao";

import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

const { Search } = Input;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

type Livros = {
  id: number;
  titulo: string;
  sub: string;
  descricao: string;
  dataCadastro: string;
  locado: string;
  file: {
    url: string;
  };
};

type Funcionario = {
  id: number;
  nome: string;
};

type Detento = {
  id: number;
  nome: string;
};

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [btnListarTodosVisivel, setBtnListarTodosVisivel] = useState(false);
  const [livros, setLivros] = useState([] as Livros[]);
  const [livrosMapeados, setLivrosMapeados] = useState([] as Livros[]);
  const [livroSelecionado, setLivroSelecionado] = useState({} as Livros);
  const [funcionario, setFuncionario] = useState({} as Funcionario);
  const [verFuncionario, setVerFuncionario] = useState(false);
  const [detento, setDetento] = useState({} as Detento);
  const [verDetento, setVerDetento] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [modalRetirarVisivel, setModalRetirarVisivel] = useState(false);
  const [buttonLoad, setButtonLoad] = useState(false);

  const [form] = Form.useForm();

  const onSearch = async (id: any) => {
    form.resetFields();
    try {
      setLoading(true);
      const livro = livros.filter((item) => item.id === id);
      // const response = await api.get(`/livros/${id}`);

      setLivrosMapeados(livro);

      setBtnListarTodosVisivel(true);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      onNotification("error", {
        message: "Erro!",
        description: "Erro ao buscar livro. . Insira uma código válido",
      });
    }
  };

  const listarTodos = () => {
    setLivrosMapeados(livros);
    setBtnListarTodosVisivel(false);
  };

  const pesquisarMatriculaFuncionario = async (id: any) => {
    try {
      setLoading(true);
      const response = await api.get(`/agentes/${id}`);

      // setAgente(response.data.find((item: any) => item.id === id));

      setVerDetento(false);
      setVerFuncionario(true);
      setFuncionario(response.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      onNotification("error", {
        message: "Erro!",
        description: "Erro ao buscar funcionário. Insira uma matricula válida",
      });
    }
  };

  const pesquisarMatriculaDetento = async (id: any) => {
    try {
      setLoading(true);
      const response = await api.get(`/detentos/${id}`);

      setVerFuncionario(false);
      setVerDetento(true);
      setDetento(response.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      onNotification("error", {
        message: "Erro!",
        description: "Erro ao buscar detento. Insira uma matricula válida",
      });
    }
  };

  const mostraModalRetirar = (item) => {
    setLivroSelecionado(item);
    setModalRetirarVisivel(true);
  };

  const handleOk = (values) => {
    setModalRetirarVisivel(false);
    form.resetFields();
    setTipoUsuario("");
    setVerDetento(false);
    setVerFuncionario(false);
  };

  const handleCancel = () => {
    setModalRetirarVisivel(false);
    form.resetFields();
    setTipoUsuario("");

    setVerDetento(false);
    setVerFuncionario(false);
  };

  const entrega = () => {};

  useEffect(() => {
    buscaLivros();
  }, []);

  const buscaLivros = async () => {
    try {
      setLoading(true);
      const response = await api.get("livros", {
        params: {
          // _limit: 7,
          _sort: "titulo",
          _order: "desc",
        },
      });

      setLivros(response.data);
      setLivrosMapeados(response.data);
      console.log(response.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      onNotification("error", {
        message: "Erro!",
        description: "Erro ao buscar Livros.",
      });
    }
  };

  const dataAtual = format(new Date(), "d - MMMM - EEEE", {
    locale: ptBR,
  });

  const dataDevolucao = format(
    new Date().setDate(new Date().getDate() + 7),
    "d - MMMM - EEEE",
    {
      locale: ptBR,
    }
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Biblioteca Seap</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header login={false} />

      <div className={styles.wrapper}>
        <Menu />
        <main>
          <div className={styles.homepage}>
            <Spin indicator={antIcon} spinning={loading}>
              <section className={styles.listaLivros}>
                <h2>Acervo de Livros</h2>

                {btnListarTodosVisivel === true ? (
                  <Button
                    htmlType="submit"
                    style={{
                      marginRight: "1rem",
                      background: "#04d361",
                      color: "#fff",
                    }}
                    loading={buttonLoad}
                    onClick={listarTodos}
                  >
                    Listar Todos
                  </Button>
                ) : null}

                <Search
                  placeholder="Pesquisar"
                  // allowClear={listarTodos}
                  onSearch={onSearch}
                  style={{ width: 250 }}
                />
                <br />
                <br />
                <table cellSpacing={0}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Código</th>
                      <th>Titulo</th>
                      <th>Subtitulo</th>
                      <th>Data de Cadastro</th>
                      <th>Locado</th>
                      <th>Detalhes</th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {livrosMapeados.map((item: Livros) => {
                      // eslint-disable-next-line react/jsx-key
                      return (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={item.file.url}
                              alt="foto"
                              width={40}
                              height={40}
                              // layout="responsive"
                              // objectFit="cover"
                            />
                          </td>
                          <td>
                            <span>{item.id}</span>
                          </td>
                          <td>
                            <span>{item.titulo}</span>
                          </td>
                          <td>
                            <span>{item.sub}</span>
                          </td>
                          <td>
                            <span>{item.dataCadastro}</span>
                          </td>
                          <td>
                            {item.locado === "true" ? (
                              <span>Sim</span>
                            ) : (
                              <span>Não</span>
                            )}
                          </td>
                          <td>
                            <Link href={`/livros/${item.id}`} key={item.id}>
                              <Tooltip
                                placement="left"
                                title={"Detalhes"}
                                color={"#04d361"}
                              >
                                <Button>
                                  <PicLeftOutlined />
                                </Button>
                              </Tooltip>
                            </Link>
                          </td>
                          <td>
                            {item.locado === "true" ? (
                              <Popconfirm
                                placement="topRight"
                                title={`Você confirma a devolução deste livro?`}
                                onConfirm={entrega}
                                okText="Sim"
                                cancelText="Não"
                              >
                                <Tooltip
                                  placement="left"
                                  title={"Receber"}
                                  color={"#04d361"}
                                >
                                  <Button
                                    type="primary"
                                    style={{ background: "#04d361" }}
                                  >
                                    <DownOutlined />
                                  </Button>
                                </Tooltip>
                              </Popconfirm>
                            ) : (
                              // <Link href={`/livros/${item.id}`} key={item.id}>
                              <Tooltip
                                placement="left"
                                title={"Retirar"}
                                color={"#04d361"}
                              >
                                <Button
                                  type="primary"
                                  style={{ background: "#08979c" }}
                                  onClick={() => {
                                    mostraModalRetirar(item);
                                    // setLivroSelecionado(item);
                                    // console.log(item);
                                  }}
                                >
                                  <UpOutlined />
                                </Button>
                              </Tooltip>
                              // </Link>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            </Spin>
          </div>
          <Footer />
        </main>
      </div>
      <Modal
        title="Emprestimo de Livro"
        visible={modalRetirarVisivel}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={
          [
            // <Button
            //   key="submit"
            //   type="primary"
            //   // loading={loading}
            //   onClick={handleOk}
            // >
            //   Submit
            // </Button>,
          ]
        }
      >
        <Spin indicator={antIcon} spinning={loading}>
          <Form
            // {...formItemLayout}
            layout="vertical"
            form={form}
            name="emprestimo"
            onFinish={handleOk}
            // initialValues={{ layout: formLayout }}
            // onValuesChange={onFormLayoutChange}
          >
            <h2>Livro:</h2>
            <FormItem name="id" label="">
              <h4>Codigo: {livroSelecionado.id}</h4>
            </FormItem>
            <FormItem name="titulo" label="">
              <h4>Titulo: {livroSelecionado.titulo}</h4>
            </FormItem>
            <FormItem name="sub" label="">
              <h4>Subtitulo: {livroSelecionado.sub}</h4>
            </FormItem>

            <h2>Usuário:</h2>
            <FormItem name="tipoPessoa" label="">
              <Radio.Group>
                <Radio
                  value={"detento"}
                  onChange={() => {
                    setTipoUsuario("Detento");
                    setVerFuncionario(false);
                  }}
                >
                  Detento
                </Radio>
                <Radio
                  value={"funcionario"}
                  onChange={() => {
                    setTipoUsuario("Funcionário");
                    setVerDetento(false);
                  }}
                >
                  Funcionário
                </Radio>
              </Radio.Group>
            </FormItem>
            {tipoUsuario === "Detento" ? (
              <FormItem name="idPessoa" label="Pesquisar Matricula">
                <Search
                  placeholder="Insira a matricula do detento"
                  onSearch={pesquisarMatriculaDetento}
                  style={{ width: "100%" }}
                />
              </FormItem>
            ) : tipoUsuario === "Funcionário" ? (
              <FormItem name="idPessoa" label="Pesquisar Matricula">
                <Search
                  placeholder="Insira a matricula do funcionario"
                  onSearch={pesquisarMatriculaFuncionario}
                  style={{ width: "100%" }}
                />
              </FormItem>
            ) : null}

            {verFuncionario === true ? (
              <>
                <FormItem name="codFuncionario" label="">
                  <h4>Codigo: {funcionario.id}</h4>
                </FormItem>
                <FormItem name="nomeFuncionario" label="">
                  <h4>Nome: {funcionario.nome}</h4>
                </FormItem>
              </>
            ) : verDetento === true ? (
              <>
                <FormItem name="codDetento" label="">
                  <h4>Codigo: {detento.id}</h4>
                </FormItem>
                <FormItem name="nomeDetento" label="">
                  <h4>Nome: {detento.nome}</h4>
                </FormItem>
              </>
            ) : null}

            {verFuncionario || verDetento ? (
              <>
                <FormItem name="dataRetirada" label="Data de Retirada:">
                  <h4> {dataAtual} </h4>
                </FormItem>
                <FormItem name="dataEntrega" label="Data de Devolução:">
                  <h4> {dataDevolucao} </h4>
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%", background: "#04d361" }}
                    loading={buttonLoad}
                    onClick={() => form.resetFields()}
                  >
                    Confirmar
                  </Button>
                </FormItem>
              </>
            ) : null}
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default Home;
