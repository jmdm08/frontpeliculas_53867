import { useHistory } from 'react-router';
import '../estilos/header.css';

export default function Header(props){
    let history = useHistory();

    function handleClick(evento){
        evento.preventDefault();
        history.push("/login");
    }

    return(
        <>
            <header className="header">
                <button type="button" onClick={handleClick} >Iniciar Sesión</button>
            </header>
            {props.children}
        </>
    )
}