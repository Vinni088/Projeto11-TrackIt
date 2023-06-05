import axios from "axios";
import { useState } from "react"
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "/src/assets/Logo_PNG.png";


export default function TelaCadastro() {
    let [email, setEmail] = useState('');
    let [senha, setSenha] = useState('');
    let [nome, setNome] = useState('');
    let [foto, setFoto] = useState('');
    let [botões, setBotões] = useState(false);
    const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';
    const navigate = useNavigate();

    function Cadastro(e) {
        e.preventDefault();
        setBotões(true);
        let novoCadastro = {
            email: email,
            name: nome,
            image: foto,
            password: senha
        };
        const post = axios.post(url, novoCadastro);
        

        post.then(() => navigate('/'));
        post.catch(resposta => 
            alert(`Houve um problema com seu cadastro: ${resposta.response.data.message}`),
            setBotões(false)
        );    
    }

    return(
        <Register_body>
            <Logo_img>
                <img src={logo} alt="Logomarca TrackIt" />
            </Logo_img>

            <Form_Cadastro>
                <form onSubmit={Cadastro}>
                    <input data-test="email-input"
                    disabled={botões}
                    type="email" value={email} 
                    placeholder="Digite seu email"
                    onChange={e => setEmail(e.target.value)} />

                    <input data-test="password-input"
                    disabled={botões}
                    type="text" value={senha}
                    placeholder="Digite sua senha" 
                    onChange={e => setSenha(e.target.value)} />

                    <input data-test="user-name-input"
                    disabled={botões}
                    type="text" value={nome}
                    placeholder="Digite seu nome" 
                    onChange={e => setNome(e.target.value)} />

                    <input data-test="user-image-input" 
                    disabled={botões}
                    type="text" value={foto}
                    placeholder="Digite o link para sua foto" 
                    onChange={e => setFoto(e.target.value)} />
                    
                    <button data-test="signup-btn" disabled={botões} type="submit"> Cadastrar </button> 

                </form>
            </Form_Cadastro>
            <Link_login>
                <Link data-test="login-link" className="link" to={`/`}>
                    Não tem uma conta? Cadastre-se!
                </Link>
            </Link_login>
        </Register_body>
    )
}

const Register_body = styled.div`
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
const Form_Cadastro = styled.div`
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
            cursor: pointer;
        }
    } 
    
`
const Link_login = styled.div`
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