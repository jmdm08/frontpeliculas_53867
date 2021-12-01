import { useState, useEffect } from "react";
import { useParams } from "react-router";
import DetalleActores from "../componentes/DetalleActores";
import DetalleNominaciones from "../componentes/DetalleNominaciones";
import DetalleGeneral from "../componentes/DetalleGeneral";
import * as PeliculasService from "../servicios/PeliculasService";
import '../estilos/detalle-pelicula.css';

export default function DetallePelicula(){
    const { id } = useParams();
    const [pelicula, setPelicula] = useState({});

    useEffect(()=>{
        PeliculasService.servicioBusquedaId(id)
            .then(function(resultadoBusqueda){
                setPelicula(resultadoBusqueda.data);
            })
            .catch(function(error){
                console.log(error);
            });
    },[id]);

    /*
        1. Datos externos.
            ID película -> Parámetros de la URL.
        2. Estados/Propiedades.
            ** Estados
                -> pelicula
        3. Efectos. -> useEffect().
            -> Sólo montaje.
        4. Componentes.
            -> DetalleActores -> Array de Objetos.
            -> DetalleNominaciones -> Objeto
            -> DetalleGeneral -> Géneros/Idiomas/Países... etc -> Array
    */
    
    return(
        <>
            <div className="dv-detalle_detalle">
                <fieldset>
                    <legend>Detalle Película</legend>
                    <h1>{pelicula.titulo}</h1>
                    <div className="div-main_detalle">
                        <div className="div-poster_detalle">
                            <img alt="Póster" src={pelicula.poster}></img>
                        </div>
                        <div>
                            <fieldset>
                                <legend>Año</legend>
                                <span>{pelicula.ano}</span>
                            </fieldset>
                            <fieldset>
                                <legend>Rating</legend>
                                <span>{pelicula.rating}</span>
                            </fieldset>
                            <fieldset>
                                <legend>Clasificación</legend>
                                <span>{pelicula.clasificacion}</span>
                            </fieldset>
                        </div>
                        <div>
                            <p>{pelicula.sinopsis}</p>
                        </div>
                    </div>
                    <div>
                        <fieldset>
                            <legend>Detalle</legend>
                            <DetalleActores titulo="Actores" datos={pelicula.actores} />
                            <div className="div-datos_detalle">
                                <DetalleGeneral titulo="Géneros" datos={pelicula.generos} />
                                <DetalleGeneral titulo="Idiomas" datos={pelicula.idiomas} />
                                <DetalleGeneral titulo="Países" datos={pelicula.paises} />
                                <DetalleNominaciones titulo="Nominaciones" datos={pelicula.nominaciones} />
                            </div>
                            <DetalleGeneral titulo="Directores" datos={pelicula.directores} />
                        </fieldset>
                    </div>
                </fieldset>
            </div>
        </>
    );
}