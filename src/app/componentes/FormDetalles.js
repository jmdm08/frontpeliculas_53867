import { useState } from "react";
export default function FormDetalles(props){
    const [tag, setTag] = useState('');

    function handleChange(evento){
        setTag(evento.target.value);
    }

    function handleClick(evento){
        evento.preventDefault();
        const {name, value} = evento.target;
        if(name === "btnAdicionar"){
            props.onClick(tag, value, "adicionar");
            setTag('');
        }
        else{
            props.onClick(tag, props.id, "eliminar", value);
        }
        
    }

    return (
        <>
            <fieldset>
                <legend>{props.titulo}</legend>
                <input type="text" id={props.id} name={props.id} value={tag} onChange={handleChange} />
                <button type="button" name="btnAdicionar" value={props.id} onClick={handleClick}>Adicionar {props.titulo}</button>
                <div>
                    {props.datos && props.datos.map((dato,idx) =>(
                        <button key={idx} type="button" name="btnEliminar" value={idx} onClick={handleClick}>{dato}</button>
                    ))}
                </div>
            </fieldset>
        </>
    );
}