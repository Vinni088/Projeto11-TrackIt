import styled from "styled-components";
import { Link } from "react-router-dom";
export default function TelaHistorico() {
  return (
    <HistoricoBody>
        <Cabeçalho>
            <h1 >
                Histórico
            </h1>
            <h2>
                Em breve você poderá ver o histórico dos seus hábitos aqui!
            </h2>
        </Cabeçalho>
      <Menu  data-test="menu">
        <DivLink>
          <Link data-test="habit-link"  to={"/habitos"}>Hábitos</Link>
        </DivLink>
        <DivLink>
          <Link data-test="today-link"  to={"/hoje"}>Hoje</Link>
        </DivLink>
        <DivLink>
          <Link data-test="history-link" to={"/historico"}>Histórico</Link>
        </DivLink>
      </Menu>
    </HistoricoBody>
  );
}
const HistoricoBody = styled.div`
    width: 100vw;
    height: 100vh;
    background: #F2F2F2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 15px;
    padding-right: 15px;
`
const Menu = styled.div`
    position: fixed;
    width: 100%;
    height: 70px;
    bottom: 0px;
    left: 0px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`
const DivLink = styled.div` 
    a {
        width: 68px;
        height: 22px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
        cursor: pointer;
    }
`
const Cabeçalho = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h1 {
        position: absolute;
        width: 100px;
        height: 29px;
        left: 17px;
        top: 98px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        /* identical to box height */


        color: #126BA5;
    }
    h2 {
        position: absolute;
        width: 338px;
        height: 74px;
        left: 15px;
        top: 144px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;

        color: #666666;
    }
`