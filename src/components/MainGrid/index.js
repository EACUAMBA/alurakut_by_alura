/*importei a biblioteca styled components porque uso ela neste ficheio .js */
import styled from "styled-components";

/*Criando a minha propria configuração para tag main, quando eu for a usar a tag MainGrid que criei tudo o que estiver nela será emcapsulado em uma tag main.*/
/*grid-gap: Espaço entre as boxes*/
/* 1fr - pega uma fração do espaço que existe.*/
const MainGrid = styled.main` 

width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
    }
  }
  @media(min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: 
      "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 1fr 312px;
  }
`;

export default MainGrid; /**Agora estou exportando o MainGrid junto com a lib styled components */