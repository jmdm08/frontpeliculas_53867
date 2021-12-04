import { useState, useEffect } from "react";
import * as PeliculasService from '../servicios/PeliculasService'

export default function ListarPeliculas(props){
    const [peliculas, setPeliculas] = useState([]);

    useEffect(()=>{
        PeliculasService.servicioBusquedaPeliculas()
            .then(function(resultadosBusqueda){
                setPeliculas(resultadosBusqueda.data);
            })
            .catch(function(error){
                console.log(error);
            });
    },[]);

    function handleClick(evento){
        /*
            LO ESTADOS NO SE PUEDEN MODIFICAR DIRECTAMENTE.
        */
        evento.preventDefault();
        const buton = evento.target.name;
        const idPelicula = evento.target.value;
        switch(buton){
            case 'btnEditar':
                props.onClickEditar(idPelicula);
            break;

            case 'btnEliminar':
                PeliculasService.servicioEliminarPelicula(idPelicula)
                    .then(function(resultadoEliminacion){
                        if(resultadoEliminacion.datos.acknowledged){
                            setPeliculas( peliculasActual => (
                                peliculasActual.filter(pelicula => pelicula._id !== idPelicula)
                            ));
                        }
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            break;
        }
    }
    
    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Año</th>
                        <th>Rating</th>
                        <th>Clasificación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {peliculas && peliculas.map(pelicula =>(
                        <tr key={pelicula._id}>
                            <td>{pelicula.titulo}</td>
                            <td>{pelicula.ano}</td>
                            <td>{pelicula.rating}</td>
                            <td>{pelicula.clasificacion}</td>
                            <td>
                                <button type="button" value={pelicula._id} name="btnEditar" onClick={handleClick}>Editar</button>
                                <button type="button" value={pelicula._id} name="btnEliminar" onClick={handleClick}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}