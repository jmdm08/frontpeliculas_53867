import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import '../estilos/resultados.css'

export default function Resultados(props){
    let history = useHistory();

    function handleClick(evento){
       history.push("/detalle/" + props.pelicula._id); 
    }

    return (
        <>
            <div className="dv-pelicula" onClick={handleClick}>
                <div className="dv-poster">
                    <img alt="Póster" src={props.pelicula.poster}></img>
                </div>
                <div>
                    <h1>{props.pelicula.titulo}</h1>
                </div>
                <div>
                    <p>{props.pelicula.sinopsis}</p>
                </div>
                <div>
                    <span>
                        <FontAwesomeIcon icon={faStarHalfAlt} />
                        {props.pelicula.rating}
                    </span>
                </div>
            </div>   
        </>
    );
}