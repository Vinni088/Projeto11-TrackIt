import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/br';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "/src/App.jsx";
import { useContext, useEffect, useState } from "react";




export default function TelaHoje() {
    let [habitos,setHabitos] = useState(null)

    const context = useContext(UserContext).User;
    const url_habitos = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
    const chave = {
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    }

    useEffect(() => {
        const requisicao = axios.get(url_habitos, chave);
        requisicao.then(resposta => {
            setHabitos(resposta), console.log(resposta);
        });
    },[])

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
    if(habitos !== null) {return(
        <HojeBody>
            <HojeData>
                <h1 data-test="today">
                    {weekday(dayjs().day())}, {dayjs().format(' MM-DD ') /*THH:mm:ss SSS [Z] A */}
                </h1>
            </HojeData>
            <Menu>
                <DivLink>
                    <Link to={'/habitos'}>
                        Hábitos
                    </Link>
                </DivLink>
                <DivLink>
                    <Link to={'/hoje'}>
                        Hoje
                    </Link>
                </DivLink>
                <DivLink to={'/historico'}>
                    <Link>
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
const HojeData = styled.div`
    margin-top: 95px;
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
    Link {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        color: #52B6FF;
    }
`