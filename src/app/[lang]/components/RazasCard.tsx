import Image from "next/image";
 export interface Razas {
    nombre: string;
    imagen: string;
}

function RazasCard({ raza }: { raza: any }) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray shadow-md">
            <Image
                src={raza.imagen}
                alt={raza.nombre}
                width={300}
                height={200}
            />
        </div>
    )
}

export default RazasCard;