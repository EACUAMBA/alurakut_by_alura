import styled from 'styled-components'
import MainGrid from './../src/components/MainGrid';
import Box from './../src/components/Box';

/* Importando varios components de uma vez em um unico ficheiro */
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/components/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRalations';


function ProfileUser(propriedades) {
  console.log(propriedades);
  return (
    <Box>
      <img src={`https://www.github.com/${propriedades.usuario_github}.png`} style={{borderRadius: '100%' }} />
    </Box>
  );
}

export default function Home() {
  const gitHubUser = "eacuamba";
  const amigos = ['nimiology', 'peas', 'omariosouto', 'DelcioLuis'];
  /**
   * O {} é do react e é usado para escrever codigo js e css.
   * O ${} é do js e serve para chamar variaveis dentro de crases `${variavel}`.
   */
  return (
    //<AlurakutMenu/> Não podemos colocar deis elementos pais, no mesmo nivel, a retornar, mas podemos retornar um elemento com filhos, muitos filhos.
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileUser usuario_github={gitHubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vind(a|o)
            </h1>
            <OrkutNostalgicIconSet/>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h1 className="smallTitle">Pessoas da Comunidade ({amigos.length})</h1>
            <ul>
              {amigos.map((amigo) => {
                return (
                  <li>
                    <a href={`/users/${amigo}`} key={amigo}>
                      <img src={`https://www.github.com/${amigo}.png`} />
                      <span>{amigo}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidade
          </Box>
        </div>
      </MainGrid>
    </>
  );


}
