"use client";
import { useState } from "react";
import { useLocalStorageContext } from "../components/LocalStorageAsContext";
import { useRouter } from "next/navigation";
import { useDiccionario } from "../components/DiccionarioContext";
import type { Character } from "./CharacterCard";

/**
 * Formulario controlado para crear un personaje propio.
 *
 * Como la API de Rick and Morty es de solo lectura, el personaje no se envía a
 * ningún lado: se guarda en `LocalStorageAsContext`, que lo persiste en
 * `localStorage` y lo comparte con el resto de la app.
 *
 * No recibe props: los textos y el locale salen del contexto de diccionario.
 */
function CharacterForm() {
    // Textos traducidos y locale activo, sin prop drilling.
    const { dict, lang } = useDiccionario();
    const errores = dict.errores;
    const formProps = dict.formulario;
    // Estado del formulario: un objeto con la misma forma que `Character`,
    // porque cada input está atado a una de sus propiedades por el atributo `name`.
    const [character, setCharacter] = useState<Character>({
        id: 0,
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
        image: "",
    });

    const { addCharacter } = useLocalStorageContext();
    const router = useRouter();
    // Errores por campo: clave = nombre del campo, valor = mensaje a mostrar.
    const [error, setError] = useState<Partial<Character>>({});
    
    /**
     * Valida que ningún campo esté vacío y publica los errores encontrados.
     *
     * NOTA: reutiliza `titleerror` y `descriptionerror`, que son los mensajes
     * de las series. El usuario ve "La descripción es obligatoria" debajo del
     * campo de género. Convendría añadir mensajes propios al diccionario.
     *
     * @returns `true` si el formulario es válido.
     */
    const validate = (): boolean => {
        const newError: Partial<Character> = {};
        if (!character.name) {
            newError.name = errores.titleerror;
        }
        if (!character.status) {
            newError.status = errores.descriptionerror;
        }
        if (!character.species) {
            newError.species = errores.descriptionerror;
        }
        // NOTA: `type` se exige obligatorio, pero su placeholder dice "(optional)".
        // Hay que decidir cuál de los dos manda.
        if (!character.type) {
            newError.type = errores.descriptionerror;
        }
        if (!character.gender) {
            newError.gender = errores.descriptionerror;
        }
        if (!character.image) {
            newError.image = errores.descriptionerror;
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    };
    /** Handler único para todos los inputs: usa `name` para saber qué campo actualizar. */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCharacter({...character, [e.target.name]: e.target.value });
    }

    /**
     * Envía el formulario: si valida, guarda en el contexto (y por tanto en
     * localStorage) y vuelve al listado del idioma actual.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // El `id: 0` del estado inicial es irrelevante: `addCharacter`
            // genera uno único con Date.now() y pisa el que venga.
            addCharacter(character);
            router.push(`/${lang}/rickymorty`);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4  max-w-md mx-auto p-4 border rounded shadow ">
            {/* NOTA: `crear/page.tsx` ya pinta este mismo título encima del form. */}
            <h2 className="text-2xl font-bold mb-4">{dict.create_character}</h2>
            {/* Cada bloque repite la misma estructura: label + input controlado +
                mensaje de error. El `name` del input debe coincidir con la
                propiedad de `Character`, porque `handleChange` se guía por él. */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {formProps.title}
                </label>
                <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    id="name"
                    name="name"
                    value={character.name}
                    onChange={handleChange}
                />
                {error.name && <p className="text-red-500">{error.name}</p>}
            </div>
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    {formProps.status}
                </label>
                <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    id="status"
                    name="status"
                    value={character.status}
                    onChange={handleChange}
                    placeholder="Alive, Dead, or Unknown"
                />
                {error.status && <p className="text-red-500">{error.status}</p>}
            </div>
            <div>
                <label htmlFor="species" className="block text-sm font-medium text-gray-700">
                    {formProps.species}
                </label>
                <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    id="species"
                    name="species"
                    value={character.species}
                    onChange={handleChange}
                    placeholder="Human, Alien, etc."
                />
                {error.species && <p className="text-red-500">{error.species}</p>}
            </div>
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    {formProps.type}
                </label>
                <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    id="type"
                    name="type"
                    value={character.type}
                    onChange={handleChange}
                    placeholder="Type of character (optional)"
                />
                {error.type && <p className="text-red-500">{error.type}</p>}
            </div>
            <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    {formProps.gender}
                </label>
                <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    id="gender"
                    name="gender"
                    value={character.gender}
                    onChange={handleChange}
                    placeholder="Male, Female, Genderless, or Unknown"
                />
                {error.gender && <p className="text-red-500">{error.gender}</p>}
            </div>
            <div>
                {/* URL de la foto. Su dominio tiene que estar en `images.remotePatterns`
                    de `next.config.ts`, o `next/image` falla al renderizar la tarjeta. */}
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    {formProps.image}
                </label>
                <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    id="image"
                    name="image"
                    value={character.image}
                    onChange={handleChange}
                />
                {error.image && <p className="text-red-500">{error.image}</p>}
            </div>
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {formProps.submit}
            </button>
        </form>
    );
}

export default CharacterForm;