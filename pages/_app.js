import { createGlobalStyle, ThemeProvider } from 'styled-components'
/**
 * Usamos este arquivo para para aplicar configurações padrões para todo o projecto. 
 * ex: uma cor padrão para o body.
 */

//Algumas configurações que já foram feitas para o body.
const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #D9E6F6;
    font-family: sans-serif;
  }

  #__next{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
`

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
