export default function ComponenteFuncionalArray(props){
    return (
        <>
            {props.personas.map(persona => (
                <>
                    <h3>Mi primer Componente Funcional</h3>
                    <span>{persona.nombre} {persona.apellido}</span>
                </>
            ))}
        </>
    );
}