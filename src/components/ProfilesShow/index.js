import { ProfileRelationsBoxWrapper } from "../ProfileRalations";

export function ProfileShow(props){
    const pessoasActulaizado = props.pessoas.slice(); //Criando um array novo com a copi dos dados do array, colocando em um novo array.
    pessoasActulaizado.splice(6, props.pessoas.length - 6);
    return (
        <ProfileRelationsBoxWrapper>
        <h1 className="smallTitle">{props.titulo} ({props.pessoas.length})</h1>
            <ul>
              {pessoasActulaizado.map((amigo) => {
                return (
                  <li key={amigo.id}>
                    <a href={`/users/${amigo.title}`}>
                      <img src={amigo.image} />
                      <span>{amigo.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
        </ProfileRelationsBoxWrapper>
    );
}

