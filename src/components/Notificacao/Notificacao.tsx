import { notification } from "antd";

/*

AO CHAMAR MANDAR DE ACORDO COM O EXEMPLO
onNotification('tipo',{
    message: 'Mensagem',
    description: 'Descrição'
})

TIPOS:
success
error
warning
info

*/

const onNotification = (type, data) => {
  return notification[type]({
    message: data.message,
    description: data.description,
  });
};

export default onNotification;
