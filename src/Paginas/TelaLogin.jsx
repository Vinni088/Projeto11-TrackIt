import axios from "axios";
import styled from "styled-components";
import { UserContext } from "/src/App.jsx";
import logo from "/src/assets/Logo_PNG.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TelaLogin() {
    let [email,setEmail] = useState('');
    let [senha,setSenha] = useState('');
    const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';
    const navigate = useNavigate();
    const setUser = useContext(UserContext).setUser;

    function login(e){
        e.preventDefault();
        let dadosLogin = {
            email: email,
            password: senha
        };
        let promisse = axios.post(url, dadosLogin);
        promisse.then(resposta => Sucesso(resposta));
        promisse.catch(resposta => Fail(resposta));
    }
    function Sucesso(resposta) {
        console.log(resposta);
        let dados = resposta.data;
        setUser(dados);
        navigate('/hoje');
    }
    function Fail(resposta) {
        console.log(resposta)
    }
    return(
        <LoginBody>
            <Logo_img>
                <img src={logo} alt="Logomarca TrackIt" />
            </Logo_img>

            <Form_login>
                <form onSubmit={login}>
                    <input data-test="email-input"
                    type="email" value={email} 
                    placeholder="Digite seu email"
                    onChange={e => setEmail(e.target.value)} />

                    <input data-test="password-input"
                    type="password" value={senha}
                    placeholder="Digite sua senha" 
                    onChange={e => setSenha(e.target.value)} />
                    
                    <button data-test="login-btn" type="submit">Entrar</button> 

                </form>
            </Form_login>
            <Link_cadastro>
                <Link data-test="signup-link" className="link" to={`/cadastro`}>
                    Não tem uma conta? Cadastre-se!
                </Link>
            </Link_cadastro>
            
            
        </LoginBody>
    )
}

const LoginBody = styled.div`
    width: 100vw;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 60px;
`
const Logo_img = styled.div`
    img {
        width: 180px;
    }
    margin-bottom: 32px;
`
const Form_login = styled.div`
    form {
        display: flex;
        flex-direction: column;
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
        }
        button {
            width: 303px;
            height: 45px;
            color: #FFFFFF;
            background: #52B6FF;
            border-radius: 4.63636px;
            border: 1px solid #FFFFFF;
        }
    } 
    
`
const Link_cadastro = styled.div`
    margin-top: 10px;
    width: 240px;
    height: 17px;
    .link {
        width: 100%;
        height: 100%;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
    
`