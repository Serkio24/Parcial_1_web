import {type Serie} from './SerieCard';

function SerieCardDetalle({ serie }: { serie: Serie }) {
    return (
        <div className="serie-detalle">
            <span>S{serie.number}</span>
            <h2>{serie.title}</h2>
            <p>{serie.description}</p>
            <p>Rating: {serie.rating}</p>
        </div>
    );
}

export default SerieCardDetalle;