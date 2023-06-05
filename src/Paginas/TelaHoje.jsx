import axios from "axios";
import check from "../assets/check.svg"
import dayjs from "dayjs";
import 'dayjs/locale/br';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "/src/App.jsx";
import { useContext, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";



export default function TelaHoje() {
    let [habitos,setHabitos] = useState(null)
    let [atualize, SetAtualize] = useState(0);
    const context = useContext(UserContext).User;
    const url_habitos_hoje = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
    const chave = {
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    }
    let n_porcent = 0;

    useEffect(() => {
        const requisicao = axios.get(url_habitos_hoje, chave);
        requisicao.then(resposta => {
            setHabitos(resposta.data), console.log(resposta.data);
        });
    },[atualize])

    function weekday(x){
        switch (x) {
            case 0:
                return('Domingo');
            case 1:
                return('Segunda');
            case 2:
                return('Terça');
            case 3:
                return('Quarta');
            case 4:
                return('Quinta');
            case 5:
                return('Sexta');
            case 6:
                return('Sabado');
            default:
              return('dia da semana')
          }

    }
    function checkmark(cond, x){
        if(!cond){
            let url_positiva = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${x}/check`;
            let promisse = axios.post(url_positiva, {} ,chave);
            setTimeout(SetAtualize, 1500, atualize+1);
        } else {
            let url_negativa = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${x}/uncheck`;
            let promisse = axios.post(url_negativa, {} ,chave);
            setTimeout(SetAtualize, 1500, atualize+1);
        }
    }
    function PorcentagemHoje(){
        let n_hoje = habitos.length;
        let n_feitos = 0;
        for (let i = 0; i < habitos.length; i++) {
            if(habitos[i].done) {
                n_feitos++;
            }
        }
        n_porcent = n_feitos / n_hoje ;
        if(n_porcent > 0){
            return(
                `${n_porcent*100}% dos hábitos concluídos`
            );
        } else {
            return(
                `Nenhum hábito concluído ainda`
            );
        }
        
    }

    if(habitos !== null) {return(
        <HojeBody>
            <HojeTopo>
                <h1 data-test="today">
                    {weekday(dayjs().day())}, {dayjs().format(' MM-DD ') /*THH:mm:ss SSS [Z] A */}
                </h1>
                <h2 pct={n_porcent} data-test="today-counter">
                    {`${PorcentagemHoje()}`}
                </h2>
            </HojeTopo>
            <HabitoContainer>
            {habitos.map((habito,indice) =>{
                return (
                <Habito data-test="today-habit-container" key={indice} done={habito.done}>
                    <Habito_h1 data-test="today-habit-name">{habito.name}</Habito_h1>
                    <Habito_h2 seqDone={habito.done} data-test="today-habit-sequence">Sequencia Atual: {habito.currentSequence}</Habito_h2>
                    <Habito_h3 seq1={habito.currentSequence} seq2={habito.highestSequence} data-test="today-habit-record">Seu recorde: {habito.highestSequence}</Habito_h3>
                   <img data-test="today-habit-check-btn" onClick={() => checkmark(habito.done, habito.id)} src={check} alt="Check Habito" />
                </Habito>)
            })}
            </HabitoContainer>

            <Menu  data-test="menu">
                <DivLink>
                    <Link data-test="habit-link" to={'/habitos'}>
                        Hábitos
                    </Link>
                </DivLink>
                <DivLink>
                    <Link data-test="today-link"  to={'/hoje'}>
                        Hoje
                    </Link>
                </DivLink>
                <DivLink >
                    <Link data-test="history-link" to={'/historico'}>
                        Histórico
                    </Link>
                </DivLink>
            </Menu>
        </HojeBody>
    )}
}

const HojeBody = styled.div`
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
const HojeTopo = styled.div`

    margin-top: 95px;
    margin-bottom: 15px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;

    h1 {
        width: 200px;
        height: 30px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    h2 {

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;

        color: ${props => props.pct > 0 ? '#8FC549': '#BABABA'} ;
    }
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
const HabitoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
`
const Habito = styled.div`
    position: relative;
    width: 340px;
    height: 94px;

    background: #FFFFFF;
    border-radius: 5px;

    img {

        box-sizing: border-box;
        position: absolute;
        width: 69px;
        height: 69px;
        right: 13px;
        top: 15px;
        color: #FFFFFF;
        background: ${props => props.done? '#8FC549': '#EBEBEB'} ;
        border: 1px solid #E7E7E7;
        border-radius: 5px;
    }
`
const Habito_h1 = styled.h1`
    left: 15px;
    top: 13px;
    position: absolute;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
`
const Habito_h2 = styled.h2`
    left: 15px;
    top: 40px;
    position: absolute;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: ${props => props.seqDone ? '#8FC549': 'black'} ;
`
const Habito_h3 = styled.h3`
    left: 15px;
    top: 59px;
    position: absolute;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: ${props => props.seq1 === props.seq2? '#8FC549': 'black'} ;
`
