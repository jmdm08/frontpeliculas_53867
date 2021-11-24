import '../estilos/resultados.css'

export default function Resultados(props){

    function handleClick(evento){
        evento.preventDefault();
        evento.stopPropagation();
        alert("Redireccionar al detalle de la película");
    }

    function handleClickImg(evento){
        evento.stopPropagation();
        alert("Click en la imagen");
    }

    return (
        <>
            <div className="dv-pelicula" onClick={handleClick}>
                <div className="dv-poster">
                    <img onClick={handleClickImg} src="https://cl.buscafs.com/www.tomatazos.com/public/uploads/images/127763/127763.png"></img>
                </div>
                <div>
                    <h1>TÍTULO PELÍCULA</h1>
                </div>
                <div>
                    <p>SINOPSIS</p>
                </div>
                <div>
                    <span>
                        RATING:
                        <i></i>
                    </span>
                </div>
            </div>   
        </>
    );
}