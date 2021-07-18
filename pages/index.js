import React from 'react';
import MainGrid from './../src/components/MainGrid';
import Box from './../src/components/Box';

/* Importando varios components de uma vez em um unico ficheiro */
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/components/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRalations';
import { ProfileShow } from '../src/components/ProfilesShow';


function ProfileUser(propriedades) {
  //console.log(propriedades);
  return (
    <Box as="aside">
      <img src={`https://www.github.com/${propriedades.usuario_github}.png`} style={{ borderRadius: '100%' }} />

      <hr></hr>
      <p style={{ textAlign: 'center' }}>
        <a className="boxLink" href={`https://github.com/${propriedades.usuario_github}`}>
          {`@${propriedades.usuario_github}`}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  /**
   * Aqui estou a dizer ao react state que ele deverá actualizar onde eu estiver usando esta variavel.
   * Isso significa que a partir de agora se esta variave for actualizada ele deverá ir onde elá esta seendo utilizada e actualizar.
   */
  const [comunidades, setComunidades] = React.useState([{
    id: 1,
    title: "Viagem",
    image: `https://picsum.photos/200?1`
  }, {
    id: 2,
    title: "Odeio ir a escola",
    image: `https://picsum.photos/200?2`
  }, {
    id: 3,
    title: "Programadores amadores",
    image: `https://picsum.photos/300?3`
  }, {
    id: 4,
    title: "Barmans",
    image: `https://picsum.photos/200?4`
  }]);//Adicionando ao ReactState meu array, agora o recta vai actuliar os valores onde estiver sendo utilizado este array
  const gitHubUser = "eacuamba";
  const [amigosFavoritos, setAmigosFavoritos] = React.useState([{
    id: 'nimiology',
    title: 'nimiology',
    image: 'https://github.com/nimiology.png'
  }, {
    id: 'peas',
    title: 'peas',
    image: 'https://github.com/peas.png'
  }, {
    id: 'omariosouto',
    title: 'omariosouto',
    image: 'https://github.com/omariosouto.png'
  }, {
    id: 'DelcioLuis',
    title: 'DelcioLuis',
    image: 'https://github.com/DelcioLuis.png'
  }, {
    id: 'gmahota',
    title: 'gmahota',
    image: 'https://github.com/gmahota.png'
  }, {
    id: 'Kakise',
    title: 'Kakise',
    image: 'https://github.com/Kakise.png'
  }]);
  /**
   * O {} é do react e é usado para escrever codigo js e css.
   * O ${} é do js e serve para chamar variaveis dentro de crases `${variavel}`.
   */
  return (
    //<AlurakutMenu/> Não podemos colocar deis elementos pais, no mesmo nivel, a retornar, mas podemos retornar um elemento com filhos, muitos filhos.
    <>
      <AlurakutMenu githubUser={gitHubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileUser usuario_github={gitHubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vind(a|o)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="title" >O que você deseja fazer?</h2>
            <form onSubmit={function handleCriarCumunidade(e) {
              e.preventDefault();//Previnindo o evento normal do submite
              const dadosFormulario = new FormData(e.target); //Obtendo o formulario e convertendo em um onjecto formData
              //console.log(dadosFormulario.get('title'));//Obtendo o titlo do formulario;

              const objecto = {
                id: new Date().toISOString(),
                title: dadosFormulario.get('title'),
                image: dadosFormulario.get("image"),
                acao: dadosFormulario.get(`acao`)
              };
              
              switch (objecto.acao) {
                case "2": {
                  const arrayDeObjetos = [...comunidades, objecto]
                  setComunidades(arrayDeObjetos);
                  break;
                }
                case "1": {
                  const arrayDeObjetos = [...amigosFavoritos, objecto]
                  setAmigosFavoritos(arrayDeObjetos);
                }
              }


            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Qual vai ser a URL da image dela?"
                  name="image"
                  aria-label="Qual vai ser a URL da image dela?"
                  type="text"
                />
              </div>

              <div>
                <div>
                  <input name="acao" value="1" id="amigo" type="radio" />
                  <label htmlFor="amigo">Adicionar Amigo</label>
                </div>
                <div id="last_radio">
                  <input name="acao" value="2" id="comunidade" type="radio" defaultChecked/>
                  <label htmlFor="comunidade">Adicionar Comunidade</label>
                </div>
              </div>

              <div>
                <button>
                  Criar comunidade
                </button>
              </div>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileShow pessoas={comunidades} titulo={`Comunidades`} />
          <ProfileShow pessoas={amigosFavoritos} titulo={`Amigos`} />
        </div>
      </MainGrid>
    </>
  );


}
