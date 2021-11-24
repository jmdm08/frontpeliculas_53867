import React from 'react';

export default class ComponenteClase extends React.Component{
    /*
        AQUÍ VAN
            -> CONSTRUCTOR
            -> ATRIBUTOS/ESTADOS
            -> MÉTODOS
                -> render() -> Retornar Código JSX. 
    */
    render(){
        return(
            <>
                <h3>Mi primer Componente de Clase</h3>
                <span>Autor: José Dager</span>
            </>
        );
    }
}