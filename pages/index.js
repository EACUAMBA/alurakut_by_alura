import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const MainGrid = styled.main` //Criando a minha propria configuração para tag main, quando eu for a usar a tag MainGrid que criei tudo o que estiver nela será emcapsulado em uma tag main.
display: grid;
grid-gap: 10px; //Espaço entre as boxes
padding: 16px;

  @media(min-width: 860px){
    grid-template-areas: "profileArea feedArea comunidadeArea";
    grid-template-columns: 160px 1fr 312px; // 1fr - paga ua fração do espaço que existe.
  }
  
`;

const Box = styled.div`
  background-color: #ffffff;
  border-radius: 8px; 
  padding: 10px;
`;


export default function Home() {
  return (
    <MainGrid>
      <div style={{ gridArea: 'perfilArea' }}>
        <Box>
          Perfil
        </Box>
      </div>

      <div style={{ gridArea: 'feedArea2' }}>
        <Box>
          Feed
        </Box>
      </div>

      <div style={{ gridArea: 'comunidadeArea3' }}>
        <Box>
          Comunidade
        </Box>
      </div>
    </MainGrid>
  );


}
