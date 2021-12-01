import { URL_API_PELICULA } from "../config/config";

export function servicioIniciarSesion(usuario, clave){
    /*
        queryString
            -> ?usuario=valor&clave=clave
    */
    const path = "/usuarios/iniciarSesion?usuario=" + usuario + "&clave=" + clave;

    const config = {
        method : "GET",
        mode : "cors"
    }

    return fetch(URL_API_PELICULA + path, config)
        .then(function(respuesta){
            if(respuesta.ok){
                return respuesta.json();
            }
            else{
                return Promise.reject(respuesta.statusText);
            }
        })

}