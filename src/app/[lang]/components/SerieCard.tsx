export interface Serie {
    id: number;
    number: number;
    title: string;
    description: string;
    rating: number;
}

function SerieCard({ serie }: { serie: Serie }) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray shadow-md">
            <span>S{serie.number}</span>
            <h3>{serie.title}</h3>
            <span>{serie.rating}</span>
        </div>
    );
}

export default SerieCard;