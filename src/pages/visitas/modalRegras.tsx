import { Button, Modal } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

interface ModalProps {
  isOpen: boolean
  setIsOpen: () => void
}

const formatDiv: any = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column'
}
const ModalRegra = ({ isOpen, setIsOpen }: ModalProps) => {
  const router = useRouter()
  return (
    <Modal
      title="REGRAS"
      visible={isOpen}
      onCancel={() => {
        setIsOpen()
        router.push(`/visitas`)
      }}
      width={800}
      footer={
        <>
          <Button onClick={() => setIsOpen()}>Aceitar</Button>
          <Button
            onClick={() => {
              setIsOpen()
              router.push(`/visitas`)
            }}
          >
            Rejeitar
          </Button>
        </>
      }
    >
      <div style={formatDiv}>
        <h1>REGRAS PARA EMISSÃO DE PRÉ-SENHA</h1>
        <p>
          <strong>Olá, Visitante!</strong>
        </p>
        <p>
          Seja bem-vindo ao nosso portal de agendamento para emissão de pré
          senha. Fique atento as regras e recomendações a seguir:
        </p>
        <h4>O QUE É NECESSÁRIO PARA EMISSÃO:</h4>
        <ul>
          <li>Estar devidamente cadastrado no SIISP;</li>
          <li>Cadastro regular e atualizado;</li>
          <li>
            Não possuir nenhum impedimento como: suspensão ou cancelamento de
            visita;
          </li>
          <li>O interno não está impedido de receber visitas.</li>
        </ul>
        <p>
          Caso você não tenha cumprido as regras acima, o processo de emissão da
          pré-senha não será concluído. Lembramos que o dia da visita será
          estabelecido automaticamente pelo sistema, de acordo com o cronograma
          elaborado pela Unidade Prisional.
        </p>
        <h4>O QUE RECOMENDAMOS PARA VOCÊ</h4>
        <ul>
          <li>Tenha em mãos um celular para uso do app;;</li>
          <li>Ter acesso a internet;</li>
          <li>
            Dúvidas quanto ao traje e o que levar na visita, entre em contato
            com a supervisão de assistência às famílias através dos contatos:
            (98)99154-3073/(98)991125351/(98)991966610
          </li>
          <li>
            Compartilhe essa ideia do portal e aplicativo de emissão da
            pré-senha e ajude outros visitantes
          </li>
        </ul>
      </div>
    </Modal>
  )
}
export default ModalRegra
