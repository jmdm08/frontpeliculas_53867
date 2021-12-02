import { useState } from "react";
import { useHistory } from "react-router";
import * as UsuariosService from '../servicios/UsuariosService';

export default function Login(props){
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    let history = useHistory();

    function handleChange(evento){
        if(evento.target.name === "usuario"){
            setUsuario(evento.target.value);
        }
        
        if (evento.target.name === "clave"){
            setClave(evento.target.value);
        }
    }

    function handleClick(evento){
        evento.preventDefault();
        UsuariosService.servicioIniciarSesion(usuario, clave)
            .then(function(resultadosUsuarios){
                if(resultadosUsuarios.token){
                    const datosUsuario = {
                        token : resultadosUsuarios.token,
                        nombre : resultadosUsuarios.datos.nombre,
                        roles : resultadosUsuarios.datos.roles
                    }
                    localStorage.setItem("auth", JSON.stringify(datosUsuario) );
                    props.autenticado(datosUsuario);
                    history.push("/administrar");
                }
            })
            .catch(function(error){
                console.log(error);
            });
    }

    return(
        <>
            <div>
                <fieldset>
                    <legend>Iniciar Sesión</legend>
                    <form>
                        <div>
                            <label htmlFor="usuario">Usuario: </label>
                            <input type="text" id="usuario" name="usuario" value={usuario} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="clave">Contraseña: </label>
                            <input type="password" id="clave" name="clave" value={clave} onChange={handleChange} />
                        </div>
                        <div>
                            <button type="button" onClick={handleClick}>Iniciar Sesión</button>
                        </div>
                    </form>
                </fieldset>
            </div>
        </>
    );
}