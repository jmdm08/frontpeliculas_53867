import { useState } from 'react';
import Resultados from '../componentes/Resultados';
import '../estilos/resultados-busqueda.css';

export default function ResultadosBusqueda(){
    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    
    function handleSubmit(evento){
        evento.preventDefault();
    }

    function handleChange(evento){
        let tituloPelicula = evento.target.value;
        let resultadosBusqueda = new Array(tituloPelicula.length).fill(0);
        setResultados(resultadosBusqueda);
        setBusqueda(tituloPelicula);
    }

    return (
        <>
            <div className="dv-busqueda">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Buscar Películas</legend>
                        <input type="text" id="busqueda" name="busqueda" onChange={handleChange} placeholder="Título de la película..." />
                    </fieldset>
                </form>
            </div>
            <div>
                <fieldset>
                    <legend>Listado Películas</legend>
                    <div><span>Mostrando resultado para: {busqueda}</span></div>
                    <div className="dv-resultados">
                        {resultados && resultados.length > 0 && resultados.map(pelicula => (
                            <Resultados />
                        ))}   
                    </div>
                </fieldset>
            </div>
        </>
    );
}