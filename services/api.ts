import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3333/",
  baseURL: "https://sistemas.seap.ma.gov.br/gateway/api-biblioteca/v1",
});
