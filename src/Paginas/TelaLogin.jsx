import { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom";
import logo from "/src/assets/Logo_PNG.png"

export default function TelaLogin() {
    let [email,setEmail] = useState('');
    let [senha,setSenha] = useState('');

    function login(e){
        e.preventDefault();
        alert(` olá ${email}`)
    }
    return(
        <LoginBody>
            <Logo_img>
                <img src={logo} alt="Logomarca TrackIt" />
            </Logo_img>

            <Form_login>
                <form onSubmit={login}>
                    <input 
                    type="email" value={email} 
                    placeholder="Digite seu email"
                    onChange={e => setEmail(e.target.value)} />

                    <input 
                    type="password" value={senha}
                    placeholder="Digite sua senha" 
                    onChange={e => setSenha(e.target.value)} />
                    
                    <button type="submit">Reservar Assento(s)</button> 

                </form>
            </Form_login>
            <Link_cadastro>
                <Link className="link" to={`/cadastro`}>
                    Não tem uma conta? Cadastre-se!
                </Link>
            </Link_cadastro>
            
            
        </LoginBody>
    )
}

const LoginBody = styled.div`
    height: 100vh;
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