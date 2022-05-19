import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "../../../services/api";
import Footer from "../../components/Footer";
import styles from "./login.module.scss";

import { Input, Button, Form, Checkbox } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Header } from "../../components/Header";

export default function Login() {
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Head>
        <title>Biblioteca Seap</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header login={true} />
      <main className={styles.main}>
        <div className={styles.card}>
          <Form
            layout="vertical"
            name="basic"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h2>Login</h2>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Informe seu email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="Senha"
              rules={[{ required: true, message: "Informe sua senha!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="lembrar"
              valuePropName="checked"
              // wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Lembrar-me</Checkbox>
            </Form.Item>

            <Form.Item
            // wrapperCol={{ offset: 8, span: 16 }}
            >
              <Link href={`/home`}>
                <Button
                  // type="primary"
                  htmlType="submit"
                  style={{
                    background: "#04d361",
                    color: "#fff",
                    width: "100%",
                    marginBottom: -50,
                  }}
                >
                  Entrar
                </Button>
              </Link>
            </Form.Item>

            <Link href={``}>
              <Button
                // type="primary"
                htmlType="submit"
                style={{
                  // background: "#04d361",
                  // color: "#fff",
                  width: "100%",
                }}
              >
                Registrar
              </Button>
            </Link>

            {/* <Link href={``}>Registrar</Link> */}
          </Form>
        </div>
      </main>

      <Footer />
    </>
  );
}
