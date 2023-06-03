import styled from "styled-components";
import { UserContext } from "/src/App.jsx";
import { useContext} from "react";

export default function ComponenteTopo() {
    const context = useContext(UserContext);
    
    if (context.User !== null) return(
        <HojeCabeçalho data-test="header">
            <h1>
                TrackIt
            </h1>
            <img data-test="avatar" src={context.User.image} alt="Imagem des usuario" />
        </HojeCabeçalho>
    );
}
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