import { useState, useEffect } from 'react';
import Resultados from '../componentes/Resultados';
import * as PeliculasService from '../servicios/PeliculasService'
import '../estilos/resultados-busqueda.css';

export default function ResultadosBusqueda(){
    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);

    /*
        1. SIEMPRE SE EJECUTA UNA VEZ -> Montaje del Componente.
        2. POR CADA CAMBIO DE ESTADO, DESPUÉS DE RENDERIZAR SE EJECUTA -> Actualiza.
        3. ADICIONAR UN RETURN -> DESMONTAJE
    */
    useEffect(()=>{
        if(busqueda.length >= 4){
            PeliculasService.servicioBusquedaTitulo(busqueda)
                .then(function(resultadosBusqueda){
                    setResultados(resultadosBusqueda.data);
                });
        }
        else{
            setResultados([]);
        }
    }, [busqueda]);
    
    function handleSubmit(evento){
        evento.preventDefault();
    }

    function handleChange(evento){
        let tituloPelicula = evento.target.value;
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
                            <Resultados pelicula={pelicula} />
                        ))}   
                    </div>
                </fieldset>
            </div>
        </>
    );
}