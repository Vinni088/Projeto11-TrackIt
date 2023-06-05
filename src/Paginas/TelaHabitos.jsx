import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Adicionar from '../assets/plus.svg';
import deletar from '../assets/dump.svg';
import { UserContext } from "/src/App.jsx";
import { ThreeDots } from "react-loader-spinner";
import { useContext, useEffect, useState } from "react";

export default function TelaHistorico() {

    let [habitos,setHabitos] = useState(null);
    let [nome,setNome] = useState('');
    let [dias, setDias] = useState();
    let [texto,setTexto] = useState('Salvar');
    let [visivel,setVisivel] = useState(false);
    let [atualize, setAtualize] = useState(0)
    let [NewHabito,setNewHabito] = useState(0);
    const context = useContext(UserContext).User;
    const url_habitos = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
    const chave = {headers: {Authorization: `Bearer ${context.token}`}};
    const weekdays = [0,1,2,3,4,5,6];

    useEffect(() => {
        const requisicao = axios.get(url_habitos, chave);
        setDias([]);
        requisicao.then(resposta => {
            setHabitos(resposta.data), console.log(resposta.data);
        });
    },[atualize])

    function novoHabito(e){
        e.preventDefault();
        setTexto();
        setVisivel(true);
        requisição();
    }
    function requisição() {
        let objeto ={
            name: nome,
            days: dias
        }
        if( nome.length === 0) {
            alert('Não é permitido criar um hábito sem nome');
            setTexto('Salvar');
            setVisivel(false);
            AdicionarHabito();
        } else {
        let promisse = axios.post(url_habitos,objeto, chave);
        promisse.then(() => {
            setTexto('Salvar');
            setVisivel(false);
            AdicionarHabito();            
            setAtualize(atualize+1);
        });
        promisse.catch(() => {
            setAtualize(atualize+1);
            setTexto('Salvar');
            setVisivel(false);
            AdicionarHabito();
        });}
    }
    function adicionarDia(x){
        if(dias.includes(x)){
            let currrentdias = [...dias];
            let index = currrentdias.indexOf(x);
            currrentdias.splice(index, 1);
            setDias(currrentdias);
        } else {
            let currrentdias = [...dias, x];
            setDias(currrentdias);
        }
        
    }
    function AdicionarHabito() {
        if(NewHabito === 0 ) {
            setNewHabito(1);
        } else {
            setNewHabito(0);
        }
        setDias([])
        setNome('')
    }
    function translateDay(x) {
        switch(x) {
            case 0:
                return('D');
            case 1:
                return('S');
            case 2:
                return('T');
            case 3:
                return('Q');
            case 4:
                return('Q');
            case 5:
                return('S');
            case 6:
                return('S');
            default:
                return('day');
        }
    }
    function deleteHabit(x) {
        let deletar = confirm('Deseja realmente deletar este hábito?');
        let url_deletar= `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${x}`
        if(deletar){
            let promisse = axios.delete(url_deletar, chave);
            setAtualize(atualize+1);
        }
    }

    if(habitos !== null) {return(
        <CorpoHabitos>
            <HabitosHead>
                <h1>
                    Meus hábitos 
                </h1>
                <img data-test="habit-create-btn" onClick={()=>AdicionarHabito()} src={Adicionar} alt="Adicionar Hábito" />
            </HabitosHead>
            <NovoHabito data-test="habit-create-container" ok={NewHabito}>
                <form onSubmit={novoHabito}>
                    <input data-test="habit-name-input"
                    disabled={visivel}
                    type="text" value={nome} 
                    placeholder="nome do hábito"
                    onChange={e => setNome(e.target.value)} />
                    <Cancelar disabled={visivel}  data-test="habit-create-cancel-btn" onClick={()=>AdicionarHabito()}> Cancelar </Cancelar>
                    <button disabled={visivel} data-test="habit-create-save-btn" type="submit"> {texto}{<ThreeDots height={'30'} color="#FFFFFF"  visible={visivel}/>} </button> 
                </form>
                <FormWeekDays>
                    <WeekDay disabled={visivel} dias={dias}  cont={0}
                     data-test="habit-day" 
                    onClick={() => adicionarDia(0)} >D</WeekDay>
                    <WeekDay disabled={visivel} dias={dias} cont={1}
                     data-test="habit-day" 
                    onClick={() => adicionarDia(1)} >S</WeekDay>
                    <WeekDay disabled={visivel} dias={dias} cont={2}
                     data-test="habit-day" 
                    onClick={() => adicionarDia(2)} >T</WeekDay>
                    <WeekDay disabled={visivel} dias={dias} cont={3}
                     data-test="habit-day" 
                    onClick={() => adicionarDia(3)} >Q</WeekDay>
                    <WeekDay disabled={visivel} dias={dias} cont={4}
                     data-test="habit-day" 
                    onClick={() => adicionarDia(4)} >Q</WeekDay>
                    <WeekDay disabled={visivel} dias={dias} cont={5}
                     data-test="habit-day" 
                    onClick={() => adicionarDia(5)} >S</WeekDay>
                    <WeekDay disabled={visivel} dias={dias} cont={6}
                     data-test="habit-day" 
                    onClick={() => adicionarDia(6)} >S</WeekDay>
                </FormWeekDays>
            </NovoHabito>
            <h2>
               {habitos.length === 0? 'Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!':''} 
            </h2>
            {habitos.map((habito,indice) => {
                return(
                <Habito data-test="habit-container" key={indice}>
                    <h1 data-test="habit-name">{habito.name}</h1>
                    <WD_Container>
                        {weekdays.map((dia,index) => {
                            return(
                            <WD data-test="habit-day" dia={dia} dias={habito.days} key={index}>
                                {translateDay(dia)}
                            </WD>    
                            )
                        })}
                    </WD_Container>
                    <img data-test="habit-delete-btn" onClick={()=>deleteHabit(habito.id)} src={deletar} alt="Deletar Habito"/>
                </Habito>
                )
                
            })}

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
                    <Link data-test="history-link"  to={'/historico'}>
                        Histórico
                    </Link>
                </DivLink>
            </Menu>
        </CorpoHabitos>
    )}
}
const CorpoHabitos = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    background: #f2f2f2;
    padding-top: 90px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;
    h2 {
        padding-left: 10px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`
const HabitosHead = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    img {
        width: 40px;
        height: auto;
        background: #52B6FF;
        color: #FFFFFF;
        border-radius: 4.5px;        
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 26.976px;
        line-height: 34px;
        text-align: center;
        color: #FFFFFF;
        cursor: pointer;
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
const NovoHabito = styled.div`
    position: relative;
    width: 340px;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    display: ${props => props.ok === 0? 'none': 'inline'};
    form {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    input {
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: gray;
        text-align: center;
        
        position: absolute;
        left: 19px;
        top: 18px;

        }
    button {
        position: absolute;
        bottom: 15px;
        right: 15px;
        width: 84px;
        height: 35px;
        color: #FFFFFF;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: 1px solid #FFFFFF;
        cursor: pointer;
        justify-content: center;
        align-items: center;
    }
    } 
`
const Cancelar = styled.h1`
    position: absolute ;
    bottom: 24px;
    right: 120px;

    width: 69px;
    height: 20px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #52B6FF;
    opacity: 0.7;
    cursor: pointer;
`
const FormWeekDays = styled.div`
    position: absolute;
    left: 19px;
    top: 78px;
    width: 303px;
    height: 45px;
    display: flex;
    gap: 5px;
`
const WeekDay = styled.button`
    width: 30px;
    height: 30px;
    color: ${props => props.dias.includes(props.cont)? '#FFFFFF':'#CFCFCF'};
    background: ${props => props.dias.includes(props.cont)? '#CFCFCF':'#FFFFFF'};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    cursor: pointer;
`
const Habito = styled.div`
    position: relative;
    width: 340px;
    height: 91px;

    background: #FFFFFF;
    border-radius: 5px;
    
    h1 {
        position: absolute;
        width: 208px;
        height: 25px;
        left: 15px;
        top: 15px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
    img {
        position: absolute;
        right: 15px;
        top: 15px;
        cursor: pointer;
    }
`
const WD_Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 240px;

    position: absolute;
    left: 15px;
    bottom: 15px;
`
const WD = styled.div`
    width: 30px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: ${props => props.dias.includes(props.dia)? '#FFFFFF':'#CFCFCF'};
    background: ${props => props.dias.includes(props.dia)? '#CFCFCF':'#FFFFFF'};
`