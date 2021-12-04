import { useState, useEffect } from "react";
import ListarPeliculas from "../componentes/ListarPeliculas";
import FormActores from "../componentes/FormActores";
import FormDetalles from "../componentes/FormDetalles";
import * as PeliculasService from "../servicios/PeliculasService";

export default function AdministrarPeliculas(){
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [ano, setAno] = useState('');
    const [rating, setRating] = useState('');
    const [clasificacion, setClasificacion] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [poster, setPoster] = useState('');
    const [actores, setActores] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [idiomas, setIdiomas] = useState([]);
    const [paises, setPaises] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [nominaciones, setNominaciones] = useState({cantidad:0, ganadas:0});
    const [id, setId] = useState('');

    useEffect(()=>{
        if(id){
            // CARGAR PELÍCULA A EDITAR.
            PeliculasService.servicioBusquedaId(id)
                .then(function(resultadosBusqueda){
                    const pelicula = resultadosBusqueda.data;
                    setTitulo(pelicula.titulo);
                    setTipo(pelicula.tipo);
                    setAno(pelicula.ano);
                    setRating(pelicula.rating);
                    setClasificacion(pelicula.clasificacion);
                    setSinopsis(pelicula.sinopsis);
                    setPoster(pelicula.poster);
                    setActores(pelicula.actores);
                    setGeneros(pelicula.generos);
                    setIdiomas(pelicula.idiomas);
                    setPaises(pelicula.paises);
                    setDirectores(pelicula.directores);
                    setNominaciones(pelicula.nominaciones);
                })
        }
    }, [id]);

    function handleChange(evento){
        let {name, value} = evento.target;
        switch(name){
            case 'titulo':
                setTitulo(value);
            break;

            case 'ano':
                setAno(value);
            break;

            case 'tipo':
                setTipo(value);
            break;

            case 'poster':
                setPoster(value);
            break;

            case 'clasificacion':
                setClasificacion(value);
            break;

            case 'rating':
                setRating(value);
            break;

            case 'sinopsis':
                setSinopsis(value);
            break;

            case 'cantidad':
            case 'ganadas':
                setNominaciones(nominaciones => (
                    {...nominaciones, [name] : value}
                ))   
            break;
        }
    }

    function handleClick(evento){
        evento.preventDefault();
        const pelicula = {
            "titulo" : titulo,
            "ano" : ano,
            "poster" : poster,
            "rating" : rating,
            "clasificacion" : clasificacion,
            "sinopsis" : sinopsis,
            "tipo" : tipo,
            "actores" : actores,
            "generos" : generos,
            "paises" : paises,
            "idiomas" : idiomas,
            "directores" : directores,
            "nominaciones": nominaciones
        }

        if(id){
            PeliculasService.servicioEditarPelicula(id, pelicula)
                .then(function(resultadosEditar){
                    if(resultadosEditar.datos.acknowledged){
                        alert("Película actualizada correctamente");
                        setTitulo('');
                        setTipo('');
                        setPoster('');
                        setClasificacion('');
                        setSinopsis('');
                        setRating('');
                        setAno('');
                        setActores([]);
                        setIdiomas([]);
                        setPaises([]);
                        setDirectores([]);
                        setGeneros([]);
                        setNominaciones({cantidad:0, ganadas:0});
                        setId('');
                    }
                })
        }
        else{
            PeliculasService.servicioCrearPelicula(pelicula)
                .then(function(resultadoCrear){
                    if(resultadoCrear.datos.acknowledged){
                        alert("Película creada correctamente");
                        setTitulo('');
                        setTipo('');
                        setPoster('');
                        setClasificacion('');
                        setSinopsis('');
                        setRating('');
                        setAno('');
                        setActores([]);
                        setIdiomas([]);
                        setPaises([]);
                        setDirectores([]);
                        setGeneros([]);
                        setNominaciones({cantidad:0, ganadas:0});
                    }
                    else{
                        alert("Error al crear película")
                    }
                })
                .catch(function(error){
                    console.log(error);
                });
        }
    }

    function handleClickActores(evento){
        evento.preventDefault();
        const { name, value } = evento.target;
        if(name === "btnAdicionar"){
            const nuevosActores = [ ...actores, {nombre:"", apellido:""}];
            setActores(nuevosActores);
        }
        else{
            setActores(actores => (
                actores.filter((actor, idx) => idx !== parseInt(value))
            ));
        }
    }

    function handleChangeActores(evento){
        const index = parseInt(evento.target.name.split("-").pop());
        const valor = evento.target.name.split("-").shift();
        const value = evento.target.value;
        setActores( actores => (
            actores.map( (actor, idx) => {
                if(idx === index){
                    return {...actor, [valor] : value}
                }
                else{
                    return {...actor}
                }
            })
        ));
    }

    function handleClickDetalle(tag, elemento, accion, index = null){
        if(accion === "adicionar"){
            switch(elemento){
                case 'generos':
                    setGeneros([...generos, tag]);
                break;

                case 'idiomas':
                    setIdiomas([...idiomas, tag]);
                break;

                case 'paises':
                    setPaises([...paises, tag]);
                break;

                case 'directores':
                    setDirectores([...directores, tag]);
                break;
            }
        }
        else{
            switch(elemento){
                case 'generos':
                    setGeneros(generos => (
                        generos.filter((genero,idx) => idx !== parseInt(index))
                    ));
                break;

                case 'idiomas':
                    setIdiomas(idiomas => (
                        idiomas.filter((idioma,idx) => idx !== parseInt(index))
                    ));
                break;

                case 'paises':
                    setPaises(paises => (
                        paises.filter((pais,idx) => idx !== parseInt(index))
                    ));
                break;

                case 'directores':
                    setDirectores(directores => (
                        directores.filter((director,idx) => idx !== parseInt(index))
                    ));
                break;
            }
        }
    }

    return(
        <>
            <fieldset>
                <legend>Administrar Películas</legend>
                <fieldset>
                    <legend>Datos Película</legend>
                    <form>
                        <div>
                            <label htmlFor="titulo">Título: </label>
                            <input type="text" id="titulo" name="titulo" value={titulo} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="ano">Año: </label>
                            <input type="text" id="ano" name="ano" value={ano} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="rating">Rating: </label>
                            <input type="text" id="rating" name="rating" value={rating} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="clasificacion">Clasificación</label>
                            <input type="text" id="clasificacion" name="clasificacion" value={clasificacion} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="poster">Póster</label>
                            <input type="text" id="poster" name="poster" value={poster} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="sinopsis">Sinopsis</label>
                            <textarea id="sinopsis" name="sinopsis" value={sinopsis} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label htmlFor="tipo">Tipo: </label>
                            <input type="text" id="tipo" name="tipo" value={tipo} onChange={handleChange} />
                        </div>
                        <fieldset>
                            <legend>Actores</legend>
                            <div>
                                <button type="button" onClick={handleClickActores} name="btnAdicionar" > Adicionar Actor </button>
                            </div>
                            <div>
                                {actores && actores.map((actor, idx) => (
                                    <FormActores 
                                        key={idx} 
                                        id={idx} 
                                        actor={actor}
                                        onChange={handleChangeActores}
                                        onClick={handleClickActores} 
                                    />
                                ))}
                            </div>
                        </fieldset>
                        <FormDetalles
                            titulo="Géneros"
                            id="generos"
                            datos={generos}
                            onClick={handleClickDetalle}
                        />
                        <FormDetalles
                            titulo="Idiomas"
                            id="idiomas"
                            datos={idiomas}
                            onClick={handleClickDetalle}
                        />
                        <FormDetalles
                            titulo="Países"
                            id="paises"
                            datos={paises}
                            onClick={handleClickDetalle}
                        />
                        <FormDetalles
                            titulo="Directores"
                            id="directores"
                            datos={directores}
                            onClick={handleClickDetalle}
                        />
                        <fieldset>
                            <legend>Nominaciones</legend>
                            <div>
                                <label htmlFor="cantidad">Cantidad: </label>
                                <input type="text" id="cantidad" name="cantidad" onChange={handleChange} value={nominaciones.cantidad} /> 
                            </div>
                            <div>
                                <label htmlFor="ganadas">Ganadas: </label>
                                <input type="text" id="ganadas" name="ganadas" onChange={handleChange} value={nominaciones.ganadas} />
                            </div>
                        </fieldset>
                        <div>
                            <button type="button" onClick={handleClick}>Guardar</button>
                        </div>
                    </form>
                </fieldset>
                <fieldset>
                    <legend>Lista Películas</legend>
                    <ListarPeliculas onClickEditar={setId} />                    
                </fieldset>
               
            </fieldset>
        </>
    );
}