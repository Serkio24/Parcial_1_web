import Link from 'next/link'
import RazasCard, { Razas } from './RazasCard'
import { useEffect } from 'react';

function ListaPerros({ razas, emptyMessage }: { razas: Razas[], emptyMessage: string }) {
    useEffect(() => {
        // Función para obtener la imagen de una raza
        const fetchRazas = async (img: string) => {
            try {
                const response = await fetch(" https://dog.ceo/api/breed/<breed>/images/random");

            } catch (error) {
                console.error("Error fetching raza:", error);
            }
        };

        // Llamar a la función para cada raza
        
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {razas.map((raza) => (
                
                <RazasCard key={raza.nombre} raza={raza} />
            ))}
        </div>
    );
}

export default ListaPerros;