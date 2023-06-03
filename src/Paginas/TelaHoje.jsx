import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/br';
import styled from "styled-components";
import { UserContext } from "/src/App.jsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function TelaHoje() {
    let [habitos,setHabitos] = useState(null)
    const navigate = useNavigate();
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
            
        </HojeBody>
    )}
}

const HojeBody = styled.div`
    width: 100vw;
    height: 100vh;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 95px;
    padding-left: 15px;
    padding-right: 15px;
`
const HojeCabeçalho = styled.div`
    box-sizing: border-box;
    width: 100vw;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    position: fixed;
    top: 0px;
    left: 0px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    h1 {
        font-family: Playball;
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }
    img {
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
    }
`
const HojeData = styled.div`
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