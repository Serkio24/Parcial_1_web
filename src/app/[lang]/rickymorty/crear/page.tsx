"use client";
import  CharacterForm  from "../CharacterForm";
import {  useDiccionario } from "../../components/DiccionarioContext";
/**
 * Página del formulario de creación (`/es/rickymorty/crear`).
 *
 * Es Client Component porque consume el contexto de diccionario; sin la
 * directiva `"use client"` de arriba, `useDiccionario()` falla en el servidor.
 * Toda la lógica está en `CharacterForm`: esto solo pone el marco y el título.
 */
export default function Crear() {
    // NOTA: `lang` se extrae pero no se usa aquí.
    const { dict, lang } = useDiccionario();
    return (
        <div className="p-4">
            {/* NOTA: `CharacterForm` pinta este mismo título dentro del form,
                así que el texto aparece dos veces. Sobra uno de los dos. */}
            <h2 className="text-2xl font-bold mb-4">{dict.create_character}</h2>
            <CharacterForm />
        </div>
    );
}