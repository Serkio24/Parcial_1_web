import Image from "next/image";

/** Forma de un personaje tal como lo devuelve la API de Rick and Morty. */
export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    /** URL absoluta de la foto (rickandmortyapi.com), 300x300. */
    image: string;
}

/**
 * Tarjeta de un personaje: foto + ficha.
 *
 * Usa `next/image` en vez de `<img>` para servir la imagen optimizada. El
 * dominio `rickandmortyapi.com` debe estar en `images.remotePatterns` de
 * `next.config.ts`, si no Next lanza un error en tiempo de ejecución.
 */
function CharacterCard({ character }: { character: Character }) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray shadow-md">
            <Image
                src={character.image}
                alt={character.name}
                // Tamaño nativo de la imagen en la API.
                width={300}
                height={300}
                // Ocupa el ancho de la tarjeta manteniendo la proporción.
                className="w-full h-auto"
            />
            <div className="p-3">
                <h3>{character.name}</h3>
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>
                <p>Type: {character.type || 'N/A'}</p>
                <p>Gender: {character.gender}</p>
            </div>
        </div>
    );
}

export default CharacterCard;
