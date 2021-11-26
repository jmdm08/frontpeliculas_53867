import { URL_API_PELICULA } from "../config/config";

export function servicioBusquedaTitulo(titulo){

    const path = "/peliculas/buscarPeliculasTitulo/" + titulo;

    /*
        FETCH -> CARGAR POR HTTP RECURSOS EXTERNOS
            -> APIS, ARCHIVOS, MICROSERVICIOS.

            -> URL + RUTA DEL RECURSO A CARGAR.
            -> CONFIGURACIÓN
                -> METHOD
                -> MODE -> CORS
                -> HEADERS -> 
                -> BODY -> CUERPO -> POST/PUT
    */

    const config = {
        method : "GET",
        mode : "cors"
    }

    return fetch(URL_API_PELICULA + path, config)
        .then(function(respuesta){
            if(respuesta.status === 200){
                return respuesta.json();
            }
            else{
                Promise.reject(respuesta.statusText);
            }
        })
        .catch(function(error){
            console.log(error);
        })

}