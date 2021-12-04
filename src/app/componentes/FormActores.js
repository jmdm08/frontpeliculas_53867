export default function FormActores(props){

    return(
        <>
            <div>
                <label htmlFor={"nombre-" + props.id}>Nombre: </label>
                <input type="text" id={"nombre-" + props.id} name={"nombre-" + props.id} value={props.actor.nombre} onChange={props.onChange} />
            </div>
            <div>
                <label htmlFor={"apellido-" + props.id}>Apellido: </label>
                <input type="text" id={"apellido-" + props.id} name={"apellido-" + props.id} value={props.actor.apellido} onChange={props.onChange} />
            </div>
            <div>
                <button type="button" name="btnEliminar" value={props.id} onClick={props.onClick}>Eliminar</button>
            </div>
        </>
    );

}