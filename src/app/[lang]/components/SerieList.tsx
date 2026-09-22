import Link from "next/link";
import SerieCard, { Serie }  from "./SerieCard";
import SerieCardDetalle from "./SerieCardDetalle";

function SerieList({ series,emptyMessage }: { series: Serie[],emptyMessage: string }) {
    if (series.length === 0) {
        return <p>{emptyMessage}</p>;
    }
    return (
        <div className="grid grid-cols-2 gap-4 max-w-4xl mr-auto">
            {series.map((serie) => (
                <Link key={serie.id} href={`/series/${serie.id}`}>
                    <SerieCard serie={serie} />
                </Link>
            ))}
        </div>
    );
}

export default SerieList;