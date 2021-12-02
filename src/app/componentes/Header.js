import { useHistory } from 'react-router';
import '../estilos/header.css';

export default function Header(props){
    let history = useHistory();

    function handleClick(evento){
        evento.preventDefault();
        if(evento.target.value === "iniciar"){
            history.push("/login");
        }
        else{
            localStorage.removeItem('auth');
            props.autenticado(null);
            history.push("/");
        }
        
    }

    return(
        <>
            <header className="header">
                {props.usuario &&
                    <button type="button" onClick={handleClick} value="cerrar" >Cerrar Sesión</button>
                }
                {!props.usuario &&
                    <button type="button" onClick={handleClick} value="iniciar">Iniciar Sesión</button>
                }
            </header>
            {props.children}
        </>
    )
}