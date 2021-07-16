import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/components/lib/AluraCommons' //Importando os estilos do arqiovo da alura
/**
 * Usamos este arquivo para para aplicar configurações padrões para todo o projecto. 
 * ex: uma cor padrão para o body.
 * uma tag para o botão
 */
//Algumas configurações que já foram feitas para o body.
const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

  body {
    box-sizing: border-box;
    background-color: #D9E6F6;
    font-family: sans-serif;
  }

  #__next{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles /** Aqui posso chamar uma variavel como essa porque, estamos dentro de crases e usei o sistema do JS que é criar ${} para chamar variaveis dentro de crases. */} 
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
