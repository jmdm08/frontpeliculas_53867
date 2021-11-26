import { Switch, Route } from "react-router";
import ResultadosBusqueda from "../paginas/ResultadosBusqueda";
import DetallePelicula from "../paginas/DetallePelicula";

export default function Routes(){
    return(
        <Switch>
            <Route exact path="/" component={ResultadosBusqueda} />
            <Route path="/detalle/:id" component={DetallePelicula} />
        </Switch>
    );
}