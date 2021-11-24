export default function ComponenteFuncional(props){
    return (
        <>
            <h3>Mi primer Componente Funcional</h3>
            <span>{props.nombre} {props.apellido}</span>
        </>
    );
}