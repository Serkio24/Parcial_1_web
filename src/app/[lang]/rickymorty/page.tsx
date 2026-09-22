"use client";
import { useDiccionario } from "../components/DiccionarioContext";
import { useApi } from "./ApiContext";
import { useLocalStorageContext } from "../components/LocalStorageAsContext";
import CharacterList from "./CharacterList";
import Header from "./Header";

/**
 * Sección de Rick and Morty (`/es/rickymorty`, `/en/rickymorty`).
 *
 * Es un Client Component porque consume dos contextos:
 *  - `useApi()` -> los personajes que el `ApiProvider` trae de la API,
 *  - `useDiccionario()` -> los textos del idioma activo.
 */
export default function RickyMortyPage() {
    const { dict } = useDiccionario();
    const { characters, loading, error } = useApi();
    const { characters: guardados } = useLocalStorageContext();
   

    // Estados de carga y error antes de pintar la lista.
    if (loading) return <p>Cargando…</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <main>
            <Header/>
            <h1 className="text-2xl font-bold">{dict.rickymorty.title}</h1>
            <CharacterList characters={characters} emptyMessage={dict.rickymorty.empty} />
            <CharacterList characters ={guardados} emptyMessage={dict.rickymorty.empty} />
        </main>
    );
}
