import React from 'react';
import MainGrid from './../src/components/MainGrid';
import Box from './../src/components/Box';

/* Importando varios components de uma vez em um unico ficheiro */
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/components/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRalations';
import { ProfileShow } from '../src/components/ProfilesShow';

import nookies from 'nookies' //Importando para o nosso aquivo js a biblioteca nookies para trabalhar com cookies
import jwt_decode from 'jwt-decode';


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

export default function Home(props) {
  /**
   * Aqui estou a dizer ao react state que ele deverá actualizar onde eu estiver usando esta variavel.
   * Isso significa que a partir de agora se esta variave for actualizada ele deverá ir onde elá esta seendo utilizada e actualizar.
   */
  
  const [comunidades, setComunidades] = React.useState([]);//Adicionando ao ReactState meu array, agora o recta vai actuliar os valores onde estiver sendo utilizado este array
  const gitHubUser = props.gitHubUser;
  const [user, setUser] = React.useState({});
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

  //Fetch
  const [seguidores, setSeguidores] = React.useState([{
    id: 1,
    title: "Viagem",
    image: `https://picsum.photos/200?1`
  }]);
  React.useEffect(
    
    function(){
      fetch(`https://api.github.com/users/${gitHubUser}`).then((response)=>response.json()).then((resposta_json)=>{setUser(resposta_json)});;
      fetch(`https://api.github.com/users/${gitHubUser}/followers`)
  .then((response)=>{
    if(response.ok){
    return response.json();
    }else{
      throw new Error(response.text);
    }
  })
  .then((responseJsoned)=>{
    setSeguidores(responseJsoned.map((seguidor)=>{
      return ({
        id: seguidor.id,
        title:seguidor.login,
        image: seguidor.avatar_url,

      })
    }));
  })
  .catch((error)=>{
    console.log(`Deu ruim: ` + error);
  });
  fetch("https://graphql.datocms.com/", {
    method: 'POST',
    headers:{
      "Authorization" : 'token',
      "Content-Type": "application/json",
      "Accept" : "application/json"
    },
    body:
       JSON.stringify({ query: `{
        allCommunities {
          id
          title
          image
          _status
          _firstPublishedAt
        }
      } `})
    

  }).then(function (response){
    return response.json();
  })  
  .then(function (responseJsoned){
    const comunidadesAntigas = responseJsoned.data.allCommunities;
    console.log(comunidadesAntigas);
    const comunidadesAntigas_e_MaisNovas = [...comunidades, ...comunidadesAntigas];
    setComunidades(comunidadesAntigas);
  })
  
    }, []); 
  //Hook useEffect é uma função usada para executar acoes anter do react fazer o render e apos o react fazer o render da aplicacao no navegador.

  
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
              Bem vindo(a), {user.name}
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
                title: dadosFormulario.get('title'),
                image: dadosFormulario.get("image"),
                userslug: "eacuamba",
                acao: dadosFormulario.get(`acao`)
              };

              switch (objecto.acao) {
                case "2": {
                  
                  
                    fetch("/api/comunidades",{
                      method: "POST",
                      headers:{
                        "Content-Type" : 'application/json'
                      },
                      body: JSON.stringify(objecto)
                    }).then(async (response)=>{
                      return await response.json();
                    }).then((response)=>{
                      const arrayDeObjetos = [...comunidades, response.Resposta]
                      setComunidades(arrayDeObjetos);
                    });
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
        <ProfileShow pessoas={seguidores} titulo={`Seguidores do GITHUB`} />
          <ProfileShow pessoas={comunidades} titulo={`Comunidades`} />
          <ProfileShow pessoas={amigosFavoritos} titulo={`Amigos`} />
        </div>
      </MainGrid>
    </>
  );


}

export async function getServerSideProps(context){
  //console.log("context: ", context);
  const COOKIES = nookies.get(context); //Pegando COOKIES do navegador
  const TOKEN = COOKIES.USER_TOKEN; //Pegando o token
  console.log(TOKEN);
  const {isAuthenticated} = await fetch("https://alurakut.vercel.app/api/auth", {
    //Enviando dados para o API verificar se estamos logados ou não.
    headers:{
      Authorization: TOKEN //Token do USUARIO, para ver se esse token é válido, se foi o meu servidos que gerou.
    }
  }).then((response)=>{
    const resposta = response.json();//retornando a resposta do servidor
    return resposta;
  });
console.log("Esta auttenticado? ", isAuthenticated)
  if(!isAuthenticated){//Tratando o caso se o token for invalido
    return {
      redirect:{
        destination: '/login',
        permanent: false
      }
    }
  }

  const gitHubUser = jwt_decode(TOKEN);

  console.log(gitHubUser.githubUser);

  return{
    props: {
      gitHubUser: gitHubUser.githubUser
    },
  }
}
